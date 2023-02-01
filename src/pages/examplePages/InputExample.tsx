import React, { useState, useRef } from 'react';
import {
  InputLayout,
  InputDefault,
  InputDropdown,
  InputSearch,
  InputWithIcon,
} from '@components/atoms/input';
import { Divider, Icon } from 'semantic-ui-react';

const InputExample = () => {
  // Input1
  const [inputError1, setInputError1] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const inputRef1 = useRef();

  // Input2
  const [inputError2, setInputError2] = useState(false);
  const [inputValue2, setInputValue2] = useState('');
  const [inputLoading2, setInputLoading2] = useState(false);
  const inputRef2 = useRef();

  return (
    <div>
      <InputLayout
        error={inputError1}
        errorMsg="올바르지 않은 글자가 포함되어 있습니다11"
        stretch={true}
        inputLabel="InputDefault 예시"
        inputLabelSize={'h3'}
        showInputLabel={true}
        autoFitErrorLabel={true}
        spacing={20}
      >
        <InputDefault
          key="key"
          id="title"
          stretch={true}
          placeholder="제목"
          ref={inputRef1}
          onChange={(obj: { value: string }) => {
            setInputValue1(obj.value);
            setInputError1(obj.value.includes('z'));
            console.log('inputRef1 ref is');
            console.log(inputRef1.current);
          }}
          value={inputValue1}
        />
      </InputLayout>
      <Divider />
      <InputLayout
        error={inputError2}
        errorMsg="올바르지 않은 글자가 포함되어 있습니다22"
        stretch={false}
        inputLabel="InputWithIcon 예시"
        inputLabelSize={'h3'}
        showInputLabel={true}
        autoFitErrorLabel={true}
        spacing={10}
      >
        <InputWithIcon
          id="inputId"
          ref={inputRef2}
          placeholder="아이디를 입력해주세요 (이메일)"
          value={inputValue2}
          size="mini"
          onChange={(obj: { value: string }) => {
            setInputValue2(obj.value);
            setInputError2(obj.value.includes('z'));
          }}
          inputIcon={<Icon name="user" />}
          onEnter={() => {
            setInputLoading2(true);
            setTimeout(() => {
              setInputLoading2(false);
            }, 3000);
          }}
          loading={inputLoading2}
          iconPosition="left"
          iconClick={() => console.log('icon clicked')}
        />
      </InputLayout>
    </div>
  );
};

export default InputExample;
