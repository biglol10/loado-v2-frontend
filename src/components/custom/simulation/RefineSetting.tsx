import React, { useMemo, useState } from 'react';
import { RefineSettingDiv } from '@pageStyled/SimulationStyled';
import { Image } from '@components/index';
import {
  Icon as SemanticIcon,
  Dropdown,
  Button,
  Icon,
  Label,
  Image as SemanticImage,
} from 'semantic-ui-react';
import { loaImages, loaImagesType } from '@consts/imgSrc';
import styled from 'styled-components';

// const refineTargetOption = Array.from({ length: 14 }, (v, i) => {
//   return {
//     key: `refineTargetKey_${i}`,
//     value: `${12 + i}`,
//     text: `${12 + i} 단계`,
//   };
// });

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
  const imgSrc = {
    weapon: `${selectOptionParam.option1}무기`,
    armour: `${selectOptionParam.option1}방어구`,
    weapon2: `${selectOptionParam.option1}무기2`,
    armour2: `${selectOptionParam.option1}방어구2`,
  };

  const dropdownOptions = useMemo(() => {
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
            src: `${loaImages[imgSrc.weapon2 as loaImagesType]}`,
          },
        },
        {
          key: '방어구',
          text: '방어구',
          value: '방어구',
          image: {
            avatar: true,
            src: `${loaImages[imgSrc.armour2 as loaImagesType]}`,
          },
        },
      ],
    };

    return objValue;
  }, [imgSrc.armour2, imgSrc.weapon2]);

  const refineTargetOption = useMemo(() => {
    const arr = Array.from(
      { length: 14 - (selectOptionParam.option1 === '아브노말' ? 5 : 0) },
      (v, i) => {
        return {
          key: `refineTargetKey_${i}`,
          value: `${12 + i}`,
          text: `${12 + i} 단계`,
        };
      },
    );

    return arr;
  }, [selectOptionParam.option1]);

  const [refineCurrent, setRefineCurrent] = useState('12');

  return (
    <RefineSettingDiv>
      <div style={{ display: 'flex' }}>
        <div>
          <Label
            basic={false}
            content="장비단계"
            iconOrImage="icon"
            icon={<SemanticIcon name="dot circle outline" />}
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
            icon={<SemanticIcon name="dot circle outline" />}
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
        <div style={{ marginLeft: '30px' }}>
          <Label
            basic={false}
            content="제련단계"
            iconOrImage="icon"
            icon={<SemanticIcon name="dot circle outline" />}
            color="black"
            borderNone
            size="medium"
          />
          <br />
          <Dropdown
            value={`${refineCurrent}`}
            compact
            options={refineTargetOption}
            style={{ marginTop: '15px' }}
            onChange={(e, data) => {
              setRefineCurrent(`${data.value}`);
            }}
            scrolling
          />
        </div>
      </div>
      <br />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        <Image
          src={
            loaImages[
              imgSrc[selectOptionParam.option2 === '무기' ? 'weapon' : 'armour'] as loaImagesType
            ]
          }
          imageSize="small"
          type="image"
        />

        <div>
          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3 className="noMarginBottom" style={{ marginRight: '15px' }}>
              제련 단계:{' '}
            </h3>
            <Button.Group color="black">
              <Button>{refineCurrent} 단계</Button>
              <Dropdown
                className="button icon"
                floating
                options={refineTargetOption}
                trigger={<></>}
                scrolling
                onChange={(e, data) => {
                  setRefineCurrent(`${data.value}`);
                }}
              />
            </Button.Group>
          </div> */}
          <div style={{ display: 'flex' }}>
            <Label color="black" style={{ fontSize: '1rem' }}>
              <SemanticImage avatar spaced="right" src={loaImages['파괴강석']} size="big" />
              Elliot
            </Label>
            <Label color="black" style={{ fontSize: '1rem' }}>
              <SemanticImage avatar spaced="right" src={loaImages['파괴강석']} size="big" />
              Elliot
            </Label>
            <Label color="black" style={{ fontSize: '1rem' }}>
              <SemanticImage avatar spaced="right" src={loaImages['파괴강석']} size="big" />
              Elliot
            </Label>
          </div>
          {/* <div style={{ display: 'flex' }}>
            <Label color="black" style={{ fontSize: '1rem' }}>
              <SemanticImage avatar spaced="right" src={loaImages['파괴강석']} size="big" />
              Elliot
            </Label>
            <Label color="black" style={{ fontSize: '1rem' }}>
              <SemanticImage avatar spaced="right" src={loaImages['파괴강석']} size="big" />
              Elliot
            </Label>
            <Label color="black" style={{ fontSize: '1rem' }}>
              <SemanticImage avatar spaced="right" src={loaImages['파괴강석']} size="big" />
              Elliot
            </Label>
          </div> */}
        </div>
      </div>
    </RefineSettingDiv>
  );
};

export default RefineSetting;
