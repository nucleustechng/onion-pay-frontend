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

const formSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "First Name must be at least 2 characters." }),
	lastName: z
		.string()
		.min(2, { message: "Last Name must be at least 2 characters." }),
	otherNames: z
		.string()
		.min(2, { message: "Other Names must be at least 2 characters." }),
	address: z
		.string()
		.min(2, { message: "Address must be at least 2 characters." }),
	gender: z.string().min(1, { message: "Gender must be selected." }),
	dateOfBirth: z.string().min(1, { message: "Date of Birth must be entered." }),
	phoneNo: z
		.string()
		.min(2, { message: "Phone Number must be at least 2 characters." }),
	nextOfKinName: z
		.string()
		.min(2, { message: "Next of Kin Name must be at least 2 characters." }),
	nextOfKinPhoneNumber: z.string().min(2, {
		message: "Next of Kin Phone Number must be at least 2 characters.",
	}),
	bankVerificationNumber: z.string().min(2, {
		message: "Bank Verification Number must be at least 2 characters.",
	}),
	email: z.string().email({ message: "Invalid email address." }),
	nationality: z.string().min(1, { message: "Nationality must be selected." }),
	otherNationalityType: z.string().optional(),
	pep: z.string().min(1, { message: "PEP status must be selected." }),
	nationalIdentityNo: z.string().min(2, {
		message: "National Identity Number must be at least 2 characters.",
	}),
});

const formFields = [
	{ name: "firstName", label: "First Name", type: "text" },
	{ name: "lastName", label: "Last Name", type: "text" },
	{ name: "otherNames", label: "Other Names", type: "text" },
	{ name: "address", label: "Address", type: "text" },
	{
		name: "gender",
		label: "Gender",
		type: "select",
		options: ["Male", "Female"],
	},
	{ name: "dateOfBirth", label: "Date of Birth", type: "date" },
	{ name: "phoneNo", label: "Phone Number", type: "text" },
	{ name: "nextOfKinName", label: "Next of Kin Name", type: "text" },
	{
		name: "nextOfKinPhoneNumber",
		label: "Next of Kin Phone Number",
		type: "text",
	},
	{
		name: "bankVerificationNumber",
		label: "Bank Verification Number",
		type: "text",
	},
	{ name: "email", label: "Email", type: "text" },
	{
		name: "nationality",
		label: "Nationality",
		type: "select",
		options: ["Nigerian", "Non-Nigerian"],
	},
	{ name: "pep", label: "PEP Status", type: "select", options: ["Yes", "No"] },
	{
		name: "nationalIdentityNo",
		label: "National Identity Number",
		type: "text",
	},
];

export function SignatoryForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			otherNames: "",
			address: "",
			gender: "",
			dateOfBirth: "",
			phoneNo: "",
			nextOfKinName: "",
			nextOfKinPhoneNumber: "",
			bankVerificationNumber: "",
			email: "",
			nationality: "",
			otherNationalityType: "",
			pep: "",
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

	const onFileChange = (file: File | null, field: keyof typeof files) => {
		setFiles((prev) => ({ ...prev, [field]: file }));
	};

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log({ ...values, ...files });
	};

	return (
		<div className="bg-[#F5F5F5] px-4 py-4 rounded-[10px]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
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
												<option
													value=""
													disabled
												>
													Select {field.label}
												</option>
												{field.options?.map((option) => (
													<option
														key={option}
														value={option}
													>
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
						<Button
							className="w-[124px] text-white"
							type="submit"
						>
							Next
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
