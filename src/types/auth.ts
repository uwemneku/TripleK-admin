import { object, string, InferType } from "yup";

export const loginSchema = object().shape({
  email: string().email().required().label("Email"),
  password: string().required().label("Password"),
});
export type ILoginDetails = InferType<typeof loginSchema>;
