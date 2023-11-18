const itemBaseFolder = './assets/images/items';
const commBaseFolder = './assets/images/common';

const imgSrc = {
  멸화10: `${itemBaseFolder}/10LevelDamage.webp`,
  홍염10: `${itemBaseFolder}/10LevelCoolDown.webp`,
  멸화9: `${itemBaseFolder}/9LevelDamage.webp`,
  홍염9: `${itemBaseFolder}/9LevelCoolDown.webp`,
  멸화8: `${itemBaseFolder}/8LevelDamage.webp`,
  홍염8: `${itemBaseFolder}/8LevelCoolDown.webp`,
  멸화7: `${itemBaseFolder}/7LevelDamage.webp`,
  홍염7: `${itemBaseFolder}/7LevelCoolDown.webp`,
  경명돌: `${itemBaseFolder}/경명돌.webp`,
  골드: `${itemBaseFolder}/goldImage.webp`,
  골드2: `${itemBaseFolder}/goldImage2.PNG`,
  골드배경X: `${itemBaseFolder}/goldImage_noBackground.webp`,
  명돌: `${itemBaseFolder}/명돌.webp`,
  명예의파편: `${itemBaseFolder}/명예의파편.webp`,
  상급오레하: `${itemBaseFolder}/상급오레하.webp`,
  수호강석: `${itemBaseFolder}/수호강석.webp`,
  수호결정석: `${itemBaseFolder}/수호결정석.webp`,
  아브노말무기: `${itemBaseFolder}/아브노말무기.png`,
  아브노말무기2: `${itemBaseFolder}/아브노말무기2.png`,
  아브노말방어구: `${itemBaseFolder}/아브노말방어구.png`,
  아브노말방어구2: `${itemBaseFolder}/아브노말방어구2.png`,
  아브하드무기: `${itemBaseFolder}/아브하드무기.png`,
  아브하드무기2: `${itemBaseFolder}/아브하드무기2.png`,
  아브하드방어구: `${itemBaseFolder}/아브하드방어구.png`,
  아브하드방어구2: `${itemBaseFolder}/아브하드방어구2.png`,
  야금술기본: `${itemBaseFolder}/야금술기본.webp`,
  야금술숙련: `${itemBaseFolder}/야금술숙련.webp`,
  야금술심화: `${itemBaseFolder}/야금술심화.webp`,
  야금술응용: `${itemBaseFolder}/야금술응용.webp`,
  야금술특화: `${itemBaseFolder}/야금술특화.webp`,
  야금술전문: `${itemBaseFolder}/야금술전문.webp`,
  야금술복합: `${itemBaseFolder}/야금술복합.webp`,
  에스더의기운: `${itemBaseFolder}/esder.webp`,
  위명돌: `${itemBaseFolder}/위명돌.webp`,
  일리아칸무기: `${itemBaseFolder}/일리아칸무기.png`,
  일리아칸무기2: `${itemBaseFolder}/일리아칸무기2.png`,
  일리아칸방어구: `${itemBaseFolder}/일리아칸방어구.png`,
  일리아칸방어구2: `${itemBaseFolder}/일리아칸방어구2.png`,
  재봉술기본: `${itemBaseFolder}/재봉술기본.webp`,
  재봉술숙련: `${itemBaseFolder}/재봉술숙련.webp`,
  재봉술심화: `${itemBaseFolder}/재봉술심화.webp`,
  재봉술응용: `${itemBaseFolder}/재봉술응용.webp`,
  재봉술특화: `${itemBaseFolder}/재봉술특화.webp`,
  재봉술전문: `${itemBaseFolder}/재봉술전문.webp`,
  재봉술복합: `${itemBaseFolder}/재봉술복합.webp`,
  전설각인서: `${itemBaseFolder}/legendBook.webp`,
  전설각인서배경X: `${itemBaseFolder}/legendBook2.webp`,
  정제된수호강석: `${itemBaseFolder}/정제된수호강석.webp`,
  정제된파괴강석: `${itemBaseFolder}/정제된파괴강석.webp`,
  중급오레하: `${itemBaseFolder}/중급오레하.webp`,
  찬명돌: `${itemBaseFolder}/찬명돌.webp`,
  최상급오레하: `${itemBaseFolder}/최상급오레하.webp`,
  태양의가호: `${itemBaseFolder}/태양의가호.webp`,
  태양의은총: `${itemBaseFolder}/태양의은총.webp`,
  태양의축복: `${itemBaseFolder}/태양의축복.webp`,
  파괴강석: `${itemBaseFolder}/파괴강석.webp`,
  파괴결정석: `${itemBaseFolder}/파괴결정석.webp`,
  하급오레하: `${itemBaseFolder}/하급오레하.webp`,
  확률이미지: `${itemBaseFolder}/확률이미지.png`,
} as const;

const commImg = {
  graphIcon: `${commBaseFolder}/graphIcon.png`,
  loadoIcon: `${commBaseFolder}/loado_logo.png`,
} as const;

const loaImages = {
  ...imgSrc,
  ...commImg,
} as const;

export type loaImagesType = keyof typeof loaImages;

const loaImageNames = Object.keys(loaImages) as unknown as loaImagesType;

export { loaImageNames, loaImages };
