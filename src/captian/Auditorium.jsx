import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ScanQrCode, SlidersHorizontal, CirclePlus } from "lucide-react";
import { Button, Modal } from "react-bootstrap";
import QrScannerComponent from "./QrScannerComponent ";


const Auditorium = ({ height, width }) => {
  const [fetchedRecords, setFetchedRecords] = useState([]);

  const handleScanComplete = (data) => {
    if (data && data.length > 0) {
      setFetchedRecords((prevRecords) => {
        const newRecords = data.filter(
          (record) =>
            !prevRecords.some(
              (existingRecord) =>
                existingRecord.id === record.id // Ensure uniqueness by checking `id`
            )
        );
        return [...prevRecords, ...newRecords];
      });
    }
  };

  const location = useLocation();
  const { date, time, name, place } = location.state || {};

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterSelect = (filterOption) => {
    console.log(`Selected filter: ${filterOption}`);
    setIsFilterOpen(false);
  };

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
            <ChevronLeft onClick={handleBackClick} />
            <h5>
              {name},{place}
            </h5>
          </div>
          <span style={{ fontSize: "16px", color: "green" }}>{time}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="search"
            style={{
              height: `${height * 0.07}px`,
              width: `${width - 120}px`,
              border: "1px solid",
              borderRadius: "10px",
              fontSize: "15px",
              padding: "0px 20px",
            }}
          />
          <QrScannerComponent onScanComplete={handleScanComplete} />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span>Count : {fetchedRecords.length}</span>
          <CirclePlus className="text-success" />
        </div>

        <hr />
        <h6>Boys:</h6>
        {fetchedRecords.length > 0 ? (
          fetchedRecords.map((record, index) => (
            <div
              key={index}
              className="list d-flex justify-content-between align-items-center mb-2"
              style={{
                height: `${height * 0.08}px`,
                width: `${width - 40}px`,
                border: "1px solid",
                borderRadius: "10px",
                fontSize: "15px",
                padding: "0px 20px",
              }}
            >
              <span>{index + 1}</span>
              <span>{record.name}</span>
              <span style={{ color: "grey" }}>{record.userID.split('-')[1]}</span>
              <span style={{ fontSize: "13px", color: "green" }}>
                {record.time}
              </span>
            </div>
          ))
        ) : (
          <p>No records fetched yet.</p>
        )}
      </div>
    </>
  );
};

export default Auditorium;
