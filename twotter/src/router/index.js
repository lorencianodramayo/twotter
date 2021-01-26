import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import { users } from '../assets/users'
import Home from '../views/Home.vue';
import UserProfile from '../views/userProfile.vue';
import Admin from '../views/Admin';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile

  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requireAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async(to, from, next) => {
  const user = store.state.User.user;

  if(!user) {
    await store.dispatch('User/setUser', users[0])
  }

  const isAdmin = false;
  const requireAdmin = to.matched.some(record => record.meta.requireAdmin);

  (requireAdmin && !isAdmin)? next({ name: 'Home' }) : next();
})

export default router
