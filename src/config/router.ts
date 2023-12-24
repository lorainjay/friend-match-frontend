
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue"
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/EditUserPage.vue"
import SearchResultPage from "../pages/SearchResultPage.vue"
import UserLoginPage from "../pages/UserLoginPage.vue"
import TeamAddPage from "../pages/TeamAddPage.vue"
import TeamUpdatePage from "../pages/TeamUpdatePage.vue"
import registerPage from "../pages/registerPage.vue"
const routes = [
    { path: '/', component: Index },
    { path: '/team', title:'找队伍',  component: Team },
    { path: '/team/add', title: '创建队伍', component: TeamAddPage },
    { path: '/team/update', title: '更新队伍', component: TeamUpdatePage },
    {path: '/user', title: '个人信息', component: User},
    {path: '/search', title: '找伙伴', component: SearchPage},
    {path: '/user/edit', title: '编辑信息', component: EditUserPage},
    {path: '/user/list', title: '用户列表', component: SearchResultPage},
    {path: '/user/login', title: '登录', component: UserLoginPage},
    {path: '/user/register', title: '注册', component: registerPage}

]
export default routes;