import { IGlobalComponentProps } from './global.interface';

export interface IImageUploadComponentProps extends IGlobalComponentProps {
  name: string;
  title: string;
  onSetImageUrl: (key: string, imageUrl: string) => void;
}
