<template>
  <div class="card-iframe content-box">
    <iframe id="iframe-dashboard-view" style="height: 80%; width: 80%; border: 0" src="" />
  </div>
</template>

<script>
import { getToken } from '@/api/common'

export default {
  name: 'IframePage',
  data() {
    return {
      dvId: '',
      url: 'http://10.1.14.31:9080/#/chart-view',
      params: {
        busiFlag: 'dashboard',
        dvId: '1122210916054732800',
        type: 'Dashboard',
        embeddedToken: '',
        'de-embedded': true
      },
      iframe: null
    }
  },
  mounted() {
    this.iframe = document.getElementById('iframe-dashboard-view')

    getToken()
      .then(token => {
        this.params.embeddedToken = token
        if (this.iframe) {
          this.iframe.src = this.url
          window.addEventListener('message', this.onMessage, false)
        }
      })
      .catch(error => {
        console.error('Failed to get token:', error)
        // Handle the error appropriately, e.g., show a user notification
        this.$message.error('无法获取嵌入令牌: ' + error.message)
      })
  },
  beforeDestroy() {
    window.removeEventListener('message', this.onMessage, false)
  },
  methods: {
    onMessage(event) {
      if (event.data?.msgOrigin === 'de-fit2cloud' && this.iframe) {
        const contentWindow = this.iframe.contentWindow
        if (contentWindow) {
          contentWindow.postMessage(this.params, '*')
        }
      }
    }
  }
}
</script>

<style>

</style>
