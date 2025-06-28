'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { icon } from 'leaflet';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.normalizeScroll(true);

// 🔁 Component that gets the map instance safely
function ZoomOnScroll({ containerRef ,carref,center_position}) {
  const map = useMap(); 
    const container = containerRef.current;
useEffect(() => {
  // if (!map || !containerRef?.current || !carref?.current) return;

  const empireCoords = center_position;

  // ScrollTrigger for map zoom
 const st = ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: '+=1500',
    pin:true,
    pinType:'transform',
    
    scrub: true,  anticipatePin: 1,          // ← tells ScrollTrigger to “pre-pin” 1px early
  pinSpacing:true,       // ← forces position:fixed which is more stable

    onUpdate: (self) => {
      const progress = self.progress;
      const zoomLevel = 13 - (3 * progress);
      map.setView(empireCoords, zoomLevel);
   },
  });

     return () => {
     
    
    st.kill();
  };
}, []);


  return null;
}

const Map = ({ className, containerRef,sectionref,Name,center_position,markers,Main_marker}) => {
 



const bounds = L.latLngBounds(markers.coordinates);
  return ( <MapContainer
      center={center_position}
      zoom={25}
      maxZoom={41}
  whenCreated={(map) => {
    map.fitBounds(bounds, { padding: [100, 100] }); // padding adds space around markers
   // Wait until tiles are ready
  map.eachLayer(layer => {
    if (layer instanceof L.TileLayer) {
      layer.on('tileloadstart', () => {
        totalTiles++;
      });

      layer.on('tileload', () => {
        loadedTiles++;
        if (loadedTiles === totalTiles) {
          // ✅ All tiles have loaded, now refresh ScrollTrigger
          setTimeout(() => {
            ScrollTrigger.refresh();
            console.log('ScrollTrigger refreshed after tiles loaded.');
          }, 100); // slight delay ensures layout settles
        }
      });
    }
  });
}}

   zoomControl={false}
  scrollWheelZoom={false}
  touchZoom={false}
  doubleClickZoom={false}
  boxZoom={false}
  dragging={false} // 
      className={`${className}  h-[80vh]   w-[100%] `}
    >{console.log()}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors, &copy; CartoDB"
      />

      {/* Main marker */}
      <Marker position={center_position}   zIndexOffset={1000}// 👈 makes it stay on top
 icon={L.divIcon({
        className: '',
        html: `
          <div style="display: flex; align-items: center; gap: 6px;">
            <img src="/assets/105/105.png" width="2" height="2" />
            <span style="font-size: 14px;color:#CCAB64; background: white; padding: 2px 6px; border-radius: 4px;">${Main_marker}</span>
          </div>
        `,
      })}>
        <Popup>{Name}</Popup>
      </Marker>

      {/* Other markers */}
      {markers.map((marker, i) => (
        <Marker key={i} position={marker.coordinates} icon={L.divIcon({
          className: '',
          html: `
            <div style="display: flex; align-items: center; gap: 6px;">
            <img src="${marker.icon}" width="5" height="5"  style="height:36px; width:36px"/>
            <span style="font-size: 14px;color:#CCAB64; background: white; padding: 2px 6px; border-radius: 4px;">${marker.name}</span>
            </div>
          `,
        })}>
          <Popup>{marker.name}</Popup>
        </Marker>
        
      ))}

      {/* 📌 Scroll-based zoom animation */}
      <ZoomOnScroll containerRef={containerRef}  carref={sectionref} center_position={center_position}/>
    </MapContainer>
)}
export default Map;
