// Core
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import { useContext, useMemo } from 'react';

// Prime React

// Interface and Types
import {
  IAddRestaurantComponentProps,
  ICreateRestaurant,
  ICreateRestaurantResponse,
  IDropdownSelectItem,
  IQueryResult,
  IRestaurantsByOwnerResponseGraphQL,
} from '@/lib/utils/interfaces';

// Core
import { RestaurantContext } from '@/lib/context/restaurant.context';

// Component
import CustomButton from '@/lib/ui/useable-components/button';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomMultiSelectComponent from '@/lib/ui/useable-components/custom-multi-select';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';

// Constants
import { RestaurantErrors, SHOP_TYPE } from '@/lib/utils/constants';

// Dummy

// Interface
import { IRestaurantForm } from '@/lib/utils/interfaces';

// Methods
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

// Schemas
import {
  CREATE_RESTAURANT,
  GET_CUISINES,
  GET_RESTAURANTS_BY_OWNER,
} from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/toast.context';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';
import CustomUploadImageComponent from '@/lib/ui/useable-components/upload/upload-image';
import {
  ICuisine,
  IGetCuisinesData,
} from '@/lib/utils/interfaces/cuisine.interface';
import { toTextCase } from '@/lib/utils/methods';
import { RestaurantSchema } from '@/lib/utils/schema/restaurant';
import { ApolloCache, ApolloError, useMutation } from '@apollo/client';

const initialValues: IRestaurantForm = {
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
  address: '',
  deliveryTime: 0,
  minOrder: 0,
  salesTax: 0.0,
  shopType: null,
  cuisines: [],
  image: '',
  logo: '',
};

