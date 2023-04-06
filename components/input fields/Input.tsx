import React, { ChangeEvent, useState } from 'react'

interface Props  {
    label?:string,
    placeholder?:string,
    type:string,
    width:string,
    horizontalPadding?:string,
    height?:string,
    errorMessage?:string,
    name?:string,
    value?:string,
    onChange?:(event: ChangeEvent<HTMLInputElement>) => void;
    inputMode?:string,
}

const Input = ({label,placeholder,type,width,horizontalPadding,height,errorMessage,value,name,onChange,inputMode}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="company-name" className={`text-[#262626] text-sm 
            ${errorMessage ? 'text-[#DE0040]' : ''} ${(!isFocused && !errorMessage) && 'text-primaryText'} ${(isFocused && !errorMessage) && 'text-primary'}
            font-WorkSans font-normal leading-4`}>{label}</label>
            <input 
            inputMode={inputMode}
            required
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)} 
            className={`${width} ${height ? height : 'h-[3.15rem]'} focus:caret-primary  ${errorMessage ? 'border-[#DE0040]' : 'border-[#CACACA] focus:border-primary'} outline-none 
      text-[#898989] font-WorkSans font-normal leading-4 p-6
      rounded-[0.313rem] border-[0.0625rem] border-[#CACACA] ${horizontalPadding ? horizontalPadding : 'pl-6'} text-sm text-[#898989] font-WorkSans font-normal leading-4`}/>
        </div>
    </div>
  )
}

export default Input