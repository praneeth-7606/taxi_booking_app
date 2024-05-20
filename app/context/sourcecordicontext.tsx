// import { createContext } from "react";

// export const SourceCordiContext = createContext<any>(null);
// sourcecordicontext.tsx
import React, { createContext, useState } from 'react';

export const SourceCordiContext = createContext<any>(null);

export const SourceCordiProvider = ({ children }: any) => {
    const [sourceCoordinates, setSourceCoordinates] = useState<{ lng: number, lat: number } | null>(null);

    return (
        <SourceCordiContext.Provider value={{ sourceCoordinates, setSourceCoordinates }}>
            {children}
        </SourceCordiContext.Provider>
    );
};
