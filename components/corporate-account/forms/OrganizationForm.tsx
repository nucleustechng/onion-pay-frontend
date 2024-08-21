"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
import { useCorporate } from "../../../modules/services/corporateService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

const formSchema = z.object({
  registrationNumber: z.string().min(2, {
    message: "Registration Number must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  website: z.string().min(2, {
    message: "Website must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  postalAddress: z.string().min(2, {
    message: "Postal Address must be at least 2 characters.",
  }),
  taxIDNo: z.string().min(2, {
    message: "Tax ID No must be at least 2 characters.",
  }),
  businessName: z.string().min(2, {
    message: "Business Name must be at least 2 characters.",
  }),
  industrialSector: z.string().min(2, {
    message: "Industrial Sector must be at least 2 characters.",
  }),
  contactPersonFirstName: z.string().min(2, {
    message: "Contact Person First Name must be at least 2 characters.",
  }),
  contactPersonLastName: z.string().min(2, {
    message: "Contact Person Last Name must be at least 2 characters.",
  }),
  businessType: z.string().min(2, {
    message: "Business Type must be at least 2 characters.",
  }),
  natureOfBusiness: z.string().min(2, {
    message: "Nature of Business must be at least 2 characters.",
  }),
  dateIncorporated: z.string().min(2, {
    message: "Date Incorporated must be at least 2 characters.",
  }),
  businessCommencementDate: z.string().min(2, {
    message: "Business Commencement Date must be at least 2 characters.",
  }),
  companyRegDate: z.string().min(2, {
    message: "Company Reg Date must be at least 2 characters.",
  }),
});

const formFields = [
  { name: "registrationNumber", label: "Registration Number", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "website", label: "Website", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "postalAddress", label: "Postal Address", type: "text" },
  { name: "taxIDNo", label: "Tax ID No", type: "text" },
  { name: "businessName", label: "Business Name", type: "text" },
  {
    name: "industrialSector",
    label: "Industrial Sector",
    type: "select",
    options: ["primary", "secondary", "Sector3"],
  },
  {
    name: "contactPersonFirstName",
    label: "Contact Person First Name",
    type: "text",
  },
  {
    name: "contactPersonLastName",
    label: "Contact Person Last Name",
    type: "text",
  },
  {
    name: "businessType",
    label: "Business Type",
    type: "select",
    options: ["Sole_Proprietorship", "Type2", "Type3"],
  },
  {
    name: "natureOfBusiness",
    label: "Nature of Business",
    type: "select",
    options: ["manufacturing", "Nature2", "Nature3"],
  },
  { name: "dateIncorporated", label: "Date Incorporated", type: "date" },
  { name: "companyRegDate", label: "Company Reg Date", type: "date" },
  {
    name: "businessCommencementDate",
    label: "Business Commencement Date",
    type: "date",
  },
];

type Props = {
  nextStep: (step: number) => void;
  business: any;
};

export function OrganizationForm({ nextStep, business }: Props) {
  console.log(business);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registrationNumber: "",
      phone: "+234",
      email: "",
      website: "",
      address: "",
      postalAddress: "",
      taxIDNo: "",
      businessName: "",
      industrialSector: "",
      contactPersonFirstName: "",
      contactPersonLastName: "",
      businessType: "",
      natureOfBusiness: "",
      dateIncorporated: "",
      businessCommencementDate: "",
    },
  });

  const queryClient = useQueryClient();

  const { addOrganisationInfo } = useCorporate();
  const { mutate, isPending } = useMutation({
    onSuccess: ({ success, reason }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: ["business"],
        });
        nextStep(1);
      } else {
        toast.error(reason);
      }
    },
    onError: () => {},
    mutationFn: addOrganisationInfo,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="bg-[#F5F5F5] px-4 py-4 rounded-[10px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof z.infer<typeof formSchema>}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="text-primary-black">
                    {field.label} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    {field.type === "select" ? (
                      <select
                        {...formField}
                        defaultValue={formField.value || ""}
                        onChange={(e) => formField.onChange(e.target.value)}
                        className="block w-full px-3 py-2  bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="" disabled>
                          Select {field.label}
                        </option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        placeholder={`Enter ${field.label}`}
                        {...formField}
                        type={field.type}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex items-center justify-end pb-4 pt-8 lg:pt-20">
            <Button className="w-[124px] text-white" type="submit">
              {isPending ? <ReloadIcon className="animate-spin" /> : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
