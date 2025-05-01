"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface UserMapProps {
  lat: number;
  lng: number;
}

export default function UserMap({ lat, lng }: UserMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 12,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [lat, lng]);

  return <div ref={mapContainer} className="w-full h-64 rounded border" />;
}
