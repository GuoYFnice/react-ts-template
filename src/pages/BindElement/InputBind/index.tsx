import React from 'react';
import useInputBind from 'Utils/CustomHooks/Bind/useInputBind';
import { Input } from 'antd';

const InputBind: React.FunctionComponent = (): JSX.Element => {
  const inputProps = useInputBind('Binding input with custom-hook useInputBind');
  return (
    <div>
      <h1>Binding input.</h1>
      <p>Value: {inputProps.value}</p>
      <Input type='text' {...inputProps} />
    </div>
  );
};

export default InputBind;
