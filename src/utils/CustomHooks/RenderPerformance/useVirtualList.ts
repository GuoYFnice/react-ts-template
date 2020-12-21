import { useEffect, useState, useMemo, useRef } from 'react';
import { Arbitrary } from 'Src/types/replaceAny';
import useSize from '../Observer/useSize';

export interface OptionType {
  itemHeight: number | ((index: number) => number);
  overscan?: number;
}

/**
 * ? 用于展示大量数据时，首屏加载慢、滚动卡顿的问题。
 * @param { Array } list 数据列表。
 * @param { Object } options 可选配置项。
 * @return { Object }
 */
const useVirtualList = <T>(list: T[], options: OptionType) => {
  const containerRef = useRef<HTMLElement | null>();
  const size = useSize(containerRef as React.MutableRefObject<HTMLElement>);
  // ! 暂时禁止 cache 功能，全局状态配置并开启 enableCache 功能，配合 hook 内 distanceCache 统一管理 cache.
  // const distanceCache = useRef<{ [key: number]: number }>({});
  const [state, setState] = useState({ start: 0, end: 10 });
  /**
   * * itemHeight 行高度，静态高度可以直接写入像素值，动态高度可传入函数。
   * * overscan 视区上、下额外展示的 dom 节点数量。
   */
  const { itemHeight, overscan = 5 } = options;
  if (!itemHeight) {
    console.warn('please enter a valid itemHeight');
  }
  /**
   * ? 根据容器的高度获取能容纳下的元素个数。
   * @param { Number } containerHeight 容器高度。
   * @return { Number }
   */
  const getViewCapacity = (containerHeight: number) => {
    if (typeof itemHeight === 'number') {
      return Math.ceil(containerHeight / itemHeight);
    }
    const { start = 0 } = state;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < list.length; i++) {
      const height = (itemHeight as (index: number) => number)(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }
    return capacity - start;
  };
  /**
   * ? 根据滚动距离获取偏移量。
   * @param { Number } scrollTop 滚动距离。
   * @return { Number }
   */
  const getOffset = (scrollTop: number) => {
    if (typeof itemHeight === 'number') {
      return Math.floor(scrollTop / itemHeight) + 1;
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = (itemHeight as (index: number) => number)(i);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };
  // ? 动态计算滚动范围。
  const calculateRange = () => {
    const element = containerRef.current;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      setState({
        start: from < 0 ? 0 : from,
        end: to > list.length ? list.length : to
      });
    }
  };
  useEffect(() => {
    // * 使用 requestAnimationFrame 调用滚动范围计算函数，在改变帧后执行函数，帧数比直接调用函数提高差不多 10个点。
    window.requestAnimationFrame(calculateRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height]);
  const totalHeight = useMemo(() => {
    if (typeof itemHeight === 'number') {
      return list.length * itemHeight;
    }
    // eslint-disable-next-line unicorn/no-reduce
    return list.reduce((sum, _, index) => sum + itemHeight(index), 0);
  }, [list, itemHeight]);
  /**
   * ? 获取总共滚动距离。
   * @param { Number } index 当前起始滚动项下标。
   * @return { Number }
   */
  const getDistanceTop = (index: number) => {
    // ! 如果有缓存，优先返回缓存值
    // if (enableCache && distanceCache.current[index]) {
    //   return distanceCache.current[index];
    // }
    if (typeof itemHeight === 'number') {
      const height = index * itemHeight;
      // if (enableCache) {
      //   distanceCache.current[index] = height;
      // }
      return height;
    }
    // eslint-disable-next-line unicorn/no-reduce
    const height = list.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);
    // if (enableCache) {
    //   distanceCache.current[index] = height;
    // }
    return height;
  };
  const scrollTo = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const offsetTop = useMemo(() => getDistanceTop(state.start), [state.start]);
  return {
    list: list.slice(state.start, state.end).map((ele, index) => ({
      data: ele,
      index: index + state.start
    })),
    scrollTo,
    // * 外层父容器节点参数。
    containerProps: {
      ref: (ele: Arbitrary) => {
        containerRef.current = ele;
      },
      onScroll: (event: Arbitrary) => {
        event.preventDefault();
        calculateRange();
      },
      style: { overflowY: 'auto' as const }
    },
    // * 子容器外层辅助容器节点参数。
    wrapperProps: {
      style: {
        width: '100%',
        height: totalHeight - offsetTop,
        marginTop: offsetTop
      }
    }
  };
};

export default useVirtualList;
