import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { db, auth } from "../firebaseConfig"; // Replace with your Firebase config path
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


const AddStaffModal = ({ show, handleClose, userid }) => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        place: "",
        grade: "",
        wage: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddStaff = async () => {
        const { name, mobile, email, grade } = formData;

        // Validation for mandatory fields
        if (!name || !mobile || !email || !grade) {
            alert("Name, Mobile, Email, and Grade are mandatory!");
            return;
        }
        const password = mobile.slice(-6)
        const CareOf = name + userid; // Last 6 digits of mobile
        const userID = name + userid; // Last 6 digits of mobile
        console.log(CareOf);


        try {
            // Firebase Authentication: Create new user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth, // Firebase auth instance
                formData.email,
                password // Last 6 digits of the mobile number
            );

            const user = userCredential.user; // Newly created user

            // Firestore: Add new staff data
            await setDoc(doc(db, "staff", name), {
                ...formData,
                CareOf, // Store password
                userID
            });
            alert("Staff added successfully!");
            handleClose(); // Close the modal
            setFormData({
                name: "",
                mobile: "",
                email: "",
                place: "",
                grade: "",
                wage: "",
            });
        } catch (error) {
            console.error("Error adding staff:", error);
            alert("Failed to add staff. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new staff</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                <div
                    onClick={() => alert("File input triggered!")}
                    style={{
                        height: "100px",
                        width: "100px",
                        backgroundColor: "green",
                        borderRadius: "10px",
                        border: "1px solid",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                ></div>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
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
                            <li>Mobile</li>
                            <li>Email</li>
                            <li>Place</li>
                            <li>Grade</li>
                            <li>Wage</li>
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
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "5px",
                                        height: "35px",
                                        width: "250px",
                                        paddingLeft: "5px",
                                        marginBottom: "10px",
                                        border: "1px solid",
                                    }}
                                    placeholder="Name"
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "5px",
                                        height: "35px",
                                        width: "250px",
                                        paddingLeft: "5px",
                                        marginBottom: "10px",
                                        border: "1px solid",
                                    }}
                                    placeholder="Mobile"
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "5px",
                                        height: "35px",
                                        width: "250px",
                                        paddingLeft: "5px",
                                        marginBottom: "10px",
                                        border: "1px solid",
                                    }}
                                    placeholder="Email"
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="place"
                                    value={formData.place}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "5px",
                                        height: "35px",
                                        width: "250px",
                                        paddingLeft: "5px",
                                        marginBottom: "10px",
                                        border: "1px solid",
                                    }}
                                    placeholder="Place"
                                />
                            </li>
                            <li>
                                <select
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                    style={{
                                        fontSize: "16px",
                                        borderRadius: "5px",
                                        height: "35px",
                                        width: "250px",
                                        paddingLeft: "5px",
                                        marginBottom: "10px",
                                        border: "1px solid",
                                    }}
                                >
                                    <option hidden value="">
                                        Select
                                    </option>
                                    <option value="captain">Captain</option>
                                    <option value="vicecaptain">Vice Captain</option>
                                    <option value="agrade">A Grade</option>
                                    <option value="bgrade">B Grade</option>
                                    <option value="general">General</option>
                                    <option value="boyscaptain">Boy's Captain</option>
                                </select>
                            </li>
                            <li>
                                <input
                                    type="number"
                                    name="wage"
                                    value={formData.wage}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "5px",
                                        height: "35px",
                                        width: "250px",
                                        paddingLeft: "5px",
                                        marginBottom: "10px",
                                        border: "1px solid",
                                    }}
                                    placeholder="00"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleAddStaff}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddStaffModal;
