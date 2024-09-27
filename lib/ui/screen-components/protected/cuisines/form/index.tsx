'use client';
//contexts
import { CREATE_CUISINE, EDIT_CUISINE, GET_CUISINES } from '@/lib/api/graphql';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//components
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomTextField from '@/lib/ui/useable-components/input-field';

//interfaces
import { IAddCuisineProps } from '@/lib/utils/interfaces/cuisine.interface';

//schema
import { CuisineFormSchema } from '@/lib/utils/schema';
import { ErrorMessage, Form, Formik } from 'formik';

//prime react
import { ProgressSpinner } from 'primereact/progressspinner';
import { Sidebar } from 'primereact/sidebar';

//hooks
import { ApolloError, useMutation } from '@apollo/client';
import { useContext } from 'react';
import CustomUploadImageComponent from '@/lib/ui/useable-components/upload/upload-image';

export default function CuisineForm({
  setVisible,
  setIsEditing,
  isEditing,
  visible,
}: IAddCuisineProps) {
  // initial values
  const initialValues = {
    _id: isEditing.bool ? isEditing?.data?._id : '',
    name: isEditing.bool ? isEditing?.data?.name : '',
    description: isEditing.bool ? isEditing?.data?.description : '',
    shopType: {
      label: isEditing.bool ? isEditing?.data?.shopType : '',
      code: isEditing.bool ? isEditing?.data?.shopType.toLowerCase() : '',
    },
    image: isEditing.bool ? isEditing.data.image : '',
  };

  //toast
  const { showToast } = useContext(ToastContext);

  //mutations
  const [CreateCuisine, { loading: createCuisineLoading }] = useMutation(
    CREATE_CUISINE,
    {
      onError,
      onCompleted: () => {
        showToast({
          title: `${!isEditing.bool ? 'New' : 'Edit'} Cuisine`,
          type: 'success',
          message: `Cuisine has been ${!isEditing.bool ? 'created' : 'edited'} successfully`,
          duration: 2000,
        });
      },
      refetchQueries: [{ query: GET_CUISINES }],
    }
  );
  const [editCuisine, { loading: editCuisineLoading }] = useMutation(
    EDIT_CUISINE,
    {
      onError,
      onCompleted: () => {
        showToast({
          title: `${!isEditing.bool ? 'New' : 'Edit'} Cuisine`,
          type: 'success',
          message: `Cuisine has been ${!isEditing.bool ? 'created' : 'edited'} successfully`,
          duration: 2000,
        });
      },
      refetchQueries: [{ query: GET_CUISINES }],
    }
  );

  // shop type options
  const shopTypeOptions = [
    { label: 'Restaurant', code: 'restaurant' },
    { label: 'Shop', code: 'shop' },
  ];

  // API Handlers
  function onError({ graphQLErrors, networkError }: ApolloError) {
    showToast({
      type: 'error',
      title: `${isEditing.bool ? 'Edit' : 'New'}Cuisine`,
      message:
        graphQLErrors[0]?.message ??
        networkError?.message ??
        `Cuisine ${isEditing.bool ? 'Editio' : 'Creation'}  Failed`,
      duration: 2500,
    });
  }

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      position="right"
      className="w-full sm:w-[450px]"
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-bold mb-3 text-xl">
          {isEditing.bool ? 'Edit' : 'Add'} Cuisine
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={CuisineFormSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            let formData;
            if (!isEditing.bool) {
              formData = {
                name: values.name,
                description: values.description,
                shopType: values.shopType.label,
                image: values.image,
              };
            } else {
              formData = {
                _id: values._id,
                name: values.name,
                description: values.description,
                shopType: values.shopType.label,
                image: values.image,
              };
            }
            if (!isEditing.bool) {
              await CreateCuisine({
                variables: {
                  cuisineInput: formData,
                },
              });
            } else {
              await editCuisine({
                variables: {
                  cuisineInput: formData,
                },
              });
            }

            setVisible(false);

            setSubmitting(false);
            setIsEditing({
              bool: false,
              data: {
                __typename: '',
                _id: '',
                description: '',
                name: '',
                shopType: '',
                image: '',
              },
            });
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
                <CustomTextField
                  showLabel={true}
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  type="text"
                  placeholder="Name"
                  className={`${errors.name ? 'text-red-600 outline outline-red-600' : ''}`}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="text-red-600"
                />
                <CustomTextAreaField
                  showLabel={true}
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  placeholder="Description"
                  rows={5}
                  className={`${errors.description ? 'text-red-600 outline outline-red-600' : ''}`}
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className="text-red-600"
                />
                <CustomDropdownComponent
                  name="shopType"
                  options={shopTypeOptions}
                  selectedItem={values.shopType}
                  setSelectedItem={setFieldValue}
                  placeholder="Shop Type"
                  showLabel={true}
                />
                <span
                  className={
                    errors.shopType?.label ? 'text-red-600 visible' : 'hidden'
                  }
                >
                  {errors.shopType?.label}
                </span>

                <CustomUploadImageComponent
                  name="image"
                  onSetImageUrl={setFieldValue}
                  title="image"
                  existingImageUrl={isEditing.bool ? isEditing.data.image : ''}
                  showExistingImage={
                    isEditing.bool && isEditing.data.image ? true : false
                  }
                />

                <button
                  className="block float-end bg-black rounded-md px-12 py-2 my-2 text-white"
                  disabled={
                    isSubmitting || createCuisineLoading || editCuisineLoading
                  }
                  type="submit"
                >
                  {isSubmitting ||
                  createCuisineLoading ||
                  editCuisineLoading ? (
                    <ProgressSpinner
                      className="w-6 h-6 items-center self-center m-0 p-0"
                      strokeWidth="5"
                      style={{ fill: 'white', accentColor: 'white' }}
                      color="white"
                    />
                  ) : isEditing.bool ? (
                    'Update'
                  ) : (
                    'Add'
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Sidebar>
  );
}
