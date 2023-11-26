import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setVisitedPages } from '@state/appCommonSlice';
import dayjs from 'dayjs';

type ScreenLogProps = React.PropsWithChildren<{
  pageId: string;
}>;

const ScreenLog: React.FC<ScreenLogProps> = (props) => {
  const { children, pageId } = props;
  const pageIdRef = useRef('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageIdRef.current === pageId) return;
    console.log(`pageId is ${pageId}`);
    pageIdRef.current = pageId;
    dispatch(setVisitedPages({ pageId, date: dayjs().format('YYYY-MM-DD HH:mm:ss') }));
  }, [pageId, dispatch]);

  return <>{children}</>;
};

export default ScreenLog;
