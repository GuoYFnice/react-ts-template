import React from 'react';
import { Size, useSize } from 'Utils/CustomHooks/Observer/useSize';

const ResizeObserver: React.FunctionComponent = (): JSX.Element => {
  const dom: HTMLElement | null = document.querySelector('body');
  const size: Size = useSize(dom);
  return (
    <div>
      <h1>Binding element size.</h1>
      Try to resize window. <br />
      Width: {size.width} px, Height: {size.height} px.
    </div>
  );
};

export default ResizeObserver;
