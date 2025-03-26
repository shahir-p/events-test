import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import logo from "../assets/cabbon-logo.png";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
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

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!category) {
      showError('Please select a category.');
      return;
    }

    try {
      const email = `${userId}`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (category === 'manager') {
        storeUserData(userCredential.user, category);
        redirectToPage(category);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists() && userDoc.data().category === category) {
        storeUserData(userCredential.user, category);
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

      if (category === 'manager') {
        storeUserData(user, category);
        redirectToPage(category);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().category === category) {
        storeUserData(user, category);
        redirectToPage(category);
      } else {
        showError("Invalid category for the Google account.");
      }
    } catch (error) {
      showError(error.message || "Google Sign-In failed.");
    }
  };

  const storeUserData = (user, category) => {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      category,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const redirectToPage = (category) => {
    if (category === 'boyscaptain') navigate('/boyscaptain', { replace: true });
    else if (['agrade', 'bgrade', 'general'].includes(category)) navigate('/boys', { replace: true });
    else if (['captain', 'vicecaptain'].includes(category)) navigate('/captain', { replace: true });
    else if (category === 'manager') navigate('/manager', { replace: true });
    else showError("Invalid category selected.");
  };

  const showError = (message) => {
    const errorElement = document.getElementById("error");
    errorElement.textContent = message;
    setTimeout(() => { errorElement.textContent = ""; }, 2000);
  };
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { category } = JSON.parse(userData);
      redirectToPage(category); // Replace with your existing redirect function
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

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
          <div className='w-100 '>
            <span style={{ color: "red", fontSize: "12px", float: "right" }} onClick={handleShow}>Reset</span>
          </div>
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
              Sign in with Google
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
