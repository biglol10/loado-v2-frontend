import React, { useEffect, useMemo, useState } from 'react';
import { RefineSettingDiv } from '@pageStyled/SimulationStyled';
import {
  Image,
  CheckboxDefault,
  FullSoomBookAvailable,
  ProbabilityValues,
  Button,
} from '@components/index';
import {
  Icon as SemanticIcon,
  Dropdown,
  Label,
  Image as SemanticImage,
  Button as SemanticButton,
} from 'semantic-ui-react';
import { loaImages, loaImagesType } from '@consts/imgSrc';
import { requiredRefineMaterials } from '@consts/requiredRefineMaterials';
import { refineSimulation, returnFullSoomValues } from '@services/LoaCommonUtils';
import { StyledDiv } from '@consts/appStyled';
import { toast } from 'react-toastify';
import useDeviceType from '@hooks/DeviceTypeHook';

interface StringNumberMapping {
  [key: string]: number;
}

interface StringStringMapping {
  [key: string]: string;
}

const weaponAndArmourSetType = {
  아브노말: 'AbrelNormal',
  아브하드: 'AbrelHard',
  일리아칸: 'Illiakan',
};

const weaponOrArmour = {
  무기: 'weapon',
  방어구: 'armour',
};

const materialRankMapping: StringNumberMapping = {
  AbrelNormal: 1,
  AbrelHard: 1,
  Illiakan: 2,
};

const refineItemKeyMatch: StringStringMapping = {
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

type RefineItemKeyMatchType = keyof typeof refineItemKeyMatch;

export interface ISimulationResult {
  defaultPropb: number;
  tryCnt: number;
  startProb: number;
  artisanEnergy: number;
  isFullSoom: Boolean;
  isIncreaseProb: Boolean;
  refineTarget: number;
  bookProb: number;
  memoryArr: {
    successProb: number;
    artisanEnergy: number | String;
    tryCnt: number;
    startProb: number;
  }[];
  isFullCount: Boolean;
  lastRefine: Boolean;
}

const simulationNumberOptions = [
  { key: 'simulation_1000', text: '1000회', value: '1000' },
  { key: 'simulation_5000', text: '5000회', value: '5000' },
  { key: 'simulation_10000', text: '10000회', value: '10000' },
];

const RefineSetting = ({
  selectOptionParam,
  setSelectOptionParam,
  setSimulationResult,
  updateRefineMaterialsMatch,
  simulationCount,
  setSimulationCount,
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
  simulationCount: string;
  setSimulationCount: React.Dispatch<React.SetStateAction<string>>;
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
  const deviceType = useDeviceType();

  const imgSrc = {
    weapon: `${selectOptionParam.option1}무기`,
    armour: `${selectOptionParam.option1}방어구`,
    weapon2: `${selectOptionParam.option1}무기2`,
    armour2: `${selectOptionParam.option1}방어구2`,
  };

  useEffect(() => {
    console.log(refineOverallSetting);
  }, [refineOverallSetting]);

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
    const itemSetType =
      weaponAndArmourSetType[selectOptionParam.option1 as keyof typeof weaponAndArmourSetType];
    const weaponOrArmourValue =
      weaponOrArmour[selectOptionParam.option2 as keyof typeof weaponOrArmour];
    const materialRank = materialRankMapping[itemSetType];

    const refineNumber =
      itemSetType.includes('AbrelNormal') && refineCurrent > '20' ? '20' : refineCurrent;
    const requiredRefineMaterialsForOneSimulation =
      requiredRefineMaterials[itemSetType][weaponOrArmourValue][
        `${weaponOrArmourValue}${refineNumber}`
      ];

    // Steel -> 강석, leapStone -> 돌파석, fusionMaterial -> 오레하
    const returnedObj = {
      weaponOrArmour: weaponOrArmourValue,
      requiredSteelCount:
        requiredRefineMaterialsForOneSimulation[`${weaponOrArmourValue}Stone${materialRank}`],
      requiredSteelImg:
        loaImages[
          refineItemKeyMatch[
            `${weaponOrArmourValue}Stone${materialRank}` as RefineItemKeyMatchType
          ] as loaImagesType
        ],
      requiredLeapStoneCount: requiredRefineMaterialsForOneSimulation[`leapstone${materialRank}`],
      requiredLeapStoneImg:
        loaImages[
          refineItemKeyMatch[`leapstone${materialRank}` as RefineItemKeyMatchType] as loaImagesType
        ],
      requiredFusionMaterialCount:
        requiredRefineMaterialsForOneSimulation[`fusionMaterial${materialRank}`],
      requiredFusionMaterialImg:
        loaImages[refineItemKeyMatch[`fusionMaterial${materialRank}`] as loaImagesType],
      ...requiredRefineMaterialsForOneSimulation,
      ...returnFullSoomValues(Number(refineCurrent)),
    };

    if (itemSetType.includes('AbrelNormal') && refineCurrent > '20') setRefineCurrent('20');

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

    if (
      honingSuccessRate === '' ||
      Number(honingSuccessRate) >= 100 ||
      Number(honingSuccessRate) <= 0
    )
      errMsg.push('최종확률에 올바른 값을 입력해주세요');
    if (artisanEnergy === '' || Number(artisanEnergy) >= 100 || Number(artisanEnergy) < 0)
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

    setSimulationBtnDisabled(true);

    for (let index = 0; index < Number(simulationCount); index++) {
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
    setSimulationResult(arr);
  };

  return (
    <RefineSettingDiv isMobile={deviceType === 'mobile'}>
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
                  src={refineMaterialsMatch.requiredSteelImg}
                  size="big"
                />
                {refineMaterialsMatch.requiredSteelCount.toLocaleString()}
              </Label>
              <Label color="black" style={{ fontSize: '1rem' }}>
                <SemanticImage
                  avatar
                  spaced="right"
                  src={refineMaterialsMatch.requiredLeapStoneImg}
                  size="big"
                />
                {refineMaterialsMatch.requiredLeapStoneCount}
              </Label>
              <Label color="black" style={{ fontSize: '1rem' }}>
                <SemanticImage
                  avatar
                  spaced="right"
                  src={refineMaterialsMatch.requiredFusionMaterialImg}
                  size="big"
                />
                {refineMaterialsMatch.requiredFusionMaterialCount}
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
              <SemanticButton.Group color="blue" size="mini">
                <SemanticButton>{simulationCount}회</SemanticButton>
                <Dropdown
                  className="button icon"
                  floating
                  options={simulationNumberOptions}
                  trigger={<></>}
                  value={simulationCount}
                  onChange={(_, data) => {
                    setSimulationCount(data.value as string);
                  }}
                />
              </SemanticButton.Group>
            </StyledDiv>
          </StyledDiv>

          <br />
        </StyledDiv>
      </div>
    </RefineSettingDiv>
  );
};

export default RefineSetting;
