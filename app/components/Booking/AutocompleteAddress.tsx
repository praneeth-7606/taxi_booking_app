import React, { useContext, useEffect, useState } from 'react';
import { DestinationCordiContext } from '@/app/context/destinationcordicontext';
import { SourceCordiContext } from '@/app/context/sourcecordicontext';
// import {Sot}

const MAPBOX_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const session_token = "087e326b-ed43-4b51-88f8-9f39f69019b8";

function AutocompleteAddress() {
    const [source, setSource] = useState<any>('');
    const [destination, setDestination] = useState<any>('');
    const [sourceAddressList, setSourceAddressList] = useState<any>([]);
    const [destinationAddressList, setDestinationAddressList] = useState<any>([]);
    const [sourceChange, setSourceChange] = useState<any>(false);
    const [destinationChange, setDestinationChange] = useState<any>(false);
    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (source) {
                getSourceAddressList();
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [source]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (destination) {
                getDestinationAddressList();
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [destination]);

    const getSourceAddressList = async () => {
        console.log("Fetching address list for source:", source);
        const res = await fetch('/api/search-address?q=' + source, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.ok) {
            const result = await res.json();
            console.log("Fetched address list for source:", result);
            setSourceAddressList(result);
        } else {
            console.error("Failed to fetch address list for source:", res.statusText);
        }
    };

    const getDestinationAddressList = async () => {
        console.log("Fetching address list for destination:", destination);
        const res = await fetch('/api/search-address?q=' + destination, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.ok) {
            const result = await res.json();
            console.log("Fetched address list for destination:", result);
            setDestinationAddressList(result);
        } 
        else {
            console.error("Failed to fetch address list for destination:", res.statusText);
        }
    };

    const onSourceAddressClick = async (item: any) => {
        console.log(item);
        setSource(item.full_address);
        setSourceAddressList([]);
        setSourceChange(false);
        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
        const result = await res.json();
        setSourceCoordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        });
        console.log(result);
    };

    const onDestinationAddressClick = async (item: any) => {
        setDestination(item.full_address);
        setDestinationAddressList([]);
        setDestinationChange(false);
        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
        const result = await res.json();
        setDestinationCoordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        });
        console.log(result);
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
                {sourceAddressList?.suggestions && sourceChange ? (
                    <div className='shadow-md p-1 rounded absolute w-full bg-white'>
                        {sourceAddressList.suggestions.map((item: any, index: number) => (
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
                {destinationAddressList?.suggestions && destinationChange ? (
                    <div className='shadow-md p-1 rounded absolute w-full bg-white'>
                        {destinationAddressList.suggestions.map((item: any, index: number) => (
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
