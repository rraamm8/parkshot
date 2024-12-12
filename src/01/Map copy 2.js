import { useEffect, useRef } from "react";

const Map = () => {
    const container = useRef(null); // 지도 컨테이너 접근
    const { kakao } = window; // window 객체에서 kakao 가져오기

    useEffect(() => {
        const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
            level: 3, // 확대 레벨
        };
        new window.kakao.maps.Map(container.current, options); // 지도 생성
    }, [kakao]);

    return (
    <div ref={container} style={{ width: "500px", height: "400px" }}>

    </div>);
};

export default Map;