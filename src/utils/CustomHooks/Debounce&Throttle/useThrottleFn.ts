import throttle from 'lodash.throttle';
import { useRef } from 'react';
import useCreation from 'Utils/CustomHooks/toolHooks/useCreation';
import { ThrottleOptions } from './throttleOptions';

type Fn = (...args: any) => any;

/**
 * ? 用于处理节流函数的 hook.
 * @param { Function } fn 需要节流执行的函数。
 * @return { Object }
 */
const useThrottleFn = <T extends Fn>(fn: T, options?: ThrottleOptions) => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;
  const wait = options?.wait ?? 1000;
  const throttled = useCreation(
    () =>
      throttle<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options
      ),
    []
  );
  return {
    run: (throttled as unknown) as T,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
};

export default useThrottleFn;
