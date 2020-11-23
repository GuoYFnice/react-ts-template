import { useState, useEffect } from 'react';
import useDebounceFn from 'Utils/CustomHooks/Debounce&Throttle/useDebounceFn';
import { DebounceOptions } from './debounceOptions';

/**
 * ? 处理防抖"值"的 hook.
 * @param { Any } value 需要防抖的值。
 * @param { Object } options 防抖配置。
 * @return { Object }
 */
const useDebounce = <T>(value: T, options?: DebounceOptions) => {
  const [debounced, setDebounced] = useState(value);
  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);
  useEffect(() => {
    run();
  }, [value, run]);
  return debounced;
};

export default useDebounce;
