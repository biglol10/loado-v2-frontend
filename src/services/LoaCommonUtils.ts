/* eslint-disable no-debugger */
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
  count: number;
  artisanEnergy: number;
  isFullSoom: boolean;
  bookProb?: number;
  refineTarget: number;
  isIncreaseProb: boolean;
  memoryArr?: any[];
};

const refineSimulation: any = ({
  defaultProb,
  startProb,
  count,
  artisanEnergy,
  isFullSoom,
  bookProb = 0,
  refineTarget,
  isIncreaseProb,
  memoryArr = [],
}: refineSimulationType) => {
  const successProb =
    defaultProb +
    (count - 1 > 10 ? defaultProb : ((count - 1) * defaultProb) / 10) +
    bookProb +
    (isFullSoom ? defaultProb : 0);

  const isSuccess = isRefineSuccessFunction(successProb);
  const newArtisanEnergyNotFullSoom = Number((successProb - defaultProb) / 2.15);
  const newArtisanEnergyFullSoom = Number(successProb / 2.15);

  // debugger;

  memoryArr.push({
    startProb,
    count,
    artisanEnergy,
    isFullSoom,
    bookProb,
    refineTarget,
    isIncreaseProb,
  });

  if (isSuccess) {
    return {
      count,
      lastRefineFullSoom: true,
      memoryArr,
    };
  }

  if (artisanEnergy + newArtisanEnergyNotFullSoom >= 100) {
    return {
      count: count + 1,
      lastRefineFullSoom: false,
      memoryArr,
    };
  }

  if (artisanEnergy + newArtisanEnergyFullSoom >= 100) {
    return {
      count: count + 1,
      lastRefineFullSoom: true,
      memoryArr,
    };
  }

  // if (Number(newArtisanEnergyFullSoom.toFixed(2)) >= 100) return count;

  return refineSimulation({
    defaultProb,
    count: count + 1,
    startProb: successProb,
    // artisanEnergy: artisanEnergy + Math.floor((successProb / 2.15) * 100) / 100,
    artisanEnergy: artisanEnergy + newArtisanEnergyFullSoom,
    isFullSoom,
    refineTarget,
    isIncreaseProb,
    bookProb,
    memoryArr,
  });
};

export { returnFullSoomValues, isRefineSuccessFunction, refineSimulation };
