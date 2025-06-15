import React, { useEffect, useRef } from "react";
import "./styles.css";

function GoogleMap() {
  const mapRef = useRef(null);// ref para acessar elementos diretamente do DOM
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const centro = { lat: -23.55052, lng: -46.633308 };

  useEffect(() => {
    const scriptId = "google-maps-script";
    let map; // variável pra armazenar a instância do mapa

    function initMap() {
      if (!mapRef.current || !window.google) return;
      map = new window.google.maps.Map(mapRef.current, {
        center: centro,
        zoom: 12,
      });
      addMarkers(map);
    }

    function addMarkers(mapInstance) {
      new window.google.maps.Marker({
        position: centro,
        map: mapInstance,
      });
    }

    if (!window.google && !document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else if (window.google) {
      initMap();
    }
  }, [apiKey]);

  return (
    <div>
      <h2 className="titulo">Meu Google Maps</h2>
      <div ref={mapRef} className="map-container" />
    </div>
  );
}

export default GoogleMap;