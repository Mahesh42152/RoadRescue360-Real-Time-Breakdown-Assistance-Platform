import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import socket from "../services/socket";

const containerStyle = {
  width: "100%",
  height: "400px"
};

export default function MapView() {
  const [position, setPosition] = useState(null);
  const [technician, setTechnician] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY
  });

  useEffect(() => {
    navigator.geolocation.watchPosition(pos => {
      const loc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setPosition(loc);
      socket.emit("locationUpdate", loc);
    });

    socket.on("technicianLocation", data => {
      setTechnician(data);
    });
  }, []);

  if (!isLoaded || !position) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={14}>
      <Marker position={position} label="You" />
      {technician && <Marker position={technician} label="Technician" />}
    </GoogleMap>
  );
}
