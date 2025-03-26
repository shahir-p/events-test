import React from 'react'
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const Mgpaymentdetails = ({ height, width }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    // Navigate back to the previous page
    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <>
            <div className='' style={{ width: `${width}`, marginTop: `${height * 0.1}px`, marginBottom: `${height * 1}px`, padding: "10px 20px", marginBottom: `${height * 0.1}px`, }}>
                <div className='d-flex mb-3 mt-2'>
                    <ChevronLeft onClick={handleBackClick} />
                    <h5>Payment Details</h5></div>

                <div className=' d-flex p-2 rounded border border-secondary' style={{ height: `${height / 4}px`, width: `${width}`, }}>
                    <div className=' d-flex justify-content-between align-items-center ' style={{ height: "100%", width: "60%" }}>
                        <div className='d-flex flex-column' style={{ lineHeight: "1.7" }}>
                            <span>Name </span>
                            <span>Place </span>
                            <span>Events </span>
                            <span>Boys</span>
                            <span>Payments</span>
                        </div>
                        <div className='d-flex flex-column' style={{ lineHeight: "1.7" }}>
                            <span> : Shahir </span>
                            <span>: Kainikkara  </span>
                            <span>: 26 </span>
                            <span>: 110 </span>
                            <span>: 14000 </span>
                        </div>
                    </div>
                    <div className='d-flex  align-items-center' style={{ height: "100%", width: "40%" }}>
                        <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R114668176&ga=GA1.1.1837137669.1726030558&semt=ais_hybrid" alt="" width={"100%"} />
                    </div>
                </div>
                <h5 className='mt-2'>Payments</h5>
                <div className='list d-flex  flex-column  align-items-center mb-2 pb-2 ' style={{ width: `${width - 40}px`, border: "1px solid", borderRadius: "10px", fontSize: "15px", padding: "0px 20px", backgroundImage: `url(https://i.postimg.cc/1t4ZkrKm/pendingbg.png)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: "center" }}  >
                    <div className='d-flex   justify-content-between mt-2' style={{ listStyle: 'none', padding: 0, margin: 0, width: `${width - 60}px` }}>
                        <li>From : <span>01-02-2025</span></li>
                        <li>To : <input type="date" style={{ width: "120px", borderRadius: "5px", paddingLeft: "5px" }} /></li>
                    </div>
                    <div className=' pb-1 d-flex  mt-2 column-gap-1' style={{ height: `${height * 0.15}px`, width: `${width - 60}px` }}>
                        <div className=' d-flex column-gap-1' style={{ height: `${height * 0.15}px`, width: `${(width - 60) / 2}px`, paddingLeft: "10px" }} >

                            <div style={{ width: `${((width - 60) / 2) / 2}px`, }} >
                                <div className='keys'>
                                    <ul style={{ listStyle: 'none', padding: 0, }}>
                                        <li> Events</li>
                                        <li> Staff</li>

                                        <li>Fine</li>
                                        <li>Expense</li>
                                        <li>Other</li>
                                    </ul>
                                </div>

                            </div>
                            <div style={{ width: `${((width - 60) / 2) / 2}px`, }} >
                                <ul style={{ listStyle: 'none', padding: 0, }}>
                                    <li>: 8</li>
                                    <li>: 0</li>
                                    <li>: 0</li>
                                    <li>: 0</li>
                                    <li>: 0</li>
                                </ul>
                            </div>


                        </div>
                        <div className='d-flex ms-4'>
                            <div>
                                <ul style={{ listStyle: 'none', padding: 0, }}>
                                    <li>C</li>
                                    <li>V C</li>
                                    <li>A</li>
                                    <li>B</li>
                                    <li>G</li>
                                </ul>
                            </div>
                            <div className='ms-3'>
                                <ul style={{ listStyle: 'none', padding: 0, }}>
                                    <li>: 1</li>
                                    <li>: 10</li>
                                    <li>: 15</li>
                                    <li>: 12</li>
                                    <li>: 20</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className=' mt-4' >
                        <div className=' d-flex justify-content-center a column-gap-5 p-2 rounded border-secondary'>
                            <h4 >TOTAL</h4>
                            <h4>25000000</h4>
                        </div>
                    </div>
                    <div className='bg-success text-white d-flex  justify-content-center align-items-center' style={{ width: "100%", height: "40px", borderRadius: "10px" }} onClick={handleShow}>
                        Pay
                    </div>
                </div>
                <div className='list d-flex  flex-column  align-items-center mb-2 pb-2 ' style={{ width: `${width - 40}px`, border: "1px solid", borderRadius: "10px", fontSize: "15px", padding: "0px 20px", backgroundImage: `url(https://i.postimg.cc/wTD349vW/paidbg.png)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: "center" }}  >
                    <div className='d-flex   justify-content-between mt-2' style={{ listStyle: 'none', padding: 0, margin: 0, width: `${width - 60}px` }}>
                        <li>From : <span>01-02-2025</span></li>
                        <li>To : <span>10-02-2025</span></li>
                        
                    </div>
                    <div className=' pb-1 d-flex  mt-2 column-gap-1' style={{ height: `${height * 0.15}px`, width: `${width - 60}px` }}>
                        <div className=' d-flex column-gap-1' style={{ height: `${height * 0.15}px`, width: `${(width - 60) / 2}px`, paddingLeft: "10px" }} >

                            <div style={{ width: `${((width - 60) / 2) / 2}px`, }} >
                                <div className='keys'>
                                    <ul style={{ listStyle: 'none', padding: 0, }}>
                                        <li> Events</li>
                                        <li> Staff</li>

                                        <li>Fine</li>
                                        <li>Expense</li>
                                        <li>Other</li>
                                    </ul>
                                </div>

                            </div>
                            <div style={{ width: `${((width - 60) / 2) / 2}px`, }} >
                                <ul style={{ listStyle: 'none', padding: 0, }}>
                                    <li>: 8</li>
                                    <li>: 0</li>
                                    <li>: 0</li>
                                    <li>: 0</li>
                                    <li>: 0</li>
                                </ul>
                            </div>


                        </div>
                        <div className='d-flex ms-4'>
                            <div>
                                <ul style={{ listStyle: 'none', padding: 0, }}>
                                    <li>C</li>
                                    <li>V C</li>
                                    <li>A</li>
                                    <li>B</li>
                                    <li>G</li>
                                </ul>
                            </div>
                            <div className='ms-3'>
                                <ul style={{ listStyle: 'none', padding: 0, }}>
                                    <li>: 1</li>
                                    <li>: 10</li>
                                    <li>: 15</li>
                                    <li>: 12</li>
                                    <li>: 20</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className=' mt-4' >
                        <div className=' d-flex justify-content-center a column-gap-5 p-2 rounded border-secondary'>
                            <h4 >TOTAL</h4>
                            <h4>25000000</h4>
                        </div>
                    </div>
                    
                </div>
                


            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header >
                    <Modal.Title>Pay to name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    payment Confirmation
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success">Pay</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Mgpaymentdetails