import React from 'react'
import { UserLocationContext } from '@/app/context/userlocationcontext'
import { Marker,Map } from 'react-map-gl'
import { useContext } from 'react'
import { SourceCordiContext } from '@/app/context/sourcecordicontext'
import { DestinationCordiContext } from '@/app/context/destinationcordicontext'

function markers() {
  const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);

  const {userlocation,setuserlocation}=useContext(UserLocationContext)
  return (
    <div>
      {/* usermarker */}
      <Marker 
    longitude={userlocation?.lng} 
    latitude={userlocation?.lat}
     anchor="bottom" >
    <img src="./pin.png" className='w-10 h-10' />
    {/* sourcemarker */}
    <Marker 
    longitude={userlocation?.lng} 
    latitude={userlocation?.lat}
     anchor="bottom" >
    <img src="./pin.png" className='w-10 h-10' />
    


    
    
  </Marker>
  {sourceCoordinates?<Marker 
    longitude={sourceCoordinates?.lng} 
    latitude={sourceCoordinates?.lat}
     anchor="bottom" >
    <img src="./pin.png" className='w-10 h-10' />
    {/* sourcemarker */}


    
    {/* destinationmarker */}
  </Marker>:null}


    
    {/* destinationmarker */}
  </Marker>
  {destinationCoordinates?<Marker 
    longitude={destinationCoordinates?.lng} 
    latitude={destinationCoordinates?.lat}
     anchor="bottom" >
    <img src="./pin.png" className='w-10 h-10' />
    {/* sourcemarker */}


    
    {/* destinationmarker */}
  </Marker>:null}
    </div>
  )
}

export default markers
