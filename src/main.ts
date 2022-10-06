import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import 'uno.css'
// should be less , if want to custom theme
// import '@arco-themes/vue-taolu-publishing-platform/index.less'

const app = createApp(App)
app.mount('#app')
