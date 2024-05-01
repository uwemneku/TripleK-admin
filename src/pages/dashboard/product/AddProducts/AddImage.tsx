import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types/product";
import { ImageUp, XCircleIcon } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { Control, useFieldArray, useFormState } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Reorder } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  control: Control<IProduct>;
}

function AddImage({ control }: Props) {
  const {
    append,
    fields: images,
    replace,
    remove,
    move,
  } = useFieldArray({
    control,
    name: "images",
  });

  const { errors } = useFormState({ control, name: "images" });
  const onFileSelect: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e
  ) => {
    const files = e.currentTarget?.files;
    if (files)
      for (const iterator of files) {
        append({ file: iterator, key: uuidv4() });
      }
  };

  return (
    <div>
      <div
        className={cn(
          "bg-gray-400 border-2 border-gray-600 rounded-md p-5",
          errors?.images?.message ? "border-red-500" : ""
        )}
      >
        <Reorder.Group
          className="flex flex-wrap gap-3"
          axis="y"
          values={images}
          onReorder={replace}
        >
          {images.map((data, index) => {
            return (
              <Reorder.Item
                value={data}
                key={data.key}
                className="w-28 h-24 rounded-md overflow-hidden relative group bg-red-500"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger
                    type="button"
                    className="absolute right-0 opacity-0 group-hover:opacity-100 "
                  >
                    <XCircleIcon fill="black" stroke="white" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        move(index, 0);
                      }}
                    >
                      Pin Image
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <img
                  src={URL.createObjectURL(data.file as Blob)}
                  className="w-full h-full bg-cover object-cover bg-center"
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
        <div className="mx-auto w-fit">
          <Button variant={"ghost"} className="gap-2 relative" type="button">
            <input
              onChange={onFileSelect}
              multiple
              className="absolute w-full h-full opacity-0"
              type="file"
            />
            <ImageUp />
            <span>Add Image</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddImage;
