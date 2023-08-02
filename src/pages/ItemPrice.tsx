/* eslint-disable no-await-in-loop */
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useDeviceType from '@hooks/DeviceTypeHook';
import { MainTable } from '@components/atoms/table/index';
import { IsMobile } from '@consts/interfaces';
import { useQueries } from '@tanstack/react-query';
import { getMarketPriceByCategoryCode } from '@services/ItemPriceService';
import _ from 'lodash';

const TopTab = styled.div<IsMobile>`
  .tab-list {
    display: flex;
    width: ${(props) => (props.isMobile ? '100%' : '500px')};
    list-style: none;
    margin: 0;
    margin-bottom: 30px;
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

const TableWrapper = styled.div<IsMobile>`
  display: grid;
  grid-template-columns: ${(props) => (props.isMobile ? '1fr' : '1fr 1fr')};
  gap: 50px;
`;

export type ActiveTabType = 'all' | 'book' | 'material' | 'mylist' | 'esderAndGem';

export interface ItemData {
  recordId: string;
  itemName: string;
  itemId: string;
  categoryCode: number;
  date: string;
  minCurrentMinPrice: number;
  maxCurrentMinPrice: number;
  avgCurrentMinPrice: number;
}

const dataOrderInRefineType = [
  '명예의 파편 주머니(소)',
  '명예의 파편 주머니(중)',
  '명예의 파편 주머니(대)',
  '명예의 돌파석',
  '위대한 명예의 돌파석',
  '경이로운 명예의 돌파석',
  '찬란한 명예의 돌파석',
  '상급 오레하 융화 재료',
  '최상급 오레하 융화 재료',
  '파괴강석',
  '정제된 파괴강석',
  '수호강석',
  '정제된 수호강석',
];

const dataOrderInAdditionalRefineType = [
  '태양의 은총',
  '태양의 축복',
  '태양의 가호',
  '야금술 : 단조 심화',
  '재봉술 : 수선 심화',
  '야금술 : 단조 숙련',
  '재봉술 : 수선 숙련',
  '야금술 : 단조 특화',
  '재봉술 : 수선 특화',
];

const ItemPricePage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('all');
  const [refinement, setRefinement] = useState<ItemData[]>([]);
  const [refinementAdditional, setRefinementAdditional] = useState<ItemData[]>([]);
  const [etc, setEtc] = useState<ItemData[]>([]);
  const [asder, setAsder] = useState<ItemData[]>([]);
  const [engravings, setEngravings] = useState<ItemData[]>([]);
  const [characterEngravings, setCharacterEngravings] = useState<ItemData[]>([]);
  const [jewlery, setJewlery] = useState<ItemData[]>([]);
  const deviceType = useDeviceType();
  const initalCategoryCodes = ['44410', '44420', '50010', '50020', '51000', '51100', '210000'];
  // const [categoryCode, setCategoryCode] = useState<string>('50020');

  const returnDataByStringArray = (data: ItemData[], arr: string[]) => {
    const orderedData = _.orderBy(data, (item) => {
      const index = arr.indexOf(item.itemName);

      return index !== -1 ? index : Infinity;
    });

    return orderedData;
  };

  const queries = useQueries({
    queries: initalCategoryCodes.map((code) => {
      return {
        queryKey: ['marketPrice2', code],
        queryFn: () => getMarketPriceByCategoryCode(code),
        onSuccess: (data: ItemData[]) => {
          switch (code) {
            case '44410':
              setEngravings(data.sort((a, b) => b.minCurrentMinPrice - a.minCurrentMinPrice));
              break;
            case '44420':
              setCharacterEngravings(
                data.sort((a, b) => b.minCurrentMinPrice - a.minCurrentMinPrice),
              );
              break;
            case '50010':
              setRefinement(returnDataByStringArray(data, dataOrderInRefineType));
              break;
            case '50020':
              setRefinementAdditional(
                returnDataByStringArray(data, dataOrderInAdditionalRefineType),
              );
              break;
            case '51000':
              setEtc(data);
              break;
            case '51100':
              setAsder(data);
              break;
            case '210000':
              setJewlery(data);
              break;
            default:
              break;
          }
        },
        onError: (error: any) => {
          console.log('Error:', error);
        },
        staleTime: 1000 * 60 * 5,
        enabled: true,
      };
    }),
  });

  useEffect(() => {
    queries.forEach((query) => query.refetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(() => {
    if (deviceType === 'mobile') {
      return ['아이템명', '최소가격', '시세조회'];
    } else {
      return ['아이템명', '최소가격', '평균가격', '최대가격', '시세조회'];
    }
  }, [deviceType]);

  const columnsForBook = useMemo(() => {
    if (deviceType === 'mobile') {
      return ['각인서명', '최소가격', '시세조회'];
    } else {
      return ['각인서명', '최소가격', '평균가격', '최대가격', '시세조회'];
    }
  }, [deviceType]);

  return (
    <>
      <TopTab isMobile={deviceType === 'mobile'}>
        <ul className="tab-list">
          <li
            className={`tab-item ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('all');
            }}
          >
            <span className="tab-link">전체</span>
          </li>
          <li
            className={`tab-item ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('book');
            }}
          >
            <span className="tab-link">각인서</span>
          </li>
          <li
            className={`tab-item ${activeTab === 'material' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('material');
            }}
          >
            <span className="tab-link">재련재료</span>
          </li>
          {/* <li
            className={`tab-item ${activeTab === 'mylist' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('mylist');
            }}
          >
            <span className="tab-link">내 관심</span>
          </li> */}
          <li
            className={`tab-item ${activeTab === 'esderAndGem' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('esderAndGem');
            }}
          >
            <span className="tab-link">에스더/보석</span>
          </li>
        </ul>
      </TopTab>
      {activeTab === 'all' && (
        <TableWrapper isMobile={deviceType === 'mobile'}>
          <div>
            <MainTable headerTitle="재련 재료" data={refinement ?? []} columns={columns} />
            <MainTable
              headerTitle="재련 추가 재료"
              data={refinementAdditional ?? []}
              columns={columns}
            />
            <MainTable headerTitle="엘릭서" data={etc ?? [] ?? []} columns={columns} />
            <MainTable
              headerTitle="에스더의 기운 / 보석"
              data={[...asder, ...jewlery] ?? []}
              columns={columns}
            />
          </div>
          <div>
            <MainTable headerTitle="각인서" data={engravings ?? []} columns={columnsForBook} />
            <MainTable
              headerTitle="직업각인서"
              data={characterEngravings ?? []}
              columns={columnsForBook}
            />
          </div>
        </TableWrapper>
      )}
      {activeTab !== 'all' && (
        <TableWrapper>
          {activeTab === 'material' && (
            <>
              <MainTable headerTitle="재련 재료" data={refinement ?? []} columns={columns} />
              <MainTable
                headerTitle="재련 추가 재료"
                data={refinementAdditional ?? []}
                columns={columns}
              />
            </>
          )}
          {activeTab === 'book' && (
            <>
              <MainTable headerTitle="각인서" data={engravings ?? []} columns={columnsForBook} />
              <MainTable
                headerTitle="직업각인서"
                data={characterEngravings ?? []}
                columns={columnsForBook}
              />
            </>
          )}
          {activeTab === 'esderAndGem' && (
            <>
              <MainTable
                headerTitle="에스더의 기운 / 보석"
                data={[...asder, ...jewlery] ?? []}
                columns={columns}
              />
              <MainTable headerTitle="엘릭서" data={etc ?? [] ?? []} columns={columns} />
            </>
          )}
        </TableWrapper>
      )}
    </>
  );
};

export default ItemPricePage;
