import { MdEmail } from "react-icons/md";
import Footer from "../components/Footer";
import Services from "../components/Services";

const Contact = () => {
    return (
        <>
            <div className="w-full bg-white overflow-hidden text-left text-black font-poppins">
                <div className="relative w-full h-[300px]  sm:h-[400px] md:h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url("https://figma-to-code-ecom-design.vercel.app/banner-image@2x.png")' }}>
                    <div className="absolute inset-0 to-transparent opacity-60"></div>
                    <div className="relative z-5 flex flex-col items-center justify-center h-full text-center text-black px-6 md:px-12 lg:px-24">
                        <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
                            Contact
                        </h1>
                        <p className="text-2xl sm:text-3xl mb-10 font-semibold">
                            24/7 Service available
                        </p>
                        <button onClick={()=>window.scroll(0,700)} className="bg-white text-black font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            Contact
                        </button>
                    </div>
                </div>
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
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium">Email address</label>
                                <input
                                    type="email"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded"
                                    placeholder="Abc@def.com"
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
                                    placeholder="Hi! I’d like to ask about..."
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
                <img
                    src="https://figma-to-code-ecom-design.vercel.app/vector1.svg"
                    alt="Address icon"
                    className="w-8 h-8"
                />
                <div>
                    <h3 className="text-lg font-medium">Address</h3>
                    <p className="text-gray-600">
                        236 5th SE Avenue, New York NY10000, United States
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <img
                    src="https://figma-to-code-ecom-design.vercel.app/bxsphone.svg"
                    alt="Phone icon"
                    className="w-8 h-8"
                />
                <div>
                    <h3 className="text-lg font-medium">Phone</h3>
                    <p className="text-gray-600">Mobile: +(84) 546-6789</p>
                    <p className="text-gray-600">Hotline: +(84) 456-6789</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <MdEmail className="w-8 h-8" />
                <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-600">example@gmail.com</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <img
                    src="https://figma-to-code-ecom-design.vercel.app/biclockfill.svg"
                    alt="Clock icon"
                    className="w-8 h-8"
                />
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
