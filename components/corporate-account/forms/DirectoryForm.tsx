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

import React, { useState } from "react";
import DragAndDropFileInput from "../DragAndDropFileInput";
import { toast } from "react-toastify";
import { checkFileSize } from "../../../@/lib/utils";
import { useCorporate } from "../../../modules/services/corporateService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First Name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last Name must be at least 2 characters." }),
  otherNames: z.string().min(2, { message: "Other Names must be at least 2 characters." }),
  address: z.string().min(2, { message: "Address must be at least 2 characters." }),
  gender: z.enum(["Male", "Female"], { required_error: "Gender must be selected." }),
  dateOfBirth: z.string().min(1, { message: "Date of Birth must be entered." }),
  phoneNo: z.string().min(2, { message: "Phone Number must be at least 2 characters." }),
  nextOfKinName: z.string().min(2, { message: "Next of Kin Name must be at least 2 characters." }),
  nextOfKinPhoneNumber: z.string().min(2, { message: "Next of Kin Phone Number must be at least 2 characters." }),
  bankVerificationNumber: z.string().min(2, { message: "Bank Verification Number must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  nationality: z.string().min(1, { message: "Nationality must be selected." }),
  otherNationalityType: z.string().optional(),
  pep: z.enum(["Yes", "No"], { required_error: "PEP status must be selected." }),
  nationalIdentityNo: z.string().min(2, { message: "National Identity Number must be at least 2 characters." }),
});

const formFields = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "otherNames", label: "Other Names", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  { name: "phoneNo", label: "Phone Number", type: "text" },
  { name: "nextOfKinName", label: "Next of Kin Name", type: "text" },
  { name: "nextOfKinPhoneNumber", label: "Next of Kin Phone Number", type: "text" },
  { name: "bankVerificationNumber", label: "Bank Verification Number", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "nationality", label: "Nationality", type: "select", options: ["Nigerian", "Non-Nigerian"] },
  { name: "pep", label: "PEP Status", type: "select", options: ["Yes", "No"] },
  { name: "nationalIdentityNo", label: "National Identity Number", type: "text" },
];

type Props = {
  nextStep: (step: number) => void;
  business:any

};

export function DirectoryForm({ nextStep,business }: Props) {
    console.log(business)
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      otherNames: "",
      address: "",
      gender: "Male",
      dateOfBirth: "",
      phoneNo: "",
      nextOfKinName: "",
      nextOfKinPhoneNumber: "",
      bankVerificationNumber: "",
      email: "",
      nationality: "",
      otherNationalityType: "",
      pep: "No",
      nationalIdentityNo: "",
    },
  });

  const [files, setFiles] = useState({
    utilityBill: null,
    customerPassport: null,
    idCardFront: null,
    signature: null,
    idCardBack: null,
    proofOfAddressVerification: null,
    residentPermit: null,
  });

  const { addDirectories } = useCorporate();
  const { mutate, isPending } = useMutation({
    onSuccess: ({ success, reason }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["business"] });
        nextStep(3);
      } else {
        toast.error(reason);
      }
    },
    onError: () => {},
    mutationFn: addDirectories,
  });

  const onFileChange = (file: File | null, field: keyof typeof files) => {
    if (checkFileSize(file)) {
      setFiles((prev) => ({ ...prev, [field]: file }));
    } else {
      toast.error("File size should not be more than 150KB");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      otherNames: values.otherNames,
      address: values.address,
      gender: values.gender as "Male" | "Female",
      dateOfBirth: values.dateOfBirth,
      phoneNo: values.phoneNo,
      nextOfKinName: values.nextOfKinName,
      nextOfKinPhoneNumber: values.nextOfKinPhoneNumber,
      bankVerificationNumber: values.bankVerificationNumber,
      email: values.email,
      nationality: values.nationality,
      otherNationalityType: values.otherNationalityType,
      pep: values.pep as "Yes" | "No",
      nationalIdentityNo: values.nationalIdentityNo,
      utilityBill: files.utilityBill,
      customerPassport: files.customerPassport,
      idCardFront: files.idCardFront,
      signature: files.signature,
      idCardBack: files.idCardBack,
      proofOfAddressVerification: files.proofOfAddressVerification,
      residentPermit: files.residentPermit,
    });
    console.log({ ...values, ...files });
  };

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
                        className="block w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                  <FormMessage  />
                </FormItem>
              )}
            />
          ))}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Object.keys(files).map((key) => (
              <FormItem key={key}>
                <FormLabel className="text-primary-black">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </FormLabel>
                <FormControl>
                  <DragAndDropFileInput
                    file={files[key as keyof typeof files]}
                    onFileChange={(file) =>
                      onFileChange(file, key as keyof typeof files)
                    }
                  />
                </FormControl>
              </FormItem>
            ))}
          </div>

          <div className="flex items-center justify-end pb-4 pt-8 lg:pt-20">
            <Button type='submit' disabled={isPending} className="w-[124px] text-white" >
              {isPending ? <ReloadIcon className="animate-spin"/> : `Next`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
