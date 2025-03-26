import React from 'react'
import logo from "../assets/cabbon-logo.png"; // Import the image
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { signOut } from "firebase/auth";
import { auth} from "../firebaseConfig"; // Replace with your Firebase config path
import { useNavigate } from 'react-router-dom';

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


const Appbar = ({ height, width }) => {
    const navigate = useNavigate(); // Use the navigation hook from React Router
  const [documentData, setDocumentData] = useState({
    name: "",
    email: "",
    grade: "",
    mobile: "",
    place: "",
    qrcode: "",
    wage: "",
    userID: ""
  });
  const [result, setResult] = useState()
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
    // console.log(`Fetched User AppBar ID: ${userid}`);
  } else {
    console.error("User ID not found.");
  }



  const fetchDocument = async (userid) => {
    try {
      const db = getFirestore();
      const collectionName = "staff"; // Replace with your Firestore collection name
      const userID = userid; // Replace with the predefined userID

      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("userID", "==", userID));
      const querySnapshot = await getDocs(q);

      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set the first document's data (or handle multiple documents as needed)
      if (documents.length > 0) {
        setDocumentData({
          name: documents[0]?.name || "",
          email: documents[0]?.email || "",
          grade: documents[0]?.grade || "",
          mobile: documents[0]?.mobile || "",
          place: documents[0]?.place || "",
          qrcode: documents[0]?.qrCode || "",
          wage: documents[0]?.wage || "",
          userID: documents[0]?.userID || ""
        });

        // Returns the fetched documents
      } else {
        console.log("No matching documents found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  };


  useEffect(() => {
    fetchDocument(userid)
  }, [])

   const handleLogout = async () => {
          try {
            // Clear localStorage
            localStorage.clear();
      
            // Log out the user from Firebase Authentication
            await signOut(auth);
      
            // Redirect to login page
            navigate("/", { replace: true });
          } catch (error) {
            console.error("Error during logout:", error);
            alert("Failed to log out. Please try again.");
          }
        };

 












  const [backgroundImage, setBackgroundImage] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R114668176&ga=GA1.1.1837137669.1726030558&semt=ais_keywords_boost"
  );

  const [show, setShow] = useState(false);
  const [qrshow, setQRShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const qrhandleClose = () => setQRShow(false);
  const qrhandleShow = () => setQRShow(true);


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



  return (
    <>
      <div
        className="appbar d-flex justify-content-between align-items-center bg-white"
        style={{
          height: `${height * 0.1}px`,
          width: `${width}px`,
          boxShadow: "0px 0px 5px black",
          position: 'fixed',
          top: 0,
          zIndex: 1000
        }}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <img
            src={logo} // Use the imported image here
            alt=""
            style={{ height: "50px", paddingLeft: "10px" }} // Add height or width for proper scaling
          />
          <span
            className="title"
            style={{ paddingLeft: "0px", fontSize: "20px", fontWeight: "500" }}
          >
            Cabbon
          </span>
        </div>
        <div className="appbarIcons d-flex column-gap-3 me-3">
          <div
            className="icons"
            style={{ width: `30px`, height: `30px` }}
            onClick={qrhandleShow}
          >
            <i className="fa-solid fa-qrcode" style={{ fontSize: "25px" }}></i>
          </div>
          <div
            className="icons"
            style={{ width: `30px`, height: `30px` }}
            onClick={handleShow}
          >
            <i className="fa-regular fa-user" style={{ fontSize: "25px" }}></i>
          </div>

        </div>
      </div>

      {/* Modal for Details */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
          <div
            onClick={triggerFileInput}
            style={{
              height: "100px",
              width: "100px",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div className="d-flex mt-3">
            <div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "2.45",
                }}
              >
                <li>Name</li>
                <li>UID</li>
                <li>Mobile</li>
                <li>Email</li>
                <li>Place</li>
                <li>Grade</li>
                <li>Wage</li>
                <li>Works</li>
                <li>Earnings</li>
              </ul>
            </div>
            <div className="ms-2">
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Name"
                    defaultValue={documentData.name}

                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="UID"
                    defaultValue={documentData.userID}
                    readOnly
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Mobile"
                    defaultValue={documentData.mobile}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Email"
                    value={documentData.email}
                    readOnly
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Place"
                    defaultValue={documentData.place}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Grade"
                    value={documentData.grade}
                    readOnly
                  />
                </li>



                <li>
                  {/* wage */}
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="--"
                    value={documentData.wage}
                    readOnly
                  />
                </li>
                <li>
                  {/* works */}
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="--"
                    readOnly
                  />
                </li>
                <li>
                  {/* earnings */}
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="--"
                    readOnly
                  />
                </li>

              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer  className='d-flex justify-content-between'>
        <Button variant="outline-danger"  onClick={handleLogout}>Log Out</Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={qrshow}
        onHide={qrhandleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header >
          <Modal.Title>QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
          <img src={documentData.qrcode} alt="qr" />
          <h5><span>UID : </span>{documentData.userID}</h5>
        </Modal.Body>
        <Modal.Footer>
       
          <Button variant="secondary" onClick={qrhandleClose} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Appbar