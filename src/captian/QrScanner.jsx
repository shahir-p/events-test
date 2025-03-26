import React, { useState, useEffect } from "react";
import { ScanQrCode } from "lucide-react"; // QR Code Icon
import { Modal, Button } from "react-bootstrap"; // Modal and Button from Bootstrap
import { Html5QrcodeScanner } from "html5-qrcode";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const QrScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Camera toggle state

  // Path to the sound file (you can replace it with any sound file)
  const beepSound = new Audio("../assets/beep.mp3");

  // Cleanup and reinitialize scanner when the modal opens/closes
  useEffect(() => {
    let qrCodeScanner;

    if (isModalOpen) {
      // Initialize the scanner when the modal opens
      qrCodeScanner = new Html5QrcodeScanner(
        "qr-reader", // ID of the div element where the scanner will render
        {
          fps: 10, // Frames per second
          qrbox: 250, // Size of the scanning box (square)
        },
        false // Whether to use camera scanning
      );

      qrCodeScanner.render(
        (decodedText) => {
          console.log("Scanned QR Code:", decodedText);
          setScannedData(decodedText);

          // Play beep sound when a QR code is successfully scanned
          beepSound.play();

          // Decode the scanned data here if needed (you can parse it or manipulate as required)
          // For example: If the QR code contains a JSON object, you can parse it like:
          // const decodedObject = JSON.parse(decodedText);

          qrCodeScanner.clear(); // Stop the scanner after a successful scan
          setIsModalOpen(false); // Close the modal after scanning
        },
        (error) => {
          console.error("QR Code Scanning Error:", error);
        }
      );

      setIsCameraOpen(true); // Enable the camera when the modal is open
    }

    // Cleanup when the modal is closed or the component is unmounted
    return () => {
      if (qrCodeScanner) {
        qrCodeScanner.clear(); // Stop the scanner when the modal closes
      }
    };
  }, [isModalOpen]); // Re-run when the modal opens/closes

  const handleScanClick = () => {
    setIsModalOpen(true); // Open the modal when the QR icon is clicked
  };

  return (
    <div className="p-4">
      {/* Scanner Icon */}
      <ScanQrCode
        size={50}
        className="mb-2 cursor-pointer text-blue-500"
        onClick={handleScanClick} // When the icon is clicked, open the modal
      />

      {/* Modal to display the QR scanner */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Scan QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* QR Scanner inside the Modal */}
          {isCameraOpen && (
            <div id="qr-reader" style={{ width: "100%" }}></div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display scanned data */}
      {scannedData && (
        <div className="mt-4">
          <h4>Scanned Data:</h4>
          <p>{scannedData}</p>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
