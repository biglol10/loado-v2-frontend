import React, { useState, useRef } from 'react';
import {
  InputLayout,
  InputDefault,
  InputDropdown,
  InputSearch,
  InputWithIcon,
  Box,
} from '@components/atoms';
import { Divider, Icon } from 'semantic-ui-react';

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
];

const InputExample = () => {
  // InputDefault
  const [inputError1, setInputError1] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const inputRef1 = useRef();

  // InputWithIcon
  const [inputError2, setInputError2] = useState(false);
  const [inputValue2, setInputValue2] = useState('');
  const [inputLoading2, setInputLoading2] = useState(false);
  const inputRef2 = useRef();

  // InputDropdown
  const initialDropdownValue = 'angular';
  const [inputError3, setInputError3] = useState(false);
  const [inputValue3, setInputValue3] = useState<string | string[]>(['angular']); // if multiple false -> string, else string[]
  const [inputLoading3, setInputLoading3] = useState(false);
  const inputRef3 = useRef();

  // InputWithIcon
  const [inputError4, setInputError4] = useState(false);
  const [inputValue4, setInputValue4] = useState('');
  const [inputLoading4, setInputLoading4] = useState(false);
  const inputRef4 = useRef();

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
          id="InputDefault1"
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
          id="InputWithIcon1"
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
      <Divider />
      <InputLayout
        error={inputError3}
        errorMsg="올바르지 않은 옵션이 포함되어 있습니다22"
        stretch={false}
        inputLabel="InputWithIcon 예시"
        inputLabelSize={'h3'}
        showInputLabel={true}
        autoFitErrorLabel={true}
        spacing={10}
      >
        <InputDropdown
          id="inputDropdown"
          placeholder="선택해주세요"
          ref={inputRef3}
          value={inputValue3}
          options={options}
          onChange={(obj: { value: string | Array<string> }) => {
            console.log(obj.value);
            setInputValue3(obj.value);
          }}
          keyboardInput={false}
          multiple={true}
          loading={false}
        />
      </InputLayout>
      <Divider />
      <Box
        id="sampleBoxId"
        spacing={32}
        boxType="primary"
        textAlign="center"
        className=""
        onClick={() => null}
      >
        <div>This is the Content for Box</div>
      </Box>
    </div>
  );
};

export default InputExample;
