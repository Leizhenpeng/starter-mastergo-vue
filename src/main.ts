import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import 'uno.css'
import { setupRouter } from './router'
// should be less , if want to custom theme
// import '@arco-themes/vue-taolu-publishing-platform/index.less'
import '~/listen.emit'
import '~/send.emit'
const app = createApp(App)
setupRouter(app)
app.mount('#app')
