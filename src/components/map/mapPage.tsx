import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Marker } from "../../lib/type";
import MenuFooter from "../main/footer";


interface Info extends Marker {}

const MapPage = () => {
  const [info, setInfo] = useState<Info | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [keywordTxt, setKeyWordTxt] = useState("");
  useEffect(() => {
    if (!map) return;
    map.setLevel(3);
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keywordTxt, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          const lat = parseFloat(data[i].y); 
          const lng = parseFloat(data[i].x); 
          markers.push({
            position: {
              lat: lat,
              lng: lng,
            },
            content: data[i].place_name,
            address: data[i].address_name,
          });

          bounds.extend(new kakao.maps.LatLng(lat, lng));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      }
    });
  }, [map]);

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
          newMarkers.push({
            position,
            content: place.place_name,
            address: place.address_name,
          });
          bounds.extend(new kakao.maps.LatLng(lat, lng));
        });

        setMarkers(newMarkers);
        map!.setBounds(bounds);
      }
    });
  };

  return (
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen relative">
        <div className="max-w-lg">
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
                {info && info.content === marker.content && (
                  <div style={{ color: "#000" }}>
                    {marker.content}
                    <br />
                    {marker.address}
                  </div>
                )}
              </MapMarker>
            ))}
          </Map>
          <div className="flex flex-col justify-center items-center mt-6 gap-y-12">
            <h3>검색어를 자세 하게 입력 해주세요</h3>
            <form onSubmit={handleKeywordSubmit} className="flex gap-3">
              <input
                type="text"
                value={keywordTxt}
                onChange={(e) => setKeyWordTxt(e.target.value)}
                placeholder="장소를 검색하세요"
                className="p-2 rounded-lg invalid:border-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              <button
                type="submit"
                className="bg-[#FD943F] text-white rounded-lg px-4 py-2"
              >
                검색
              </button>
            </form>
          </div>
          <div className="absolute bottom-0 w-full">
            <MenuFooter />
          </div>
        </div>
      </section>
    </section>
  );
};

export default MapPage;
