import React, { useState } from 'react';

import AllFeedsTab from './AllFeedsTab';
import TopFeedsTab from './TopFeedsTab';
import GeneralFeedsTab from './GeneralFeedsTab';
import FeedsScreenTabBar from './FeedsScreenTabBar';

import Spacer from '@components/common/Spacer';

import { HOME_TABS } from '../../../constants';

export default function FeedsScreen() {
  const [currentTab, setCurrentTab] = useState<string>(HOME_TABS.ALL);

  return (
    <>
      <FeedsScreenTabBar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Spacer type="height" value={20} />
      {currentTab === HOME_TABS.ALL && <AllFeedsTab />}
      {currentTab === HOME_TABS.GENERAL && <GeneralFeedsTab />}
      {currentTab === HOME_TABS.POPULAR && <TopFeedsTab />}
    </>
  );
}
