import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
	label?: string;
	placeholder?: string;
	type: string;
	width?: string;
	height: string;
	textSize?: string;
	errorMessage?: string;
	name?: string;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
	label,
	placeholder,
	type,
	width,
	height,
	textSize,
	errorMessage,
	name,
	value,
	onChange,
}: Props) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<div className="relative">
			<div className={`flex flex-col ${label ? "gap-[0.375rem]" : "gap-0"}`}>
				<label
					className={`text-sm ${errorMessage ? "text-[#DE0040]" : ""} ${
						!isFocused && !errorMessage && "text-primaryText"
					} ${
						isFocused && !errorMessage && "text-primary"
					} font-WorkSans font-normal leading-4 `}
				>
					{label}
				</label>
				<div className="flex items-center">
					<input
						name={name}
						value={value}
						onChange={onChange}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						className={`${width} ${height} ${textSize} focus:caret-primary ${
							errorMessage
								? "border-[#DE0040]"
								: "border-[#CACACA] focus:border-primary"
						} outline-none text-[#898989] font-WorkSans font-normal leading-4 p-6 rounded-[0.313rem] border-[0.0625rem] border-[#CACACA]`}
						type={showPassword ? "text" : "password"} // Toggle between text and password type
						placeholder={placeholder}
					/>
					{/* Eye icon to toggle password visibility */}
					{type === "password" && (
						<button
							type="button"
							className="absolute right-4 top-12 transform -translate-y-1/2 focus:outline-none"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeIcon
									className={`h-5 w-5 text-primary ${
										isFocused ? "text-primary" : "text-[#CACACA] "
									}`}
								/>
							) : (
								<EyeOffIcon className="h-5 w-5 text-primary" />
							)}
						</button>
					)}
				</div>
			</div>
			{errorMessage && (
				<p className="w-[21.875rem] text-sm text-[#DE0040] font-WorkSans font-normal leading-4 mt-[0.375rem]">
					{errorMessage}
				</p>
			)}
		</div>
	);
};

export default Input;
