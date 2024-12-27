import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import { useState } from "react";

export default function MyMap({ area }) {
  // instead of window.naver.maps
  const navermaps = useNavermaps();
  // useRef 대신 useState를 통해 ref를 가져옵니다.
  const [map, setMap] = useState(null);
  const [golfCourses, setGolfCourses] = useState([]);
  const busan = new navermaps.LatLng(35.1797865, 129.0750194);
  const jeju = new navermaps.LatLng(33.3590628, 126.534361);
  const dokdo = new navermaps.LatLngBounds(
    new navermaps.LatLng(37.2380651, 131.8562652),
    new navermaps.LatLng(37.2444436, 131.8786475)
  );

  console.log(area);

  if (area === "busan") map.setCenter(busan);
  else if (area === "jeju") map.setCenter(jeju);
  return (
    <>
      <NaverMap
        defaultCenter={new navermaps.LatLng(35.2333798, 129.0798453)}
        defaultZoom={15}
        ref={setMap}
      >
        <Marker
          defaultPosition={new navermaps.LatLng(35.2333798, 129.0798453)}
        />
      </NaverMap>
    </>
  );
}
