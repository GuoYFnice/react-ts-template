import { useState, useLayoutEffect } from 'react';
import { getTargetElement, BasicTarget, TargetElement } from 'Utils/Tools/getTargetElement';

export type Size = {
  width?: number;
  height?: number;
};

/**
 * ? 监听节动态返回元素宽高。
 * @param { HTMLElement | React.ref } target DOM 节点或者 Refs.
 * @return { Object }
 */
const useSize = (target: BasicTarget): Size => {
  const [state, setState] = useState<Size>(() => {
    const el: TargetElement | undefined | null = getTargetElement(target);
    return {
      width: ((el || {}) as HTMLElement).clientWidth,
      height: ((el || {}) as HTMLElement).clientHeight
    };
  });
  // * useLayoutEffect 常用于读取 DOM 布局同步触发重渲染。
  useLayoutEffect(() => {
    const el: TargetElement | undefined | null = getTargetElement(target);
    if (!el) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }
    // ! 对于暂不支持 ResizeObserver 的浏览器，可以通过引入 resize-observer-polyfill 来进行兼容。
    // ! 由于 dom 库中没有加入 TS 对 ResizeObserver 的 interface，引入 @types/resize-observer-browser 解决编译错误。
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        });
      });
    });
    resizeObserver.observe(el as HTMLElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [target]);
  return state;
};

export default useSize;
