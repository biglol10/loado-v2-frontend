import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@state/store';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'tab'>('desktop');
  const appCommonStore = useSelector((state: RootState) => state.appCommon);

  useEffect(() => {
    setDeviceType(appCommonStore.deviceType);
  }, [appCommonStore]);

  return deviceType;
};

export default useDeviceType;
