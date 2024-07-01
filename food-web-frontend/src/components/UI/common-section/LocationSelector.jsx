import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({setPos}) => {
  // Set default position to Jalandhar, India
  const [position, setPosition] = useState({ lat: 31.3260, lng: 75.5762 });
  const [zoom] = useState(13); // Set an appropriate zoom level for city view
  const markerRef = useRef(null);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setPosition({ lat, lng });
    setPos({ lat, lng })
    
  };

  const DraggableMarker = () => {
     useMapEvents({
      click: handleMapClick,
    });

    useEffect(() => {
      if (markerRef.current) {
        markerRef.current.setLatLng(position);
      }
    });

    return position === null ? null : (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: (event) => {
            const marker = event.target;
            const newPosition = marker.getLatLng();
            setPosition(newPosition);
          },
        }}
        ref={markerRef}
      />
    );
  };

  return (
    <div>
      <h6 className='my-5'>Select Location</h6>
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: '70vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DraggableMarker />
      </MapContainer>
      <div className='my-4 d-flex justify-content-center'>

      {/* <button onClick={()=>{console.log(position);}} type="button" class="btn btn-danger">Book Now</button> */}
      </div>
     
     </div>
     
  );
};

export default MapComponent;
