import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';

export default [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'Register',
    component: Registration,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
]
