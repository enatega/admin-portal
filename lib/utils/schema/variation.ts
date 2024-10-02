import * as Yup from 'yup';
import { MAX_PRICE, MIN_PRICE } from '../constants';
import { IDropdownSelectItem } from '../interfaces';

export const VariationSchema = Yup.object({
  variations: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string().nullable(),
        title: Yup.string().min(2).max(50).required('Required'),
        price: Yup.number()
          .min(MIN_PRICE, 'Minimum value must be greater than 0')
          .max(MAX_PRICE)
          .required('Required'),
        discount: Yup.number().min(0).max(100).required('Required'),
        addons: Yup.array()
          .of(Yup.mixed<IDropdownSelectItem>())
          .min(1, 'Addons field must have at least 1 items')
          .required('Required'),
      })
    )
    .min(1)
    .required('Required'),
});
