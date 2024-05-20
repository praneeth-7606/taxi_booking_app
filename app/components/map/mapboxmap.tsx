// "use client"
// // import React, { useEffect, useRef, useContext } from 'react';
// import { useRef } from 'react';
// import { MAPBOX_DRIVING_ENDPOINT } from '@/app/utils/constants';
// // import { useContext } from 'react';
// import Markers from './markers';
// import { DestinationCordiContext } from '@/app/context/destinationcordicontext';
// import { SourceCordiContext } from '@/app/context/sourcecordicontext';
// import { UserLocationContext } from '@/app/context/userlocationcontext';
// // import { DirectionDataContext } from '@/app/context/directiondatacontext';
// import { DirectionDataContext } from '@/app/context/directiondatacontext';
// // import { Map, Marker } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';


// import React, { useEffect } from 'react'
// import {Map,Marker} from 'react-map-gl';
// import { useContext } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
// function mapboxmap() {
//   const mapref=useRef<any>();
//   // const { directionData, setDirectionData } = useContext(DirectionDataContext);
//   const {directionData,setDirectionData}=useContext(DirectionDataContext)
//   // const { userlocation, setuserlocation } = useContext(UserLocationContext);
//   const {userlocation,setuserlocation}=useContext(UserLocationContext)
//   const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
//   const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);



//   useEffect(()=>{
//     if(sourceCoordinates){
//       mapref.current?.flyTo({
//         center:[sourceCoordinates.lng,
//           sourceCoordinates.lat
//         ],
//         duration:2500,




//       })

//     }

//   },[sourceCoordinates])
//   useEffect(()=>{
//     if(destinationCoordinates){
//       mapref.current?.flyTo({
//         center:[destinationCoordinates.lng,
//           destinationCoordinates.lat
//         ],
//         duration:2500,




//       })

//     }
//     if (sourceCoordinates && destinationCoordinates) {
//       getDirectionRoute();
//     }

//   },[destinationCoordinates])
//   const getDirectionRoute = async () => {
//     //https://docs.mapbox.com/api/navigation/directions/
//     //https://docs.mapbox.com/help/tutorials/getting-started-directions-api/
//     const res = await fetch(
//       MAPBOX_DRIVING_ENDPOINT +
//         sourceCoordinates.lng +
//         "," +
//         sourceCoordinates.lat +
//         ";" +
//         destinationCoordinates.lng +
//         "," +
//         destinationCoordinates.lat +
//         "?overview=full&geometries=geojson" +
//         "&access_token=" +
//         // "https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=" +
//         process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const result = await res.json();
//     console.log(result);
//     console.log(result.routes);
//     setDirectionData(result);
//   };
//   return (
//     <div className='p-5' >
//       <h2 className='text-[20px] font-semibold'>Map</h2>
//       <div className='rounded-lg overflow-hidden'>
//       {userlocation ?<Map
//       ref={mapref}
//       mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//       initialViewState={{
//         longitude:userlocation?.lng,
//         latitude:userlocation?.lat,
//         zoom: 14
//       }}
//       style={{width: "100%", height: 450,borderRadius:10}}
//       mapStyle="mapbox://styles/mapbox/streets-v9"

//     > 
//     {/* SOURCEMARKER */}
//     {/* destinationmarker */}
//     <Markers/> </Map>:null}
//     </div>
//     </div>
//   )
// }

// export default mapboxmap
"use client";
import { useRef, useContext, useEffect } from 'react';
import { MAPBOX_DRIVING_ENDPOINT } from '@/app/utils/constants';
import Markers from './markers';
import { DestinationCordiContext } from '@/app/context/destinationcordicontext';
import { SourceCordiContext } from '@/app/context/sourcecordicontext';
import { UserLocationContext } from '@/app/context/userlocationcontext';
import { DirectionDataContext } from '@/app/context/directiondatacontext';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map } from 'react-map-gl';
import MapBoxDrawRoute from './mapboxdrawroute';
import DistanceTime from './distancetime';

function MapboxMap() {
  const mapRef = useRef<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { userlocation } = useContext(UserLocationContext);
  const { sourceCoordinates ,setSourceCoordinates } = useContext(SourceCordiContext);
  const { destinationCoordinates ,setDestinationCoordinates} = useContext(DestinationCordiContext);

  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
        duration: 2500,
      });
    }
    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCoordinates.lng +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCoordinates.lng +
        "," +
        destinationCoordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);
    console.log(result.routes);
    setDirectionData(result);
  };

  return (
    <div className='p-5'>
      <h2 className='text-[20px] font-semibold'>Map</h2>
      <div className='rounded-lg overflow-hidden'>
        {userlocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userlocation?.lng,
              latitude: userlocation?.lat,
              zoom: 14,
            }}
            style={{ width: '100%', height: 450, borderRadius: 10 }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
          >
            <Markers />
            {directionData?.routes && (
              <MapBoxDrawRoute coordinates={directionData?.routes[0]?.geometry?.coordinates}
           /> )}
          </Map>
        ) : null}
      </div>
      <div className='absolute bottom-[90px] z-20 right-[20px'>
<DistanceTime/>
      </div>
    </div>
  );
}

export default MapboxMap;
