import React, { useEffect, useState } from 'react';
import COD from '../images/COD.png';
import GooglePay from '../images/GooglePay.png';
import { Add, Done } from '@mui/icons-material';
import AddressComponent from './AddressComponent';
import OnlinePayComponent from './OnlinePayComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentComponent = ({ total }) => {
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('Offline');
    const [isAddressAdded, setIsAddressAdded] = useState(false);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('UserId');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [userId, total]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/allorders/${userId}`);
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                console.error('Error fetching orders:', data.error);
            }
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        }
    };

    const navigate = useNavigate();

    const handleAddAddress = () => {
        setIsAddressAdded(true);
    };

    const hasAddressInOrders = () => {
        // Check if there are orders with a non-empty address
        return orders.some(
            order => order.Address && order.Address.trim() !== ''
        );
    };

    const handleConfirmOrder = async () => {
        if (hasAddressInOrders()) {
            try {
                // Assuming you have an API endpoint for updating the order confirmation status
                const response = await axios.put(
                    `http://localhost:8080/api/updateOrderConfirmation/${userId}`
                );
    
                const data = response.data;
    
                if (data.success) {
                    setIsOrderConfirmed(true);
                    // Perform any additional actions needed upon successful confirmation
                    navigate('/thinkspage');
                } else {
                    setErrorMessage('Error confirming the order. Please try again.');
                }
            } catch (error) {
                console.error('Error confirming the order:', error.message);
                setErrorMessage('Error confirming the order. Please try again.');
            }
        } else {
            // Display an error message indicating that the address is required
            setErrorMessage('Please add your address before confirming the order.');
        }
    };
    
    return (
        <>
            {!isAddressAdded && !isOrderConfirmed ? (
                <div className='py-3 px-4'>
                    <h6>
                        <b>PAYMENT MODE</b>
                    </h6>
                    <div className='row d-flex justify-content-center'>
                        <div
                            className='col-md-6 col-6 d-flex justify-content-center'
                            onClick={() => setSelectedPaymentMode('Offline')}
                        >
                            <button
                                style={{
                                    fontWeight:
                                        selectedPaymentMode === 'Offline' ? 'bold' : 'normal',
                                }}
                                className='btn btn-transparent text-center'
                            >
                                CASH ON DELIVERY
                            </button>
                        </div>
                        {/* <div
                            className='col-md-6 col-6 d-flex justify-content-center'
                            onClick={() => setSelectedPaymentMode('Online')}
                        >
                            <button
                                style={{
                                    fontWeight:
                                        selectedPaymentMode === 'Online' ? 'bold' : 'normal',
                                }}
                                className='btn btn-transparent text-center'
                            >
                                ONLINE PAYMENT
                            </button>
                        </div> */}
                    </div>
                    <div className='row'>
                        {selectedPaymentMode === 'Offline' && (
                            <div className='col-md-12 col-12 d-flex justify-content-center'>
                                <img src={COD} alt='Offline' width='50%' />
                            </div>
                        )}
                        {/* {selectedPaymentMode === 'Online' && (
                            <div className='col-md-12 col-12 d-flex justify-content-center'>
                                <img src={GooglePay} alt='GooglePay' width='50%' />
                            </div>
                        )} */}
                    </div>
                    <p>Gift Card / Promo code</p>
                    <div className='row d-flex justify-content-between'>
                        <div
                            className='col-md-6 col-6 p-2'
                            style={{
                                borderRadius: '10px',
                                background: '#E9E7E3',
                                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            <input
                                type='text w-100'
                                style={{
                                    border: 'none',
                                    background: '#E9E7E3',
                                    padding: '3px',
                                }}
                            />
                        </div>

                        <button
                            className='col-md-5 col-5 p-2'
                            style={{
                                border: 'none',
                                borderRadius: '10px',
                                background: '#4A5568',
                                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                color: 'white',
                            }}
                        >
                            Apply
                        </button>
                    </div>
                    {orders.map((order, orderIndex) => (
                        <div className='row d-flex py-3 justify-content-evenly'>
                            <div className='col-md-5'>
                                <p>Sub Total</p>
                            </div>
                            <div className='col-md-5 d-flex justify-content-end'>
                                <p>{order.TotalCost}.00</p>
                            </div>
                            {/* <div className='col-md-5'>
                                <p>Tax</p>
                            </div>
                            <div className='col-md-5 d-flex justify-content-end'>
                                <p>00.00</p>
                            </div> */}
                            <div className='col-md-5'>
                                <p>Shipping</p>
                            </div>
                            <div className='col-md-5 d-flex justify-content-end'>
                                <p>
                                    <b className='text-info'>Free</b>
                                </p>
                            </div>
                            <div className='col-md-5'>
                                <p>
                                    <b>Total</b>
                                </p>
                            </div>
                            <div className='col-md-5 d-flex justify-content-end'>
                                <p>
                                    <b>₹</b>
                                    {order.TotalCost}.00
                                </p>
                            </div>
                        </div>
                    ))}
                    <h6>
                        <b>BILLING INFO</b>
                    </h6>
                    <div className='p-3'>
                    {!hasAddressInOrders() ?(
                        <button className='btn'>
                            <b className='text-white bg-danger p-1 '>
                                <Add />
                            </b>
                            <b className='text-danger' onClick={handleAddAddress}>
                                {' '}
                                Add address
                            </b>
                        </button>)
                        :(
                            <button className='btn'>
                                <b className='text-white bg-success p-1'>
                                    <Done />
                                </b>
                                <b className='text-success'> Address updated</b>
                            </button>
                        )}
                        {errorMessage && (
                            <h6 className="text-danger">{errorMessage}</h6>
                        )}
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <button
                            className='col-md-9 col-9 p-2'
                            onClick={handleConfirmOrder}
                            style={{
                                border: 'none',
                                borderRadius: '10px',
                                background: '#4A5568',
                                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                color: 'white',
                            }}
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            ) : !isOrderConfirmed ? (
                <div>
                    <AddressComponent />
                </div>
            ) : (
                <div>
                    <OnlinePayComponent />
                </div>
            )}
        </>
    );
};

export default PaymentComponent;
