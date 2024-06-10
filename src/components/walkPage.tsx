// import { useState, useEffect } from "react";
// import useGeolocation from "react-hook-geolocation";

// const WalkPage = () => {

//   const [walks, setWalks] = useState(0);
//   const geolocation = useGeolocation();
//   const latitude = geolocation.latitude;
//   const longitude = geolocation.longitude;

//   const handleWalk = () => {
//     setWalks(walks+1)
//   };
//   useEffect(()=>{
//     handleWalk()
//   },[latitude, longitude])
//   return( <section>산책{walks}</section>);
// };

// export default WalkPage;
import { useState, useEffect } from "react";
// import useGeolocation from "react-hook-geolocation";

const WalkPage = () => {
  const [walks, setWalks] = useState(0);
  // const geolocation = useGeolocation();

  useEffect(() => {
    const handleWalk = () => {
      setWalks(prevWalks => prevWalks + 1);
    };

    // 위치 정보가 변경될 때마다 호출됩니다.
    const watchId = navigator.geolocation.watchPosition(handleWalk);

    // 컴포넌트가 언마운트될 때 위치 정보 변경 감지를 중지합니다.
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return <section>산책 {walks}</section>;
};

export default WalkPage;
