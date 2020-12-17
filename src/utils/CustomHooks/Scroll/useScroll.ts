import { useEffect, useState } from 'react';
import usePersistFn, { noop } from '../toolHooks/usePersistFn';
import { BasicTarget, getTargetElement } from '../../Tools/getTargetElement';

interface Position {
  left: number;
  top: number;
}

type Target = BasicTarget<HTMLElement | Document>;
type ScrollListenController = (val: Position) => boolean;

/**
 * ? 获取元素的滚动位置。
 * @param target DOM 节点或者 Ref 对象。
 * @param shouldUpdate 控制是否更新滚动信息。
 * @result 滚动容器当前的滚动位置。
 */
const useScroll = (target?: Target, shouldUpdate: ScrollListenController = () => true): Position => {
  const [position, setPosition] = useState<Position>({
    left: Number.NaN,
    top: Number.NaN
  });
  const shouldUpdatePersist: noop = usePersistFn(shouldUpdate);
  useEffect(() => {
    const el = getTargetElement(target as HTMLElement, document);
    if (!el) return;
    const updatePosition = (currentTarget: Target): void => {
      let newPosition;
      if (currentTarget === document) {
        if (!document.scrollingElement) return;
        newPosition = {
          left: document.scrollingElement.scrollLeft,
          top: document.scrollingElement.scrollTop
        };
      } else {
        newPosition = {
          left: (currentTarget as HTMLElement).scrollLeft,
          top: (currentTarget as HTMLElement).scrollTop
        };
      }
      if (shouldUpdatePersist(newPosition)) {
        setPosition(newPosition);
      }
    };
    updatePosition(el as Target);
    const listener = (event: Event): void => {
      if (!event.target) return;
      updatePosition(event.target as Target);
    };
    el.addEventListener('scroll', listener, false);
    // eslint-disable-next-line consistent-return
    return () => {
      el.removeEventListener('scroll', listener, false);
    };
  }, [target, shouldUpdatePersist]);
  return position;
};

export default useScroll;
