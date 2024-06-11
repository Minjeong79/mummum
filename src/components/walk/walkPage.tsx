import { useState, useEffect } from "react";
import { Map, MapMarker } from 'react-kakao-maps-sdk';


interface Position {
  lat: number;
  lng: number;
}

interface Marker {
  position: Position;
  content: string;
  address :string;
}

interface Info extends Marker {}

const WalkPage = () => {

  const [info, setInfo] = useState<Info | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [keywordTxt, setKeyWordTxt] = useState("");
  useEffect(() => {
    if (!map) return
    map.setLevel(3); 
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(keywordTxt, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          const lat = parseFloat(data[i].y); // string을 number로 변환
          const lng = parseFloat(data[i].x); // string을 number로 변환
          markers.push({
            position: {
              lat: lat, 
              lng: lng, 
            },
            content: data[i].place_name,
            address: data[i].address_name,
          })
         
          bounds.extend(new kakao.maps.LatLng(lat, lng))
        }
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map])

  const handleKeywordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keywordTxt, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers: Marker[] = [];

        data.forEach((place: any) => {
          const lat = parseFloat(place.y);
          const lng = parseFloat(place.x);
          const position = { lat, lng };
          newMarkers.push({ position, content: place.place_name, address: place.address_name });
          bounds.extend(new kakao.maps.LatLng(lat, lng));
        });

        setMarkers(newMarkers);
        map!.setBounds(bounds);
      }
    });
  };

  return( 
  <section>
     <Map 
    center={{
      lat: 37.566826,
      lng: 126.9786567,
    }}
    style={{
      width: "100%",
      height: "350px",
    }}
    level={3}
    onCreate={setMap}
  >
    {markers.map((marker) => (
      <MapMarker
        key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
        position={marker.position}
        onClick={() => setInfo(marker)}
      >
        {info &&info.content === marker.content && (
          <div style={{color:"#000"}}>{marker.content}<br />
              {marker.address}</div>
        )}
      </MapMarker>
    ))}
  </Map>
    <div>
      <h3>검색어를 자세 하게 입력 해주세요</h3>
    <form onSubmit={handleKeywordSubmit}>
          <input 
            type="text" 
            value={keywordTxt} 
            onChange={(e) => setKeyWordTxt(e.target.value)} 
            placeholder="장소를 검색하세요"
          />
          <button type="submit">검색</button>
        </form>
    </div>
    </section>
   
  );
};

export default WalkPage;
