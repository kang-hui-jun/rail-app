import React, {ReactNode, useContext, useState} from 'react';
import {LoginForm} from '../types/login-form';
import {User} from '../types/user';
import * as auth from '../utils/auth';

type Auth = {
  login: (form: LoginForm) => Promise<void>;
  user: User | null;
};

const AuthContext = React.createContext<Auth | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState(null);
  const login = (form: LoginForm) => auth.login(form).then(setUser);

  return <AuthContext.Provider value={{user, login}} children={children} />;
};

export const useAuth = () => {
    return useContext(AuthContext)
}