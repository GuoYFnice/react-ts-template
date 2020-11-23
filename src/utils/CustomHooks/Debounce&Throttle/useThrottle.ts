import { useState, useEffect } from 'react';
import useThrottleFn from './useThrottleFn';
import { ThrottleOptions } from './throttleOptions';

/**
 * ? 处理节流"值"的 hook.
 * @param { Any } value 需要节流的值。
 * @param { Object } options 节流配置。
 * @return { Object }
 */
const useThrottle = <T>(value: T, options?: ThrottleOptions) => {
  const [throttled, setThrottled] = useState<T>(value);
  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);
  useEffect(() => {
    run();
  }, [value, run]);
  return throttled;
};

export default useThrottle;
