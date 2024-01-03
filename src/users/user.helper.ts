import { Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  FirebaseStorage,
  UploadMetadata,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

@Injectable()
export class UserHelper {
  private firebaseApp: FirebaseApp;
  private storage: FirebaseStorage;
  constructor() {
    this.firebaseApp = initializeApp({
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      apiKey: process.env.FIREBASE_API_KEY,
    });
    this.storage = getStorage(this.firebaseApp);
  }

  async uploadImageToStorage(image, imageName): Promise<any> {
    console.log('#uploadImageToStorage image', imageName);
    const metadata: UploadMetadata = {
      contentType: `image/${imageName.split('.').pop()}`,
    };
    const storageRef = ref(this.storage, 'profilePicture' + '/' + imageName);
    return await uploadBytes(storageRef, image, metadata)
      .then(async (snapshot) => {
        console.log('#uploadImageToStorage Uploaded a blob or file!');
        return {
          url: await getDownloadURL(snapshot.ref),
          ...snapshot.metadata,
        };
      })
      .catch((error) => {
        console.error(
          '#uploadImageToStorage Error uploading a blob or file!',
          error,
        );
        throw error;
      });
  }
}
