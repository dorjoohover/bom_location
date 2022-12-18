import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
        cloud_name: 'dosvc4rce', 
        api_key: '418226341632639', 
        api_secret: 'RnQ2lcc8SA_UyM8jsq1VVOjfkiM' 
    });
  },
};