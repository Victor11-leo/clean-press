"use client"

import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  
  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 16);
    return null;
  };
  
  const MapWithGeocode = () => {
    const [address, setAddress] = useState("");
    const [coords, setCoords] = useState([-1.286389, 36.817223]); // default Nairobi
    const [placeName, setPlaceName] = useState("");
  
    const handleSearch = async () => {
      if (!address) return;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
        setPlaceName(display_name);
      } else {
        alert("Address not found");
      }
    };
  
    return (
      <div>
        <h2>Find Address on Map</h2>
        <input
          type="text"
          placeholder="Enter address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "300px", padding: "8px", marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Search</button>
  
        <MapContainer center={coords} zoom={13} style={{ height: "400px", marginTop: "20px" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coords}>
            <Popup>{placeName || "Selected location"}</Popup>
          </Marker>
          <ChangeMapView coords={coords} />
        </MapContainer>
      </div>
    );
  }