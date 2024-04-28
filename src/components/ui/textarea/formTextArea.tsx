import { ComponentProps } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from ".";

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<typeof Textarea>, "name"> {
  name: Path<T>;
  control: Control<T>;
}

// TODO: verify if ref needs to be forwarded here
const FormTextArea = <T extends FieldValues>({
  name,
  control,
  className,
  ...props
}: Props<T>) => {
  const { field, fieldState } = useController({ name, control });
  const isError = Boolean(fieldState.error?.message);
  return (
    <div>
      <Textarea
        //   isError={Boolean(fieldState.error?.message)}
        //   helperText={fieldState.error?.message}
        className={cn(
          isError ? "border-red-500 focus-visible:ring-red-500" : "",
          className
        )}
        {...field}
        {...props}
      />
      {isError && (
        <p className="text-red-500 pl-1 text-sm">{fieldState.error?.message}</p>
      )}
    </div>
  );
};

export default FormTextArea;
