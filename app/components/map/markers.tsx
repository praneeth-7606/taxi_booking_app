// "use client"
import React, { useContext } from 'react';
import { UserLocationContext } from '@/app/context/userlocationcontext';
import { Marker } from 'react-map-gl';
import { SourceCordiContext } from '@/app/context/sourcecordicontext';
import { DestinationCordiContext } from '@/app/context/destinationcordicontext';
import Image from 'next/image';
import pinImage from './pin.png'; // Import the image

function Markers() {
  const { sourceCoordinates } = useContext(SourceCordiContext);
  const { destinationCoordinates } = useContext(DestinationCordiContext);
  const { userlocation } = useContext(UserLocationContext);

  return (
    <div>
      {/* User marker */}
      <Marker 
        longitude={userlocation?.lng} 
        latitude={userlocation?.lat}
        anchor="bottom" >
        <Image src="./pin.png" width={20} height={20} alt="User Marker" />
      </Marker>

      {/* Source marker */}
      {sourceCoordinates && 
        <Marker 
          longitude={sourceCoordinates.lng} 
          latitude={sourceCoordinates.lat}
          anchor="bottom" >
          <Image src="./pin.png" width={20} height={20} alt="Source Marker" />
        </Marker>
      }

      {/* Destination marker */}
      {destinationCoordinates && 
        <Marker 
          longitude={destinationCoordinates.lng} 
          latitude={destinationCoordinates.lat}
          anchor="bottom" >
          <Image src="./pin.png" width={20} height={20} alt="Destination Marker" />
        </Marker>
      }
    </div>
  );
}

export default Markers;
