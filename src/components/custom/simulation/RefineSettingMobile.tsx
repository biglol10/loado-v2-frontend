import React, { useEffect, useMemo, useState } from 'react';
import { RefineSettingDiv } from '@pageStyled/SimulationStyled';
import { CheckboxDefault, Button, InputLayout, InputWithIcon } from '@components/index';
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
import styled from 'styled-components';
import { TargetRefineOption } from '@pages/Simulation';
import { ItemGradeType, ItemType } from '@consts/interfaces';
import {
  RefineItemKeyMatchType,
  RefineOverallSettingType,
  StringNumberMapping,
  refineItemKeyMatch,
  simulationNumberOptions,
  weaponAndArmourSetType,
  weaponOrArmour,
} from './RefineSetting';
import { PercentIcon } from './RefineSettingCustom/ProbabilityValues';

const MarginTopLabel = styled(Label)`
  margin-top: 5px !important;
`;

const materialRankMapping: StringNumberMapping = {
  유물: 1,
  고대: 1,
  상위고대: 2,
};

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

const RefineSetting = ({
  targetRefineOption,
  setTargetRefineOption,
  setSimulationResult,
  updateRefineMaterialsMatch,
  simulationCount,
  setSimulationCount,
}: {
  targetRefineOption: TargetRefineOption;
  setTargetRefineOption: React.Dispatch<React.SetStateAction<TargetRefineOption>>;
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
    mokokoSupport: false,
  });
  const deviceType = useDeviceType();

  useEffect(() => {
    console.log(
      `refineOverallSetting.additionalProbability is ${refineOverallSetting.additionalProbability}`,
    );
  }, [refineOverallSetting]);

  const imgSrc = {
    weapon: `${targetRefineOption.itemGrade}무기`,
    armour: `${targetRefineOption.itemGrade}방어구`,
    weapon2: `${targetRefineOption.itemGrade}무기2`,
    armour2: `${targetRefineOption.itemGrade}방어구2`,
  };

  const dropdownOptions = useMemo(() => {
    const objValue = {
      itemGrade: [
        {
          key: '유물',
          text: '유물',
          value: '유물',
        },
        {
          key: '고대',
          text: '고대',
          value: '고대',
        },
        {
          key: '상위고대',
          text: '상위고대',
          value: '상위고대',
        },
      ],
      itemType: [
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
      { length: 14 - (targetRefineOption.itemGrade === '유물' ? 5 : 0) },
      (_, i) => {
        return {
          key: `refineTargetKey_${i}`,
          value: `${12 + i}`,
          text: `${12 + i} 단계`,
        };
      },
    );

    return arr;
  }, [targetRefineOption.itemGrade]);

  const refineMaterialsMatch = useMemo(() => {
    const itemSetType =
      weaponAndArmourSetType[targetRefineOption.itemGrade as keyof typeof weaponAndArmourSetType];
    const weaponOrArmourValue =
      weaponOrArmour[targetRefineOption.itemType as keyof typeof weaponOrArmour];
    const materialRank = materialRankMapping[itemSetType];

    const refineNumber =
      itemSetType.includes('유물') && refineCurrent > '20' ? '20' : refineCurrent;
    const requiredRefineMaterialsForOneSimulation =
      requiredRefineMaterials[itemSetType][weaponOrArmourValue][
        `${weaponOrArmourValue}${refineNumber}`
      ];

    const weaponOrArmourStoneKey = `${weaponOrArmourValue}Stone${materialRank}`;

    const isKeyExistInSimulationValue = (key: string) => {
      return Object.hasOwn(requiredRefineMaterialsForOneSimulation, key);
    };

    const { mokokoSupport } = refineOverallSetting;

    // Steel -> 강석, leapStone -> 돌파석, fusionMaterial -> 오레하
    const returnedObj = {
      weaponOrArmour: weaponOrArmourValue,
      requiredSteelCount:
        requiredRefineMaterialsForOneSimulation[
          `${
            weaponOrArmourStoneKey +
            (mokokoSupport && isKeyExistInSimulationValue(`${weaponOrArmourStoneKey}GrowthSupport`)
              ? 'GrowthSupport'
              : '')
          }`
        ],
      requiredSteelImg:
        loaImages[
          refineItemKeyMatch[`${weaponOrArmourStoneKey}` as RefineItemKeyMatchType] as loaImagesType
        ],
      requiredLeapStoneCount:
        requiredRefineMaterialsForOneSimulation[
          `leapstone${materialRank}${
            mokokoSupport && isKeyExistInSimulationValue(`leapstone${materialRank}GrowthSupport`)
              ? 'GrowthSupport'
              : ''
          }`
        ],
      requiredLeapStoneImg:
        loaImages[
          refineItemKeyMatch[`leapstone${materialRank}` as RefineItemKeyMatchType] as loaImagesType
        ],
      requiredFusionMaterialCount:
        requiredRefineMaterialsForOneSimulation[
          `fusionMaterial${materialRank}${
            mokokoSupport &&
            isKeyExistInSimulationValue(`fusionMaterial${materialRank}GrowthSupport`)
              ? 'GrowthSupport'
              : ''
          }`
        ],
      requiredHonorShard:
        requiredRefineMaterialsForOneSimulation[
          `honorShard${
            mokokoSupport && isKeyExistInSimulationValue(`honorShardGrowthSupport`)
              ? 'GrowthSupport'
              : ''
          }`
        ],
      requiredGold:
        requiredRefineMaterialsForOneSimulation[
          `gold${
            mokokoSupport && isKeyExistInSimulationValue(`goldGrowthSupport`) ? 'GrowthSupport' : ''
          }`
        ],
      requiredFusionMaterialImg:
        loaImages[refineItemKeyMatch[`fusionMaterial${materialRank}`] as loaImagesType],
      ...requiredRefineMaterialsForOneSimulation,
      ...returnFullSoomValues(Number(refineCurrent)),
    };

    if (itemSetType.includes('유물') && refineCurrent > '20') setRefineCurrent('20');

    return returnedObj;
  }, [refineCurrent, targetRefineOption, refineOverallSetting.mokokoSupport]);

  useEffect(() => {
    setRefineOverallSetting((prev) => ({
      ...prev,
      honingSuccessRate: refineMaterialsMatch.probability,
      honingSuccessRateManual: refineMaterialsMatch.probability,
      additionalProbability: refineMaterialsMatch.additionalProbability,
      // artisanEnergy: 0,
    }));
  }, [refineMaterialsMatch]);

  useEffect(() => {
    updateRefineMaterialsMatch({ ...refineMaterialsMatch, ...refineOverallSetting });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refineMaterialsMatch, refineOverallSetting]);

  const refineSimulationStart = () => {
    const {
      applyFullSoom,
      artisanEnergy,
      honingSuccessRate,
      honingSuccessRateManual,
      applyBook,
      mokokoSupport,
      additionalProbability,
    } = refineOverallSetting;

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
        additionalProbability:
          mokokoSupport && additionalProbability ? Number(additionalProbability) : 0,
        artisanEnergy: Number(artisanEnergy),
        isFullSoom: applyFullSoom,
        isIncreaseProb: true,
        refineTarget: refineCurrent,
        bookProb: applyBook ? refineMaterialsMatch?.bookProb?.probability : 0,
        isMokokoSupport: mokokoSupport && additionalProbability,
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
          value={targetRefineOption.itemGrade}
          compact
          options={dropdownOptions.itemGrade}
          onChange={(_, data) => {
            setTargetRefineOption((prev) => {
              return {
                ...prev,
                itemGrade: data.value as ItemGradeType,
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
          value={targetRefineOption.itemType}
          compact
          options={dropdownOptions.itemType}
          style={{ marginTop: '15px' }}
          onChange={(_, data) => {
            setTargetRefineOption((prev) => {
              return {
                ...prev,
                itemType: data.value as ItemType,
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
          {refineMaterialsMatch.requiredHonorShard.toLocaleString()}
        </MarginTopLabel>
        <MarginTopLabel color="black">
          <SemanticImage
            avatar
            spaced="right"
            src={'./assets/images/items/goldImage.webp'}
            size="big"
          />
          {refineMaterialsMatch.requiredGold.toLocaleString()}
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
          label={targetRefineOption.itemType === '무기' ? '야금술적용' : '재봉술적용'}
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
          label={'슈모익'}
          checked={refineOverallSetting.mokokoSupport}
          onClick={({ isChecked }) => {
            setRefineOverallSetting((prev) => ({
              ...prev,
              mokokoSupport: isChecked,
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
          inputLabel={'제련확률'}
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
              setRefineOverallSetting((prev) => ({
                ...prev,
                honingSuccessRateManual: value,
              }));
            }}
            inputIcon={<PercentIcon />}
            type="number"
          />
        </ProbAndRefine>
        <ProbAndRefine
          inputLabel={'추가확률'}
          inputLabelSize={'h6'}
          stretch={false}
          showInputLabel={true}
          spacing={8}
          inputWidth="80%"
        >
          <InputWithIcon
            value={`${
              refineOverallSetting.mokokoSupport ? refineOverallSetting.additionalProbability : '0'
            }`}
            fluid={false}
            size={'mini'}
            onChange={(value) => {
              setRefineOverallSetting((prev) => ({
                ...prev,
                additionalProbability: value,
              }));
            }}
            inputIcon={<PercentIcon />}
            type="number"
            disabled
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
            value={`${refineOverallSetting.artisanEnergy}`}
            fluid={false}
            size={'mini'}
            onChange={(value) => {
              setRefineOverallSetting((prev) => ({
                ...prev,
                artisanEnergy: value,
              }));
            }}
            inputIcon={<PercentIcon />}
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
