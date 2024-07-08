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
// import { PlusIcon } from "lucide-react";

const formSchema = z.object({
	accountSignatory: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	director: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

export function SignatoryForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			accountSignatory: "",
			director: "",
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
								name="accountSignatory"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Account signatories{" "}
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
								name="director"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-primary-black">
											Directors <span className="text-red-500">*</span>
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

					<div className="flex items-center justify-between pb-4 pt-8 lg:pt-10">
						<Button
							className="w-[124px] border-primary bg-[#E7EDFF] text-primary"
							type="submit"
							variant="outline"
						>
							Previous
						</Button>
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
