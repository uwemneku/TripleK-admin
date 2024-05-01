import { array, InferType, number, object, string, mixed } from "yup";

export const variantScheme = object().shape({
  name: string().required().label("Name"),
  id: string().required(),
  values: array()
    .of(
      object().shape({
        id: string().required(),
        option: string().required().label("Option").min(1),
        price: string().required(),
      })
    )
    .min(1)
    .required(),
});

export const productScheme = object().shape({
  name: string().required(),
  description: string().required(),
  price: number().required(),
  variants: array().of(variantScheme),
  images: array()
    .of(object().shape({ key: string().required(), file: mixed().required() }))
    .required()
    .min(1),
});

export type IProduct = InferType<typeof productScheme>;
