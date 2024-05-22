import { FaBox, FaDollarSign, FaHeadphones, FaStripe, FaWallet } from "react-icons/fa"

const Services = () => {
    return (
        <div className='sm:mx-12 mb-32 mt-8 sm:mt-16 flex flex-wrap justify-center'>
            <div className='h-40 rounded-lg w-56 mx-4 mt-8 bg-gray-200'>
                <FaBox className="text-3xl m-5" />
                <p className="font-bold text-sm mx-4">Free Shipping</p>
                <p className="font-semibold mx-4">On orders above 20$ nationwide</p>
            </div>
            <div className='h-40 rounded-lg w-56 mx-4  mt-8 bg-gray-200'>
                <FaDollarSign className="text-4xl m-5" />
                <p className="font-bold text-sm mx-4">Money Guarentee 3 days</p>
                <p className="font-semibold mx-4"> 20 days for exchange </p>

            </div>
            <div className='h-40 rounded-lg w-56 mx-4  mt-8 bg-gray-200'>
                <FaHeadphones className="text-4xl m-5" />
                <p className="font-bold text-sm mx-4">Online Support</p>
                <p className="font-semibold mx-4">24hr/7 Service</p>

            </div>
            <div className='h-40 rounded-lg w-56 mx-4  mt-8 bg-gray-200'>
                <FaWallet className="text-4xl my-3 ml-4" />
                <div className="flex flex-row items-center mx-4">
                    <p className="font-bold text-sm ">Powered with  </p><FaStripe className="text-4xl ml-2 " />
                </div>
                <p className="font-semibold mx-4">Safe & Secure Online Payments</p>
            </div>
        </div>
    )
}

export default Services
