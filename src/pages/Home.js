import React from "react";
import "./Style.css";
import HeroSection from "../images/HeroSection.png"
import MenuBar from "../components/NavBar";
import Fennel from "../images/Fennel.png";
import Flax from "../images/Flax.png";
import Fenugreek from "../images/Fenugreek.png";
import Ragi from "../images/Ragi.png";
import Garlic from "../images/Garlic.png";
import product from "../images/ProductSection.png"
import service from "../images/Service.png"
import FooterBar from "../components/Footer";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <MenuBar />
<div className="w-100">
            <div className="home">
                <div className=" home-section1 ">
                    <div className="row ">
                        <div className="col-md-6 hero-left ">
                            <h3 className=" quotes mt-3 px-5 d-flex">Lets step up your Health and Lifestyle</h3>
                            <p className="px-5 mb-3 ">It nutrient-rich boost with benefits including digestive health support, sustained energy release, and contributions to heart health. Versatile in use, they provide a convenient way to enhance overall well-being through diverse and balanced nutritional intake.</p>
                            <div className="inline-flex px-5  d-flex gap-3 pb-3">
                                <NavLink to="/productpage">
                                    <button type="button" style={{ border: "none", fontWeight: 500, borderRadius: "8px", backgroundColor: "rgb(245, 242, 237)", padding: "2px,4px" }}>Shop Now</button></NavLink>
                                <button type="button" style={{ border: "1px solid ", fontWeight: 500, borderRadius: "8px", background: "transparent", padding: "2px,4px" }}>Explore</button>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center hero-right p-4">
                            <img src={HeroSection} alt="HeroSection" width="100%"/>
                        </div>
                    </div>
                </div>
                <div className="home-section2 ">
                    <div className="container">
                        <div className="py-5 d-flex justify-content-evenly flex-wrap">
                            <div className=" shadow mb-2 ">
                                <span className="d-flex justify-content-center align-items-center p-2">
                                    <h1>100%</h1>
                                    <h6>organic<br />product</h6>
                                </span>
                            </div>
                            <div className=" shadow mb-2 ">
                                <span className="d-flex justify-content-center align-items-center p-2">
                                    <h1>10+</h1>
                                    <h6>certified<br />products</h6>
                                </span>
                            </div>
                            <div className=" shadow  mb-2">
                                <span className="d-flex justify-content-center align-items-center p-2">
                                    <h1>50+</h1>
                                    <h6>Healthy<br />community </h6>
                                </span>
                            </div>
                        </div>
                        <div className=" pb-3">
                            <h1 className="text-center mb-5">Our Products</h1>
                            <div className="row ">
                                <div className="col-md-6 ">
                                    <span className="d-block mb-4" style={{ border: "none", borderRadius: "20px", backgroundColor: "rgb(154, 151, 218)", color: "white", fontWeight: 500, padding: "2px 10px", textAlign: "center", width: "fit-content" }}>Star with a Healthy Granola</span>

                                    <div className="d-flex justify-content-center mb-4">
                                        <span className="d-block " style={{ border: "none", borderRadius: "20px", backgroundColor: "rgb(154, 151, 218)", color: "white", fontWeight: 500, padding: "2px 10px", textAlign: "center", width: "50%", marginLeft: "-10%" }}>Packed with Vitamins & Minerals</span>
                                    </div>

                                    <div className="d-flex justify-content-center mb-5">
                                        <span className="d-block  " style={{ border: "none", borderRadius: "8px", backgroundColor: "rgb(165, 190, 106)", color: "white", fontWeight: 500, padding: "2px 8px", textAlign: "center", justifyContent: "center" }}>It help's to reduce high blood pressure and hidh blood sugar level and Also good for skin and hair growth </span>
                                    </div>

                                    <div className="d-flex gap-4 justify-content-center" >
                                        <img className="d-inline" src={Fennel} alt="Fennel" width="15%" />
                                        <img className="d-inline" src={Fenugreek} alt="Fenugreek" width="15%" />
                                        <img className="d-inline" src={Ragi} alt="Ragi" width="15%" />
                                        <img className="d-inline" src={Flax} alt="Flax" width="15%" />
                                        <img className="d-inline" src={Garlic} alt="Garlic" width="15%" />
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-center">
                                    <img className="" src={product} alt="product" width="80%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-section3 my-5">
                    <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-md-6 service-left d-flex align-items-center p-3">
                            <img src={service} alt="ServiceSection" width="90%" />
                        </div>
                        <div className="col-md-6  px-5 d-flex align-items-center justify-content-center flex-column">
                            <h3 className=" quotes mt-3 d-flex text-white">Clean ingredients with extraordinary benefits</h3>
                            <p className="mb-3 text-justify text-white">
                                Fenugreek powder is believed to have various health benefits, including aiding digestion, reducing inflammation, regulating blood sugar levels, and potentially supporting lactation in breastfeeding mothers.</p>
                            <div className="inline-flex d-flex gap-3 pb-5">
                                <NavLink to="/productpage">
                                    <button type="button" style={{ border: "none", fontWeight: 500, borderRadius: "8px", color: "rgb(245, 242, 237)", padding: "2px,4px", backgroundColor: "black" }}>Shop Now</button></NavLink>
                                <button type="button" style={{ border: "none", fontWeight: 500, borderRadius: "8px", padding: "2px,4px" }}>Learn More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <FooterBar />
        </>
    );
}

export default Home;