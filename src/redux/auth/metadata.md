```js
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'images/mountains.jpg');

// Create file metadata including the content type @type {any} 

const metadata = {
  contentType: 'image/jpeg',
};

// Upload the file and metadata
const uploadTask = uploadBytes(storageRef, file, metadata);
```