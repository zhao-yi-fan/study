/* const Login = () => import('@/pages/login/Login')
const Index = () => import('@/pages/home/Index')
const Home = () => import('@/pages/home/Home')
const Profile = () => import('@/pages/home/Profile')
const User = () => import('@/pages/home/User')
const NotFoundComponent = () => import('@/pages/404/NotFoundComponent') */

export default [
  {
    path: '*',
    component: () => import('@/pages/404/NotFoundComponent')
  },
  {
    path: '/',
    name: 'default',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Login')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/pages/home/Index'),
    redirect: '/index/home',
    children: [
      {
        path: 'home', // 相当于'/index/home'
        name: 'Home',
        components: { // 多任务视图
          default: () => import('@/pages/home/Home'),
          // footer: () => import('@/pages/home/components/footer.vue')
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/pages/home/Profile')
      },
      {
        path: '/index/user',
        name: 'User',
        component: () => import('@/pages/home/User')
      }
    ]
  },

]