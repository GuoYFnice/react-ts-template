import { useState, ChangeEvent } from 'react';

/**
 * ? 将输入框的值进行动态绑定。
 * @param { String } initialValue 输入框初始值。
 * @return { String } value 输入框绑定值。
 * @return { Function } onChange 监听输入框输入改变的函数。
 * @return { Object }
 */
const useInputBind = (initialValue: string | number) => {
  const [value, setValue] = useState(initialValue || '');
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
  return { value, onChange };
};

export default useInputBind;
