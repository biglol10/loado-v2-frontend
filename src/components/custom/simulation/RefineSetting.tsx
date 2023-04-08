import React, { useEffect, useMemo, useState } from 'react';
import { RefineSettingDiv } from '@pageStyled/SimulationStyled';
import {
  Image,
  CheckboxDefault,
  FullSoomBookAvailable,
  ProbabilityValues,
  Button,
} from '@components/index';
import { Icon as SemanticIcon, Dropdown, Label, Image as SemanticImage } from 'semantic-ui-react';
import { loaImages, loaImagesType } from '@consts/imgSrc';
import { requiredRefineMaterials } from '@consts/requiredRefineMaterials';
import { refineSimulation, returnFullSoomValues } from '@services/LoaCommonUtils';
import { StyledDiv } from '@consts/appStyled';
import { toast } from 'react-toastify';

const option1KeyMatch = {
  아브노말: 'AbrelNormal',
  아브하드: 'AbrelHard',
  일리아칸: 'Illiakan',
};

const option2KeyMatch = {
  무기: 'weapon',
  방어구: 'armour',
};

const refineItemKeyMatch = {
  weaponStone1: '파괴강석',
  armourStone1: '수호강석',
  leapstone1: '경명돌',
  fusionMaterial1: '상급오레하',
  weaponStone2: '정제된파괴강석',
  armourStone2: '정제된수호강석',
  leapstone2: '찬명돌',
  fusionMaterial2: '최상급오레하',
  honorShard: '명예의파편',
  gold: '골드2',
};

type TRefineItemKeyMatch = keyof typeof refineItemKeyMatch;

export interface ISimulationResult {
  defaultPropb: Number;
  tryCnt: Number;
  startProb: Number;
  artisanEnergy: Number;
  isFullSoom: Boolean;
  isIncreaseProb: Boolean;
  refineTarget: Number;
  bookProb: Number;
  memoryArr: {
    successProb: Number;
    artisanEnergy: Number | String;
    tryCnt: Number;
    startProb: Number;
  }[];
  isFullCount: Boolean;
  lastRefine: Boolean;
}

