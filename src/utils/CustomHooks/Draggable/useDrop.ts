import { useMemo, useState, useRef, useCallback } from 'react';
import { Arbitrary } from 'Src/types/replaceAny';

interface DropAreaState {
  isHovering: boolean;
}

interface DropProps {
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  onPaste: React.ClipboardEventHandler;
}

export interface DropAreaOptions {
  onFiles?: (files: File[], event?: React.DragEvent) => void;
  onUri?: (url: string, event?: React.DragEvent) => void;
  onDom?: (content: Arbitrary, event?: React.DragEvent) => void;
  onText?: (text: string, event?: React.ClipboardEvent) => void;
}

/**
 * ? 鼠标拖动或者键盘粘贴的一些回调操作。
 * @param { Function } callback 调用组件中传入的回调函数。
 * @param { Function } setIsHovering 更改元素是否处于拖拽中并且光标是否处于释放区域内的标志变量。
 */
const getProps = (
  callback: (dataTransfer: DataTransfer, event: React.DragEvent | React.ClipboardEvent) => void,
  setIsHovering: (over: boolean) => void
): DropProps => ({
  onDragOver: (event: React.DragEvent) => {
    event.preventDefault();
  },
  onDragEnter: (event: React.DragEvent) => {
    event.preventDefault();
    setIsHovering(true);
  },
  onDragLeave: () => {
    setIsHovering(false);
  },
  onDrop: (event: React.DragEvent) => {
    event.preventDefault();
    event.persist();
    setIsHovering(false);
    callback(event.dataTransfer, event);
  },
  onPaste: (event: React.ClipboardEvent) => {
    event.persist();
    callback(event.clipboardData, event);
  }
});

/**
 * ? 一系列判断拖动的事件。
 * @param { Object } options 接收调用组件传递的自定义拖动函数。
 * @return { Array } 拖动操作的函数。
 */
const useDrop = (options: DropAreaOptions = {}): [DropProps, DropAreaState] => {
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const callback = useCallback((dataTransfer: DataTransfer, event: React.DragEvent | React.ClipboardEvent) => {
    const uri = dataTransfer.getData('text/uri-list');
    const dom = dataTransfer.getData('custom');
    if (dom && optionsRef.current.onDom) {
      let data = dom;
      try {
        data = JSON.parse(dom);
      } catch {
        data = dom;
      }
      optionsRef.current.onDom(data, event as React.DragEvent);
      return;
    }
    if (uri && optionsRef.current.onUri) {
      optionsRef.current.onUri(uri, event as React.DragEvent);
      return;
    }
    if (dataTransfer.files && dataTransfer.files.length > 0 && optionsRef.current.onFiles) {
      optionsRef.current.onFiles([...dataTransfer.files], event as React.DragEvent);
      return;
    }
    if (dataTransfer.items && dataTransfer.items.length > 0 && optionsRef.current.onText) {
      dataTransfer.items[0].getAsString(text => {
        if (optionsRef.current.onText) {
          optionsRef.current.onText(text, event as React.ClipboardEvent);
        }
      });
    }
  }, []);
  const props: DropProps = useMemo(() => getProps(callback, setIsHovering), [callback, setIsHovering]);

  return [props, { isHovering }];
};

export default useDrop;
