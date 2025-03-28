import React from "react";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Button } from "react-bootstrap";

const SaveRecords = ({ fetchedRecords, onSaveComplete, onCancel }) => {
  const handleSave = async () => {
    const db = getFirestore();
    const eventId = localStorage.getItem("eventId"); // Replace with your actual key if needed
    const eventDocRef = doc(db, "events", eventId);

    try {
      for (const record of fetchedRecords) {
        const boyDetails = {
          userID: record.userID,
          entry: record.time,
          careof: record.userID.split("-")[1],
          name: record.name,
        };

        // Use arrayUnion to avoid overwriting the existing boysList
        await updateDoc(eventDocRef, {
          boysList: arrayUnion(boyDetails),
        });
      }

      console.log("Records saved successfully.");
      onSaveComplete(); // Notify the parent component about completion
    } catch (error) {
      console.error("Error saving records:", error);
    }
  };

  return (
    <>
      <p>Saving confirmation</p>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};

export default SaveRecords;
