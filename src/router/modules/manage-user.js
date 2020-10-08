/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageVersionRouter = {
  path: '/manage-user',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/manage-user/ManageUser'),
      name: 'ManageUser',
      meta: { title: 'Quản lý người dùng', icon: 'user' }
    }
  ]
}
export default manageVersionRouter
