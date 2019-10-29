import VueRouter from 'vue-router';
import routes from './routes';
import api from '../services/api'

const Router = new VueRouter({ mode: 'history', routes });

Router.beforeEach(async (to, from, next) => {
  try {
    await api.get('/', {
      headers: {
        authorization: ('bearer ' + window.$cookies.get('token')),
      }
    });
  } catch (err) {
    window.$cookies.remove('token');
    window.$cookies.remove('user');
  }

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