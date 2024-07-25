import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../@/components/ui/button";
import Cookies from "js-cookie";

interface Props {
  nextFunc: () => {};
}

const UpgradeWalletModal = ({ nextFunc }: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const captureImage = useCallback(() => {
    const imageSrc: any = webcamRef.current?.getScreenshot();
    Cookies.set("selfie", imageSrc);
    setCapturedImage(imageSrc);
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-center mt-6">
          <div className="flex justify-center w-full bg-[#1B1A1A]">
            <div className="flex flex-col">
              <h1 className="text-white text-center text-sm font-WorkSans font-normal leading-4 mt-4">
                Fit your face in the space bellow
              </h1>
              <div className="relative w-[14.9rem] h-[22rem] border-[#FF9635] border-[0.0625rem] rounded-full overflow-hidden mt-4">
                {capturedImage ? (
                  <Image
                    src={capturedImage}
                    width={238.4}
                    height={352}
                    className="object-cover w-full h-full"
                    alt="Captured"
                  />
                ) : (
                  <Webcam
                    audio={false}
                    mirrored={true}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {!capturedImage ? (
            <Button onClick={captureImage} className="w-full text-white">
              Capture
            </Button>
          ) : (
            <div className="flex flex-col w-full gap-4">
              <Button
                onClick={captureImage}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
              >
                Retake Photo
              </Button>
              <Button onClick={() => nextFunc()} className="w-full text-white">
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradeWalletModal;
