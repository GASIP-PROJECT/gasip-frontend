import React, { useState } from 'react';

import AllFeedsTab from './AllFeedsTab';
import TopFeedsTab from './TopFeedsTab';
import FeedsScreenTabBar from './FeedsScreenTabBar';

import Spacer from '@components/common/Spacer';

import { HOME_TABS } from '../../../constants';

export default function FeedsScreen() {
  const [currentTab, setCurrentTab] = useState<string>(HOME_TABS.FEED);

  return (
    <>
      <FeedsScreenTabBar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Spacer type="height" value={20} />
      {currentTab === HOME_TABS.FEED && <AllFeedsTab />}
      {currentTab === HOME_TABS.POPULAR && <TopFeedsTab />}
    </>
  );
}
