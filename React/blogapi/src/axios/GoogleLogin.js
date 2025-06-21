import { GoogleLogin } from '@react-oauth/google';
import axiosInstance from '../../axios/login';  // import the shared axios instance

function App() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axiosInstance.post('auth/google/', {
        token: credentialResponse.credential,
      });
      console.log('Backend response:', res.data);
    } catch (error) {
      console.error('Backend login failed:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

