import { useCallback, useEffect, useState } from "react";

interface QueryOptions<T> {
  auto?: boolean;
  requestFn: (...args: any[]) => Promise<T>;
  onRequest?: () => any;
  onSuccess?: (data: T) => any;
  onError?: (error: any) => any;
  onSettled?: () => any;
}

interface QueryState<T> {
  loading: boolean;
  error?: any;
  data?: T | null;
}

export default function useQuery<T>({
  auto,
  requestFn,
  onRequest,
  onSuccess,
  onError,
  onSettled,
}: QueryOptions<T>) {
  const [state, setState] = useState<QueryState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const request = useCallback(async (...args: any[]) => {
    setState({ loading: true, error: null, data: null });

    onRequest?.();

    try {
      const data: T = await requestFn(...args);

      setState({ loading: false, error: null, data });

      onSuccess?.(data);
    } catch (error: any) {
      setState({ loading: false, error, data: null });

      onError?.(error);
    } finally {
      onSettled?.();
    }
  }, []);

  useEffect(() => {
    if (auto) {
      request();
    }
  }, [auto, request]);

  return { ...state, request };
}
