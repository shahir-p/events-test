import React, { useState } from 'react';
import { Form, Button, Modal, Col } from 'react-bootstrap';
import { getAuth, sendPasswordResetEmail, updateEmail } from "firebase/auth";

const ResetOptionsModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const auth = getAuth();

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent successfully!");
      handleClose(); 
    } catch (error) {
      alert(`Failed to send password reset email: ${error.message}`);
    }
  };

  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex flex-column justify-content-center">
            <Button
              variant="outline-danger"
              className="mt-4"
              onClick={handlePasswordReset}
            >
              Reset Password
            </Button>
          
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ResetOptionsModal;