const RefineSetting = ({
  selectOptionParam,
  setSelectOptionParam,
  setSimulationResult,
  updateRefineMaterialsMatch,
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
  setSimulationResult: React.Dispatch<React.SetStateAction<ISimulationResult[]>>;
  updateRefineMaterialsMatch: Function;
}) => {
  const [refineCurrent, setRefineCurrent] = useState('12');
  const [simulationBtnDisabled, setSimulationBtnDisabled] = useState(false);

  const [refineOverallSetting, setRefineOverallSetting] = useState<{
    applyFullSoom: boolean;
    applyBook: boolean;
    honingSuccessRate: number | string;
    honingSuccessRateManual: number | string;
    artisanEnergy: number | string;
  }>({
    applyFullSoom: false,
    applyBook: false,
    honingSuccessRate: 0,
    honingSuccessRateManual: 0,
    artisanEnergy: 0,
  });

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
      (_, i) => {
        return {
          key: `refineTargetKey_${i}`,
          value: `${12 + i}`,
          text: `${12 + i} 단계`,
        };
      },
    );

    return arr;
  }, [selectOptionParam.option1]);

  const refineMaterialsMatch = useMemo(() => {
    const itemRank = option1KeyMatch[selectOptionParam.option1 as keyof typeof option1KeyMatch];
    const weaponOrArmour =
      option2KeyMatch[selectOptionParam.option2 as keyof typeof option2KeyMatch];
    const materialRank = itemRank.includes('Abrel') ? '1' : '2';

    const refineNumber =
      itemRank.includes('AbrelNormal') && refineCurrent > '20' ? '20' : refineCurrent;
    const extracted =
      requiredRefineMaterials[itemRank][weaponOrArmour][`${weaponOrArmour}${refineNumber}`];

    const returnedObj = {
      weaponOrArmour,
      mat1: extracted[`${weaponOrArmour}Stone${materialRank}`],
      mat1Img:
        loaImages[
          refineItemKeyMatch[
            `${weaponOrArmour}Stone${materialRank}` as TRefineItemKeyMatch
          ] as loaImagesType
        ],
      mat2: extracted[`leapstone${materialRank}`],
      mat2Img:
        loaImages[
          refineItemKeyMatch[`leapstone${materialRank}` as TRefineItemKeyMatch] as loaImagesType
        ],
      mat3: extracted[`fusionMaterial${materialRank}`],
      mat3Img: loaImages[refineItemKeyMatch[`fusionMaterial${materialRank}`] as loaImagesType],
      ...extracted,
      ...returnFullSoomValues(Number(refineCurrent)),
    };

    if (itemRank.includes('AbrelNormal') && refineCurrent > '20') setRefineCurrent('20');

    console.log('returnedObj is');
    console.log(returnedObj);

    return returnedObj;
  }, [refineCurrent, selectOptionParam]);

  useEffect(() => {
    setRefineOverallSetting((prev) => ({
      ...prev,
      honingSuccessRate: refineMaterialsMatch.probability,
      honingSuccessRateManual: refineMaterialsMatch.probability,
      // artisanEnergy: 0,
    }));
  }, [refineMaterialsMatch]);

  useEffect(() => {
    updateRefineMaterialsMatch({ ...refineMaterialsMatch, ...refineOverallSetting });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refineMaterialsMatch, refineOverallSetting]);

  const refineSimulationStart = () => {
    const { applyFullSoom, artisanEnergy, honingSuccessRate, honingSuccessRateManual, applyBook } =
      refineOverallSetting;

    const errMsg: string[] = [];

    if (honingSuccessRate === '' || honingSuccessRate >= 100 || honingSuccessRate <= 0)
      errMsg.push('최종확률에 올바른 값을 입력해주세요');
    if (artisanEnergy === '' || artisanEnergy >= 100 || artisanEnergy < 0)
      errMsg.push('장인의 기운 수치에 올바른 값을 입력해주세요');

    if (errMsg.length > 0) {
      const MspComponent = () => (
        <>
          {errMsg.map((line, index) => (
            <p key={index} style={{ color: 'tomato' }}>
              {line}
            </p>
          ))}
        </>
      );

      toast.error(<MspComponent />, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });

      return null;
    }

    const arr: ISimulationResult[] = [];

    // const result = refineSimulation({
    //   defaultProb: Number(honingSuccessRate),
    //   tryCnt: 1,
    //   startProb: Number(honingSuccessRateManual),
    //   artisanEnergy: 0,
    //   isFullSoom: applyFullSoom,
    //   isIncreaseProb: true,
    //   refineTarget: refineCurrent,
    //   bookProb: applyBook ? refineMaterialsMatch?.bookProb?.probability : 0,
    //   memoryArr: [],
    // });

    // arr.push(result);

    setSimulationBtnDisabled(true);

    for (let index = 0; index < 5000; index++) {
      const result = refineSimulation({
        defaultProb: Number(honingSuccessRate),
        tryCnt: 1,
        startProb: Number(honingSuccessRateManual),
        artisanEnergy: Number(artisanEnergy),
        isFullSoom: applyFullSoom,
        isIncreaseProb: true,
        refineTarget: refineCurrent,
        bookProb: applyBook ? refineMaterialsMatch?.bookProb?.probability : 0,
        memoryArr: [],
      });

      arr.push(result);
    }

    setSimulationBtnDisabled(false);

    console.log('simulationResult is');
    console.log(arr);

    setSimulationResult(arr);
  };

  return (
    <RefineSettingDiv>
      <div style={{ minWidth: '600px' }}>
        <StyledDiv display="flex">
          <StyledDiv>
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
              onChange={(_, data) => {
                setSelectOptionParam((prev) => {
                  return {
                    ...prev,
                    option1: data.value as string,
                  };
                });
              }}
            />
          </StyledDiv>
          <StyledDiv marginLeft="30px">
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
              onChange={(_, data) => {
                setSelectOptionParam((prev) => {
                  return {
                    ...prev,
                    option2: data.value as string,
                  };
                });
              }}
            />
          </StyledDiv>
          <StyledDiv marginLeft="30px">
            <Label
              basic={false}
              content="재련단계"
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
              onChange={(_, data) => {
                setRefineCurrent(`${data.value}`);
              }}
              scrolling
            />
          </StyledDiv>
          <StyledDiv marginLeft="30px">
            <Label
              basic={false}
              content="성공확률"
              iconOrImage="icon"
              icon={<SemanticIcon name="dot circle outline" />}
              color="black"
              borderNone
              size="medium"
            />
            <br />
            <StyledDiv marginTop="15px" fontSize="1.1rem" fontWeight={'bold'} color="#f8cd02">
              {refineMaterialsMatch.probability}%
            </StyledDiv>
          </StyledDiv>
        </StyledDiv>
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
            <StyledDiv display="flex">
              <Label color="black" style={{ fontSize: '1rem' }}>
                <SemanticImage
                  avatar
                  spaced="right"
                  src={refineMaterialsMatch.mat1Img}
                  size="big"
                />
                {refineMaterialsMatch.mat1.toLocaleString()}
              </Label>
              <Label color="black" style={{ fontSize: '1rem' }}>
                <SemanticImage
                  avatar
                  spaced="right"
                  src={refineMaterialsMatch.mat2Img}
                  size="big"
                />
                {refineMaterialsMatch.mat2}
              </Label>
              <Label color="black" style={{ fontSize: '1rem' }}>
                <SemanticImage
                  avatar
                  spaced="right"
                  src={refineMaterialsMatch.mat3Img}
                  size="big"
                />
                {refineMaterialsMatch.mat3}
              </Label>
            </StyledDiv>
            <StyledDiv display="flex" marginTop="5px">
              <Label color="black" style={{ fontSize: '1rem' }}>
                <SemanticImage avatar spaced="right" src={loaImages['명예의파편']} size="big" />
                {refineMaterialsMatch.honorShard.toLocaleString()}
              </Label>
              <Label color="black" style={{ fontSize: '1rem' }}>
                <SemanticImage
                  avatar
                  spaced="right"
                  src={'./assets/images/items/goldImage.webp'}
                  size="big"
                />
                {refineMaterialsMatch.gold.toLocaleString()}
              </Label>
            </StyledDiv>
          </div>
        </div>
      </div>
      <div>
        <StyledDiv display="flex" flexDirection="column">
          <div>
            <Label
              basic={false}
              content="재련설정"
              iconOrImage="icon"
              icon={<SemanticIcon name="dot circle outline" />}
              color="black"
              borderNone
              size="medium"
            />
          </div>
          <StyledDiv display="flex">
            <CheckboxDefault
              id="CheckboxDefault_ID"
              spacing={7}
              label={'풀숨적용'}
              checked={refineOverallSetting.applyFullSoom}
              onClick={({ isChecked }) => {
                setRefineOverallSetting((prev) => ({
                  ...prev,
                  applyFullSoom: isChecked,
                }));
              }}
            />
            <CheckboxDefault
              id="CheckboxDefault_ID2"
              spacing={7}
              label={selectOptionParam.option2 === '무기' ? '야금술적용' : '재봉술적용'}
              checked={refineOverallSetting.applyBook}
              onClick={({ isChecked }) => {
                setRefineOverallSetting((prev) => ({
                  ...prev,
                  applyBook: isChecked,
                }));
              }}
              disabled={!refineMaterialsMatch.bookProb}
            />

            <FullSoomBookAvailable
              sun1Count={refineMaterialsMatch['태양의은총']}
              sun2Count={refineMaterialsMatch['태양의축복']}
              sun3Count={refineMaterialsMatch['태양의가호']}
              bookValue={refineMaterialsMatch.bookProb || null}
            />
          </StyledDiv>
          <ProbabilityValues
            refineOverallSetting={refineOverallSetting}
            setRefineOverallSetting={setRefineOverallSetting}
          />
          <br />
          <StyledDiv display="grid" gridTemplateColumns="repeat(4, 1fr)">
            <StyledDiv paddingRight="10px">
              <Button
                buttonType="none"
                color="google plus"
                content="시뮬레이션 시작"
                loading={false}
                onClick={refineSimulationStart}
                disabled={simulationBtnDisabled}
              />
            </StyledDiv>
            <StyledDiv paddingRight="10px">
              <Button color="red" content="시뮬레이션 시작" loading={false} />
            </StyledDiv>
          </StyledDiv>

          <br />
        </StyledDiv>
      </div>
    </RefineSettingDiv>
  );
};

export default RefineSetting;
