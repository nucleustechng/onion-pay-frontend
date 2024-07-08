import React, { useState } from "react";
import DragAndDropFileInput from "../DragAndDropFileInput";
import { Label } from "../../../@/components/ui/label";
import { Button } from "../../../@/components/ui/button";

const CertificateForm = () => {
	const labels = [
		"CAC certificate",
		"Utility Bill",
		"Proof of address verification",
		"SCUML certificate",
		"Regulatory license fintech",
	];
	const [files, setFiles] = useState<(File | null)[]>(
		Array(labels.length).fill(null)
	);

	const handleFileChange = (index: number, file: File | null) => {
		const newFiles = [...files];
		newFiles[index] = file;
		setFiles(newFiles);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission and process files
		console.log("Uploaded files:", files);
	};

	return (
		<div className="bg-[#F5F5F5] px-4 py-4 rounded-[10px]">
			<form
				onSubmit={handleSubmit}
				className=" space-y-4"
			>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{files.map((file, index) => (
						<div
							key={index}
							className="flex flex-col gap-2"
						>
							<Label>{labels[index]}*</Label>
							<DragAndDropFileInput
								file={file}
								onFileChange={(file: any) => handleFileChange(index, file)}
							/>
						</div>
					))}
				</div>
				<div className="flex items-center justify-between pb-4 pt-8 lg:pt-20">
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
		</div>
	);
};

export default CertificateForm;
