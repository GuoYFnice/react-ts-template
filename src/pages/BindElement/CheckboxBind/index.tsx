import React from 'react';
import useCheckboxBind from 'Utils/CustomHooks/Bind/useCheckboxBind';
import { Button, Checkbox, Col, Row } from 'antd';
import styles from './index.module.scss';

const list = [1, 2, 3, 4, 5, 6, 7, 8];

const CheckboxBind: React.FunctionComponent = (): JSX.Element => {
  const { selected, allSelected, isSelected, toggle, reverse, toggleAll, partiallySelected } = useCheckboxBind(list, [
    1
  ]);
  return (
    <div>
      <h1>Binding functional checkbox.</h1>
      <div>Selected: {selected.join(',')}</div>
      <div className={styles.checkFuncWrapper}>
        <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
          check all
        </Checkbox>
        <Button type='primary' danger onClick={reverse}>
          reverse
        </Button>
      </div>
      <Row className={styles.checkItemsWrapper}>
        {list.map(o => (
          <Col span={12} key={o}>
            <Checkbox checked={isSelected(o)} onClick={() => toggle(o)}>
              {o}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CheckboxBind;
