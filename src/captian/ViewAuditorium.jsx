import { PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const ViewAuditorium = ({ height, width }) => {
  const [data, setData] = useState({
  
    name: "",
    place: "",
    time: ""
  })

  const location = useLocation();
  const { eventId } = location.state || {}; // Extract the eventId from state

  const fetchEvent = async () => {
    if (!eventId) {
      console.error("No eventId provided.");
      return;
    }

    try {
      const db = getFirestore(); // Initialize Firestore
      const eventRef = doc(db, "events", eventId); // Reference the specific document
      const eventSnapshot = await getDoc(eventRef);
     

      if (eventSnapshot.exists()) {
      
        const eventData = eventSnapshot.data();
        console.log("Event Name:", eventData.name); // Log the name field
        const timestamp = eventData.timestamp;
        const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear()).slice(2)}`;

        setData({
          ...data,
          name: eventData.name,
          place: eventData.place,
          time:formattedTime,
          date:formattedDate

        })

       

      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    fetchEvent(eventId);
  }, [])

  console.log("data",data);
  


  return (
    <>
      <div className='home d-flex flex-column ' style={{ width: `${width}px`, height: `${height}px`, paddingLeft: "10px", paddingRight: "10px" }}>
        <div style={{ marginTop: `${height * 0.1 + 15}px`, }}>


        </div>
        <Link
  to={{
    pathname: "/captain/auditorium",
  }}
  state={{
    date: data.date,
    time: data.time,
    name: data.name,
    place: data.place,
  }}
  className="text-dark"
  style={{
    textDecoration: "none",
    height: `${height * 0.18}px`,
    margin: "10px",
    borderRadius: "10px",
    border: "1px solid",
    cursor: "pointer",
  }}
>
  <div className="d-flex gap-3 justify-content-between p-3 fs-5">
    <p>{data.date}</p>
    <p className="text-success">{data.time}</p>
  </div>
  <p style={{ fontWeight: "500" }} className="ps-3 fs-5">
    {data.name}, {data.place}
  </p>
</Link>

        <span style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "500" }}>Overview</span>
        <div className='service ' style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/pLqW3rtB/service-bg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
          <div className=''> <span style={{ fontSize: "18px", fontWeight: "500" }}>Service</span>
            <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
          </div>
          <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>25</span></div>
        </div>

        <div className='Payment ' style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/gJBGjT0L/paymentbg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
          <div className=' d-flex justify-content-between'> <span style={{ fontSize: "18px", fontWeight: "500" }}>Earnings</span>
            <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
          </div>
          <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>2500</span></div>
        </div>

      </div>
    </>
  )
}

export default ViewAuditorium