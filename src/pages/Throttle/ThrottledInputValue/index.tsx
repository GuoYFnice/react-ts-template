import React, { useState } from 'react';
import useThrottle from 'Utils/CustomHooks/Debounce&Throttle/useThrottle';
import { Input } from 'antd';

const ThrottledInputValue = () => {
  const [value, setValue] = useState<number | string>();
  const throttledValue = useThrottle(value, { wait: 2000 });
  return (
    <div>
      <h1>Throttled input value:</h1>
      <Input type='text' placeholder='Typed value' value={value} onChange={e => setValue(e.target.value)} />
      <p>The input value changes every 2 seconds: {throttledValue}</p>
    </div>
  );
};

export default ThrottledInputValue;
