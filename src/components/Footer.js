import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../images/Nayahfood.png"
import { MdOutlineEmail, MdOutlineCalendarMonth } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { BsShield } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";

const FooterBar = () => {

    const [ScreenWidth, setWidth] = useState(window.innerWidth);
    // console.log(ScreenWidth);


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div className="footer " style={ScreenWidth > 400 ? {} : {}}>

            <div className={ScreenWidth < 400 ? " d-flex justify-content-center mb-2 " : "d-flex justify-content-center "}>
                <img src={logo} alt="logo" width="180px" height={ScreenWidth < 400 ? "" : 200} />
            </div>

            <div className=" gap-4 menu mb-3 ">
                <span >Service</span>
                <span>Product</span>
                <span>Company</span>
                <span>Legal</span>
                <span>Contact</span>
            </div>
            <div className="menu gap-3 mb-3">
                <span className="icon"><MdOutlineEmail size={20} fontWeight={150} /></span>
                <span className="icon"><BiMessageDetail size={20} fontWeight={150} /></span>
                <span className="icon"><MdOutlineCalendarMonth size={20} fontWeight={150} /></span>
                <span className="icon"><BsShield size={17} fontWeight={300} /></span>
                <span className="icon"><FaRegClock size={20} fontWeight={150} /></span>
            </div>

            <div className=" d-flex flex-wrap  gap-3 justify-content-evenly mb-5">
                <span>Terms & Service</span>
                <span>All copyrights are claimed &copy; 2023</span>
                <span>Privacy Policy</span>
            </div>

        </div>
    )
}

export default FooterBar;