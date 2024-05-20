// import { createContext } from "react";

// export const DestinationCordiContext = createContext<any>(null);
// destinationcordicontext.tsx
import React, { createContext, useState } from 'react';

export const DestinationCordiContext = createContext<any>(null);

export const DestinationCordiProvider = ({ children }: any) => {
    const [destinationCoordinates, setDestinationCoordinates] = useState<{ lng: number, lat: number } | null>(null);

    return (
        <DestinationCordiContext.Provider value={{ destinationCoordinates, setDestinationCoordinates }}>
            {children}
        </DestinationCordiContext.Provider>
    );
};
