import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../../@/components/ui/button";
import { Checkbox } from "../../@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../@/components/ui/form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { updateFee } from "../../modules/LoadSettings/settingService";
import { ReloadIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  client_pays_fee: z.boolean().default(false).optional(),
});

export function UpdateFee() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      client_pays_fee: true,
    },
  });
  const { mutate: updateFeeMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateFee,
    onSuccess: ({ success, reason }) => {
      if (success) {
        if (form.getValues("client_pays_fee") === true) {
          toast.success("Fee payment is now incurred on merchant");
        } else {
          toast.success("Fee payment is now incurred on customer");
        }
      }
      if (success === false) {
        toast.error(reason);
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleUpdate = (value: boolean) => {
    updateFeeMutation({ client_pays_fee: value });
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleUpdate(data?.client_pays_fee as boolean);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-auto  "
      >
        <FormField
          control={form.control}
          name="client_pays_fee"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-[0.0625rem] border-[#CACACA] p-4 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Use different settings for fee payments</FormLabel>
                <FormDescription>
                  You can manage your fees to be client pays or merchant pays
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="text-white  ">
            {isUpdating ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
