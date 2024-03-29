import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase-config";

const useUploadImg = (file, prevURL = "") => {
  const [imgURL, setImgURL] = useState(prevURL);
  const [percent, setPercent] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (file === null) return;
    setIsUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress);
      },
      (error) => {
        console.log(error);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          setIsUploading(false);
        });
      }
    );
  }, [file]);

  return {
    imgURL,
    percent,
    setImgURL,
    isUploading,
  };
};

export default useUploadImg;
