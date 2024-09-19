'use client';
//queries
import { CREATE_COUPON } from '@/lib/api/graphql';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//components
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';

//interfaces
import {
  IAddCouponProps,
  ICoupon,
} from '@/lib/utils/interfaces/coupons.interface';

//schema
import { CouponFormSchema } from '@/lib/utils/schema/coupon';

//formik
import { ErrorMessage, Form, Formik } from 'formik';

//prime react
import { InputSwitch } from 'primereact/inputswitch';
import { ProgressSpinner } from 'primereact/progressspinner';

//hooks
import { useMutation } from '@apollo/client';
import { useContext } from 'react';

export default function AddCoupon({
  setVisible,
  setCoupons,
  editData,
  isEditing,
}: IAddCouponProps) {
  //initial values
  const initialValues = {
    title: isEditing && editData?.title ? editData?.title : '',
    discount: isEditing && editData?.discount ? editData?.discount : 0,
    enabled: isEditing && editData?.enabled ? editData?.enabled : true,
  };

  //mutation
  const [CreateCoupon, { loading, error }] = useMutation(CREATE_COUPON);
  //toast
  const { showToast } = useContext(ToastContext);

  return (
    <div className="flex flex-col gap-4">
      <Formik
        initialValues={initialValues}
        validationSchema={CouponFormSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const formData = {
              title: values.title,
              discount: values.discount,
              enabled: values.enabled,
            };
            const res = await CreateCoupon({
              variables: {
                couponInput: formData,
              },
            });
            setVisible(false);
            showToast({
              title: 'Success',
              type: 'success',
              message: 'Coupon was added successfully!',
              duration: 2000,
            });
            const newCoupon: ICoupon = res.data.createCoupon;
            setCoupons(newCoupon);

            setSubmitting(false);
          } catch (err) {
            setVisible(true);
            showToast({
              title: 'Error',
              type: 'error',
              message:
                error?.message ||
                error?.networkError?.message ||
                error?.clientErrors[0].message ||
                error?.graphQLErrors[0].message ||
                'An error occured',
              duration: 2000,
            });
            setSubmitting(false);
            return console.log(err);
          }
        }}
        validateOnChange={true}
      >
        {({
          errors,
          handleSubmit,
          handleChange,
          values,
          isSubmitting,
          setFieldValue,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="flex gap-x-2">
                <h2>Add Coupon</h2>
                <div className="flex gap-x-1 items-center">
                  {values.enabled ? 'Enabled' : 'Disabled'}
                  <InputSwitch
                    checked={values.enabled}
                    onChange={(e) => setFieldValue('enabled', e.value)}
                    className={values.enabled ? 'p-inputswitch-checked' : ''}
                  />
                </div>
              </div>
              <CustomTextField
                value={values.title}
                name="title"
                showLabel={true}
                placeholder={'Title'}
                type="text"
                onChange={handleChange}
                className={
                  errors.title ? 'text-red-600 outline outine-red' : ''
                }
              />
              <ErrorMessage
                name="title"
                component="span"
                className="text-red-600"
              />
              <CustomNumberField
                value={values.discount}
                name="discount"
                showLabel={true}
                placeholder={'Discount'}
                onChange={handleChange}
                min={0}
                max={100}
                className={
                  errors.discount ? 'text-red-600 outline outine-red' : ''
                }
              />
              {errors.discount}
              <ErrorMessage
                name="discount"
                component="span"
                className="text-red-600"
              />
              <button
                className="block float-end bg-black rounded-md px-12 py-4 my-2 text-white items-center justify-center"
                disabled={isSubmitting || loading}
                type="submit"
              >
                {isSubmitting || loading ? (
                  <ProgressSpinner
                    className="w-6 h-6 items-center self-center m-0 p-0"
                    strokeWidth="5"
                    style={{ fill: 'white', accentColor: 'white' }}
                    color="white"
                  />
                ) : (
                  'Add'
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
