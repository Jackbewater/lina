import request from '@/utils/request'

// 获取嵌入仪表板所需的token
export function getToken() {
  return request({
    url: 'http://123.60.132.17:8080/api/token',
    method: 'get'
  }).then(response => {
    // Ensure response.data exists and has a token property
    if (!response.data || typeof response.data.token !== 'string') {
      throw new Error('Invalid token response from API')
    }
    return response.data.token
  })
}

export function createSourceIdCache(ids) {
  ids = ids.map(item => {
    if (typeof item === 'object' && item.id) {
      return item.id
    } else {
      return item
    }
  })
  return request({
    url: '/api/v1/common/resources/cache/',
    method: 'post',
    data: { resources: ids }
  })
}

export function optionUrlMeta(url) {
  return request({
    url: url,
    method: 'options'
  })
}
