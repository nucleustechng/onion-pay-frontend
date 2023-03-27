import React from 'react'



interface Props {
    width:string,
    height:string,
    backgroundColor:string,
    mainText:any,
    color:string,
    borderColor?:string,
    borderWidth?:string,
    textSize:string,
    handlerFunc?:() => void;
}

const ButtonRegular = ({width,height,backgroundColor,mainText,color,borderColor,borderWidth,textSize,handlerFunc}: Props) => {
  return (
    <div>
        <div onClick={handlerFunc} className={`${width} ${height} cursor-pointer h-11 flex justify-center items-center ${backgroundColor} ${borderColor} ${borderWidth}  rounded-[0.313rem]`}>
            <div className='flex justify-center'>
                <div className={`${color} ${textSize} flex justify-center items-center  font-WorkSans font-normal leading-5`}>{mainText}</div>
            </div>
        </div>
    </div>
  )
}

export default ButtonRegular