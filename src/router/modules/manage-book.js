/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageGroupRouter = {
  path: '/manage-book',
  redirect: '/manage-book/list',
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@/views/manage-book/ManageBook'),
      name: 'ManageBook',
      meta: { title: 'manage_book', icon: 'education', roles: ['book_manager'] }
    }
  ]
}
export default manageGroupRouter
