import React, { useState } from "react";
import DragAndDropFileInput from "../DragAndDropFileInput";
import { Label } from "../../../@/components/ui/label";
import { Button } from "../../../@/components/ui/button";
import { useBusiness } from "../../../modules/services/businessService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCorporate } from "../../../modules/services/corporateService";
import { toast } from "react-toastify";
import { ReloadIcon } from "@radix-ui/react-icons";
import { checkFileSize } from "../../../@/lib/utils";

type Props = {
  nextStep: (step: number) => void;
  business: any;
};

const CertificateForm = ({ nextStep, business }: Props) => {
  console.log(business);
  const labels = [
    "CAC certificate",
    "Utility Bill",
    "Proof of address verification",
    "SCUML certificate",
    "Regulatory license fintech (optional)",
  ];

  const queryClient = useQueryClient();

  const { uploadCertificates } = useCorporate();
  const { mutate, isPending } = useMutation({
    onSuccess: ({ success, reason }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: ["business"],
        });
        nextStep(2);
      } else {
        toast.error(reason);
      }
    },
    onError: () => {},
    mutationFn: uploadCertificates,
  });

  const [files, setFiles] = useState<(File | null)[]>(
    Array(labels.length).fill(null),
  );

  const handleFileChange = (index: number, file: File | null) => {
    if (checkFileSize(file)) {
      const newFiles = [...files];
      newFiles[index] = file;
      setFiles(newFiles);
    } else {
      toast.error("File size should not be more than 150KB");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and process files
    mutate({
      cacCertificate: files[0],
      utilityBill: files[1],
      proofOfAddressVerification: files[2],
      scumlCertificate: files[0],
      regulatoryLicenseFintech: files[4],
    }); //
  };

  const { getBusinessInfo } = useBusiness();

  const { data: businessData } = useQuery({
    queryKey: ["business"],
    queryFn: getBusinessInfo,
  });

  console.log(businessData);

  return (
    <div className="bg-[#F5F5F5] px-4 py-4 rounded-[10px]">
      <form onSubmit={handleSubmit} className=" space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Label>
                {labels[index]}
                {index > 3 ? " (optional)" : ""}*
              </Label>
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
            type="button"
            variant="outline"
            onClick={() => nextStep(0)}
          >
            Previous
          </Button>
          <Button className="w-[124px] text-white" type="submit">
            {isPending ? <ReloadIcon className="animate-spin" /> : `Next`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
