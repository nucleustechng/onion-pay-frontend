"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../@/components/ui/button";
import {
	Form,
	FormControl,
	// FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
// import { ProfileIcon } from "@/lib/constants/icons";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../@/components/ui/select";
// import { PlusIcon } from "lucide-react";

const formSchema = z.object({
	businessName: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	tradeName: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),

	phoneNumber: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	webAddress: z.string(),
	postalAddress: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	address: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	taxId: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),

	industrialSector: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	companyRegDate: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	businessType: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	firstName: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	natureOfBusiness: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	dateIncorporated: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	commencementDate: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

export function OrganizationForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			address: "",
			businessName: "",
			businessType: "",
			commencementDate: "",
			companyRegDate: "",
			dateIncorporated: "",
			email: "",
			firstName: "",
			lastName: "",
			industrialSector: "",
			natureOfBusiness: "",
			phoneNumber: "",
			postalAddress: "",
			taxId: "",
			tradeName: "",
			webAddress: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<div className="bg-[#F5F5F5] px-4 py-4 rounded-[10px]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<section className="w-full flex items-center gap-4">
						<div className="w-full">
							<FormField
								control={form.control}
								name="businessName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Name of business <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="tradeName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Trade <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>
					<section className="w-full flex items-center gap-4">
						<div className="w-full">
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Phone number <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Email address <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}
												type="email"

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="webAddress"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Web address <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}
												type="url"

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>
					<section className="w-full flex items-center gap-4">
						<div className="w-full">
							<FormField
								control={form.control}
								name="postalAddress"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Postal address <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}
												type="text"

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Address <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}
												type="text"

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="taxId"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Tax ID No <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>
					<section className="w-full flex items-center gap-4">
						<div className="w-full">
							<FormField
								control={form.control}
								name="industrialSector"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Industrial sector
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														className="text-black"
														placeholder="Select a category"
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="m@example.com">
													m@example.com
												</SelectItem>
												<SelectItem value="m@google.com">
													m@google.com
												</SelectItem>
												<SelectItem value="m@support.com">
													m@support.com
												</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="companyRegDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Company registration date{" "}
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}
												type="date"

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="w-full">
							<FormField
								control={form.control}
								name="businessType"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Business type
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a subcategory" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="m@example.com">
													m@example.com
												</SelectItem>
												<SelectItem value="m@google.com">
													m@google.com
												</SelectItem>
												<SelectItem value="m@support.com">
													m@support.com
												</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>

					<section className="w-full flex items-center gap-4">
						<div className="w-full">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Contact person first name{" "}
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Contact person last name{" "}
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}

												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>
					<section className="w-full flex items-center gap-4">
						<div className="w-full">
							<FormField
								control={form.control}
								name="natureOfBusiness"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Nature of Business
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a subcategory" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="m@example.com">
													m@example.com
												</SelectItem>
												<SelectItem value="m@google.com">
													m@google.com
												</SelectItem>
												<SelectItem value="m@support.com">
													m@support.com
												</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="dateIncorporated"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Date incorporated
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}
												type="date"
												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="commencementDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Business commencement date
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}
												type="date"
												// icon={<ProfileIcon />}
											/>
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>
					<div className="flex items-center justify-end pb-4 pt-8 lg:pt-20">
						{/* <Button
							className="w-[124px]"
							type="submit"
							variant="outline"
						>
							Cancel
						</Button> */}
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
