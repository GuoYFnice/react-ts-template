import { useRef, useEffect } from 'react';
import { Arbitrary, AList } from 'Src/types/replaceAny';

export type noop = (...args: AList) => Arbitrary;

/**
 * ? 创建函数地址永远不会改变的函数。
 * * 当使用 useCallback 记住一个回调，由于内部函数经常重新创建导致子组件重复 render；对于过于复杂的子组件来说会造成性能影响；此时可以通过 usePersistFn 来保证函数地址永远不会变化。
 * @param fn 需要持久化的函数。
 * @result 持久化后的函数。
 */
const usePersistFn = <T extends noop>(fn: T): T => {
  const fnRef = useRef<T>(fn);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  const persistFn = useRef<T>();
  if (!persistFn.current) {
    persistFn.current = function temporaryFn(this: Arbitrary, ...args: AList) {
      return fnRef.current?.apply(this, args);
    } as T;
  }
  return persistFn.current;
};

export default usePersistFn;
