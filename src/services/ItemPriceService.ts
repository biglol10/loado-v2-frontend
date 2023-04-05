import LOSTARK_API from '@consts/api';
import BaseService from '@services/BaseService';
import { itemNameArr } from '@consts/itemNameMatch';

const getSingleItemPrice = async (item: string) => {
  const res = await BaseService.request({
    method: 'post',
    url: LOSTARK_API.market,
    data: {
      Sort: 'CURRENT_MIN_PRICE',
      CategoryCode: 50000,
      ItemTier: 0,
      ItemName: item,
      PageNo: 1,
      SortCondition: 'DESC',
    },
  });

  if (res.Items.length > 1) {
    const filteredRes = { ...res.Items.filter((anItem: any) => anItem.Name === item)[0] };

    return filteredRes;
  }

  return { ...res.Items[0] };
};

const getAllItemPrice = async () => {
  const res = await BaseService.request({
    method: 'post',
    url: '/api/loadoPrice/currentMarketItemPrice',
    data: {
      itemList: itemNameArr,
    },
  });

  return res;
};

export { getSingleItemPrice, getAllItemPrice };
