import React, { useState } from "react";
import "./Style.css";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { ScaleLoader } from 'react-spinners';
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    // console.log(userData);

    const setValue = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    };

    const [error, setErrorMessage] = useState({});

    const SubmitForm = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!userData.email) {
            errors.email = "Email Id is Required!"
        }
        else if (!userData.email.includes("@")) {
            errors.email = "It includes @ in your email!"
        }
        if (!userData.password) {
            errors.password = "Password is Required!"
        }
        else if (userData.password.length < 8) {
            errors.password = "Password must contain 8 character!";
        }
        else if (!/[A-Z]/.test(userData.password)) {
            errors.password = "Password must contain one uppercase letter!";
        }
        else if (!/[a-z]/.test(userData.password)) {
            errors.password = "Password must contain one lowercase letter!";
        }
        else if (!/[0-9]/.test(userData.password)) {
            errors.password = "Password must contain one number!";
        }
        else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(userData.password)) {
            errors.password = "Password must contain one special character!";
        }


        setErrorMessage(errors);
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                const data = await fetch(`http://localhost:8080/api/signIn`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        userData,
                    })
                });

                const res = await data.json();
                // console.log(res);

                if (res.status === 201) {
                    setLoading(false);
                    localStorage.setItem("UserId", (res.userId));
                    localStorage.setItem("userData", (res.data));
                    localStorage.setItem("userToken", (res.Token));
                    Swal.fire({
                        icon: "success",
                        title: "Login successfully",
                    }).then(() => {
                        // Redirect to the login page
                        navigate('/');
                    }); ;

                    setUserData({ ...userData, email: "", password: "" });
                }
                else if (res.status === 401) {
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: res.message,
                        text: "Please Enter Valid Data!"
                    });
                }
                else if (res.status === 406) {
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: res.message,
                        text: "Please try again!"
                    });
                }
            }
            catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: "info",
                    title: "502 Bad Gateway"
                });
                console.log(error)
            }
        }
    }
    return (
        <div className="signIn d-flex justify-content-center align-items-center">

            <div className="box position-relative">
                {loading && (
                    <div className="blur-background">
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}><ScaleLoader color={"#26ADB7"} size={60} /></span>
                    </div>
                )}
                <NavLink to="/">
                    <span className="position-absolute top-0 end-0 mt-2 me-2 close"><IoClose color="white" size={23} /></span>
                </NavLink>


                <h5 className=" text-center mt-2 mb-5">Sign In</h5>
                <div className="inputField mb-2">
                    <input className="input" type="email" placeholder="Email" name="email" value={userData.email} onChange={setValue} />
                    <span className="icon text-center"> {userData.email.length > 0 ? "" : <MdOutlineEmail size={23} fontWeight={150} />}</span>
                </div>
                {error.email && <span className=" error mb-2">{error.email}</span>}

                <div className="inputField mb-2">
                    <input className="input" type="password" placeholder="Password" name="password" value={userData.password} onChange={setValue} />
                    <span className="icon">{userData.password.length > 0 ? "" : <IoIosLock size={25} />}</span>
                </div>
                {error.password && <span className="error mb-2">{error.password}</span>}

                <div className="position-relative mb-5">
                    <span className="link position-absolute top-0 end-0 " > Forget Password?</span>
                </div>
                <button className="button mb-3" type="button" onClick={SubmitForm}>Sign In</button>
                <div>
                    <span style={{ fontSize: "small" }}>Don't have an account?<NavLink to="/signUp" className="link">Sign Up</NavLink></span>
                </div>

            </div>

        </div>
    );
}

export default SignIn;