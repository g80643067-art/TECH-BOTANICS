import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers, MapPin, Navigation, Sparkles, Sun, Compass } from "lucide-react";
import { FarmLocation, Language } from "../types";
import { getTranslation } from "../data/translations";

interface FarmLocationMapProps {
  location: FarmLocation;
  language: Language;
}

export const FarmLocationMap: React.FC<FarmLocationMapProps> = ({
  location,
  language,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  const [mapType, setMapType] = useState<"streets" | "satellite" | "terrain">("streets");
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const lat = location.latitude ?? 25.3176;
  const lng = location.longitude ?? 82.9739;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy previous instance if container changed
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
      });

      // Custom tile layers
      const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      });

      const satLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 18,
        }
      );

      const terrainLayer = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 17,
        }
      );

      // Choose active layer
      if (mapType === "satellite") {
        satLayer.addTo(map);
      } else if (mapType === "terrain") {
        terrainLayer.addTo(map);
      } else {
        streetLayer.addTo(map);
      }

      // Add Zoom control at top right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Custom Farm Marker Icon
      const customIcon = L.divIcon({
        className: "custom-farm-marker",
        html: `
          <div style="
            position: relative;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translate(-50%, -50%);
          ">
            <div style="
              position: absolute;
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: rgba(16, 185, 129, 0.35);
              animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <div style="
              position: relative;
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background: #047857;
              border: 3px solid #ffffff;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 18px;
            ">
              🌱
            </div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      markerRef.current = marker;

      // Add Agro-Climatic Microzone coverage radius circle (~8km)
      const circle = L.circle([lat, lng], {
        radius: 7500,
        color: "#059669",
        weight: 1.5,
        dashArray: "4, 6",
        fillColor: "#10b981",
        fillOpacity: 0.12,
      }).addTo(map);
      circleRef.current = circle;

      mapInstanceRef.current = map;
      setMapLoaded(true);

      // Invalidate size to ensure crisp render in responsive cards
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    } catch (err) {
      console.warn("Leaflet initialization error:", err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, mapType]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm bg-stone-100">
      {/* Top Banner overlay */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-2 bg-stone-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700/60 text-white shadow-md">
        <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-xs font-bold truncate max-w-[220px] sm:max-w-xs">
          {location.villageOrArea || location.district.split("(")[0].trim()}
        </span>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
          {isHi ? "कृषि क्षेत्र" : "Agro-Zone"}
        </span>
      </div>

      {/* Map Layer Mode Switcher */}
      <div className="absolute bottom-3 left-3 z-[400] flex items-center bg-white/90 backdrop-blur-md p-1 rounded-xl border border-stone-200 shadow-sm text-xs font-bold text-stone-700">
        <button
          type="button"
          onClick={() => setMapType("streets")}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            mapType === "streets"
              ? "bg-emerald-700 text-white shadow-2xs"
              : "hover:bg-stone-100 text-stone-600"
          }`}
        >
          {isHi ? "मानचित्र" : "Standard"}
        </button>
        <button
          type="button"
          onClick={() => setMapType("satellite")}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            mapType === "satellite"
              ? "bg-emerald-700 text-white shadow-2xs"
              : "hover:bg-stone-100 text-stone-600"
          }`}
        >
          {isHi ? "उपग्रह" : "Satellite"}
        </button>
        <button
          type="button"
          onClick={() => setMapType("terrain")}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            mapType === "terrain"
              ? "bg-emerald-700 text-white shadow-2xs"
              : "hover:bg-stone-100 text-stone-600"
          }`}
        >
          {isHi ? "स्थलाकृति" : "Terrain"}
        </button>
      </div>

      {/* Leaflet Canvas Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-52 sm:h-64 z-0"
        style={{ background: "#e5e7eb" }}
      />

      {/* Legend Badge at bottom right */}
      <div className="absolute bottom-3 right-3 z-[400] bg-stone-900/80 backdrop-blur-md text-stone-200 text-[10px] px-2.5 py-1 rounded-lg border border-stone-700/50 flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{isHi ? "अनुमानित कृषि परिधि" : "Agro-Climatic Zone (8km)"}</span>
      </div>
    </div>
  );
};
