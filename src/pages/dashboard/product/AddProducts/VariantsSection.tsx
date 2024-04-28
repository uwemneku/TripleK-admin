import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "@/components/ui/input/formInput";
import { Label } from "@/components/ui/label";
import { IProduct, variantScheme } from "@/types/product";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { MouseEventHandler, useRef, useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface P {
  control: Control<IProduct>;
}

interface Props {
  onSubmit: (
    e: Extract<IProduct["variants"], object>[number],
    index?: number
  ) => void;
  isOpened: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue?: Parameters<Props["onSubmit"]>[0] & { index: number };
}

export function V({ control }: P) {
  const {
    fields: variants = [],
    append,
    update,
  } = useFieldArray({
    control,
    name: "variants",
  });
  const [isOpened, toggle] = useState(false);
  const defaultValue = useRef<Props["defaultValue"]>();

  const openUpdateModal: MouseEventHandler<SVGSVGElement> = (e) => {
    const index = parseInt(e?.currentTarget?.getAttribute("data-index") || "");
    if (index > -1) {
      defaultValue.current = { index, ...variants[index] };
      toggle(true);
    }
  };

  return (
    <div className="bg-slate-100 rounded-md border-2 p-4 relative grid gap-4">
      {variants.map((i, index) => (
        <div key={i.id} className="grid gap-2">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{i.name}</p>
            <Edit2Icon data-index={index} size={14} onClick={openUpdateModal} />
          </div>
          <div className="text-xs flex gap-3 flex-wrap">
            {i.values.map((e) => (
              <p className="bg-gray-300 rounded-md p-1 px-2" key={e.id}>
                <span>{e.option}</span>
                {e.price && (
                  <span className="font-medium">
                    : N{parseInt(e.price).toLocaleString()}
                  </span>
                )}
              </p>
            ))}
          </div>
        </div>
      ))}
      <VariantsSection
        isOpened={isOpened}
        toggle={toggle}
        key={isOpened ? "opened" : "closed"}
        onSubmit={(value, index = -1) => {
          if (index > -1) {
            update(index, value);
          } else {
            append(value);
          }
          toggle(false);
          defaultValue.current = undefined;
        }}
        defaultValue={defaultValue?.current}
      />
    </div>
  );
}

export function VariantsSection({
  onSubmit,
  isOpened,
  toggle,
  defaultValue,
}: Props) {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(variantScheme),
    defaultValues: defaultValue || {
      id: uuidv4(),
      values: [{ id: uuidv4(), option: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "values" });

  const addFiled = () => {
    append({ id: uuidv4(), option: "", price: "0" });
  };
  const submit = () => {
    handleSubmit((values) => {
      onSubmit(values, defaultValue?.index);
    })();
  };

  const removeOption: MouseEventHandler<SVGSVGElement> = (e) => {
    const id = e?.currentTarget?.getAttribute("data-id");
    if (id) {
      remove(parseInt(id));
    }
  };

  return (
    <Dialog open={isOpened} onOpenChange={toggle}>
      <div className="mx-auto w-fit">
        <DialogTrigger asChild>
          <Button variant="ghost">
            <PlusIcon />
            <span>Add variants</span>
          </Button>
        </DialogTrigger>
      </div>

      <DialogOverlay className="bg-black/15" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add options</DialogTitle>
          <DialogDescription>Give users the option to choose</DialogDescription>
        </DialogHeader>
        <div>
          <FormInput control={control} name="name" placeholder="Name" />
          <div className="mt-4 grid gap-2 max-h-[300px] overflow-scroll p-2">
            {fields.map((i, index) => (
              <div key={i.id} className="flex  gap-4">
                <div className="flex-1 flex gap-2">
                  <FormInput
                    control={control}
                    name={`values.${index}.option`}
                    placeholder="Label"
                  />
                  <FormInput
                    control={control}
                    name={`values.${index}.price`}
                    placeholder="Additional cost"
                  />
                </div>
                <Trash2Icon
                  size={24}
                  data-id={index}
                  onClick={removeOption}
                  className="text-gray-400 active:scale-95  hover:scale-105 hover:text-red-500 mt-2"
                />
              </div>
            ))}
          </div>
        </div>
        <div onClick={addFiled} className="flex items-center gap-2">
          <PlusIcon />
          <Label>Add an option</Label>
        </div>
        <DialogFooter>
          <Button onClick={submit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
