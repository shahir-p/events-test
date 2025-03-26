import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import logo from "../assets/cabbon-logo.png";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // For role verification
import { db } from "../firebaseConfig"; // Import Firestore instance
import Col from 'react-bootstrap/Col';

import Modal from 'react-bootstrap/Modal';
import ResetOptionsModal from './ResetOptionsModal';

const Login = ({ height, width }) => {
  const [category, setCategory] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    if (!category) {
      showError('Please select a category.');
      return;
    }

    try {
      // Authenticate using User ID (email format assumed)
      const email = `${userId}`; // Convert User ID to email for Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Skip Firestore check if the category is "manager"
      if (category === 'manager') {
        redirectToPage(category);
        return;
      }

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists() && userDoc.data().category === category) {
        redirectToPage(category);
      } else {
        showError("Invalid category for the given User ID.");
      }
    } catch (error) {
      showError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleAuth = async () => {
    if (!category) {
      showError("Please select a category before signing in with Google.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Skip Firestore check if the category is "manager"
      if (category === 'manager') {
        redirectToPage(category);
        return;
      }

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().category === category) {
        redirectToPage(category);
      } else {
        showError("Invalid category for the Google account.");
      }
    } catch (error) {
      showError(error.message || "Google Sign-In failed.");
    }
  };

  const redirectToPage = (category) => {
    if (category === 'boyscaptain') navigate('/boyscaptain');
    else if (['agrade', 'bgrade', 'general'].includes(category)) navigate('/boys');
    else if (['captain', 'vicecaptain'].includes(category)) navigate('/captain');
    else if (category === 'manager') navigate('/manager');
    else showError("Invalid category selected.");
  };

  const showError = (message) => {
    const errorElement = document.getElementById("error");
    errorElement.textContent = message;
    setTimeout(() => { errorElement.textContent = ""; }, 2000);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <img
        className="logo"
        src={logo}
        alt="Logo"
        style={{ width: `100px`, height: `100px` }}
      />
      <h3 className="mb-5" style={{ fontFamily: "Joan, serif" }}>
        CABBON
      </h3>
      <Form onSubmit={handleLogin}>
        <div className="border border-secondary rounded p-3 d-flex flex-column justify-content-center align-items-center">
          <h3 className="mb-5">Log In</h3>
          <Form.Select
            className="mb-3"
            aria-label="Select Category"
            style={{ width: `${width * 0.7}px` }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option hidden value="">Select Category</option>
            <option value="manager">Manager</option>
            <option value="captain">Captain</option>
            <option value="vicecaptain">Vice Captain</option>
            <option value="agrade">A Grade</option>
            <option value="bgrade">B Grade</option>
            <option value="general">General</option>
            <option value="boyscaptain">Boy's Captain</option>
          </Form.Select>
          <InputGroup className="mb-3" style={{ width: `${width * 0.7}px` }}>
            <Form.Control
              placeholder="User ID"
              autoComplete="username"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={!category}
            />
          </InputGroup>
          <InputGroup className="mb-2" style={{ width: `${width * 0.7}px` }}>
            <Form.Control
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!category}
            />
          </InputGroup>
          <div className='w-100 '><span style={{ color: "red", fontSize: "12px", float: "right", marginTop: "-" }} onClick={handleShow}>Action</span></div>
          <span>OR</span>
          <InputGroup className="mb-2 mt-2" style={{ width: `${width * 0.7}px` }}>
            <Button
              variant="outline-secondary"
              style={{ width: "100%" }}
              onClick={handleGoogleAuth}
              disabled={!category}
            >
              <img
                src="https://pngimg.com/d/google_PNG19635.png"
                alt="Google Logo"
                style={{ width: "25px", height: "25px", marginRight: "8px" }}
              />
              
            </Button>
          </InputGroup>
          <div>
            <span id="error" style={{ color: "red" }}></span>
          </div>
          <Button
            className="mt-2"
            variant="primary"
            type="submit"
            disabled={!category}
          >
            Sign In
          </Button>
        </div>
      </Form>
      <ResetOptionsModal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Login;
