// CSS
import './index.module.css';

// GraphQL
import { DELETE_COUPON,  GET_COUPONS } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';

// Interfaces
import {
  IActionMenuItem,
  IEditState,
  ILazyQueryResult,
} from '@/lib/utils/interfaces';
import {
  ICoupon,
  ICouponMainProps,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';
import {
  IFilterType,
} from '@/lib/utils/interfaces/table.interface';

// Prime react
import { FilterMatchMode } from 'primereact/api';

// Hooks
import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

// Components
import { ToastContext } from '@/lib/context/toast.context';
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import Table from '@/lib/ui/useable-components/table';
import CouponTableHeader from '../header/table-header';

// Constants
import { generateDummyCoupons } from '@/lib/utils/dummy';
import { COUPONS_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/coupons-columns';

export default function CouponsMain({
  setVisible,
  isEditing,
  setIsEditing,
}: ICouponMainProps) {
  // Toast
  const { showToast } = useContext(ToastContext);

  // States
  const [selectedData, setSelectedData] = useState<ICoupon[]>([]);
  const [isDeleting, setIsDeleting] = useState<IEditState<ICoupon>>({
    bool: false,
    data: {
      __typename: '',
      _id: '',
      discount: 0,
      enabled: false,
      title: '',
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  // Filters
  const filters: IFilterType = {
    global: { value: globalFilterValue, matchMode: FilterMatchMode.CONTAINS },

    enabled: {
      value: selectedActions.length > 0 ? selectedActions : null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  };

  // Queries
  const { data, fetch, loading } = useLazyQueryQL(
    GET_COUPONS
  ) as ILazyQueryResult<IGetCouponsData | undefined, undefined>;

  // Mutations
  const [deleteCoupon, { loading: deleteCouponLoading }] = useMutation(
    DELETE_COUPON,
    {
      refetchQueries: [{ query: GET_COUPONS }],
      onCompleted: () => {
        showToast({
          title: 'Delete Coupon',
          type: 'success',
          message: 'Coupon has been deleted successfully',
          duration: 2000,
        });
      },
      onError: (err) => {
        showToast({
          title: 'Delete Coupon',
          type: 'error',
          message: err.message || 'An unknown error occured, please try again',
          duration: 2000,
        });
      },
    }
  );

  // Delete Item
  async function deleteItem() {
    await deleteCoupon({
      variables: {
        id: isDeleting?.data?._id,
      },
    });
    setIsDeleting({
      bool: false,
      data: { ...isDeleting.data },
    });
  }

  // Menu Items
  const menuItems: IActionMenuItem<ICoupon>[] = [
    {
      label: 'Edit',
      command: (data?: ICoupon) => {
        if (data) {
          setIsEditing({
            bool: true,
            data: data,
          });
          setIsDeleting({
            bool: false,
            data: { ...isDeleting.data },
          });
        }
      },
    },
    {
      label: 'Delete',
      command: (data?: ICoupon) => {
        if (data) {
          setIsDeleting({
            bool: true,
            data: data,
          });
          setIsEditing({
            bool: false,
            data: { ...isEditing.data },
          });
        }
      },
    },
  ];

  // UseEffects
  useEffect(() => {
    if (isEditing.bool) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [data, isEditing.bool]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-3">
      <Table
        columns={COUPONS_TABLE_COLUMNS({ menuItems })}
        data={data?.coupons ?? generateDummyCoupons()}
        selectedData={selectedData}
        setSelectedData={(e) => setSelectedData(e)}
        loading={loading}
        header={
          <CouponTableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={(e) => setGlobalFilterValue(e.target.value)}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
          />
        }
        filters={filters}
      />
      <DeleteDialog
        onConfirm={deleteItem}
        onHide={() =>
          setIsDeleting({
            bool: false,
            data: {
              __typename: '',
              _id: '',
              discount: 0,
              enabled: false,
              title: '',
            },
          })
        }
        visible={isDeleting.bool}
        loading={deleteCouponLoading}
        message="Are you sure to delete the coupon?"
      />
    </div>
  );
}
