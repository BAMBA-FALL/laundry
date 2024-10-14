import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './PublicLayout'
import  Home from './Home'
import Login from "../Auth/Login";
import SignupForm from "../Auth/SignupForm"
import Error from '../../_Utiles/Error';
import UserProfile from './UserProfile';
import PersonalInfo from './PersonalInfos';
import LaundryStatus from './LaundryStatus';
import AppointmentSection from './AppointmentSection';
const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signupform" element={<SignupForm />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="personalinfo" element={<PersonalInfo/>} />
        <Route path="laundrystatus" element={<LaundryStatus />} />
        <Route path="appointmentsection" element={<AppointmentSection />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default PublicRouter;
