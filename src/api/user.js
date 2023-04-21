/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

export const login = data => {
    return request({
        method: "POST",
        url: "/v1_0/authorizations",
        data
    })
}
/**
 * 发送验证码
 */
export const sendSms = mobile => {
    return request({
        method: "GET",
        url: `/v1_0/sms/codes/${mobile}`,
    })
}
/**
 * 获取用户个人信息
 * @returns 
 */
export const getUserInfo = () => {
    return request({
        method: "GET",
        url: '/v1_0/user'
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
    return request({
        method: "GET",
        url: '/v1_0/user/channels'
    })
}

/**
 * 关注用户
 */
export const addFollow = target => {
    return request({
      method: 'POST',
      url: '/v1_0/user/followings',
      data: {
        target
      }
    })
  }
  
  /**
   * 取消关注用户
   */
  export const deleteFollow = target => {
    return request({
      method: 'DELETE',
      url: `/v1_0/user/followings/${target}`
    })
  }
/**
 * 获取当前登录用户的个人资料
 */
export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
/**
 * 更新用户资料
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}

/**
 * 获取用户收藏列表
 */
export const getUserCollects = params => {
  return request({
      method: "GET",
      url: "/v1_0/article/collections",
      params: params
      })
}
/**
 * 获取用户阅读记录
 */
export const getUserHistories = params => {
  return request({
      method: "GET",
      url: "/v1_0/user/histories",
      params: params
      })
}
/**
 * 获取用户关注列表
 */
export const getUserGzlb = params => {
  return request({
      method: "GET",
      url: "/v1_0/user/followings",
      params: params
      })
}

