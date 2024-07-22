import { useState, useRef } from "react";
import { checkFileSize } from "../../../@/lib/utils";
import { toast } from "react-toastify";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { useMutation } from "@tanstack/react-query";
import { useBusiness } from "../../../modules/services/useBusiness";

type Props = {
  closeModal: () => void;
};

const UpgradeWalletForm: React.FC<Props> = ({ closeModal }) => {
  const { upgradeWallet } = useBusiness();
  const [step, setStep] = useState(0);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [utilityBill, setUtilityBill] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [idType, setIdType] = useState("");
  const [expiryDate, setExpiryDate] = useState<any>();
  const [issueDate, setIssueDate] = useState<any>();
  const [idNumber, setIdNumber] = useState<string>("");
  const [address, setAddress] = useState({
    houseNumber: 0,
    streetName: "",
    city: "",
    localGovernment: "",
    state: "",
    nearestLandmark: "",
  });

  const [progress, setProgress] = useState(0);

  const hiddenSelfieInput = useRef<HTMLInputElement>(null);
  const hiddenSignatureInput = useRef<HTMLInputElement>(null);
  const hiddenUtilityBillInput = useRef<HTMLInputElement>(null);
  const hiddenDocumentInput = useRef<HTMLInputElement>(null);

  const handleSelfieClick = () => {
    hiddenSelfieInput.current?.click();
  };

  const handleSignatureClick = () => {
    hiddenSignatureInput.current?.click();
  };

  const handleUtilityClick = () => {
    hiddenUtilityBillInput.current?.click();
  };

  const handleDocumentClick = () => {
    hiddenDocumentInput.current?.click();
  };

  const handleIdTypeChange = (value: string) => {
    setIdType(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const selfieChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (checkFileSize(selectedFile)) {
        setSelfie(selectedFile);
      } else {
        toast.error("File size should not be more than 150KB");
      }
    }
  };

  const signatureChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (checkFileSize(selectedFile)) {
        setSignature(selectedFile);
      } else {
        toast.error("File size should not be more than 150KB");
      }
    }
  };

  const utilitybillChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (checkFileSize(selectedFile)) {
        setUtilityBill(selectedFile);
      } else {
        toast.error("File size should not be more than 150KB");
      }
    }
  };

  const documentChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (checkFileSize(selectedFile)) {
        setDocument(selectedFile);
      } else {
        toast.error("File size should not be more than 150KB");
      }
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const { mutate } = useMutation({
    mutationFn: upgradeWallet,
    onMutate: () => {
      setProgress(10);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 90) {
            return prevProgress + 10;
          } else {
            clearInterval(interval);
            return prevProgress;
          }
        });
      }, 500); // Adjust the interval time as needed
    },
    onSuccess: ({ success, reason }) => {
      setProgress(100);
      if (success) {
        toast.success(
          "Upgrade request successful. An email will be sent when your wallet is upgraded.",
        );
        setStep(5); // Move to the next step when progress reaches 100%
      } else {
        toast.error(reason);
      }
    },
    onError: () => {
      toast.error("There was an error processing your request.");
    },
  });

  function handleSubmit() {
    mutate({
      address: {
        city: address.city,
        houseNumber: address.houseNumber.toString(),
        localGovernment: address.localGovernment,
        nearestLandmark: address.nearestLandmark,
        state: address.state,
        streetName: address.streetName,
      },
      documentDetails: {
        document: document,
        signature: signature,
        utilityBill: utilityBill,
        selfie: selfie,
      },
      idDetails: {
        idExpiryDate: expiryDate,
        idIssueDate: issueDate,
        idNumber: idNumber,
        idType,
      },
    });
  }

  return (
    <div>
      {step === 0 && (
        <Step1
          selfie={selfie}
          handleSelfieClick={handleSelfieClick}
          selfieChange={selfieChange}
          hiddenSelfieInput={hiddenSelfieInput}
          setSteps={setStep}
          closeModal={handleCloseModal}
        />
      )}
      {step === 1 && (
        <Step2
          handleDocumentClick={handleDocumentClick}
          handleSignatureClick={handleSignatureClick}
          handleUtilityClick={handleUtilityClick}
          hiddenDocumentInput={hiddenDocumentInput}
          hiddenSignatureInput={hiddenSignatureInput}
          hiddenUtilityBillInput={hiddenUtilityBillInput}
          documentChange={documentChange}
          signatureChange={signatureChange}
          utilitybillChange={utilitybillChange}
          signature={signature}
          utilityBill={utilityBill}
          document={document}
          setSteps={setStep}
          closeModal={handleCloseModal}
        />
      )}
      {step === 2 && (
        <Step3
          setSteps={setStep}
          closeModal={handleCloseModal}
          handleIdTypeChange={handleIdTypeChange}
          setExpiryDate={setExpiryDate}
          setIdNumber={setIdNumber}
          setIssueDate={setIssueDate}
        />
      )}
      {step === 3 && (
        <Step4
          setSteps={setStep}
          closeModal={handleCloseModal}
          handleAddressChange={handleAddressChange}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 4 && (
        <Step5
          setSteps={setStep}
          closeModal={handleCloseModal}
          progress={progress}
        />
      )}
      {step === 5 && <Step6 setSteps={setStep} closeModal={handleCloseModal} />}
    </div>
  );
};

export default UpgradeWalletForm;
