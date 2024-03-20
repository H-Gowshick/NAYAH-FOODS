import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductLandingImage from '../images/ProductLandingImage.png';
import Grains from '../images/Grains.png';
import Granule from '../images/Granule.png';
import Flours from '../images/Flours.png';
import Drinks from '../images/Drinks.png';
import Like from '../images/Vector.svg';
import Swal from 'sweetalert2';
import { Search, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../components/NavBar';
import FooterBar from '../components/Footer';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from the API when the component mounts
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/allproducts');
                setProducts(response.data.products);
                console.log(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts();
    }, []);

    const isProductInCart = (productCode) => {
        return cart.hasOwnProperty(productCode);
    };

    const handleAddToCart = (productId, productCode) => {
        const userId = localStorage.getItem('UserId');
    
        if (userId) {
            if (!isProductInCart(productCode)) {
                setCart((prevCart) => ({ ...prevCart, [productCode]: 1 }));
                console.log(`Product ${productCode} added to cart for user ${userId}`);
                console.log(cart);
            } else {
                console.log(`Product ${productCode} is already in the cart for user ${userId}`);
            }
        } else {
            // User is not logged in, show a message and redirect to the login page
            Swal.fire({
                icon: 'info',
                title: 'Login Required',
                text: 'You need to log in to add the product to the cart.',
            }).then(() => {
                // Redirect to the login page
                navigate('/signIn');
            });
        }
    };
    


