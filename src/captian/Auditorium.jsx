import React, { useState } from "react";
import QrIcon from "../assets/scanner.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Auditorium = ({ height, width }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div style={{ marginTop: `${height * 0.1 + 10}px`, width: `${width}` }}>
        <div
          className="d-flex p-2 justify-content-between mx-3"
          style={{ fontSize: "13px" }}
        >
          <div className="d-flex gap-3">
            <i onClick={back} className="fa-solid fa-angle-left fs-3 "></i>
            <h3 style={{ fontSize: "16px", marginTop: "3px" }}>
              Auditorium, place
            </h3>
          </div>
          <p style={{ marginTop: "3px" }} className="text-success fw-semibold ">
            08:30 am
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <div
            className="border border-dark px-5 w-75 ms-3 me-3 rounded d-flex justify-content-center align-items-center"
            style={{ height: "39px" }}
          >
            Search
          </div>
          <img className="me-3" width={"50px"} src={QrIcon} alt="QR Scanner" />
        </div>

        <div className="d-flex justify-content-between align-items-center ms-3 me-3 mt-4">
          <p className="ms-1">Count : 1</p>
          <p className="border border-dark px-4 rounded">Filter</p>
        </div>

        <hr className="border w-100 shadow border-secondary mx-1 mb-3" />

        <p className="ms-3">Boys :</p>
        <div
          onClick={handleShow}
          className="d-flex justify-content-between align-items-center border rounded border border-dark mx-3 mt-4 "
        >
          <div className="d-flex gap-5 ms-3 mt-2">
            <h3>1</h3>
            <h3>Name</h3>
          </div>
          <p className="text-secondary mt-3 me-5">c/o</p>
        </div>

        <button
          className="btn btn-success position-fixed d-flex align-items-center rounded-circle"
          style={{ position: "fixed", bottom: "120px", right: "15px" }}
        >
          +
        </button>
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
