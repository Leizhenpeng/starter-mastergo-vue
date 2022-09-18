import { createApp } from 'vue'
import App from './App.vue'
import "./styles/main.css"
import 'uno.css'
import '@unocss/reset/tailwind.css'
//should be less , if want to custom theme
import '@arco-design/web-vue/dist/arco.less';
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

const app = createApp(App);
app.use(ArcoVueIcon)
app.mount('#app')
