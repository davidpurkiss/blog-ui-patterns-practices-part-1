import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './views/SignIn.vue';
import PasswordManager from './views/PasswordManager.vue';
import PasswordDetails from './views/PasswordDetails.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/passwords',
      name: 'passwords',
      component: PasswordManager
    },
    {
      path: '/password/:id',
      name: 'password',
      component: PasswordDetails
    }
  ]
});
