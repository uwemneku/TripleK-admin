import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseApi } from ".";
import firebaseAuth from "../firebase/auth";
import { ILoginDetails } from "../../types/auth";
import { FirebaseError } from "firebase/app";
const authApi = firebaseApi.injectEndpoints({
  endpoints(build) {
    return {
      loginWithEmailAndPassword: build.mutation<unknown, ILoginDetails>({
        queryFn: async ({ email, password }) => {
          try {
            const res = await signInWithEmailAndPassword(
              firebaseAuth,
              email,
              password
            );
            await sendEmailVerification(res.user);

            return { data: {} };
          } catch (_error) {
            const error = _error as FirebaseError;

            return {
              error: {
                status: "CUSTOM_ERROR",
                error: error?.message,
                data: {},
              },
            };
          }
        },
      }),
      signupWithEmailAndPassword: build.mutation<unknown, ILoginDetails>({
        queryFn: async ({ email, password }) => {
          try {
            const res = await createUserWithEmailAndPassword(
              firebaseAuth,
              email,
              password
            );
            sendEmailVerification(res.user);
            res.user;
            return { data: res };
          } catch (error) {
            return {
              error: { status: "CUSTOM_ERROR", error: "", data: error },
            };
          }
        },
      }),
    };
  },
});

export const {
  useLoginWithEmailAndPasswordMutation,
  useSignupWithEmailAndPasswordMutation,
} = authApi;
