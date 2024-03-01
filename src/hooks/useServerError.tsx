import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IStatusResponse } from '../types/response';

const useServerError = <T extends IStatusResponse>(
  axiosError: AxiosError | null
) => {
  const [error, setError] = useState<T>();

  useEffect(() => {
    if (axiosError && axiosError.response) {
      const error = axiosError.response.data as T;
      return setError(error);
    }

    setError(undefined);
  }, [axiosError]);

  return error;
};

export default useServerError;
