import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormInput from "@/components/ui/input/formInput";
import { cn } from "@/lib/utils";
import { useLoginWithEmailAndPasswordMutation } from "@/services/api/auth";
import { loginSchema } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

function LoginPage() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [login, { isError, isLoading }] =
    useLoginWithEmailAndPasswordMutation();

  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
      <Card
        className={cn(
          "max-w-[450px] w-full -mt-20",
          isError ? "border-red-500 border-2" : ""
        )}
      >
        <form onSubmit={handleSubmit(login)} className="w-full">
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>Enter your login details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormInput placeholder="Email" control={control} name="email" />
            <FormInput
              control={control}
              name="password"
              placeholder="Password"
            />
            {isError && (
              <p className="text-sm text-red-500 text-center font-medium">
                Invalid login details
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Login</span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
