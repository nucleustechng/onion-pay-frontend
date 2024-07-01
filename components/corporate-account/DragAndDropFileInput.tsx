import React, { useState, useEffect } from "react";

interface DragAndDropFileInputProps {
	file: File | null;
	onFileChange: (file: File | null) => void;
}

const DragAndDropFileInput: React.FC<DragAndDropFileInputProps> = ({
	file,
	onFileChange,
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [inputId] = useState(
		() => `fileInput-${Math.random().toString(36).substring(2, 15)}`
	);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);

			// Cleanup the URL object when the component unmounts or when the file changes
			return () => {
				URL.revokeObjectURL(url);
				setPreviewUrl(null);
			};
		}
	}, [file]);

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			onFileChange(files[0]);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			onFileChange(e.target.files[0]);
		}
	};

	return (
		<div
			className={`border-2 border-dashed p-8 rounded-lg w-full max-w-[348px] text-center transition-colors duration-200 h-[209px] ${
				isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
			}`}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<input
				type="file"
				className="hidden"
				id={inputId}
				onChange={handleFileChange}
			/>
			<div className="">
				<label
					htmlFor={inputId}
					className="cursor-pointer text-blue-500 text-base hover:underline"
				>
					{file ? file.name : "Click to upload"}
				</label>
				<span className="text-black"> or drag and drop</span>
			</div>
			<p className="text-sm text-[#7A8094]">
				must be a PNG or JPEG (max of 10MB)
			</p>
			{/* {previewUrl && (
				<div className="mt-4">
					<img
						src={previewUrl}
						alt="Preview"
						className="w-full max-w-xs mx-auto h-11"
					/>
				</div>
			)} */}
		</div>
	);
};

export default DragAndDropFileInput;
