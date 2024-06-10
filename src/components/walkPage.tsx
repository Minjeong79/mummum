import { useState, useEffect } from "react";
import useGeolocation from "react-hook-geolocation";

const WalkPage = () => {

  const [walks, setWalks] = useState(0);
  const geolocation = useGeolocation();
  const latitude = geolocation.latitude;
  const longitude = geolocation.longitude;

  // const handleWalk = () => {
  //   setInterval(() => {
  //     setWalks((prevWalks) => prevWalks + 1);
  //   }, 500);
  // };

  const handleWalk = () => {
    setWalks(walks+1);
  };
  useEffect(()=>{
    handleWalk()
  },[latitude, longitude])
  return( <section>산책{walks}</section>);
};

export default WalkPage;
