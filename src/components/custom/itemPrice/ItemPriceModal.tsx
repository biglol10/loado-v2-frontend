import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPeriodItemPrice } from '@services/ItemPriceService';
import useModal from '@hooks/ModalHooks';

const ItemPriceModal = ({
  itemName = '원한 각인서',
  startDate = '2023-04-01',
  endDate = '2023-04-28',
}: any) => {
  const { hideModal } = useModal();

  const itemPriceQuery = useQuery({
    queryKey: ['itemPeriodPrice', itemName, startDate, endDate],
    queryFn: () => getPeriodItemPrice(itemName, startDate, endDate),
    onSuccess: (data) => {
      console.log('itemPeriodPrice data is');
      console.log(data);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (itemPriceQuery.status === 'error') {
    alert('에러가 발생했습니다');
    hideModal();
    return null;
  }

  return <div>sadf</div>;
};

export default ItemPriceModal;
