import React, { useRef } from 'react'

type Props = {
    fields: number;
    onComplete: (otp: string) => void;
};

const OtpInput = ({fields,onComplete}: Props) => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const otp = inputRefs.current
        .filter((input) => input !== null)
        .map((input) => input?.value)
        .join('');
  
      if (otp.length === fields) {
        onComplete(otp);
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text/plain').substr(0, fields);
      const otp = pastedData.split('');
  
      otp.forEach((value, index) => {
        inputRefs.current[index]!.value = value;
      });
  
      onComplete(pastedData);
    };
  
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && index > 0 && inputRefs.current[index]?.value === '') {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key !== 'Backspace' && index < fields - 1 && inputRefs.current[index]?.value !== '') {
        inputRefs.current[index + 1]?.focus();
      }
    };

  return (
    <div>
        {Array(fields)
        .fill(null)
        .map((_, index) => (
          <input type="text" 
            key={index}
            max={1}
            inputMode="text"
            autoComplete="off"
            onChange={(e) => handleInput(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(ref) => {
                inputRefs.current[index] = ref;
            }}
            className='w-[3.125rem] mb-2 md:w-[4.4375rem] mr-2 h-[3.125rem] text-xl caret-primary outline-none px-[0.625rem] 
            rounded-[0.3125rem] border-[#CACACA]  focus:border-primary border-[0.0675rem]' />
        ))}
    </div>
  )
}

export default OtpInput