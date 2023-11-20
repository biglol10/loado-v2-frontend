import React, { useEffect, useMemo, useState } from 'react';
import { RefineSettingDiv } from '@pageStyled/SimulationStyled';
import { CheckboxDefault, Button, InputLayout, InputWithIcon } from '@components/index';
import {
  Icon as SemanticIcon,
  Dropdown,
  Label,
  Image as SemanticImage,
  Button as SemanticButton,
  Icon,
} from 'semantic-ui-react';
import { loaImages, loaImagesType } from '@consts/imgSrc';
import { requiredRefineMaterials } from '@consts/requiredRefineMaterials';
import { refineSimulation, returnFullSoomValues } from '@services/LoaCommonUtils';
import { StyledDiv } from '@consts/appStyled';
import { toast } from 'react-toastify';
import useDeviceType from '@hooks/DeviceTypeHook';
import styled from 'styled-components';
import { RefineOverallSettingType } from './RefineSetting';

interface StringNumberMapping {
  [key: string]: number;
}

interface StringStringMapping {
  [key: string]: string;
}

const MarginTopLabel = styled(Label)`
  margin-top: 5px !important;
`;

const weaponAndArmourSetType = {
  아브노말: '유물',
  아브하드: '고대',
  일리아칸: '상위고대',
};

const weaponOrArmour = {
  무기: 'weapon',
  방어구: 'armour',
};

