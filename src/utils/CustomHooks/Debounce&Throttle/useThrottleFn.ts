import { useRef } from 'react';
import throttle from 'lodash.throttle';
import useCreation from 'Utils/CustomHooks/toolHooks/useCreation';
import { DAndTOptions } from 'Src/types/DAndTOptions';
import { Arbitrary, AList } from 'Src/types/replaceAny';

type Fn = (...args: Arbitrary) => Arbitrary;

/**
 * ? 用于处理节流函数的 hook.
 * @param { Function } fn 需要节流执行的函数。
 * @return { Object }
 */
const useThrottleFn = <T extends Fn>(fn: T, options?: DAndTOptions) => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;
  const wait = options?.wait ?? 1000;
  const throttled = useCreation(
    () =>
      throttle<T>(
        ((...args: AList) => {
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
