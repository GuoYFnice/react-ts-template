import { Arbitrary } from 'Src/types/replaceAny';

type getDragPropsFn = (
  data: Arbitrary
) => {
  draggable: 'true';
  key: string;
  onDragStart: (event: React.DragEvent) => void;
  onDragEnd: (event: React.DragEvent) => void;
};

interface IConfig {
  onDragStart?: (data: Arbitrary, event: React.DragEvent) => void;
  onDragEnd?: (data: Arbitrary, event: React.DragEvent) => void;
}

/**
 * ? 在 HTML 节点上加入可拖动配置。
 * @return { String } key 给循环模板添加唯一的 key.
 * @return { String } draggable 元素是否可拖动。
 * @return { String } onDragStart 开始拖动调用 dataTransfer 进行设置。
 * @return { Object }
 */
const useDrag = (config?: IConfig): getDragPropsFn => {
  const getProps = (data: Arbitrary) => {
    // * 返回这些属性用于添加在可拖动元素的 DOM 上。
    return {
      key: JSON.stringify(data),
      draggable: 'true' as const,
      onDragStart: (event: React.DragEvent) => {
        // * 有外部传入配置则优先使用外部传入的。
        if (config && config.onDragStart) {
          config.onDragStart(data, event);
        }
        event.dataTransfer.setData('custom', JSON.stringify(data));
      },
      onDragEnd: (event: React.DragEvent) => {
        if (config && config.onDragEnd) {
          config.onDragEnd(data, event);
        }
      }
    };
  };
  return getProps;
};

export default useDrag;
