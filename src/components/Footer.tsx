import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <div className="footer bg-gray-900 text-white mt-16">
            <div className="container mx-auto flex flex-wrap px-8 pt-3 pb-12">
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg md:font-semibold text-gray-300">Company</h1>
                    <ul className="text-md md:text-lg text-gray-400">
                        <li>About</li>
                        <li>Mission</li>
                        <li>Services</li>
                        <li>Social</li>
                        <li>Get in touch</li>
                    </ul>
                </div>
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-300">Products</h1>
                    <ul className="text-md md:text-lg ">
                        <li><Link className="text-gray-400" to={"/search/laptop"} onClick={() => window.scroll(0, 0)}>Laptop</Link></li>
                        <li><Link className="text-gray-400" to={"/search/mobile"} onClick={() => window.scroll(0, 0)}>Mobile</Link></li>
                        <li><Link className="text-gray-400" to={"/search/wearables"} onClick={() => window.scroll(0, 0)}>Wearables</Link></li>
                        <li><Link className="text-gray-400" to={"/search/pc"} onClick={() => window.scroll(0, 0)}>Pc's</Link></li>
                        <li><Link className="text-gray-400" to={"/search/shoe"} onClick={() => window.scroll(0, 0)}>Shoe</Link></li>
                    </ul>
                </div>
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-300">Pages</h1>
                    <ul className="text-md md:text-lg text-gray-300">
                        <li><Link className="text-gray-400" to={"/"} onClick={() => window.scroll(0, 0)}>Home</Link></li>
                        <li><Link className="text-gray-400" to={"/search"} onClick={() => window.scroll(0, 0)}>Search</Link></li>
                        <li><Link className="text-gray-400" to={"/orders"} onClick={() => window.scroll(0, 0)}>Orders</Link></li>
                        <li><Link className="text-gray-400" to={"cart"} onClick={() => window.scroll(0, 0)}>Cart</Link></li>

                    </ul>
                </div>
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-300">Support</h1>
                    <ul className="text-md md:text-lg text-gray-400">
                        <li>Contact us</li>
                        <li>Web chat</li>
                        <li>Open ticket</li>
                    </ul>
                </div>
                <div className="w-full flex flex-col justify-center lg:w-1/5">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-300">Social</h1>
                    <ul className="flex text-md md:text-lg text-gray-300">
                        <a href="https://linkedin.com" target="main" className="text-white text-3xl mx-2"><FaLinkedin /></a>
                        <a href="https://instagram.com" target="main" className="text-white text-3xl"><FaInstagram /></a>
                        <a href="https://twitter.com" target="main" className="text-white text-3xl  mx-2"><FaTwitter /></a> 
                        <a href="https://github.com" target="main" className="text-white text-3xl"><FaGithub /></a>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Footer
