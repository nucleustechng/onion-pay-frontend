import CopyIcon from '../../Assets/icon/CopyIcon.svg'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer ,toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '../../Assets/icons/Edit.svg'
import TrashIcon from '../../Assets/icon/TrashIcon.svg'
import EditLinkModal from './modals/EditLinkModal';
import DeleteLinkModal from './modals/DeleteLinkModal';



interface Props  {
    paymentLink:string,
    pageName:string,
    amount:number,
    description?:string,
    pageId:string,
    redirectUrl:string
    onEllipsisClick: (paymentLink: string) => void;
    
}

const PaymentTable = ({paymentLink,amount,pageId,pageName,description,onEllipsisClick,redirectUrl}: Props) => {
    const [selectedLinkId, setSelectedLinkId] = useState<string>('');
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [selectedAmount, setSelectedAmount] = useState<number | any>();

    const [isEdit,setEdit] = useState<boolean>(false)

    const [showModal, setShowModal] = useState(false);

    const handleEllipsisClick = () => {
        setShowPopover(true)
        setSelectedLinkId(pageId)
        setSelectedTitle(pageName)
        setSelectedAmount(amount)

        onEllipsisClick(paymentLink);
        console.log('Works',pageName,pageId,amount)
     };

    const copyToClipboard = (copyItem:any) => {
        navigator.clipboard.writeText(copyItem);
        toast.success('Copied!!',{autoClose:100,})
     };

     const [showPopover, setShowPopover] = useState<boolean>(false);
     const popoverRef = useRef<HTMLDivElement>(null);

     const handleClickOutsidePopover = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
          setShowPopover(false);
          setSelectedLinkId('');
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsidePopover);
        return () => {
          document.removeEventListener('mousedown', handleClickOutsidePopover);
        };
      }, []);
    
  return (
    <div>
        <ToastContainer/>
         <div className='flex items-center  rounded-[0.32rem] w-[71.5rem] h-[3.75rem] '>
            <div className='w-[10.25rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>{pageName}</h1>
            </div>
            <div className='w-[12.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>{amount}</h1>
            </div>
            <div className='w-[10.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem]'>{pageId}</h1>
            </div>
            <div className='w-[14.3rem]'>
                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-[1.2rem] truncate'>{description}</h1>
            </div>
            <div className="flex items-center justify-between w-[22.3rem]  ">
                <div className="w-[20rem]  flex gap-14 items-center " >
                    <p className="w-[15rem]">{paymentLink}</p>
                    <div className='cursor-pointer' onClick={() => copyToClipboard(paymentLink)}>
                        <Image src={CopyIcon} alt='Copy Icon' /> 
                    </div>
                </div>
                    <div className='w-6 flex justify-center items-center' onClick={handleEllipsisClick}>
                        <FontAwesomeIcon icon={faEllipsisV}/>
                    </div>
            </div>
            {showPopover && selectedLinkId && (
                <div
                className="absolute drop-shadow-lg  w-40 h-[5rem] left-[59rem] bg-white rounded-md"
                ref={popoverRef}
                style={{
                    top: `calc(${popoverRef.current?.parentElement?.getBoundingClientRect().top}px + 2rem)`,
                    left: `calc(${popoverRef.current?.parentElement?.getBoundingClientRect().left}px + 2rem)`,
                }}
                >
                    <div className='flex flex-col gap-4 px-[0.625rem] py-4'>
                        <div className='flex justify-between items-center' onClick={() => {
                            setEdit(true)
                            setShowModal(true)
                            setShowPopover(false)
                            }}>
                            <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Edit</h1>
                            <Image src={EditIcon} alt='Edit Icon' width={16} height={16}/>
                        </div>
                        <div className='flex justify-between items-center' onClick={() => {
                                setEdit(false)
                                setShowModal(true)
                                setShowPopover(false)
                        }}>
                            <h1 className='text-sm text-[#DE0040] font-WorkSans font-normal leading-4'>Delete</h1>
                            <Image src={TrashIcon} alt='Edit Icon' width={16} height={16}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
        {isEdit && <EditLinkModal
                     isVisible={showModal}  
                     onClose={async () => setShowModal(false)} 
                     prevPageID={selectedLinkId}
                     prevPageName={pageName}
                     prevAmount={amount}
                     prevDescription={description ? description : ''}
                     prevRedirect={redirectUrl}
                     />}
        {!isEdit && <DeleteLinkModal amount={selectedAmount} pageName={selectedTitle}  isVisible={showModal}  onClose={async () => setShowModal(false)} pageID={selectedLinkId}/>}

    </div>
  )
}

export default PaymentTable