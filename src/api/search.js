/**
 * 搜索联想模块
 */
import request from "@/utils/request"

/**
 * 获取搜索联想
 */
export const getSearchSuggestion = q => {
    return request({
        method: "GET",
        url: "/v1_0/suggestion",
        params: {
            q
        }
    })
}
/**
 * 获取搜索结果
 */
export const getSearchResult = params => {
    return request({
        method: "GET",
        url: "/v1_0/search",
        params
    })
}