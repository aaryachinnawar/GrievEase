import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem('authToken'),
  });


  useEffect(() => {
    const data = localStorage.getItem('authToken');
    try{
      if(data){
        const parsedData = JSON.parse(data);
        setAuth({
          ...auth,
          user: parsedData.user,
          token: parsedData.token
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsedData.token}`;
      }
    }
    catch(err){
      console.error(err);
      toast.error('An error occurred. Please try again.');
      localStorage.removeItem('authToken');
    }
},[]);

  return (
    <AuthContext.Provider value={{ auth,setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;