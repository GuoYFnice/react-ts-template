import { useRef } from 'react';
import debounce from 'lodash.debounce';
import useCreation from 'Utils/CustomHooks/toolHooks/useCreation';
import { DAndTOptions } from 'Src/types/DAndTOptions';
import { Arbitrary, AList } from 'Src/types/replaceAny';

type Fn = (...args: Arbitrary) => Arbitrary;

/**
 * ? 处理防抖函数的 hook.
 * @param { Function } fn 需要防抖执行的函数。
 * @param { Object } options 防抖配置。
 */
const useDebounceFn = <T extends Fn>(fn: T, options?: DAndTOptions) => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;
  const wait = options?.wait ?? 1000;
  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: AList) => {
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
