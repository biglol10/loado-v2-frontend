/* eslint-disable no-await-in-loop */
import { useState, useEffect, useMemo } from 'react';
import BaseService from '@services/BaseService';
import axios from 'axios';
import styled from 'styled-components';
import LOSTARK_API from '@consts/api';
import { MainTable } from '@components/atoms/table/index';
import { ITableData } from '@components/atoms/table/Types';
import { Column } from 'react-table';

const TopTab = styled.div`
  .tab-list {
    display: flex;
    width: ${localStorage.getItem('deviceType') === 'mobile' ? '100%' : '500px'};
    list-style: none;
    margin: 0;
    padding: 0;
    background: #343540;
  }

  .tab-item {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }

  .tab-item.active {
    background: #717c87;
  }

  .tab-link {
    display: block;
    padding: 0.5em 0;
    text-decoration: none;
    font-size: 1.1rem;
    color: white;
  }
`;

const ItemPricePage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'book' | 'material' | 'mylist'>('all');

  useEffect(() => {
    const fetchData = async () => {
      // for (let index = 0; index < 140; index++) {
      //   const res = await BaseService.request({
      //     method: 'post',
      //     url: LOSTARK_API.auction,
      //     data: {
      //       ItemLevelMin: 0,
      //       ItemLevelMax: 1700,
      //       ItemGradeQuality: 0,
      //       Sort: 'CURRENT_MIN_PRICE',
      //       CategoryCode: 210000,
      //       ItemTier: 3,
      //       ItemGrade: '유물',
      //       ItemName: '10레벨 멸화의 보석',
      //       PageNo: 1,
      //       SortCondition: 'ASC',
      //     },
      //   });

      //   console.log('res in useEffect is');
      //   console.log(res);
      // }

      const res = await BaseService.request({
        method: 'post',
        url: LOSTARK_API.auction,
        data: {
          ItemLevelMin: 0,
          ItemLevelMax: 1700,
          ItemGradeQuality: 0,
          Sort: 'CURRENT_MIN_PRICE',
          CategoryCode: 210000,
          ItemTier: 3,
          ItemGrade: '유물',
          ItemName: '10레벨 멸화의 보석',
          PageNo: 1,
          SortCondition: 'ASC',
        },
      });

      console.log('res in useEffect is');
      console.log(res);
    };

    const fetchData2 = async () => {
      const axiosResult = await axios({
        url: 'https://developer-lostark.game.onstove.com/markets/items',
        method: 'post',
        data: {
          Sort: 'CURRENT_MIN_PRICE',
          CategoryCode: 50000,
          CharacterClass: '창술사',
          ItemTier: 0,
          ItemName: '강석',
          PageNo: 1,
          SortCondition: 'DESC',
        },
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_SMILEGATE_TOKEN}`,
        },
      });

      console.log('axiosResult is');
      console.log(axiosResult);
    };

    fetchData();
  }, []);

  const data: ITableData[] = useMemo(
    () => [
      {
        id: 1,
        name: '각인서명',
        averagePrice: 500,
        recentPrice: 500,
        lowestPrice: 500,
        getMarketPrice: 'icon',
        bookmark: 'icon',
      },
      {
        id: 2,
        name: '각인서명',
        averagePrice: 500,
        recentPrice: 500,
        lowestPrice: 500,
        getMarketPrice: 'icon',
        bookmark: 'icon',
      },
      {
        id: 3,
        name: '각인서명',
        averagePrice: 500,
        recentPrice: 500,
        lowestPrice: 500,
        getMarketPrice: 'icon',
        bookmark: 'icon',
      },
    ],
    [],
  );

  const data2: ITableData[] = useMemo(
    () => [
      {
        id: 1,
        name: '아바타',
        lowestPrice: 500,
        getMarketPrice: 'icon',
        bookmark: 'icon',
      },
      {
        id: 2,
        name: '아바타',
        lowestPrice: 500,
        getMarketPrice: 'icon',
        bookmark: 'icon',
      },
      {
        id: 3,
        name: '아바타',
        lowestPrice: 500,
        getMarketPrice: 'icon',
        bookmark: 'icon',
      },
    ],
    [],
  );

  const columns: string[] = useMemo(
    () => ['각인서명', '전일 평균 거래가', '최근 거래가', '최저가', '시세조회', '관심등록'],
    [],
  );

  const columns2: string[] = useMemo(() => ['각인서명', '최저가', '시세조회', '관심등록'], []);

  return (
    <>
      {/* <div>asdf</div> */}
      <TopTab>
        <ul className="tab-list">
          <li
            className={`tab-item ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span className="tab-link">전체</span>
          </li>
          <li
            className={`tab-item ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => setActiveTab('book')}
          >
            <span className="tab-link">각인서</span>
          </li>
          <li
            className={`tab-item ${activeTab === 'material' ? 'active' : ''}`}
            onClick={() => setActiveTab('material')}
          >
            <span className="tab-link">재련재료</span>
          </li>
          <li
            className={`tab-item ${activeTab === 'mylist' ? 'active' : ''}`}
            onClick={() => setActiveTab('mylist')}
          >
            <span className="tab-link">내 관심</span>
          </li>
        </ul>
      </TopTab>
      <MainTable data={data} columns={columns} />
      <MainTable data={data} columns={columns} />
      <MainTable data={data2} columns={columns2} />
    </>
  );
};

export default ItemPricePage;
