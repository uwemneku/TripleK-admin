import { IProduct } from "@/types/product";
import { firebaseApi } from ".";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import firebaseStorage from "../firebase/fireStore";
import { upload } from "./uploadImage";

const productCollection = collection(firebaseStorage, "products");
type CallbackFunc = (
  progress: Record<string, { progress?: number; url?: string }>
) => void;

const productsDocRef = doc(productCollection);
const productApi = firebaseApi.injectEndpoints({
  endpoints(build) {
    return {
      createProduct: build.mutation<
        unknown,
        {
          product: IProduct;
          onImageUpload: CallbackFunc;
        }
      >({
        async queryFn(arg) {
          const { images, ...products } = arg.product;
          const urls = await upload(
            images.map((i) => ({
              file: i.file as File,
              id: i.key,
            })),
            arg.onImageUpload
          );
          await setDoc(productsDocRef, {
            ...products,
            images: images.map((i) => urls[i.key]),
          });
          return { data: {} };
        },
        invalidatesTags: ["products"],
      }),

      getAllProducts: build.query<unknown, void>({
        async queryFn() {
          const products = await getDocs(productCollection);
          products.forEach((i) => {
            console.log(i.data());
          });

          return { data: {} };
        },
        providesTags: ["products"],
      }),
    };
  },
});

export const { useCreateProductMutation, useGetAllProductsQuery } = productApi;
