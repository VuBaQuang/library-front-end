/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageUserRouter = {
  path: '/manage-user',
  redirect: '/manage-user/list',
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@/views/manage-user/ManageUser'),
      name: 'ManageUser',
      meta: { title: 'manage_user', icon: 'user', roles: ['user_manage'], noCache: true }
    }
  ]
}
export default manageUserRouter
