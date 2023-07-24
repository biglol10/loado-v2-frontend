import LOSTARK_API from '@consts/api';
import BaseService from '@services/BaseService';
import { itemNameArr } from '@consts/itemNameMatch';
import dayjs from 'dayjs';

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

const getPeriodYearMonthItemPrice = async (itemId: string, year: number, month: number) => {
  const res = await BaseService.get('/api/loadoPrice/getPeriodYearMonthMarketItemPrice', {
    itemId,
    year,
    month,
  });

  return res;
};

const findNearestTime = () => {
  const data = ['00:00', '06:00', '12:00', '18:00'];

  const currentTime = dayjs();

  const nearestTime = data.reduce(
    (nearest, time) => {
      const timeDate = dayjs(`1970-01-01T${time}:00`);
      const timeDifference = Math.abs(timeDate.diff(currentTime));

      if (timeDifference < nearest.diff) {
        return { time, diff: timeDifference };
      }
      return nearest;
    },
    { time: '', diff: Infinity },
  );

  return nearestTime.time;
};

const getMarketPriceByCategoryCode = async (categoryCode: string) => {
  const nearestTime = findNearestTime();
  const res = await BaseService.get(`/api/loadoPrice/getMarketPriceByCategoryCode`, {
    categoryCode,
    timeValue: dayjs().format(`YYYY-MM-DD`),
  });

  return res;
};

export {
  getSingleItemPrice,
  getAllItemPrice,
  getPeriodYearMonthItemPrice,
  getMarketPriceByCategoryCode,
};
