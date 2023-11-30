import React, { useRef, useEffect } from 'react';
import { sendUserLog } from '@services/LoaCommonUtils';

type ScreenLogProps = React.PropsWithChildren<{
  pageId: string;
}>;

const ScreenLog: React.FC<ScreenLogProps> = (props) => {
  const { children, pageId } = props;
  const pageIdRef = useRef('');

  useEffect(() => {
    if (pageIdRef.current === pageId) return;
    pageIdRef.current = pageId;

    sendUserLog('screen', pageId, null);

    // dispatch(setVisitedPages({ pageId, date: dayjs().format('YYYY-MM-DD HH:mm:ss') }));
  }, [pageId]);

  return <>{children}</>;
};

export default ScreenLog;
