import React from 'react'
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { PlusCircle } from "lucide-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddStaffModal from './AddStaffModal';
import { useLocation } from "react-router-dom";

const MgHome = ({ height, width }) => {

  


  const fetchUserId = () => {
    // Retrieve the data from localStorage
    const userData = localStorage.getItem("userData");

    // Check if userData exists
    if (userData) {
      try {
        // Parse the stored JSON string
        const parsedData = JSON.parse(userData);

        // Return the userid if it exists
        return parsedData.userid || null;
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        return null;
      }
    } else {
      console.warn("No user data found in localStorage.");
      return null;
    }
  };

  // Fetch and log the user ID
  const userid = fetchUserId();
  if (userid) {
    console.log(`Fetched User ID: ${userid}`);
  } else {
    console.error("User ID not found.");
  }




  console.log(`Manager User ID: ${userid}`);

  const navigate = useNavigate();

  // Handler for navigating to the "Today" page
  const handleTodayClick = () => {
    navigate('/manager/events');
  };
  const handlePay = () => {
    navigate('/manager/pay');
  };


  const [show, setShow] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R114668176&ga=GA1.1.1837137669.1726030558&semt=ais_keywords_boost"
  );


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("imageInput").click();
  };

  const [showAddModal, setShowAddModal] = useState(false);

  // Handlers for opening and closing the modal
  const handleOpenModal = () => setShowAddModal(true);
  const handleCloseModal = () => setShowAddModal(false);

  return (
    <>

      <div className='home d-flex flex-column ' style={{ width: `${width}px`, height: `${height}px`, paddingLeft: "10px", paddingRight: "10px" }}>
        <div style={{ marginTop: `${height * 0.1 + 15}px`, }}>
          {/* <img src={profile} alt="" width={"50px"} height={"0px"} /> */}
          <span style={{ paddingLeft: "10px", fontSize: "18px" }}>Welcome {userid} ,</span>

        </div>
        <div className='d-flex'>

          <div onClick={handleTodayClick} className='today d-flex justify-content-center align-items-center ' style={{
            height: `${height * 0.18}px`, width: `${width}px`, margin: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url("https://img.freepik.com/premium-photo/notebook-with-events-alarm-clock-two-tone_185193-45714.jpg?uid=R114668176&ga=GA1.1.1837137669.1726030558&semt=ais_keywords_boost")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "center"
          }}
          >
          </div>




        </div>
        <span style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "500" }}>Overview</span>
        <div onClick={handleOpenModal} className='service ' style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/4xCNpqQz/boysbg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
          <div className=''> <span style={{ fontSize: "18px", fontWeight: "500" }}>Staff <PlusCircle style={{ color: "green" }} /></span>
            <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
          </div>
          <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>25</span></div>
        </div>

        <div className='Payment ' onClick={handlePay} style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/gJBGjT0L/paymentbg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
          <div className=' d-flex justify-content-between'> <span style={{ fontSize: "18px", fontWeight: "500" }}>Pay  <PlusCircle style={{ color: "green" }} /></span>
            <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
          </div>
          <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>2500</span></div>
        </div>

      </div>
      {/* Modal for Details */}

      <AddStaffModal userid={userid} show={showAddModal} handleClose={handleCloseModal} />

      {/* Modal for Delete */}

    </>
  )
}


export default MgHome