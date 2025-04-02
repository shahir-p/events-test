import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { Button, Modal } from "react-bootstrap";
import QrScannerComponent from "./QrScannerComponent";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const Auditorium = ({ height, width }) => {
  const [fetchedRecords, setFetchedRecords] = useState([]);
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const { date, time, name, place } = location.state || {};

  const navigate = useNavigate();

  const getEventIdFromLocalStorage = () => {
    const eventDataString = localStorage.getItem("eventData");

    if (eventDataString) {
      const eventData = JSON.parse(eventDataString);
      return eventData.eventid;
    } else {
      console.error("No event data found in localStorage!");
      return null;
    }
  };

  const getCreatorFromLocalStorage = () => {
    const eventDataString = localStorage.getItem("eventData");
    if (eventDataString) {
      const eventData = JSON.parse(eventDataString);
      const { creatorid, timestamp } = eventData;
      const [name, careof] = creatorid.split("-");
      const time = new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return {
        userID: creatorid,
        name,
        careof,
        time,
      };
    }
    return null;
  };

  const eventId = getEventIdFromLocalStorage();

  const fetchSuggestions = (queryText) => {
    const db = getFirestore();
    const staffRef = collection(db, "staff");

    const lowerQuery = queryText?.toLowerCase() || ""; // Ensure queryText is valid
    if (!lowerQuery) return; // Exit early if the query is empty

    // Use Firestore's onSnapshot for real-time updates
    const unsubscribe = onSnapshot(
      staffRef,
      (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          const data = doc.data();

          // Safely handle undefined or null values for userID and name
          const userIDLower = data?.userID ? data.userID.toLowerCase() : "";
          const nameLower = data?.name ? data.name.toLowerCase() : "";

          // Filter results based on the search query
          if (
            userIDLower.includes(lowerQuery) ||
            nameLower.includes(lowerQuery)
          ) {
            results.push({
              userID: data.userID,
              name: data.name,
              careof: data.userID?.split("-")[1] || "N/A", // Handle missing userID
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
          }
        });

        setSearchResults(results);
      },
      (error) => {
        console.error("Error fetching suggestions in real-time:", error);
      }
    );

    // Return the unsubscribe function to stop listening when not needed
    return unsubscribe;
  };


  const handleSearchChange = (e) => {
    const queryText = e.target.value;
    setSearchQuery(queryText);

    // Listen to real-time updates if there's a search query
    if (queryText) {
      fetchSuggestions(queryText);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddRecord = (record) => {
    setFetchedRecords((prevRecords) => {
      // Check if the record already exists based on userID
      const isDuplicate = prevRecords.some(
        (existingRecord) => existingRecord.userID === record.userID
      );

      if (!isDuplicate) {
        const newRecords = [record, ...prevRecords]; // Prepend the new record
        localStorage.setItem("fetchedRecords", JSON.stringify(newRecords));
        return newRecords;
      } else {
        console.log("Record already exists:", record.userID);
        return prevRecords;
      }
    });

    setSearchResults([]);
    setSearchQuery("");
  };


  const handleScanComplete = (data) => {
    if (data && data.length > 0) {
      setFetchedRecords((prevRecords) => {
        const newRecords = data
          .filter(
            (record) =>
              !prevRecords.some(
                (existingRecord) => existingRecord.userID === record.userID
              )
          )
          .map((record) => ({
            ...record,
            careof: record.userID?.split("-")[1] || "N/A", // Extract 'careof' or default to 'N/A'
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));

        const updatedRecords = [...newRecords, ...prevRecords]; // Prepend the new records
        localStorage.setItem("fetchedRecords", JSON.stringify(updatedRecords));
        return updatedRecords;
      });
    }
  };


  const handleSave = async () => {
    const db = getFirestore();
    const eventDocRef = doc(db, "events", eventId);

    try {
      for (const record of fetchedRecords) {
        const boyDetails = {
          userID: record.userID,
          entry: record.time,
          careof: record.careof,
          name: record.name,
        };

        await updateDoc(eventDocRef, {
          boysList: arrayUnion(boyDetails),
        });
      }

      console.log("Records saved successfully.");
      handleClose();
    } catch (error) {
      console.error("Error saving records:", error);
    }
  };

  //for list boys modal

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleShowModal = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemoveUser = () => {
    setFetchedRecords((prevRecords) =>
      prevRecords.filter((record) => record.userID !== selectedRecord.userID)
    );
    setShowConfirmModal(false);
    setShowModal(false);
  };

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("fetchedRecords")) || [];
    let unsubscribe = null;

    // Handle search query for suggestions
    if (searchQuery) {
      unsubscribe = fetchSuggestions(searchQuery);
    } else {
      // If no search query, reset to stored records
      setFetchedRecords(storedRecords);
    }

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [searchQuery]);

  return (
    <>
      <div
        className="home d-flex flex-column"
        style={{
          width: `${width}px`,
          marginTop: `${height * 0.1}px`,
          marginBottom: `${height * 0.1}px`,
          padding: "10px 20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
          <div className="d-flex">
            <ChevronLeft onClick={() => navigate(-1)} />
            <h5>
              {name},{place}
            </h5>
          </div>
          <span style={{ fontSize: "16px", color: "green" }}>{time}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search"
            style={{
              height: `${height * 0.07}px`,
              width: `${width - 120}px`,
              border: "1px solid #ccc", // Subtle border color
              borderRadius: "20px", // Smooth rounded corners
              fontSize: "16px", // Slightly larger font
              padding: "0px 20px", // Adequate padding for comfortable typing
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              outline: "none", // Remove blue border on focus
              transition: "border-color 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
            }}
            placeholder="Search..."
            onFocus={(e) => {
              e.target.style.borderColor = "rgb(5, 165, 173)";
              e.target.style.boxShadow = "0 4px 8px rgba(5, 165, 173, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            }}
          />

          <QrScannerComponent onScanComplete={handleScanComplete} />
        </div>

        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result) => (
              <div
                key={result.userID}
                onClick={() => handleAddRecord(result)}
                style={{ cursor: "pointer" }}
              >
                {result.name} ({result.careof})
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span>Count : {fetchedRecords.length}</span>
          <CirclePlus className="text-success" />
          <button className="btn btn-primary" onClick={handleShow}>
            Save
          </button>
        </div>

        <hr />
        <h6>Boys:</h6>
        {fetchedRecords.length > 0 ? (
          fetchedRecords.map((record, index) => (
            <div
              key={record.userID}
              className="list d-flex justify-content-between align-items-center mb-2"
              style={{
                height: `${height * 0.08}px`,
                width: `${width - 40}px`,
                border: "1px solid",
                borderRadius: "10px",
                fontSize: "15px",
                padding: "0px 20px",
                cursor: "pointer",
              }}
              onClick={() => handleShowModal(record)}
            >
              <span>{index + 1}</span>
              <span>{record.name}</span>
              <span style={{ color: "grey" }}>{record.careof}</span>
              <span style={{ fontSize: "13px", color: "green" }}>
                {record.time}
              </span>
            </div>
          ))
        ) : (
          <p>No boys.</p>
        )}

        {/* Boy Details Modal */}
        {selectedRecord && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Show Boy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Name:</strong> {selectedRecord.name}
              </p>
              <p>
                <strong>C/O:</strong> {selectedRecord.careof}
              </p>
              <p>
                <strong>Entry Time:</strong> {selectedRecord.time}
              </p>
              <p className="d-flex justify-content-between align-items-center">
                <strong>Fine:</strong>
                <select className="form-select w-auto">
                  <option value="Late">Late</option>
                  <option value="Costume">Costume</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Warning">Warning</option>
                </select>
              </p>
              <Button
                variant="danger"
                className="mt-3"
                onClick={() => setShowConfirmModal(true)}
              >
                Remove User
              </Button>
            </Modal.Body>
          </Modal>
        )}

        {/* Confirm Delete Modal */}
        {selectedRecord && (
          <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove {selectedRecord.name}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleRemoveUser}>
                Remove
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>Saving confirmation</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Auditorium;
