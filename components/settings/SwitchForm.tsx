import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { updateFee } from "../../modules/LoadSettings/settingService";
import { useState } from "react";

type Props = {
	clientPaysFee: boolean;
};

export function SwitchForm({ clientPaysFee }: Props) {
	// const form = useForm<z.infer<typeof FormSchema>>({
	// 	resolver: zodResolver(FormSchema),
	// 	defaultValues: {
	// 		client_pays_fee: clientPaysFee,
	// 	},
	// });
	const [isSwitchOn, setIsSwitchOn] = useState<boolean>(clientPaysFee);

	const { mutate: updateFeeMutation } = useMutation({
		mutationFn: updateFee,
		onSuccess: ({ success, reason }) => {
			if (success) {
				if (isSwitchOn === true) {
					toast.success("Fee payment is now incurred on customer");
				} else {
					toast.success("Fee payment is now incurred on merchant");
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

	const handleUpdate = () => {
		const newValue = !isSwitchOn;
		setIsSwitchOn(newValue);
		updateFeeMutation({ client_pays_fee: newValue });
	};

	return (
		// <div>
		// 	<CustomToggle
		// 		value={clientPaysFee}
		// 		onChange={() => {}}
		// 	/>
		// </div>

		<div>
			<div className="space-y-4 ">
				<div className="flex items-center gap-2 w-[19rem] md:w-[29rem] lg:w-[44rem]">
					<div className=" ">
						<div
							onClick={handleUpdate}
							className={`flex w-9 h-4 cursor-pointer shadow-md ${
								isSwitchOn ? "bg-primary" : "bg-[#F5F0F3]"
							} rounded-full transition-all duration-500`}
						>
							<span
								className={`h-4 w-4 transition-all duration-500 cursor-pointer shadow-lg ${
									isSwitchOn ? "ml-5" : "ml-0"
								} ${isSwitchOn ? "bg-white" : "bg-[#898989]"} rounded-full`}
							/>
						</div>
						{/* <FormField
									control={form.control}
									name="client_pays_fee"
									render={({ field }) => (
										<FormItem className="">
											<FormControl>
												<CustomToggle
													value={field.value as boolean}
													onChange={field.onChange}
												/>

												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
													// className="bg-primary"
												/>
											</FormControl>
										</FormItem>
									)}
								/> */}
					</div>
					<h1 className="text-[#1B1A1A] text-base font-WorkSans font-normal">
						Client pays fee (Beta)
					</h1>
				</div>
			</div>
		</div>
	);
}
