import React, { useEffect } from "react";

function Map() {
    useEffect(() => {
        const kakaoMapScript = document.createElement("script");
        kakaoMapScript.async = true;
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=835916c84798174ecf54d281badf3941&autoload=false`;
        document.head.appendChild(kakaoMapScript);

        kakaoMapScript.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3,
                };

                new window.kakao.maps.Map(container, options);
            });
        };
    }, []);

    return (
        <div
            id="map"
            style={{ width: "500px", height: "400px" }}
        ></div>
    );
}

export default Map;