export default function RestaurantDetails({
  stepperProps,
}: IAddRestaurantComponentProps) {
  const { onStepChange, order } = stepperProps ?? {
    onStepChange: () => {},
    type: '',
    order: -1,
  };

  // Context
  const { showToast } = useContext(ToastContext);
  const { vendorId, onSetRestaurantContextData } =
    useContext(RestaurantContext);

  // API
  // Mutation
  const [createRestaurant] = useMutation(CREATE_RESTAURANT, {
    onError,
    onCompleted: ({
      createRestaurant,
    }: {
      createRestaurant?: ICreateRestaurant;
    }) => {
      showToast({
        type: 'success',
        title: 'New Restaurant',
        message: `Restaurant has been added successfully`,
        duration: 3000,
      });

      onSetRestaurantContextData({
        id: createRestaurant?._id ?? '',
      });

      onStepChange(order + 1);
    },
    update: update,
  });

  const cuisineResponse = useQueryGQL(GET_CUISINES, {
    debounceMs: 300,
  }) as IQueryResult<IGetCuisinesData | undefined, undefined>;
  cuisineResponse.data?.cuisines;

  // Memoized Constants
  const cuisinesDropdown = useMemo(
    () =>
      cuisineResponse.data?.cuisines?.map((cuisin: ICuisine) => {
        return { label: toTextCase(cuisin.name, 'title'), code: cuisin.name };
      }),
    [cuisineResponse.data?.cuisines]
  );

  // Handlers
  const onCreateRestaurant = async (data: IRestaurantForm) => {
    try {
      if (!vendorId) {
        showToast({
          type: 'error',
          title: `${vendorId ? 'Edit' : 'Create'} Vendor`,
          message: `Restaurant Create Failed - Please select a vendor.`,
          duration: 2500,
        });
        return;
      }

      await createRestaurant({
        variables: {
          owner: vendorId,
          restaurant: {
            name: data.name,
            address: data.address,
            image: data.image,
            logo: data.logo,
            deliveryTime: data.deliveryTime,
            minimumOrder: data.minOrder,
            username: data.username,
            password: data.password,
            shopType: data.shopType?.code,
            salesTax: data.salesTax,
            cuisines: data.cuisines.map(
              (cuisin: IDropdownSelectItem) => cuisin.code
            ),
          },
        },
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: `${vendorId ? 'Edit' : 'Create'} Vendor`,
        message: `Restaurant Create Failed`,
        duration: 2500,
      });
    }
  };

  function onError({ graphQLErrors, networkError }: ApolloError) {
    showToast({
      type: 'error',
      title: 'Create Restaurant',
      message:
        graphQLErrors[0]?.message ??
        networkError?.message ??
        `Restaurant Create Failed`,
      duration: 2500,
    });
  }
  function update(
    cache: ApolloCache<unknown>,
    data: ICreateRestaurantResponse
  ): void {
    if (!data) return;

    const cachedData: IRestaurantsByOwnerResponseGraphQL | null =
      cache.readQuery({
        query: GET_RESTAURANTS_BY_OWNER,
        variables: { id: vendorId },
      });

    const cachedRestaurants = cachedData?.restaurantByOwner?.restaurants ?? [];

    cache.writeQuery({
      query: GET_RESTAURANTS_BY_OWNER,
      variables: { id: vendorId },
      data: {
        restaurantByOwner: {
          ...cachedData?.restaurantByOwner,
          restaurants: [...(cachedRestaurants ?? []), createRestaurant],
        },
      },
    });
  }

  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="h-full w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col mb-2">
            <span className="text-lg">Add Restaurant</span>
          </div>

          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={RestaurantSchema}
              onSubmit={async (values) => {
                await onCreateRestaurant(values);
              }}
              validateOnChange
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="space-y-3 mb-2">
                      <div>
                        <CustomTextField
                          type="text"
                          name="name"
                          placeholder="Name"
                          maxLength={35}
                          value={values.name}
                          onChange={handleChange}
                          showLabel={true}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'name',
                              errors?.name,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomIconTextField
                          type="email"
                          name="username"
                          placeholder="Email"
                          maxLength={35}
                          showLabel={true}
                          iconProperties={{
                            icon: faEnvelope,
                            position: 'right',
                            style: { marginTop: '1px' },
                          }}
                          value={values.username}
                          onChange={handleChange}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'username',
                              errors?.username,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomPasswordTextField
                          placeholder="Password"
                          name="password"
                          maxLength={20}
                          value={values.password}
                          showLabel={true}
                          onChange={handleChange}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'password',
                              errors?.password,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomPasswordTextField
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          maxLength={20}
                          showLabel={true}
                          value={values.confirmPassword ?? ''}
                          onChange={handleChange}
                          feedback={false}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'confirmPassword',
                              errors?.confirmPassword,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomTextField
                          placeholder="Address"
                          name="address"
                          type="text"
                          maxLength={100}
                          showLabel={true}
                          value={values.address ?? ''}
                          onChange={handleChange}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'address',
                              errors?.address,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomNumberField
                          suffix="m"
                          min={0}
                          max={500}
                          placeholder="Delivery Time"
                          name="deliveryTime"
                          showLabel={true}
                          value={values.deliveryTime}
                          onChange={setFieldValue}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'deliveryTime',
                              errors?.deliveryTime,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomNumberField
                          min={1}
                          max={99999}
                          placeholder="Min Order"
                          name="minOrder"
                          showLabel={true}
                          value={values.minOrder}
                          onChange={setFieldValue}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'minOrder',
                              errors?.minOrder,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>
                      <div>
                        <CustomNumberField
                          prefix="%"
                          min={0}
                          max={100}
                          placeholder="Sales Tax"
                          minFractionDigits={2}
                          maxFractionDigits={2}
                          name="salesTax"
                          maxLength={20}
                          showLabel={true}
                          value={values.salesTax}
                          onChange={setFieldValue}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'salesTax',
                              errors?.salesTax,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>
                      <div>
                        <CustomDropdownComponent
                          name="shopType"
                          placeholder="Shop Category"
                          selectedItem={values.shopType}
                          setSelectedItem={setFieldValue}
                          options={SHOP_TYPE}
                          showLabel={true}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'shopType',
                              errors?.shopType,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomMultiSelectComponent
                          name="cuisines"
                          placeholder="Cuisines"
                          options={cuisinesDropdown ?? []}
                          selectedItems={values.cuisines}
                          setSelectedItems={setFieldValue}
                          showLabel={true}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'cuisines',
                              errors?.cuisines as string,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 p-4 rounded-lg">
                        <CustomUploadImageComponent
                          key="logo"
                          name="logo"
                          title="Upload Logo"
                          onSetImageUrl={setFieldValue}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'logo',
                              errors?.logo as string,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                        <CustomUploadImageComponent
                          key={'image'}
                          name="image"
                          title="Upload Image"
                          onSetImageUrl={setFieldValue}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'image',
                              errors?.image as string,
                              RestaurantErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="flex justify-end mt-4">
                        <CustomButton
                          className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                          label="Add"
                          type="submit"
                          loading={isSubmitting}
                        />
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
