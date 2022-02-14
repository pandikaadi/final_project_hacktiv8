import React from "react";
import { useState } from "react";
import UpperBody from "../Components/UpperBody";
import AboutUs from "../Components/AboutUs";
import AboutUs2 from "../Components/AboutUs2";
import Review from "../Components/Review";
import LocationForm from "../Components/LocationForm";

function LandingPage() {
  const [user, setUser] = useState(false);

  return (
    <>
      <UpperBody payload={setUser} />
      {!user && <AboutUs />}
      {!user && <AboutUs2 />}
      {!user && <Review />}
      {!user && <LocationForm />}
    </>
  );
}

export default LandingPage;
