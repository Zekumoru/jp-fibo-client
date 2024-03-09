import axios, { AxiosError } from 'axios';
import { ILoginResponse, IStatusResponse } from '../types/response';
import { useMutation } from '@tanstack/react-query';
import useServerError from './useServerError';
import { queryClient } from '../main';

const logoutMutation = async () => {
  const data = (
    await axios.post('http://localhost:3000/user/logout', undefined, {
      withCredentials: true,
    })
  ).data as ILoginResponse;
  queryClient.fetchQuery({ queryKey: ['user'] });
  return data;
};

const useLogout = () => {
  const {
    data: status,
    error: axiosError,
    mutateAsync: logout,
  } = useMutation<ILoginResponse, AxiosError, void, unknown>({
    mutationFn: logoutMutation,
  });
  const error = useServerError<IStatusResponse>(axiosError);

  return [logout, error, status] as const;
};

export default useLogout;
