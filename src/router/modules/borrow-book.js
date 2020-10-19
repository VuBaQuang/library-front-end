/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageGroupRouter = {
  path: '/borrow-book',
  redirect: '/borrow-book/index',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/borrow-book/BorrowBook'),
      name: 'BorrowBook',
      meta: { title: 'borrow_book', icon: 'documentation', roles: ['user'] }
    }
  ]
}
export default manageGroupRouter

