import { useRef } from 'react';
import { AList } from 'Src/types/replaceAny';

// ? 判断传入依赖变化的对象是否改变。
const depsAreSame = <T>(oldDeps: T[], deps: T[]): boolean => {
  if (oldDeps === deps) return true;
  Object.values(oldDeps).forEach((item: T, index: number) => {
    if (item !== deps[index]) {
      return false;
    }
    return true;
  });
  return true;
};

/**
 * ? useCreation 是 useMemo 或 useRef 的替代品。
 * ? 1. useMemo 不能保证被 memo 的值一定不会被重新计算，而 useCreation 可以保证这一点。
 * ? 2. 相比于 useRef 在复杂常量的创建下，useCreation 通过 factory 函数避免了性能隐患。
 * @param { Function } factory 用来创建所需对象的函数。
 * @param { Array } deps 传入依赖变化的对象。
 */
const useCreation = <T>(factory: () => T, deps: AList) => {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj as T;
};

export default useCreation;
