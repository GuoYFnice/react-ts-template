import debounce from 'lodash.debounce';
import { useRef } from 'react';
import useCreation from 'Utils/CustomHooks/toolHooks/useCreation';
import { DebounceOptions } from './debounceOptions';

type Fn = (...args: any) => any;

/**
 * ? 处理防抖函数的 hook.
 * @param { Function } fn 需要防抖执行的函数。
 * @param { Object } options 防抖配置。
 */
const useDebounceFn = <T extends Fn>(fn: T, options?: DebounceOptions) => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;
  const wait = options?.wait ?? 1000;
  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options
      ),
    []
  );
  return {
    run: (debounced as unknown) as T,
    cancel: debounced.cancel,
    flush: debounced.flush
  };
};

export default useDebounceFn;
