import { useState } from "react";
import toast from "react-hot-toast";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

type DropSearchProps = {
  isLink?: boolean
  options:
  {
    key: string;
    value: any;
  }[]

}

const DropDown = ({ options }: DropSearchProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative"  >
      <button
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
        className="flex items-center space-x-1 px-2 py-1 font-semibold text-lg rounded-md focus:outline-none focus:ring focus:border-blue-400"
      >
        <span>Dashboard</span>
        <BiChevronRight className={`transition-all duration-300 ${open && 'rotate-90'}`} />

      </button>
      {open && (
        <div
          className="absolute z-30 animate-modal p-2 w-44 origin-top-lebft bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {options.map((option, index) => (
            <Link key={index} to={option.value} className="block border-none w-full rounded-md p-2 text-left text-md font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              {option.key}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export const DropDownAdmin = ({ options }: DropSearchProps) => {
  const [open, setOpen] = useState(false);
  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    toast.success('Text Copied')
  };

  return (
    <div className="relative" >
      <button
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 170)}
        className="flex items-center space-x-1 px-2 py-1 font-semibold text-lg rounded-md "
      >
        <span>Details</span>
      </button>
      {open && (
        <div
          className="absolute z-30 animate-modal p-2 origin-top-lebft bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {options.map((option) => (
            <abbr title={option.key+': '+option.value} key={option.key} onClick={() => copyText(option.value)} className="cursor-pointer no-underline block w-full rounded-md p-2 text-left text-md font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              {option.value || 'N/A'}
            </abbr>
          ))}
        </div>
      )}
    </div>
  );
};
export default DropDown;