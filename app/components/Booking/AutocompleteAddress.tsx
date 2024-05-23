import { DestinationCordiContext } from '@/app/context/destinationcordicontext';
import { SourceCordiContext } from '@/app/context/sourcecordicontext';
import React, { useContext, useEffect, useState } from 'react';

const MAPBOX_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const session_token = "087e326b-ed43-4b51-88f8-9f39f69019b8";

interface Address {
    full_address: string;
    mapbox_id: string;
    // Add other properties as needed
}

function AutocompleteAddress() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [sourceAddressList, setSourceAddressList] = useState<Address[]>([]);
    const [destinationAddressList, setDestinationAddressList] = useState<Address[]>([]);
    const [sourceChange, setSourceChange] = useState(false);
    const [destinationChange, setDestinationChange] = useState(false);
    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);

    useEffect(() => {
        const getSourceAddressList = async () => {
            try {
                const res = await fetch('/api/search-address?q=' + source, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
    
                if (res.ok) {
                    const result = await res.json();
                    setSourceAddressList(result);
                } else {
                    console.error("Failed to fetch address list for source:", res.statusText);
                }
            } catch (error) {
                console.error("Error fetching source address list:", error);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            if (source) {
                getSourceAddressList();
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [source]); // Add getSourceAddressList to the dependency array

    useEffect(() => {
        const getDestinationAddressList = async () => {
            try {
                const res = await fetch('/api/search-address?q=' + destination, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
    
                if (res.ok) {
                    const result = await res.json();
                    setDestinationAddressList(result);
                } else {
                    console.error("Failed to fetch address list for destination:", res.statusText);
                }
            } catch (error) {
                console.error("Error fetching destination address list:", error);
            }
        };
    
        const delayDebounceFn = setTimeout(() => {
            if (destination) {
                getDestinationAddressList();
            }
        }, 1000);
    
        return () => clearTimeout(delayDebounceFn);
    }, [destination]);
    // Add getDestinationAddressList to the dependency array

    // const getSourceAddressList = async () => {
    //     try {
    //         const res = await fetch('/api/search-address?q=' + source, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         });

    //         if (res.ok) {
    //             const result = await res.json();
    //             setSourceAddressList(result);
    //         } else {
    //             console.error("Failed to fetch address list for source:", res.statusText);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching source address list:", error);
    //     }
    // };

    // const getDestinationAddressList = async () => {
    //     try {
    //         const res = await fetch('/api/search-address?q=' + destination, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         });

    //         if (res.ok) {
    //             const result = await res.json();
    //             setDestinationAddressList(result);
    //         } else {
    //             console.error("Failed to fetch address list for destination:", res.statusText);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching destination address list:", error);
    //     }
    // };

    const onSourceAddressClick = async (item: Address) => {
        setSource(item.full_address);
        setSourceAddressList([]);
        setSourceChange(false);
        try {
            const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
            const result = await res.json();
            if (result.features && result.features.length > 0) {
                setSourceCoordinates({
                    lng: result.features[0].geometry.coordinates[0],
                    lat: result.features[0].geometry.coordinates[1]
                });
            } else {
                console.error("No features found in the result:", result);
            }
            console.log(result);
        } catch (error) {
            console.error("Error fetching source coordinates:", error);
        }
    };

    const onDestinationAddressClick = async (item: Address) => {
        setDestination(item.full_address);
        setDestinationAddressList([]);
        setDestinationChange(false);
        try {
            const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
            const result = await res.json();
            if (result.features && result.features.length > 0) {
                setDestinationCoordinates({
                    lng: result.features[0].geometry.coordinates[0],
                    lat: result.features[0].geometry.coordinates[1]
                });
            } else {
                console.error("No features found in the result:", result);
            }
            console.log(result);
        } catch (error) {
            console.error("Error fetching destination coordinates:", error);
        }
    };

    return (
        <div className='mt-5'>
            <div className='relative'>
                <label className='text-gray-400'>
                    Where from?
                </label>
                <input
                    value={source}
                    onChange={(e) => {
                        setSource(e.target.value);
                        setSourceChange(true);
                    }}
                    type="text"
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]'
                />
                {sourceAddressList.length > 0 && sourceChange ? (
                    <div className='shadow-md p-1 rounded absolute w-full bg-white'>
                        {sourceAddressList.map((item, index) => (
                            <h2
                                key={index}
                                className='p-3 hover:bg-gray-100 cursor-pointer'
                                onClick={() => { onSourceAddressClick(item) }}
                            >
                                {item.full_address}
                            </h2>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className='mt-3'>
                <label className='text-gray-400'>
                    Where to?
                </label>
                <input
                    value={destination}
                    onChange={(e) => {
                        setDestination(e.target.value);
                        setDestinationChange(true);
                    }}
                    type="text"
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'
                />
                {destinationAddressList.length > 0 && destinationChange ? (
                    <div className='shadow-md p-1 rounded absolute w-full bg-white'>
                        {destinationAddressList.map((item, index) => (
                            <h2
                                key={index}
                                className='p-3 hover:bg-gray-100 cursor-pointer'
                                onClick={() => { onDestinationAddressClick(item) }}
                            >
                                {item.full_address}
                            </h2>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default AutocompleteAddress;
