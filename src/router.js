// Import the useRoute function from vue-router
import { createRouter, createWebHistory, useRoute } from 'vue-router';
import { session } from './data/session';
import { userResource } from '@/data/user';
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'Task',
    path: '/tms/:naming_series',
    component: () => import('@/pages/TaskDetails.vue'),
    props: true,
  },
];
 
let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
});
 
router.beforeEach(async (to, from, next) => {

 
  let isLoggedIn = session.isLoggedIn;
  try {
    await userResource.promise;
  } catch (error) {
    isLoggedIn = false;
  }
 
  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' });
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});
 
export default router;