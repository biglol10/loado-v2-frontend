/* eslint-disable no-await-in-loop */
import { useState, useEffect, useMemo } from 'react';
import BaseService from '@services/BaseService';
import axios from 'axios';
import styled from 'styled-components';
import LOSTARK_API from '@consts/api';
import useDeviceType from '@hooks/DeviceTypeHook';
import { MainTable } from '@components/atoms/table/index';
import { ITableData } from '@components/atoms/table/Types';
import { IIsMobile } from '@consts/interfaces';

const TopTab = styled.div<IIsMobile>`
  .tab-list {
    display: flex;
    width: ${(props) => (props.isMobile ? '100%' : '500px')};
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

const TableWrapper = styled.div`
  display: inline;
`;

const ItemPricePage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'book' | 'material' | 'mylist'>('all');
  const [marketItems, setMarketItems] = useState([]);
  const deviceType = useDeviceType();

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        url: LOSTARK_API.market,
        method: 'post',
        data: {
          Sort: 'CURRENT_MIN_PRICE',
          CategoryCode: 40000,
          ItemTier: 0,
          ItemName: '각인서',
          ItemGrade: '전설',
          PageNo: 1,
          SortCondition: 'DESC',
        },
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_SMILEGATE_TOKEN}`,
        },
      })
        .then((res) => {
          setMarketItems(res.data.Items);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const data2: ITableData[] = useMemo(
    () => [
      {
        Id: 1,
        Name: '아바타',
        CurrentMinPrice: 500,
        Grade: 'icon',
        Icon: 'icon',
      },
      {
        Id: 2,
        Name: '아바타',
        CurrentMinPrice: 500,
        Grade: 'icon',
        bookmark: 'icon',
      },
      {
        Id: 3,
        Name: '아바타',
        CurrentMinPrice: 500,
        Grade: 'icon',
        Icon: 'icon',
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
      <TopTab isMobile={deviceType === 'mobile'}>
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
      <TableWrapper>
        <MainTable headerTitle="전설 각인서" data={marketItems} columns={columns} />
        <MainTable headerTitle="재련 재료" data={marketItems} columns={columns} />
        <MainTable headerTitle="아바타" data={data2} columns={columns2} />
      </TableWrapper>
    </>
  );
};

export default ItemPricePage;
