import React, { useState, useRef } from 'react';
import {
  InputLayout,
  InputDefault,
  InputDropdown,
  InputSearch,
  InputWithIcon,
  Box,
  RadioButtonGroup,
} from '@components/index';
import { Divider, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import { loaImages } from '@consts/imgSrc';
import { RootState } from 'src/state/store';
import { increment, decrement } from '@state/counterSlice';
import useModal from '@hooks/ModalHooks';
import { useSelector, useDispatch } from 'react-redux';

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
  console.log(`process.env value is ${process.env}`);
  console.log(process.env);
  // console.log(`process.env value is ${process.env.isDevelopment}`);

  // InputDefault
  const [inputError1, setInputError1] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const inputRef1 = useRef<{ inputElement: Input | undefined; clear: () => void }>();

  // InputWithIcon
  const [inputError2, setInputError2] = useState(false);
  const [inputValue2, setInputValue2] = useState('');
  const [inputLoading2, setInputLoading2] = useState(false);
  const inputRef2 = useRef<any>();

  // InputDropdown
  const initialDropdownValue = 'angular';
  const [inputError3, setInputError3] = useState(false);
  const [inputValue3, setInputValue3] = useState<string | string[]>(['angular']); // if multiple false -> string, else string[]
  const [inputLoading3, setInputLoading3] = useState(false);
  const inputRef3 = useRef<any>();

  // InputWithIcon
  const [inputError4, setInputError4] = useState(false);
  const [inputValue4, setInputValue4] = useState('');
  const [inputLoading4, setInputLoading4] = useState(false);
  const inputRef4 = useRef();

  const { showModal } = useModal();
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState('option1');

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
          stretch={false}
          placeholder="제목"
          ref={inputRef1}
          onChange={(obj: { value: string }) => {
            setInputValue1(obj.value);
            setInputError1(obj.value.includes('z'));
            console.log('inputRef1 ref is');
            console.log(inputRef1.current);
            console.log(`inputValue1 is ${obj.value}`);
          }}
          value={inputValue1}
        />
      </InputLayout>
      <button
        onClick={async () => {
          console.log(inputRef3.current);
          const response = await axios.get(
            'https://api.unsplash.com/photos/?client_id=nPi0KjYC9WlzsVd4nVdQ5v5OZqJnpUr6nQvj1_pj2Lg',
          );

          console.log(response);
          inputRef3?.current?.clear();
        }}
      >
        clear input1 using ref
      </button>
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
        onClick={() => alert('ASDF')}
      >
        <div>This is the Content for Box</div>
      </Box>
      <Divider />
      <img src={loaImages['멸화10']} />
      <div>
        <h1>Counter: {counter}</h1>
        <button onClick={() => dispatch(increment(1))}>Increment</button>
        <button onClick={() => dispatch(decrement(1))}>Decrement</button>
        <button onClick={() => showModal({ modalContent: <div>asdf</div>, modalSize: 'large' })}>
          open modal
        </button>
      </div>
      <RadioButtonGroup
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        selectedValue={selectedValue}
        onChange={(value: any) => setSelectedValue(value)}
      />
    </div>
  );
};

export default InputExample;
