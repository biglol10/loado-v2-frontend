import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckboxDefault from './CheckboxDefault';
import { ICheckboxListDefault } from './Types';

const HorizontalListDiv = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  padding: 5px;
`;

const VerticalListDiv = styled.div`
  // display: flex;
  align-items: center;
  width: max-content;
  padding: 5px;
`;

const CheckboxListDefault = ({
  id = '',
  size = 'small',
  labelPosition = 'top',
  direction = 'horizontal',
  onChange = null,
  items = [
    { id: '1', disabled: false, checked: false, label: '풀숨' },
    { id: '2', disabled: false, checked: false, label: '재봉술/야금술' },
    { id: '3', disabled: false, checked: false, label: 'test3' },
    { id: '4', disabled: false, checked: false, label: 'test4' },
  ],
  fontColor = 'black',
  spacing = 0,
}: ICheckboxListDefault) => {
  const [itemList, setItemList] = useState(items);

  useEffect(() => {
    onChange && onChange({ itemList });
  }, [onChange, itemList]);

  const onChangeFn = useCallback((e: any) => {
    setItemList((prevList) =>
      prevList.map((item) => {
        if (item.id === e.id) {
          item.checked = e.isChecked;
        }
        return item;
      }),
    );
  }, []);

  const checkboxList = itemList.map((item) => (
    <CheckboxDefault
      key={item.id}
      id={item.id}
      size={size}
      labelPosition={labelPosition}
      label={item.label}
      checked={item.checked}
      onClick={onChangeFn}
      fontColor={fontColor}
    />
  ));

  return (
    <>
      <HorizontalListDiv>
        {direction === 'horizontal' && <HorizontalListDiv>{checkboxList}</HorizontalListDiv>}
        {direction === 'vertical' && <VerticalListDiv>{checkboxList}</VerticalListDiv>}
      </HorizontalListDiv>
    </>
  );
};

CheckboxListDefault.displayName = 'CheckboxListDefault';

export default CheckboxListDefault;
