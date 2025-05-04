import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <div className="footer bg-gray-100 border-t text-gray-800 mt-16">
            <div className="container mx-auto flex flex-wrap px-8 pt-3 pb-12">
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg md:font-semibold text-gray-700">Company</h1>
                    <ul className="text-md md:text-lg text-gray-800 font-semibold">
                        <li>About</li>
                        <li><Link className="text-gray-800" to={"/blog"} onClick={() => window.scroll(0, 0)}>Blog</Link></li>
                        <li>Services</li>
                    </ul>
                </div>
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-700">Products</h1>
                    <ul className="text-md md:text-lg font-semibold">
                        <li><Link className="text-gray-800" to={"/search/laptop"} onClick={() => window.scroll(0, 0)}>Laptop</Link></li>
                        <li><Link className="text-gray-800" to={"/search/mobile"} onClick={() => window.scroll(0, 0)}>Mobile</Link></li>
                        <li><Link className="text-gray-800" to={"/search/men"} onClick={() => window.scroll(0, 0)}>Men</Link></li>
                        <li><Link className="text-gray-800" to={"/search/women"} onClick={() => window.scroll(0, 0)}>Women</Link></li>
                        <li><Link className="text-gray-800" to={"/search/pc"} onClick={() => window.scroll(0, 0)}>Pc's</Link></li>
                        <li><Link className="text-gray-800" to={"/search/shoe"} onClick={() => window.scroll(0, 0)}>Shoe</Link></li>
                    </ul>
                </div>
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-700">Pages</h1>
                    <ul className="text-md md:text-lg text-gray-700 font-semibold">
                        <li><Link className="text-gray-800" to={"/"} onClick={() => window.scroll(0, 0)}>Home</Link></li>
                        <li><Link className="text-gray-800" to={"/search"} onClick={() => window.scroll(0, 0)}>Search</Link></li>
                        <li><Link className="text-gray-800" to={"/orders"} onClick={() => window.scroll(0, 0)}>Orders</Link></li>
                        <li><Link className="text-gray-800" to={"/cart"} onClick={() => window.scroll(0, 0)}>Cart</Link></li>

                    </ul>
                </div>
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-700">Support</h1>
                    <ul className="text-md md:text-lg text-gray-800 font-semibold">
                        <li><Link className="text-gray-800" to={"/contact"} onClick={() => window.scroll(0, 0)}>Contact</Link></li>
                        <li>Web chat</li>
                        <li>Open ticket</li>
                    </ul>
                </div>
                <div className="w-full flex flex-col justify-center lg:w-1/5">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-700">Social</h1>
                    <ul className="flex text-md md:text-lg text-gray-700">
                        <a title="Check Out my linkedIn profile" href="https://www.linkedin.com/in/anas-ahmed-37258b319" target="main" className="text-gray-800 text-3xl mx-2"><FaLinkedin /></a>
                        <a title="Check Out my github profile" href="https://github.com/AnasAAhmed" target="main" className="text-gray-800 text-3xl"><FaGithub /></a>
                        <a title="Check Out our instagram profile" href="https://instagram.com" target="main" className="text-gray-800 text-3xl"><FaInstagram /></a>
                        <a title="Check Out our twitter profile" href="https://twitter.com" target="main" className="text-gray-800 text-3xl  mx-2"><FaTwitter /></a>
                    <a title="Hire me on Fiverr." href="https://www.fiverr.com/sellers/anas_ahmed_24" target="main" className="text-gray-800 text-sm"><svg width="60" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg></a>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Footer
