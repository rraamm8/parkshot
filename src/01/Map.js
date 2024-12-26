// import React, { useEffect, useRef, useState } from "react";
// import {
//   Container as MapDiv,
//   NaverMap,
//   Marker,
//   useNavermaps,
// } from "react-naver-maps";
// import "./Map.css";

// function Map() {
//   const navermaps = useNavermaps();
//   const mapRef = useRef(null); // 지도 객체 참조
//   const [mapInitialized, setMapInitialized] = useState(false); // 지도 초기화 여부
//   const [searchInput, setSearchInput] = useState(""); // 검색 입력 값
//   const [searchResults, setSearchResults] = useState([]); // 검색 결과
//   const [markers, setMarkers] = useState([]); // 지도에 표시할 마커

//   useEffect(() => {
//     if (!window.naver?.maps) {
//       console.error("Naver maps script not loaded.");
//     }
//   }, []);

//   const handleSearch = async () => {
//     if (!searchInput.trim()) {
//       alert("검색어를 입력해주세요.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8080/golfcourse/location?location=${encodeURIComponent(
//           searchInput
//         )}`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setSearchResults(data);

//       if (data.length === 0) {
//         alert("검색된 결과가 없습니다.");
//       }
//     } catch (error) {
//       console.error("Error during search:", error);
//     }
//   };

//   const handleAddressClick = async (address) => {
//     if (!mapInitialized || !mapRef.current) {
//       console.error("Map instance is not initialized.");
//       return;
//     }

//     try {
//       const geocodeResult = await fetchGeocode(address);
//       if (geocodeResult) {
//         const { lat, lng } = geocodeResult;
//         mapRef.current.setCenter(new navermaps.LatLng(lat, lng));
//         mapRef.current.setZoom(14);
//         setMarkers([{ lat, lng, name: address }]);
//       } else {
//         console.error(`Failed to geocode address: ${address}`);
//       }
//     } catch (error) {
//       console.error("Error during geocoding:", error);
//     }
//   };

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

//   return (
//     <div className="map-container">
//       <MapDiv className="map-wrapper">
//         <NaverMap
//           onLoad={(map) => {
//             mapRef.current = map; // 지도 객체 설정
//             setMapInitialized(true); // 초기화 상태 설정
//             console.log("Map instance loaded:", map);
//           }}
//           defaultCenter={new navermaps.LatLng(35.2333798, 129.0798453)} // 기본 좌표
//           defaultZoom={14}
//           zoomControlOptions={{
//             position: navermaps.Position.BOTTOM_RIGHT,
//           }}
//         >
//           {markers.map((marker, index) => (
//             <Marker
//               key={index}
//               position={new navermaps.LatLng(marker.lat, marker.lng)}
//               title={marker.name}
//             />
//           ))}
//         </NaverMap>
//       </MapDiv>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="골프장 이름 또는 주소 입력"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           className="search-input"
//         />
//         <button onClick={handleSearch} className="search-button">
//           검색
//         </button>
//       </div>

//       <div className="search-results">
//         {searchResults.map((result, index) => (
//           <div
//             key={index}
//             className="search-result-item"
//             onClick={() => handleAddressClick(result.location)}
//             style={{ cursor: "pointer" }}
//           >
//             <strong>{result.name}</strong> - {result.location}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Map;

import React, { useEffect, useRef, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import "./Map.css";

function Map() {
  const navermaps = useNavermaps();
  const mapRef = useRef(null); // 지도 객체 참조
  const [mapInitialized, setMapInitialized] = useState(false); // 지도 초기화 여부
  const [searchInput, setSearchInput] = useState(""); // 검색 입력 값
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [markers, setMarkers] = useState([]); // 지도에 표시할 마커

  // 지도 초기화 상태를 감시
  useEffect(() => {
    if (!window.naver?.maps) {
      console.error("Naver maps script not loaded.");
    }
  }, []);

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/golfcourse/location?location=${encodeURIComponent(
          searchInput
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data);

      if (data.length === 0) {
        alert("검색된 결과가 없습니다.");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleAddressClick = async (address) => {
    // 지도 초기화 여부를 확인
    if (!mapInitialized || !mapRef.current) {
      console.error("Map instance is not initialized yet.");
      return;
    }

    try {
      const geocodeResult = await fetchGeocode(address);
      if (geocodeResult) {
        const { lat, lng } = geocodeResult;
        mapRef.current.setCenter(new navermaps.LatLng(lat, lng));
        mapRef.current.setZoom(14);
        setMarkers([{ lat, lng, name: address }]);
      } else {
        console.error(`Failed to geocode address: ${address}`);
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
    }
  };

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

  return (
    <div className="map-container">
      <MapDiv className="map-wrapper">
        <NaverMap
          onLoad={(map) => {
            mapRef.current = map; // 지도 객체 설정
            setMapInitialized(true); // 지도 초기화 상태 설정
            console.log("Map instance loaded:", map);
          }}
          defaultCenter={new navermaps.LatLng(35.2333798, 129.0798453)} // 기본 좌표
          defaultZoom={14}
          zoomControlOptions={{
            position: navermaps.Position.BOTTOM_RIGHT,
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={new navermaps.LatLng(marker.lat, marker.lng)}
              title={marker.name}
            />
          ))}
        </NaverMap>
      </MapDiv>

      <div className="search-container">
        <input
          type="text"
          placeholder="골프장 이름 또는 주소 입력"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          검색
        </button>
      </div>

      <div className="search-results">
        {searchResults.map((result, index) => (
          <div
            key={index}
            className="search-result-item"
            onClick={() => handleAddressClick(result.location)}
            style={{ cursor: "pointer" }}
          >
            <strong>{result.name}</strong> - {result.location}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Map;
