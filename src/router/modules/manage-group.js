/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageGroupRouter = {
  path: '/manage-group',
  redirect: '/manage-group/list',
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@/views/manage-group/ManageGroup'),
      name: 'ManageGroup',
      meta: { title: 'manage_group', icon: 'peoples', roles: ['group_manager'] }
    }
  ]
}
export default manageGroupRouter
