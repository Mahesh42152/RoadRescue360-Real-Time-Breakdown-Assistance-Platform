import { useState } from "react";
import api from "../services/api";

export default function BreakdownForm() {
  const [issue, setIssue] = useState("");

  const submit = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      await api.post("/breakdowns", {
        user_id: 1,
        issue,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
      alert("Breakdown reported");
    });
  };

  return (
    <div>
      <h2>Report Breakdown</h2>
      <select onChange={e => setIssue(e.target.value)}>
        <option>Engine</option>
        <option>Battery</option>
        <option>Tyre</option>
        <option>Fuel</option>
        <option>Accident</option>
      </select>
      <button onClick={submit}>Submit</button>
    </div>
  );
}
