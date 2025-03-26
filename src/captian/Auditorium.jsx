import React, { useState } from "react";
import QrIcon from "../assets/scanner.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import { ScanQrCode } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import { CirclePlus } from 'lucide-react';

import QrScanner from "./QrScanner";


const Auditorium = ({ height, width }) => {

  const location = useLocation();
  const { date, time, name, place } = location.state || {};



  const [show, setShow] = useState(false);

  const back = () => {
    navigate(-1);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate()

  // Navigate back to the previous page
  const handleBackClick = () => {
    navigate(-1);
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterSelect = (filterOption) => {
    console.log(`Selected filter: ${filterOption}`);
    setIsFilterOpen(false); // Close filter dropdown
  };

  return (
    <>
      <div className='home d-flex flex-column  ' style={{ width: `${width}px`, marginTop: `${height * 0.1}px`, marginBottom: `${height * 0.1}px`, padding: "10px 20px" }}>
        <div className='d-flex justify-content-between align-items-center mb-3 mt-2 '>
          <div className="d-flex ">
            <ChevronLeft onClick={handleBackClick} />
            <h5>{name},{place}</h5></div>
          <span style={{ fontSize: "16px", color: "green" }}>{time}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <input type="text" className='search d-flex justify-content-between align-items-center mb-2 ' style={{ height: `${height * 0.07}px`, width: `${width - 120}px`, border: "1px solid", borderRadius: "10px", fontSize: "15px", padding: "0px 20px" }} >


          </input>
          <QrScanner/>
          

        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span>Count : 10</span>
          <CirclePlus className=" text-success"/>
          {/* Filter Icon and Dropdown */}
          <div className="position-relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <SlidersHorizontal />
            </button>

            {isFilterOpen && (
              <div
                style={{
                  position: "absolute",
                  width: "200px",
                  top: "35px",
                  right: 0,
                  background: "white",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "10px",
                  zIndex: 998,
                }}
              >
                {["Bc1", "bC2"].map((option) => (
                  <p
                    key={option}
                    onClick={() => handleFilterSelect(option)}
                    style={{
                      margin: 0,
                      padding: "5px 0",
                      cursor: "pointer",
                    }}
                  >
                    {option}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <hr />
        <div className='list d-flex justify-content-between align-items-center mb-2 ' style={{ height: `${height * 0.08}px`, width: `${width - 40}px`, border: "1px solid", borderRadius: "10px", fontSize: "15px", padding: "0px 20px" }} >
            <span>1</span>
            <span>Name</span>
            <span style={{color:"grey"}}>C/O</span>
            <span style={{fontSize:"13px",color:"green"}}>08-30 am</span>
          
        </div>




      </div>

      <Modal show={show} centered>
        <Modal.Body className="pt-4">
          <div className="mb-3 d-flex  align-items-center">
            <label className="form-label me-2">Name&nbsp;&nbsp;:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label className="form-label me-3">Entry&nbsp;&nbsp;:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label className="form-label me-4">C/O&nbsp;&nbsp;:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label className="form-label me-4">Fine&nbsp;&nbsp;:</label>
            <input type="text" className="form-control" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Link to={"/captain/view-auditorium"} className="btn btn-primary">
            Save
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Auditorium;
