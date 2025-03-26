import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getFirestore, collection, doc, setDoc, Timestamp } from "firebase/firestore"; // Modular Firebase imports
import { useNavigate } from "react-router-dom";

const CreateEventModal = ({ show, handleClose }) => {
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [fineTime, setFineTime] = useState("");
  const navigate = useNavigate();

  const handleAddEvent = async () => {
    if (!place || !time || !fineTime  || !location) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const db = getFirestore(); // Initialize Firestore
      const eventId = `${new Date().toISOString().split('T')[0]}_${place}`; // Generate a unique event ID based on date and place
      const eventRef = doc(collection(db, "events"), eventId);

      // Add data to the `events` collection
      await setDoc(eventRef, {
        name: location, // Replace this with the actual event name if available
        place: place,
        time: time,
        fineTime: fineTime,
        timestamp: Timestamp.now(),
        boysList: [], // Initialize the boysList array as empty
      });

      alert("Event created successfully!");
      navigate("/captain/view-auditorium", { state: { eventId } }); // Redirect to the specified route with eventId as state
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>Create an Event</Modal.Title>
        <span className="ms-auto text-muted">10-02-2025</span>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-3 border border-1"
          placeholder="Location name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3 border border-1"
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3 border border-1"
          placeholder="Time (breakfast/noon/dinner)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="time"
          className="form-control mb-3 border border-1"
          placeholder="Fine time"
          value={fineTime}
          onChange={(e) => setFineTime(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className="btn btn-primary"
          onClick={handleAddEvent}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateEventModal;
