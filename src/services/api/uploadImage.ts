import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import fireBaseStorage from "../firebase/storage";
import { v4 as uuid } from "uuid";
import { useState } from "react";

type args = { id: string; file: File };

const useUploadProduct = () => {
  const [uploadProgress, setUploadProgress] = useState<
    Record<string, { progress?: number; url?: string }>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>();
  const upload = async (files: Array<args>) => {
    setIsLoading(true);
    const promises = files.map(async ({ file, id }) => {
      const fileRef = ref(fireBaseStorage, uuid());
      const task = uploadBytesResumable(fileRef, file);
      task.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress((prev) => ({ ...prev, [id]: { progress } }));
      });

      const snapshot = await task;
      const url = await getDownloadURL(snapshot.ref);
      setUploadProgress((prev) => ({ ...prev, [id]: { progress: 100, url } }));
    });
    await Promise.all(promises);
    setIsLoading(true);
  };

  return [upload, { data: uploadProgress, isLoading }] as const;
};

export const upload = async (
  files: Array<args>,
  onProgress: (
    data: Record<string, { progress?: number; url?: string }>
  ) => void
) => {
  const res: Record<string, { progress?: number; url?: string }> = {};
  const promises = files.map(async ({ file, id }) => {
    const fileRef = ref(fireBaseStorage, uuid());
    const task = uploadBytesResumable(fileRef, file);
    task.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      res[id] = { progress };
      onProgress(res);
    });

    const snapshot = await task;
    const url = await getDownloadURL(snapshot.ref);
    res[id] = { progress: 100, url };
    onProgress(res);
  });
  await Promise.all(promises);
  return res;
};

export default useUploadProduct;
