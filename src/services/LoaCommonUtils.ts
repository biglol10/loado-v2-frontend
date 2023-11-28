import store from '@state/store';
import BaseService from './BaseService';

const returnFullSoomValues = (refineNumber: number) => {
  if (refineNumber >= 12 && refineNumber <= 13) {
    return {
      태양의은총: 24,
      태양의축복: 12,
      태양의가호: 4,
    };
  } else if (refineNumber >= 14 && refineNumber <= 19) {
    return {
      태양의은총: 36,
      태양의축복: 18,
      태양의가호: 6,
    };
  } else if (refineNumber >= 20 && refineNumber <= 25) {
    return {
      태양의은총: 48,
      태양의축복: 24,
      태양의가호: 8,
    };
  } else {
    return {
      태양의은총: 0,
      태양의축복: 0,
      태양의가호: 0,
    };
  }
};

const getRandomNumberWithDecimal = () => {
  return parseFloat((Math.random() * 100).toFixed(1));
};

const isRefineSuccessFunction = (successProb: number) => {
  const acceptedRate = 100 - successProb;
  const generateProb = getRandomNumberWithDecimal();

  if (generateProb >= acceptedRate) {
    return true;
  }
  return false;
};

type refineSimulationType = {
  defaultProb: number;
  startProb: number;
  additionalProbability: number;
  tryCnt: number;
  artisanEnergy: number;
  isFullSoom: boolean;
  bookProb?: number;
  refineTarget: number;
  isIncreaseProb: boolean;
  isKamenRoad: boolean;
  memoryArr?: any[];
};

const refineSimulation: any = ({
  defaultProb,
  startProb,
  additionalProbability = 0,
  tryCnt,
  artisanEnergy,
  isFullSoom,
  bookProb = 0,
  refineTarget,
  isIncreaseProb,
  isKamenRoad,
  memoryArr = [],
}: refineSimulationType) => {
  const maxProb =
    Number(defaultProb) * 2 +
    Number(bookProb) +
    Number(
      isFullSoom && refineTarget > 23 ? 1 : isFullSoom && refineTarget <= 23 ? defaultProb : 0,
    );

  const successProb = (() => {
    if (startProb > maxProb + additionalProbability) return startProb;

    const defaultProbValue = Number(defaultProb);
    const tryCntValue = Number(tryCnt - 1 > 10 ? defaultProb : ((tryCnt - 1) * defaultProb) / 10);
    const bookProbValue = Number(bookProb);
    const fullSoomValue = Number(
      isFullSoom && refineTarget > 23 ? 1 : isFullSoom && refineTarget <= 23 ? defaultProb : 0,
    );

    return defaultProbValue + tryCntValue + bookProbValue + fullSoomValue + additionalProbability;
  })();

  const isSuccess = isRefineSuccessFunction(successProb);
  // const newArtisanEnergyNotFullSoom = Number((successProb - defaultProb) / 2.15);
  // const newArtisanEnergyFullSoom = Number(successProb / 2.15);
  const addArtisanEnergy = Number(successProb / 2.15) * (isKamenRoad ? 2 : 1);

  memoryArr.push({
    successProb,
    artisanEnergy: artisanEnergy.toFixed(2),
    tryCnt,
    startProb,
  });

  if (isSuccess) {
    return {
      tryCnt,
      lastRefine: false,
      memoryArr,
      isFullCount: false,
      isFullSoom,
    };
  }

  if (artisanEnergy + addArtisanEnergy >= 100) {
    memoryArr.push({
      successProb,
      artisanEnergy: '100.00',
      tryCnt: tryCnt + 1,
      startProb,
    });
    // console.log(memoryArr);

    return {
      tryCnt: tryCnt + 1,
      lastRefine: true,
      memoryArr,
      isFullCount: true,
      isFullSoom,
    };
  }

  return refineSimulation({
    defaultProb,
    tryCnt: tryCnt + 1,
    startProb: successProb,
    // artisanEnergy: artisanEnergy + Math.floor((successProb / 2.15) * 100) / 100,
    artisanEnergy: artisanEnergy + addArtisanEnergy,
    isFullSoom,
    refineTarget,
    isIncreaseProb,
    bookProb,
    isKamenRoad,
    additionalProbability,
    memoryArr,
  });
};

const sendUserLogs = () => {
  try {
    const { userAppId, visitedPages, userRequests } = store.getState().appCommon;

    BaseService.request({
      method: 'post',
      url: '/api/loadoCommon/userlog',
      data: {
        userAppId,
        visitedPages,
        userRequests,
      },
    });
  } catch {}
};

export { returnFullSoomValues, isRefineSuccessFunction, refineSimulation, sendUserLogs };
