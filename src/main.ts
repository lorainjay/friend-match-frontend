import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import "../global.css"
// 1. 引入你需要的组件
import { Button, NavBar, Icon, Tabbar, TabbarItem} from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
import App from './App.vue'
import {RouterOptions} from "vue-router";
import routes from "./config/router";
import Vant from "vant"


// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
} as RouterOptions)
const app = createApp(App)
app.use(Vant)
// 3. 注册你需要的组件
app.use(router);
app.mount('#app')

