import { useEffect } from "react";
import socket from "../services/socket";

export default function LiveTracking() {
  useEffect(() => {
    navigator.geolocation.watchPosition(pos => {
      socket.emit("locationUpdate", {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });

    socket.on("liveLocation", data => {
      console.log("Live update:", data);
    });
  }, []);

  return <h2>Live Tracking Active</h2>;
}
