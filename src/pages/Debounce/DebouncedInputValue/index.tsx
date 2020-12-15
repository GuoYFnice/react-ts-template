import React, { ChangeEvent, useState } from 'react';
import useDebounce from 'Utils/CustomHooks/Debounce&Throttle/useDebounce';
import { Input } from 'antd';

const DebouncedInputValue: React.FC = (): JSX.Element => {
  const [value, setValue] = useState<number | string>();
  const debouncedValue: ReturnType<typeof useDebounce> = useDebounce(value, { wait: 2000 });
  return (
    <div>
      <h1>Debounced input value:</h1>
      <Input
        type='text'
        placeholder='Typed value'
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      <p style={{ marginTop: 16 }}>Display the input value after 2 seconds: {debouncedValue}</p>
    </div>
  );
};

export default DebouncedInputValue;
