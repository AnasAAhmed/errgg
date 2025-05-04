import { MdEmail } from "react-icons/md";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Banner from "../components/Banner";
import { BiCurrentLocation, BiPhone } from "react-icons/bi";
import { FaClock } from "react-icons/fa";

const Contact = () => {
    return (
        <>
            <div className="w-full bg-white overflow-hidden text-left text-black font-poppins">

                <Banner
                    imgUrl="/contactBanner.jpg"
                    heading="Contact"
                    text="  24/7 Service available"
                    btnText="Contact"
                    shade=""
                />
                <div className="flex flex-col items-center py-16 px-4">
                    <h1 className="text-3xl font-semibold">Get In Touch With Us</h1>
                    <p className="text-center text-gray-500 mt-4 mb-8 max-w-xl">
                        For more information about our products & services, please feel free
                        to drop us an email. Our staff is always here to help you out. Do not
                        hesitate!
                    </p>
                    <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
                        <ContactContainer />
                        <form id="form" className="flex flex-col gap-6 w-full lg:w-1/2 bg-white p-8 rounded shadow-md">
                            <div>
                                <label className="block text-lg font-medium">Your name</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium">Email address</label>
                                <input
                                    type="email"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded"
                                    placeholder="Abc@def.com" required
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium">Subject</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded"
                                    placeholder="This is optional"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium">Message</label>
                                <textarea
                                    className="w-full mt-2 p-3 border border-gray-300 rounded h-32"
                                    placeholder="Hi! I’d like to ask about..." required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="mt-4 py-3 px-6 bg-black text-white rounded hover:bg-gray-800"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Services />
            <Footer />
        </>
    );
};

const ContactContainer = () => {
    return (
        <div className="w-full lg:w-1/2 flex flex-col gap-6 p-8 rounded shadow-md bg-white">
            <div className="flex items-center gap-4">
                <BiCurrentLocation size={'1.7rem'} />
                <div>
                    <h3 className="text-lg font-medium">Address</h3>
                    <p className="text-gray-600">
                        236 5th SE Avenue, New York NY10000, United States
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <BiPhone size={'1.7rem'} />
                <div>
                    <h3 className="text-lg font-medium">Phone</h3>
                    <p className="text-gray-600">Mobile: +(84) 546-6789</p>
                    <p className="text-gray-600">Hotline: +(84) 456-6789</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <MdEmail size={'1.7rem'} />
                <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-600">example@gmail.com</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <FaClock size={'1.7rem'} />
                <div>
                    <h3 className="text-lg font-medium">Working Time</h3>
                    <p className="text-gray-600">Monday-Friday: 9:00 - 22:00</p>
                    <p className="text-gray-600">Saturday-Sunday: 9:00 - 21:00</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
