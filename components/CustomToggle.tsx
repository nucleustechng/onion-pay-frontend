interface Props {
  value: boolean;
  onChange: () => void;
}

const CustomToggle = ({ value, onChange }: Props) => {
  return (
    <div
      onClick={onChange}
      className={`flex w-9 h-4 cursor-pointer shadow-md ${value ? "bg-primary" : "bg-[#F5F0F3]"} rounded-full transition-all duration-500`}
    >
      <span
        className={`h-4 w-4 transition-all duration-500 cursor-pointer shadow-lg ${value ? "ml-5" : "ml-0"} ${value ? "bg-white" : "bg-[#898989]"} rounded-full`}
      />
    </div>
  );
};

export default CustomToggle;