const handleBuy = async (productId, productCode) => {
    const userId = localStorage.getItem('UserId');

    if (userId) {
        try {
            // Call the function for adding to the cart
            handleAddToCart(productId, productCode);

            // Immediately update the cart in the POST request
            const updatedCart = { ...cart, [productCode]: 1 };
            setCart(updatedCart);

            // Make a POST request to the /orders endpoint using axios
            const response = await axios.post('http://localhost:8080/api/orders', {
                UserId: userId,
                ProductCodeAndQuantity: updatedCart,
            });

            console.log('Order added successfully:', response.data.message);
            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error('Error adding order:', error.response?.data.error || error.message);

            // Revert the optimistic update since the request failed
            console.log('Reverting optimistic update due to an error.');
            setCart((prevCart) => {
                const newCart = { ...prevCart };
                delete newCart[productCode];
                return newCart;
            });

            // Handle error, e.g., show an error message to the user
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
        } finally {
            // Navigate regardless of success or failure
            navigate('/cartpage');
        }

        console.log(`Product ${productId} bought by user ${userId}`);
    } else {
        // User is not logged in, show a message and redirect to the login page
        Swal.fire({
            icon: 'info',
            title: 'Login Required',
            text: 'You need to log in to buy the product.',
        }).then(() => {
            // Redirect to the login page
            navigate('/signIn');
        });
    }
}; 
    return (
        <>
        <MenuBar/>
            <div style={{ background: "var(--white, #F5F2ED)" }} >
                <div className='container pt-5'>
                    <div className='' style={{
                        borderRadius: "10px",
                        background: "var(--green, #A5BE6A)",
                        height: "520px"

                    }}>
                        <div className='row '>
                            <div className='col-md-6 col-12 py-5'>
                                <div className='px-5 py-5'>
                                    <h1 className='' style={{
                                        color: "var(--white, #F5F2ED)",
                                        fontSize: "50px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal"
                                    }}>Order your daily Supplements</h1>
                                    <h4 className='' style={{
                                        color: "var(--white, #F5F2ED)",
                                        fontSize: "24px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal"
                                    }}>#Free Delivery</h4>
                                    <div className='bg-white d-flex justify-content-between my-4' style={{ borderRadius: "40px" }}>
                                        <div className='d-flex px-4'>
                                            <Search />
                                            <input type='text' style={{ border: "none", padding: "3px", width: "100%" }} placeholder='Search your supplement' />
                                        </div>
                                        <button className='text-white px-3' style={{ border: "none", background: "#9A97DA", borderRadius: "40px", padding: "3px" }}>Search</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 responsiveimage'>
                                <img src={ProductLandingImage} width="100%" height="625px" />
                            </div>
                        </div>
                    </div>
                    <div className='my-5'>
                        <h2>Category</h2>
                        <div className='row '>
                            <div className='col-md-3 col-6 p-3 '>
                                <div className='productcategory' >
                                    <div className='p-4 py-5  d-flex flex-column align-items-center'>
                                        <img src={Grains} />
                                        <h2>Grains</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 col-6 p-3'>
                                <div className='productcategory' >
                                    <div className='p-4 py-5 d-flex flex-column align-items-center'>
                                        <img src={Granule} />
                                        <h2>Granule</h2>
                                    </div>
                                </div>
                            </div><div className='col-md-3 col-6 p-3'>
                                <div className='productcategory'>
                                    <div className='p-4 py-5  d-flex flex-column align-items-center'>
                                        <img src={Flours} />
                                        <h2>Flours</h2>

                                    </div>

                                </div>

                            </div><div className='col-md-3 col-6 p-3'>
                                <div className='productcategory' >
                                    <div className='p-4 py-5  d-flex flex-column align-items-center'>
                                        <img src={Drinks} />
                                        <h2>Drinks</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-5'>
                        <h2>Popular Product</h2>
                        <div className='row '>
                            {products.map((product) => (
                                <div className='col-md-3 col-6 p-3' key={product.productId}>
                                    <div className='productCard'>
                                        <div className='p-4 d-flex flex-column'>
                                            <img src={product.ProductImage} alt={product.ProductName} />
                                            <div className='row d-flex justify-content-between'>
                                                <h5 className='col-md-9 col-9' style={{ fontSize: "19px" }}>{product.ProductName}</h5>
                                                <div className='py-2 col-md-3 col-3'>
                                                    <div className='rounded-circle bg-white w-100 p-2 d-flex justify-content-center' style={{ boxShadow: "2px 3px 6px 0px rgba(0, 0, 0, 0.20)" }}>
                                                        <img src={Like} alt="like" width="25px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h4>₹{product.Price}</h4>
                                            <div className='row d-flex justify-content-evenly gap-1'>
                                                {isProductInCart(product.ProductCode) ? (
                                                    <button
                                                        className='col-md-6 col-12 text-success px-3'
                                                        style={{ border: "none",color:"var(--white, #F5F2ED)", borderRadius: "40px", padding: "3px" }}
                                                    >
                                                        <ShoppingCart/> Added
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAddToCart(product.productId, product.ProductCode)}
                                                        className='col-md-6 col-12 text-white px-3'
                                                        style={{ border: "none", background: "#9A97DA", borderRadius: "40px", padding: "3px" }}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                )}
                                                    <button
                                                        onClick={() => handleBuy(product.productId, product.ProductCode)}
                                                        className='col-md-5 col-12 text-white px-3'
                                                        style={{ border: "none", background: "var(--green, #A5BE6A)", borderRadius: "40px", padding: "3px" }}
                                                    >
                                                        Buy
                                                    </button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='mt-5 pb-5'>
                        <div style={{
                            borderRadius: "10px",
                            background: "var(--peach, #FFC6C5)",
                            height: "100%"
                        }}>
                            <div className='row'>
                                <div className='col-2'>

                                </div>
                                <div className='col-12 col-md-8 p-5 d-flex flex-column justify-content-center align-items-center'>

                                    <h2>Join Our Community</h2>
                                    <h6>Lorem ipsum dolor sit amet consectetur. Quam amet urna suspendisse justo tempor sit.</h6>
                                    <div className='bg-white d-flex justify-content-between my-4' style={{ borderRadius: "40px" }}>
                                        <div className='d-flex align-items-center px-4'>
                                            <Search />
                                            <input type='text' style={{ border: "none", padding: "3px", width: "100%" }} placeholder='Join the community' />
                                        </div>
                                        <button className='text-white px-3' style={{ border: "none", background: "#9A97DA", borderRadius: "40px", padding: "3px" }}>Join us</button></div>
                                </div>
                                <div className='col-2'>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <FooterBar/>
        </>
    )
}

export default ProductPage