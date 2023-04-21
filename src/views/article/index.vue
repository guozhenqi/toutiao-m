<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if = "article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <!-- 
            :is-followed="article.is_followed"
            @update-is_followed="article.is_followed = $event"
           -->
          <follow-user 
          class="follow-btn"
          :user-id="article.aut_id"
          v-model="article.is_followed"
          ></follow-user>
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            :loading="followLoading"
            size="small"
            @click="onFollow"
          >已关注</van-button>
          <van-button
          v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            :loading="followLoading"
            round
            size="small"
            icon="plus"
            @click="onFollow"
          >关注</van-button> -->
          
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div 
        class="article-content markdown-body" 
        v-html="article.content"
        ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论别表 -->
        <div class="scroll" ref="scro">
          <comment-list
        :source="article.art_id"
        @onload-success="totalCommentCount = $event.total_count"
        :list="commentList"
        @reply-click="onReplyClick"
        />
        </div>
        
        <!-- 文章评论别表 -->
          <!-- 底部区域 -->
   <div class="article-bottom">
      <van-button 
      class="comment-btn" 
      type="default" 
      round 
      size="small"
      @click="isPostShow = true">写评论
      </van-button>
      <van-icon class="comment-icon" name="comment-o" :badge="totalCommentCount" @click="logheight"/>
      <!-- <van-button class="btn-item" icon="star-o" /> -->
      <collect-article
      class="btn-item"
      v-model="article.is_collected"
      :article-id="article.art_id"
       />
      <!-- <van-button class="btn-item" icon="good-job-o" /> -->
      <like-article
      class="btn-item"
       v-model="article.attitude"
       :article-id="article.art_id"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
        <van-popup
        v-model="isPostShow"
        position="bottom"
      >
        <comment-post
        :target="article.art_id"
        @post-success="onPostSuccess"
        />
      </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

    </div>
      <!-- 评论回复 -->
      
       <van-popup
        v-model="isReplyShow"
        position="bottom"
        style="height: 100%"
      >
       <comment-reply
       v-if="isReplyShow"
        :comment="currentComment"
         @close="isReplyShow = false"
       />
      </van-popup>
      <!-- 评论回复 -->
  
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import articleListVue from '../home/components/article-list.vue'
import { ImagePreview } from 'vant';
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
import { nextTick } from 'vue';
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
   // 给所有的后代组件提供数据
  // 注意：不要滥用
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data () {
    return {
        article: {},
        loading: true, //加载中的loading状态
        errStatus: 0,//
        followLoading: false,
        totalCommentCount: 0,
        isPostShow: false,
        commentList: [] ,// 评论别表
        isReplyShow: false,
        currentComment: {}// 当前点击回复的评论向
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle() {
        try {
            this.loading = true
            const { data } = await getArticleById(this.articleId)
            console.log(data);
            this.article = data.data
            // 初始化图片点击预览
            // console.log(this.$refs['article-content'])
            setTimeout(() => {
              this.previewImage()
            }, 0)
            this.loading = false
        } catch (error) {
            if(error.response && error.response.status === 404){
                this.errStatus = 404
            }
            this.loading = false
            console.log(error);
        }
    },
       previewImage () {
      // 得到所有的 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')

      // 获取所有 img 地址
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)

        // 给每个 img 注册点击事件，在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        }
      })
    },
    onPostSuccess(data) {
      // 关闭弹层
      this.isPostShow = false
      // 发布成功的数据显示到列表顶部
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick(comment){
      this.currentComment = comment
      this.isReplyShow = true
    },
    logheight(){
        this.$refs['scro'].scrollIntoView();  
      
    }

  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>
