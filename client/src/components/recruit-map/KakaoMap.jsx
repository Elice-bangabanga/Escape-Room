import React, { useState, useEffect } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { regionCoordinate } from '../../constants/regionCoordinate';
import { ApiUrl } from '../../constants/ApiUrl';
import * as api from '../../utils/api';
import markerImg from '../../assets/images/icon/marker.png';
import clickedMarkerImg from '../../assets/images/icon/marker-clicked.png';

async function getCafeInfo(region) {
  try {
    const cafeInfoObj = await api.get(ApiUrl.CAFE_INFO, region);
    return cafeInfoObj;
  } catch (err) {
    alert(err.message);
  }
}

export default function KakaoMap({ region }) {
  const BASIC_SIZE = 35;
  const OVER_SIZE = 40;
  const [target, setTarget] = useState(null);
  const [cafeInfo, setCafeInfo] = useState({});

  useEffect(() => {
    const addRegionCafeData = async () => {
      const regionCafeInfoArr = await getCafeInfo(region);
      setCafeInfo({ ...cafeInfo, [region]: regionCafeInfoArr });
    };
    if (!cafeInfo[region]) addRegionCafeData();
  }, [region]);

  const MarkerContainer = ({ cafeId, setTarget, position, content }) => {
    const map = useMap();
    const [isOver, setIsOver] = useState(false);
    let markerIcon = cafeId === target ? clickedMarkerImg : markerImg;
    let markerSize = isOver ? OVER_SIZE : BASIC_SIZE;
    return (
      <MapMarker
        position={position}
        image={{
          src: markerIcon,
          size: {
            width: markerSize,
            height: markerSize,
          },
        }}
        clickable={true}
        onClick={(marker) => {
          map.panTo(marker.getPosition());
          setTimeout(() => setTarget(cafeId));
        }}
        onMouseOver={() => setIsOver(true)}
        onMouseOut={() => setIsOver(false)}>
        {isOver && content}
      </MapMarker>
    );
  };

  return (
    <Map
      center={regionCoordinate[region]}
      style={{
        width: '800px',
        height: '700px',
      }}
      level={4}>
      {cafeInfo?.[region] &&
        cafeInfo[region].map((cafe) => (
          <MarkerContainer
            key={cafe.cafeId}
            cafeId={cafe.cafeId}
            setTarget={setTarget}
            position={{ lat: cafe.lat, lng: cafe.lng }}
            content={cafe.cafeName}
          />
        ))}
    </Map>
  );
}