const materialRankMapping: StringNumberMapping = {
  유물: 1,
  고대: 1,
  상위고대: 2,
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

const ProbAndRefine = styled(InputLayout)`
  padding: 0px;
  width: 90%;
`;

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
  const [refineOverallSetting, setRefineOverallSetting] = useState<RefineOverallSettingType>({
    applyFullSoom: false,
    applyBook: false,
    honingSuccessRate: 0,
    honingSuccessRateManual: 0,
    artisanEnergy: 0,
    kamenRoad: false,
  });
  const deviceType = useDeviceType();

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
    const itemSetType =
      weaponAndArmourSetType[selectOptionParam.option1 as keyof typeof weaponAndArmourSetType];
    const weaponOrArmourValue =
      weaponOrArmour[selectOptionParam.option2 as keyof typeof weaponOrArmour];
    const materialRank = materialRankMapping[itemSetType];

    const refineNumber =
      itemSetType.includes('유물') && refineCurrent > '20' ? '20' : refineCurrent;
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
        loaImages[
          refineItemKeyMatch[
            `fusionMaterial${materialRank}` as RefineItemKeyMatchType
          ] as loaImagesType
        ],
      ...requiredRefineMaterialsForOneSimulation,
      ...returnFullSoomValues(Number(refineCurrent)),
    };

    if (itemSetType.includes('유물') && refineCurrent > '20') setRefineCurrent('20');

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
      <StyledDiv display="grid" gridTemplateColumns="2fr 1fr" alignItems="center">
        <Label
          basic={false}
          content="장비단계"
          iconOrImage="icon"
          icon={<SemanticIcon name="dot circle outline" />}
          color="black"
          borderNone
          size="medium"
          style={{ marginRight: '20px' }}
        />
        <Dropdown
          value={selectOptionParam.option1}
          compact
          options={dropdownOptions.option1}
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
      <StyledDiv display="grid" gridTemplateColumns="2fr 1fr" alignItems="center">
        <Label
          basic={false}
          content="무기/방어구"
          iconOrImage="icon"
          icon={<SemanticIcon name="dot circle outline" />}
          color="black"
          borderNone
          size="medium"
          style={{ marginRight: '20px' }}
        />
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
      <StyledDiv display="grid" gridTemplateColumns="2fr 1fr" alignItems="center">
        <Label
          basic={false}
          content="재련단계"
          iconOrImage="icon"
          icon={<SemanticIcon name="dot circle outline" />}
          color="black"
          borderNone
          size="medium"
          style={{ marginRight: '20px' }}
        />
        <Dropdown
          value={`${refineCurrent}`}
          compact
          options={refineTargetOption}
          onChange={(_, data) => {
            setRefineCurrent(`${data.value}`);
          }}
          scrolling
        />
      </StyledDiv>
      <StyledDiv display="grid" gridTemplateColumns="2fr 1fr" alignItems="center">
        <Label
          basic={false}
          content="성공확률"
          iconOrImage="icon"
          icon={<SemanticIcon name="dot circle outline" />}
          color="black"
          borderNone
          size="medium"
          style={{ marginRight: '20px' }}
        />
        <StyledDiv fontSize="1.1rem" fontWeight={'bold'} color="#f8cd02">
          {refineMaterialsMatch.probability}%
        </StyledDiv>
      </StyledDiv>
      <StyledDiv display="flex" flexWrap="wrap">
        <MarginTopLabel color="black">
          <SemanticImage
            avatar
            spaced="right"
            src={refineMaterialsMatch.requiredSteelImg}
            size="big"
          />
          {refineMaterialsMatch.requiredSteelCount.toLocaleString()}
        </MarginTopLabel>
        <MarginTopLabel color="black">
          <SemanticImage
            avatar
            spaced="right"
            src={refineMaterialsMatch.requiredLeapStoneImg}
            size="big"
          />
          {refineMaterialsMatch.requiredLeapStoneCount}
        </MarginTopLabel>
        <MarginTopLabel color="black">
          <SemanticImage
            avatar
            spaced="right"
            src={refineMaterialsMatch.requiredFusionMaterialImg}
            size="big"
          />
          {refineMaterialsMatch.requiredFusionMaterialCount}
        </MarginTopLabel>
        <MarginTopLabel color="black">
          <SemanticImage avatar spaced="right" src={loaImages['명예의파편']} size="big" />
          {refineMaterialsMatch.honorShard.toLocaleString()}
        </MarginTopLabel>
        <MarginTopLabel color="black">
          <SemanticImage
            avatar
            spaced="right"
            src={'./assets/images/items/goldImage.webp'}
            size="big"
          />
          {refineMaterialsMatch.gold.toLocaleString()}
        </MarginTopLabel>
      </StyledDiv>
      <Label
        basic={false}
        content="재련설정"
        iconOrImage="icon"
        icon={<SemanticIcon name="dot circle outline" />}
        color="black"
        borderNone
        size="medium"
        style={{ width: '100%', marginTop: '20px' }}
      />
      <StyledDiv display="grid" gridTemplateColumns="1fr 1fr">
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
        <CheckboxDefault
          id="CheckboxDefault_ID3"
          spacing={7}
          label={'카멘로드'}
          checked={refineOverallSetting.kamenRoad}
          onClick={({ isChecked }) => {
            setRefineOverallSetting((prev) => ({
              ...prev,
              kamenRoad: isChecked,
            }));
          }}
        />
      </StyledDiv>
      <StyledDiv display="flex" flexWrap="wrap">
        <MarginTopLabel color="black">
          <SemanticImage avatar spaced="right" src={loaImages['태양의은총']} size="small" />
          {refineMaterialsMatch['태양의은총']}
        </MarginTopLabel>
        <MarginTopLabel color="black">
          <SemanticImage avatar spaced="right" src={loaImages['태양의축복']} size="small" />
          {refineMaterialsMatch['태양의축복']}
        </MarginTopLabel>
        <MarginTopLabel color="black">
          <SemanticImage avatar spaced="right" src={loaImages['태양의가호']} size="small" />
          {refineMaterialsMatch['태양의가호']}
        </MarginTopLabel>
        {refineMaterialsMatch.bookProb && (
          <MarginTopLabel color="black">
            <SemanticImage
              avatar
              spaced="right"
              src={loaImages[refineMaterialsMatch.bookProb.bookType as keyof typeof loaImages]}
              size="small"
            />
            <span style={{ color: '#f8cd02' }}>{refineMaterialsMatch.bookProb.probability}%</span>
          </MarginTopLabel>
        )}
      </StyledDiv>
      <StyledDiv marginTop="20px" display="grid" gridTemplateColumns="1fr 1fr">
        <ProbAndRefine
          inputLabel={'최종확률'}
          inputLabelSize={'h6'}
          stretch={false}
          showInputLabel={true}
          spacing={8}
          inputWidth="80%"
        >
          <InputWithIcon
            value={`${refineOverallSetting.honingSuccessRate}`}
            fluid={false}
            size={'mini'}
            onChange={(value) => {
              setRefineOverallSetting((prev: any) => ({
                ...prev,
                honingSuccessRateManual: value,
              }));
            }}
            type="number"
          />
        </ProbAndRefine>
        <ProbAndRefine
          inputLabel={'장인의기운'}
          inputLabelSize={'h6'}
          stretch={false}
          showInputLabel={true}
          spacing={8}
          inputWidth="80%"
        >
          <InputWithIcon
            value={`${refineOverallSetting.honingSuccessRate}`}
            fluid={false}
            size={'mini'}
            onChange={(value) => {
              setRefineOverallSetting((prev: any) => ({
                ...prev,
                artisanEnergy: value,
              }));
            }}
            type="number"
          />
        </ProbAndRefine>
      </StyledDiv>
      <StyledDiv display="grid" gridTemplateColumns="2fr 1fr" marginTop="20px">
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
    </RefineSettingDiv>
  );
};

export default RefineSetting;
