/* eslint-disable no-await-in-loop */
import React, { useState, useEffect, useMemo } from 'react';
import BaseService from '@services/BaseService';
import axios from 'axios';
import styled from 'styled-components';
import LOSTARK_API from '@consts/api';
import useDeviceType from '@hooks/DeviceTypeHook';
import { MainTable } from '@components/atoms/table/index';
import { ITableData } from '@components/atoms/table/Types';
import { IsMobile } from '@consts/interfaces';
import { useQuery, QueryKey } from '@tanstack/react-query';
import { getMarketPriceByCategoryCode } from '@services/ItemPriceService';
import { toast } from 'react-toastify';
import { StyledDiv } from '@consts/appStyled';

const TopTab = styled.div<IsMobile>`
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

export type ActiveTabType = 'all' | 'book' | 'material' | 'mylist';

const ItemPricePage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('all');
  const [refinement, setRefinement] = useState([]);
  const [refinementAdditional, setRefinementAdditional] = useState([]);
  const [etc, setEtc] = useState([]);
  const [asder, setAsder] = useState([]);
  const [engravings, setEngravings] = useState([]);
  const [jewlery, setJewlery] = useState([]);
  const deviceType = useDeviceType();
  const initalCategoryCodes = ['50010', '50020', '51000', '51100', '210000'];
  const [categoryCode, setCategoryCode] = useState<string>('50020');

  const queryKey: QueryKey = ['marketPrice', categoryCode];

  const itemsQuery = useQuery(queryKey, () => getMarketPriceByCategoryCode(categoryCode), {
    onSuccess: (data: any) => {
      switch (categoryCode) {
        case '50010':
          setRefinement(data);
          break;
        case '50020':
          setRefinementAdditional(data);
          break;
        case '51000':
          setEtc(data);
          break;
        case '51100':
          setAsder(data);
          break;
        case '44420':
          setEngravings(data);
          break;
        case '210000':
          setJewlery(data);
          break;
        default:
          break;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  if (itemsQuery.status === 'error') {
    toast.error(<StyledDiv color="black">데이터를 가져오지 못했습니다</StyledDiv>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
    return null;
  }

  const columns: string[] = useMemo(
    () => ['각인서명', '전일 평균 거래가', '최근 거래가', '최저가', '시세조회', '관심등록'],
    [],
  );

  const MainTableWrapper = ({ children }: { children: React.ReactElement }) => {
    return (
      <div>
        {React.Children.map(children, (el) => {
          return React.cloneElement(el, { activeTab });
        })}
      </div>
    );
  };

  return (
    <>
      {/* <div>asdf</div> */}
      <TopTab isMobile={deviceType === 'mobile'}>
        <ul className="tab-list">
          <li
            className={`tab-item ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('all');
              setCategoryCode('50020');
            }}
          >
            <span className="tab-link">전체</span>
          </li>
          <li
            className={`tab-item ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('book');
              setCategoryCode('44420');
            }}
          >
            <span className="tab-link">각인서</span>
          </li>
          <li
            className={`tab-item ${activeTab === 'material' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('material');
              setCategoryCode('50010');
            }}
          >
            <span className="tab-link">재련재료</span>
          </li>
          <li
            className={`tab-item ${activeTab === 'mylist' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('mylist');
            }}
          >
            <span className="tab-link">내 관심</span>
          </li>
        </ul>
      </TopTab>
      <TableWrapper>
        {(activeTab === 'all' || activeTab === 'material') && (
          <>
            <MainTable headerTitle="재련 재료" data={refinement ?? []} columns={columns} />
            <MainTable
              headerTitle="재련 추가 재료"
              data={refinementAdditional ?? []}
              columns={columns}
            />
            <MainTable headerTitle="기타 재료" data={etc ?? [] ?? []} columns={columns} />
          </>
        )}
        {(activeTab === 'all' || activeTab === 'book') && (
          <>
            <MainTable headerTitle="각인서" data={engravings ?? []} columns={columns} />
          </>
        )}
        {activeTab === 'all' && (
          <>
            <MainTable headerTitle="에스더의 기운" data={asder ?? []} columns={columns} />
            <MainTable headerTitle="보석" data={jewlery ?? []} columns={columns} />
          </>
        )}
      </TableWrapper>
    </>
  );
};

export default ItemPricePage;
