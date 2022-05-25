import Home from '../views/Home';
import Login from '../views/Login';

export default [
  {
    key: 'login',
    path: '/login',
    element: <Login />,
  },
  {
    key: 'home',
    path: '/ventas',
    element: <Home />,
  }
];