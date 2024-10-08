'use client';
// Core
import { useState } from 'react';

//Components
import BannersAddForm from '@/lib/ui/screen-components/protected/super-admin/banner/add-form';
import BannersHeader from '@/lib/ui/screen-components/protected/super-admin/banner/view/header/screen-header';
import BannersMain from '@/lib/ui/screen-components/protected/super-admin/banner/view/main';

// Interface
import { IBannersResponse } from '@/lib/utils/interfaces/banner.interface';

export default function BannerScreen() {
  // State
  const [isAddBannerVisible, setIsAddBannerVisible] = useState(false);
  const [banner, setBanner] = useState<IBannersResponse | null>(null);

  return (
    <div className="screen-container">
      <BannersHeader setIsAddBannerVisible={setIsAddBannerVisible} />

      <BannersMain
        setIsAddBannerVisible={setIsAddBannerVisible}
        setBanner={setBanner}
      />

      <BannersAddForm
        banner={banner}
        onHide={() => {
          setIsAddBannerVisible(false);
          setBanner(null);
        }}
        isAddBannerVisible={isAddBannerVisible}
      />
    </div>
  );
}
