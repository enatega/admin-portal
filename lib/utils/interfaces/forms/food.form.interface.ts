import { IDropdownSelectItem } from '../global.interface';

// Errors
export interface IFoodErrors {
  title: string[];
  description: string[];
  image: string[];
  category: string[];
}

export interface IFoodDetailsForm {
  _id: string | null;
  title: string;
  description: string;
  image: string;
  category: IDropdownSelectItem | null;
}
