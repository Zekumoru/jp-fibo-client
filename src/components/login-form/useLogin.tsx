import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { IStatusResponse } from '../../types/response';
import { IFormLoginError } from '../../types/response-errors';
import useServerError from '../../hooks/useServerError';

interface LoginCredentials {
  username: string;
  password: string;
}

const loginMutation = async (credentials: LoginCredentials) => {
  const data = (
    await axios.post('http://localhost:3000/login', credentials, {
      withCredentials: true,
    })
  ).data as IStatusResponse;
  return data;
};

const useLogin = () => {
  const {
    data: status,
    error: axiosError,
    mutateAsync: login,
  } = useMutation<IStatusResponse, AxiosError, LoginCredentials, unknown>({
    mutationFn: loginMutation,
  });
  const error = useServerError<IFormLoginError>(axiosError);

  return [login, error, status] as const;
};

export default useLogin;
