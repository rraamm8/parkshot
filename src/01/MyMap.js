// import {
//   Container as MapDiv,
//   NaverMap,
//   Marker,
//   useNavermaps,
// } from "react-naver-maps";
// import { useState } from "react";

// export default function MyMap({ area }) {
//   // instead of window.naver.maps
//   let address = area;
//   const navermaps = useNavermaps();
//   // useRef 대신 useState를 통해 ref를 가져옵니다.
//   const [map, setMap] = useState(null);

//   const fetchGeocode = async (address) => {
//     if (!navermaps?.Service?.geocode) {
//       console.error("Geocoding service is not available.");
//       return null;
//     }

//     return new Promise((resolve) => {
//       navermaps.Service.geocode({ query: address }, (status, response) => {
//         if (
//           status === navermaps.Service.Status.OK &&
//           response.v2.addresses.length > 0
//         ) {
//           const { x, y } = response.v2.addresses[0];
//           resolve({ lat: parseFloat(y), lng: parseFloat(x) });
//         } else {
//           console.error(`Failed to geocode address: ${address}`);
//           resolve(null);
//         }
//       });
//     });
//   };
//   //   const busan = new navermaps.LatLng(35.1797865, 129.0750194);
//   //   const jeju = new navermaps.LatLng(33.3590628, 126.534361);
//   //   const dokdo = new navermaps.LatLngBounds(
//   //     new navermaps.LatLng(37.2380651, 131.8562652),
//   //     new navermaps.LatLng(37.2444436, 131.8786475)
//   //   );

//   //   if (area === "busan") map.setCenter(busan);
//   //   else if (area === "jeju") map.setCenter(jeju);
//   return (
//     <>
//       <NaverMap
//         defaultCenter={new navermaps.LatLng(35.2333798, 129.0798453)}
//         defaultZoom={15}
//         ref={setMap}
//       >
//         <Marker
//           defaultPosition={new navermaps.LatLng(35.2333798, 129.0798453)}
//         />
//       </NaverMap>
//     </>
//   );
// }

import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import { useState, useEffect } from "react";

export default function MyMap({ area }) {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const fetchGeocode = async (address) => {
    if (!navermaps?.Service?.geocode) {
      console.error("Geocoding service is not available.");
      return null;
    }

    return new Promise((resolve) => {
      navermaps.Service.geocode({ query: address }, (status, response) => {
        if (
          status === navermaps.Service.Status.OK &&
          response.v2.addresses.length > 0
        ) {
          const { x, y } = response.v2.addresses[0];
          resolve({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          console.error(`Failed to geocode address: ${address}`);
          resolve(null);
        }
      });
    });
  };

  useEffect(() => {
    const loadGeocode = async () => {
      if (area) {
        const position = await fetchGeocode(area);
        if (position && map) {
          map.setCenter(new navermaps.LatLng(position.lat, position.lng));
          setMarkerPosition(new navermaps.LatLng(position.lat, position.lng));
        }
      }
    };
    loadGeocode();
  }, [area, map]); // area와 map이 변경될 때마다 실행

  return (
    <>
      <NaverMap
        defaultCenter={new navermaps.LatLng(35.2333798, 129.0798453)}
        defaultZoom={15}
        ref={setMap}
      >
        {markerPosition && (
          <Marker
            position={markerPosition} // 새로운 마커 위치 설정
          />
        )}
      </NaverMap>
    </>
  );
}
