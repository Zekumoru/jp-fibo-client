/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext } from 'react';
import { IUser } from '../types/user';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ILoginResponse } from '../types/response';

const LoggedInContext = createContext<IUser | undefined | null>(null);

const useLoggedIn = () => {
  return useContext(LoggedInContext);
};

const LoggedInProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useQuery<unknown, AxiosError, IUser>({
    queryFn: async () => {
      const data = (
        await axios.get('http://localhost:3000/login', {
          withCredentials: true,
        })
      ).data as ILoginResponse;
      return data.user;
    },
    queryKey: ['user'],
  });

  return (
    <LoggedInContext.Provider value={user}>{children}</LoggedInContext.Provider>
  );
};

export { useLoggedIn, LoggedInProvider };
