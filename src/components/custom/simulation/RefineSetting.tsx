import React, { useMemo } from 'react';
import { RefineSettingDiv } from '@pageStyled/SimulationStyled';
import { Label } from '@components/atoms/label';
import { Icon as SemanticIcon, Dropdown } from 'semantic-ui-react';
import { loaImages } from '@consts/imgSrc';

const RefineSetting = ({
  selectOptionParam,
  setSelectOptionParam,
}: {
  selectOptionParam: {
    option1: string;
    option2: string;
  };
  setSelectOptionParam: React.Dispatch<
    React.SetStateAction<{
      option1: string;
      option2: string;
    }>
  >;
}) => {
  const dropdownOptions = useMemo(() => {
    const imgSrc = {
      weapon: `${selectOptionParam.option1}무기2` as any,
      armour: `${selectOptionParam.option1}방어구2` as any,
    };

    const objValue = {
      option1: [
        {
          key: '아브노말',
          text: '아브노말',
          value: '아브노말',
        },
        {
          key: '아브하드',
          text: '아브하드',
          value: '아브하드',
        },
        {
          key: '일리아칸',
          text: '일리아칸',
          value: '일리아칸',
        },
      ],
      option2: [
        {
          key: '무기',
          text: '무기',
          value: '무기',
          image: {
            avatar: true,
            // src: `${loaImages[`${selectOptionParam.option1}`]}`,
            src: `${loaImages[imgSrc.weapon as keyof typeof loaImages]}`,
          },
        },
        {
          key: '방어구',
          text: '방어구',
          value: '방어구',
          image: {
            avatar: true,
            src: `${loaImages[imgSrc.armour as keyof typeof loaImages]}`,
          },
        },
      ],
    };

    return objValue;
  }, [selectOptionParam.option1]);

  return (
    <RefineSettingDiv>
      <div style={{ display: 'flex' }}>
        <div>
          <Label
            basic={false}
            content="장비단계"
            iconOrImage="icon"
            icon={<SemanticIcon name="tasks" />}
            color="black"
            borderNone
            size="medium"
          />
          <br />
          <Dropdown
            value={selectOptionParam.option1}
            compact
            options={dropdownOptions.option1}
            style={{ marginTop: '15px' }}
            onChange={(e, data) => {
              setSelectOptionParam((prev) => {
                return {
                  ...prev,
                  option1: data.value as string,
                };
              });
            }}
          />
        </div>
        <div style={{ marginLeft: '30px' }}>
          <Label
            basic={false}
            content="무기/방어구"
            iconOrImage="icon"
            icon={<SemanticIcon name="tasks" />}
            color="black"
            borderNone
            size="medium"
          />
          <br />
          <Dropdown
            value={selectOptionParam.option2}
            compact
            options={dropdownOptions.option2}
            style={{ marginTop: '15px' }}
            onChange={(e, data) => {
              setSelectOptionParam((prev) => {
                return {
                  ...prev,
                  option2: data.value as string,
                };
              });
            }}
          />
        </div>
      </div>
    </RefineSettingDiv>
  );
};

export default RefineSetting;
