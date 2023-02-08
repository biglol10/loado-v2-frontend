const itemBaseFolder = './assets/images/items';
const commBaseFolder = './assets/images/common';

const imgSrc = Object.freeze({
  '10레벨멸화': `${itemBaseFolder}/10LevelDamage.webp`,
  '10레벨홍염': `${itemBaseFolder}/10LevelCoolDown.webp`,
  '9레벨멸화': `${itemBaseFolder}/9LevelDamage.webp`,
  '9레벨홍염': `${itemBaseFolder}/9LevelCoolDown.webp`,
  '8레벨멸화': `${itemBaseFolder}/8LevelDamage.webp`,
  '8레벨홍염': `${itemBaseFolder}/8LevelCoolDown.webp`,
  '7레벨멸화': `${itemBaseFolder}/7LevelDamage.webp`,
  '7레벨홍염': `${itemBaseFolder}/7LevelCoolDown.webp`,
  경명돌: `${itemBaseFolder}/경명돌.webp`,
  명돌: `${itemBaseFolder}/명돌.webp`,
  명예의파편: `${itemBaseFolder}/명예의파편.webp`,
  상급오레하: `${itemBaseFolder}/상급오레하.webp`,
  수호강석: `${itemBaseFolder}/수호강석.webp`,
  수호결정석: `${itemBaseFolder}/수호결정석.webp`,
  야금술기본: `${itemBaseFolder}/야금술기본.webp`,
  야금술숙련: `${itemBaseFolder}/야금술숙련.webp`,
  야금술심화: `${itemBaseFolder}/야금술심화.webp`,
  야금술응용: `${itemBaseFolder}/야금술응용.webp`,
  야금술특화: `${itemBaseFolder}/야금술특화.webp`,
  위명돌: `${itemBaseFolder}/위명돌.webp`,
  재봉술기본: `${itemBaseFolder}/재봉술기본.webp`,
  재봉술숙련: `${itemBaseFolder}/재봉술숙련.webp`,
  재봉술심화: `${itemBaseFolder}/재봉술심화.webp`,
  재봉술응용: `${itemBaseFolder}/재봉술응용.webp`,
  재봉술특화: `${itemBaseFolder}/재봉술특화.webp`,
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
  에스더의기운: `${itemBaseFolder}/esder.webp`,
  골드배경X: `${itemBaseFolder}/goldImage_noBackground.webp`,
  골드: `${itemBaseFolder}/goldImage.webp`,
  골드2: `${itemBaseFolder}/골드2.webp`,
  전설각인서: `${itemBaseFolder}/legendBook.webp`,
  전설각인서배경X: `${itemBaseFolder}/legendBook2.webp`,
});

const commImg = Object.freeze({
  graphIcon: `${commBaseFolder}/graphIcon.png`,
});

const loaImages = {
  ...imgSrc,
  ...commImg,
};

export default loaImages;
