import { IProduct } from "@/types/product";
import { firebaseApi } from ".";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import firebaseStorage from "../firebase/storage";

const productCollection = collection(firebaseStorage, "products");

const productsDocRef = doc(productCollection);
const productApi = firebaseApi.injectEndpoints({
  endpoints(build) {
    return {
      createProduct: build.mutation<unknown, IProduct>({
        async queryFn(arg) {
          await setDoc(productsDocRef, arg);
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
