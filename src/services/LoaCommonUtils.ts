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

export { returnFullSoomValues };
