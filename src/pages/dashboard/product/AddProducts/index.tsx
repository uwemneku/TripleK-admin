import FormInput from "@/components/ui/input/formInput";
import FormTextArea from "@/components/ui/textarea/formTextArea";
import { useForm } from "react-hook-form";
import { V } from "./VariantsSection";
import { yupResolver } from "@hookform/resolvers/yup";
import { productScheme } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/services/api/products";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

function AddProductsPage() {
  const form = useForm({ resolver: yupResolver(productScheme) });
  const { control, handleSubmit } = form;
  const [createProduct] = useCreateProductMutation();

  const submit: Parameters<typeof handleSubmit>[0] = (e) => {
    createProduct(e);
  };
  console.log(form.formState.errors);

  return (
    <div className="p-3 max-w-[600px] ">
      <Link to={"/"}>
        <ChevronLeft />
      </Link>
      <h1>Add a new product</h1>
      <form>
        <div className="grid gap-3">
          <FormInput control={control} name="name" placeholder="Name" />
          <FormInput control={control} name="price" placeholder="Price" />
          <FormTextArea
            control={control}
            name="description"
            placeholder="Description"
          />
          <V control={control} />
        </div>
        <div className="py-2" />
        <Button onClick={handleSubmit(submit)}>Add Product</Button>
      </form>
    </div>
  );
}

export default AddProductsPage;
