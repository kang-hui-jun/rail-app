import React, {ReactNode, useContext, useState} from 'react';
import {User} from '../types/user';
import { getInfo } from '../api/get-info';

type Auth = {
  getUser: () => Promise<void>;
  user: User | null;
};

const AuthContext = React.createContext<Auth | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState(null);
  const getUser = () => getInfo().then(setUser);

  return <AuthContext.Provider value={{user, getUser}} children={children} />;
};

export const useAuth = () => {
    return useContext(AuthContext)
}