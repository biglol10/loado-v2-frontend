const BASE_PREFIX = '/lostark';

const LOSTARK_API = {
  market: `${BASE_PREFIX}/markets/items`,
  auction: `${BASE_PREFIX}/auctions/items`,
  userLog: `${BASE_PREFIX}/userlogs`,
};

export const LOADO_QUERYKEY = {
  REFINE_ITEM_PRICE: ['refineItemPrice'],
  ITEM_PRICE_TODAY: (code: string) => ['itemPriceToday', code],
  ITEM_PRICE_HISTORY: (itemId: string, year: number, month: number) => [
    'itemPriceHistory',
    itemId,
    year,
    month,
  ],
};

export default LOSTARK_API;
