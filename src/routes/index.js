import VueRouter from 'vue-router';
import routes from './routes';

const Router = new VueRouter({ mode: 'history', routes });

Router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!window.$cookies.get('token')) {
      next({ path: '/' });
    }
    else {
      next();
    }
  }
  else if (to.meta.guest) {
    if (!window.$cookies.get('token')) {
      next();
    }
    else {
      next({ path: '/home' });
    }
  } else {
    next();
  }
});

export default Router;