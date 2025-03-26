import React from 'react'
import MgAppbar from './manager/MgAppbar'
import MgBottom from './manager/MgBottom'
import MgHome from './manager/MgHome'
import { Routes, Route } from 'react-router-dom';
import MgPay from './manager/MgPay';
import MgStaff from './manager/MgStaff';
import MgEvents from './manager/MgEvents';
import MgEventDetails from './manager/MgEventDetails';
import MgEventBoys from './manager/MgEventBoys';
import Mgpaymentdetails from './manager/Mgpaymentdetails';
import Mgpayment from './manager/Mgpayment';

const Managermodule = ({ height, width }) => {
  return (
    <>
      <MgAppbar height={height} width={width} />
      <MgBottom height={height} width={width} />

      <Routes>
        <Route path="/" element={<MgHome height={height} width={width} />} />
        <Route path="staff" element={<MgStaff  height={height} width={width} />} />
        <Route path="pay" element={<MgPay height={height} width={width} />} />
        
        <Route path="events" element={<MgEvents height={height} width={width} />} />
        <Route path="eventdetails" element={<MgEventDetails height={height} width={width} />} />
        <Route path="eventboys" element={<MgEventBoys height={height} width={width} />} />
        <Route path="eventfine" element={<MgEventBoys height={height} width={width} />} />
        <Route path="paymentdetails" element={<Mgpaymentdetails height={height} width={width} />} />
        <Route path="payments" element={<Mgpayment height={height} width={width} />} />

      
      </Routes>

    </>
  )
}

export default Managermodule