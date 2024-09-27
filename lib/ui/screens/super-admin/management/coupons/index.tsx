//screen components
import CouponForm from '@/lib/ui/screen-components/protected/coupons/form';
import CouponScreenHeader from '@/lib/ui/screen-components/protected/coupons/view/header';
import CouponsMain from '@/lib/ui/screen-components/protected/coupons/view/main';
import { IEditState } from '@/lib/utils/interfaces';
import { ICoupon } from '@/lib/utils/interfaces/coupons.interface';
//hooks
import { useState } from 'react';

export default function CouponsScreen() {
  //states
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState<IEditState<ICoupon>>({
    bool: false,
    data: {
      __typename: '',
      _id: '',
      discount: 0,
      enabled: false,
      title: '',
    },
  });

  //toggle visibility
  const handleButtonClick = () => {
    setVisible(true);
  };

  return (
    <div className="screen-container">
      <CouponScreenHeader handleButtonClick={handleButtonClick} />
      <div className="flex-grow overflow-y-auto">
        <CouponsMain
          setVisible={setVisible}
          visible={visible}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
      <CouponForm
        isEditing={isEditing}
        visible={visible}
        setIsEditing={setIsEditing}
        setVisible={setVisible}
      />
    </div>
  );
}
