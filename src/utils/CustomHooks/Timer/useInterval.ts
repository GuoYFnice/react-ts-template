import { useEffect, useRef } from 'react';

/**
 * ? 使用 Interval 封装的计时器。
 * @param { Function } fn 需要重复调用的函数。
 * @param { Number } delay 间隔时间，值为 null、undefined 会停止计时。
 * @param { Boolean } immediate 控制是否在首次渲染时立即执行定时器。
 */
const useInterval = (
  fn: () => void,
  delay: number | null | undefined,
  options?: {
    immediate?: boolean;
  }
): void => {
  const immediate = options?.immediate;
  const fnRef = useRef<() => void>();
  fnRef.current = fn;
  useEffect(() => {
    if (delay === undefined || delay === null) return;
    if (immediate) {
      if (fnRef.current) {
        fnRef.current();
      }
    }
    const timer = setInterval(() => {
      if (fnRef.current) {
        fnRef.current();
      }
    }, delay);
    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(timer);
    };
  }, [immediate, delay]);
};

export default useInterval;
