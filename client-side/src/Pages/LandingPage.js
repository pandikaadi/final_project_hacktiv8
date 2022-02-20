import React, { useEffect } from "react";
import UpperBody from "../Components/UpperBody";
import AboutUs from "../Components/AboutUs";
import AboutUs2 from "../Components/AboutUs2";
import Review from "../Components/Review";
import LocationForm from "../Components/LocationForm";

function LandingPage() {
  // useEffect(() => {
  //   dispatchEvent(myBooking())
  // }, [])
  return (
    <>
      <UpperBody />
      <AboutUs />
      <AboutUs2 />
      <Review />
      <LocationForm />
    </>
  );
}
export default LandingPage;
