import { useState, ChangeEvent } from 'react';

export interface Result {
  value: string | number;
  onChange: (arg: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * ? 将输入框的值进行动态绑定。
 * @param { String } initialValue 输入框初始值。
 * @return { String } value 输入框绑定值。
 * @return { Function } onChange 监听输入框输入改变的函数。
 * @return { Object }
 */
const useInputBind = (initialValue: string | number): Result => {
  const [value, setValue] = useState<string | number>(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};

export default useInputBind;
