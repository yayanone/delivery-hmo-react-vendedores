import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MenuComponent from '../Menu';

const RoterChecker = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user && location.pathname !== "/login") {
      navigate('/login');   
      return;
    }

    if(user && location.pathname === '/login') {
      navigate('/');
    }
  }, [user, location]);
  
  return (
    <Layout style={{minHeight: "100vh"}}>
      { user && <MenuComponent /> }
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

export default RoterChecker;