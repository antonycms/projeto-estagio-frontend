import Login from '../components/Login';
import Registration from '../components/Registration';
import Home from '../components/Home';

export default [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
    }
  },
  {
    path: '/registration',
    name: 'register',
    component: Registration,
    meta: {
      guest: true,
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
]
