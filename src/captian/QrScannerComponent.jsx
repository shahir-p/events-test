import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ScanQrCode } from "lucide-react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const QrScannerComponent = ({ onScanComplete }) => {
  const [scannedData, setScannedData] = useState([]); // Initialize as an empty array
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [showResult, setShowResult] = useState("");
  const [resultColor, setResultColor] = useState("green"); // Default color

  const handleScan = (result) => {
    if (result) {
      const rowValue = result[0].rawValue || result[0].text; // Ensure you get the correct value from the QR result
      if (rowValue) {
        const scanTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract time only
        setScannedData((prevData) => {
          const alreadyScanned = prevData.some((data) => data.value === rowValue);
          if (alreadyScanned) {
            setShowResult("Already been scanned");
            setResultColor("red");
            return prevData;
          }
          setShowResult(rowValue);
          setResultColor("green");
          return [...prevData, { value: rowValue, time: scanTime }];
       
        });
      }
    }
  };
  

  const fetchfromDB = async (userID) => {
    const db = getFirestore();

    try {
      const staffQuery = query(
        collection(db, "staff"),
        where("userID", "==", userID)
      );

      const querySnapshot = await getDocs(staffQuery);
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });

      // Send fetched data along with the scanning time to the parent component
      const latestScanned = scannedData[scannedData.length - 1];
      onScanComplete(fetchedData.map((data) => ({ ...data, time: latestScanned.time })));
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  useEffect(() => {
    if (scannedData.length > 0) {
      const latestScanned = scannedData[scannedData.length - 1].value; // Get the latest scanned value
      fetchfromDB(latestScanned);
    }
  }, [scannedData]);

  return (
    <div>
      <ScanQrCode
        size={50}
        onClick={() => setIsModalOpen(true)}
        className="mb-2"
      />

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Scan QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Scanner
            onScan={handleScan}
            onError={(error) => console.error("Scanning error:", error)}
            constraints={{ facingMode: "environment" }}
          />
          <p
            className="mt-2"
            style={{ textAlign: "center", color: resultColor }}
          >
            {showResult}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QrScannerComponent;
