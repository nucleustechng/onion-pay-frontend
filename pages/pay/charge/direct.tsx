import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../components/Input";
import Loader from "../../../components/Loader";
import { useRetrieveLinkMutation } from "../../../modules/Developers/retrieveLinkApi";

const DirectCharge = () => {
  const [data, setData] = useState({
    reference: "",
    amount: 0,
    customer: {
      email: "",
      name: "",
      phone: "",
    },
    customizations: {
      title: "",
      description: "",
      logo: "",
    },
    redirect_url: "",
  });

  function handleInputChange(event: any) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setData({
      ...data,
      [name]: value,
    });
  }

  function handleCustomerInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setData({
      ...data,
      customer: {
        ...data?.customer,
        [name]: value,
      },
    });
  }

  //   function handleCustomizationInputChange(event:any) {
  //     const target = event.target;
  //     const value = target.value;
  //     const name = target.name;

  //     setData({
  //       ...data,
  //       customizations: {
  //         ...data.customizations,
  //         [name]: value
  //       }
  //     });
  //   }

  const [retrieveLink, { isLoading, isSuccess, data: retrievedData }] =
    useRetrieveLinkMutation();

  const handleRetrieve = async () => {
    if (
      data?.reference &&
      data?.redirect_url &&
      data?.amount &&
      data?.customer?.email &&
      data?.customer?.name
    ) {
      await retrieveLink(data);
    } else {
      toast.error("Fill in all fields!", { autoClose: 1500 });
    }
  };

  // const router = useRouter()
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && retrievedData.success) {
      router.push(retrievedData?.link ? retrievedData?.link : "/");
    }
  }, [isSuccess, retrievedData, router]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 mt-32">
        <Input
          width="w-[20.5rem] md:w-[25rem] lg:w-[30rem]"
          name="reference"
          value={data?.reference}
          onChange={handleInputChange}
          type="text"
          label="Reference"
          placeholder="Reference"
          height="h-[3.13rem]"
          textSize="text-base"
        />

        <Input
          width="w-[20.5rem] md:w-[25rem] lg:w-[30rem]"
          name="amount"
          value={data?.amount?.toString()}
          onChange={handleInputChange}
          type="number"
          label="Amount"
          placeholder="Amount"
          height="h-[3.13rem]"
          textSize="text-base"
        />

        <Input
          width="w-[20.5rem] md:w-[25rem] lg:w-[30rem]"
          name="email"
          value={data?.customer?.email}
          onChange={handleCustomerInputChange}
          type="text"
          label="Email"
          placeholder="Email"
          height="h-[3.13rem]"
          textSize="text-base"
        />

        <Input
          width="w-[20.5rem] md:w-[25rem] lg:w-[30rem]"
          name="name"
          value={data?.customer?.name}
          onChange={handleCustomerInputChange}
          type="text"
          label="Name"
          placeholder="Name"
          height="h-[3.13rem]"
          textSize="text-base"
        />
        {/* 
      <Input
        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
        name='phone'
        value={data.customer.phone}
        onChange={handleCustomerInputChange}
        type='text'
        label='Phone'
        placeholder='Phone'
        height='h-[3.13rem]'
        textSize='text-base'
      />

      <Input
        width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
        name='title'
        value={data.customizations.title}
        onChange={handleCustomizationInputChange}
        type='text'
        label='Title'
        placeholder='Title'
        height='h-[3.13rem]'
        textSize='text-base'
        />

<Input
    width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
    name='description'
    value={data.customizations.description}
    onChange={handleCustomizationInputChange}
    type='text'
    label='Description'
    placeholder='Description'
    height='h-[3.13rem]'
    textSize='text-base'
  />

  <Input
    width='w-[20.5rem] md:w-[25rem] lg:w-[30rem]'
    name='logo'
    value={data.customizations.logo}
    onChange={handleCustomizationInputChange}
    type='text'
    label='Logo'
    placeholder='Logo'
    height='h-[3.13rem]'
    textSize='text-base'
  /> */}

        <Input
          width="w-[20.5rem] md:w-[25rem] lg:w-[30rem]"
          name="redirect_url"
          value={data?.redirect_url}
          onChange={handleInputChange}
          type="text"
          label="Redirect URL"
          placeholder="Redirect URL"
          height="h-[3.13rem]"
          textSize="text-base"
        />

        <div
          onClick={handleRetrieve}
          className="flex justify-center items-center w-44 h-11 bg-primary cursor-pointer text-white rounded-md mt-8 mb-48"
        >
          {isLoading ? <Loader /> : "Continue"}
        </div>
      </div>
    </div>
  );
};

export default DirectCharge;
