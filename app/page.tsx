
"use client";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { DirectionDataContext } from "./context/directiondatacontext";
import React, { useState, useEffect } from "react";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { DirectionDataProvider } from "./context/directiondatacontext";
import Mapboxmap from "./components/map/mapboxmap";
import Booking from "./components/Booking/booking";
import { UserLocationContext } from "./context/userlocationcontext";
import { SourceCordiProvider } from '@/app/context/sourcecordicontext';
import { DestinationCordiProvider } from '@/app/context/destinationcordicontext';
import { CarSelectedAmountProvider } from "./context/carselectedamountcontext";
import Cars from "./components/Booking/cars";
// import { CarSelectedAmountContext, CarSelectedAmountProvider } from "./context/carselectedamountcontext";
// import { Context } from "vm";
export default function Home() {
  const [userlocation, setuserlocation] = useState<any>();
  const [sourcecoordinates, setsourcecoordinates] = useState<any>();
  const [destinationcoordinates, setdestinationcoordinates] = useState<any>();
  const [directionData, setDirectionData ]= useState<any>();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  useEffect(() => {
    getuserlocation();
  }, []);

  const getuserlocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setuserlocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <div className="">
 <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
      <UserLocationContext.Provider value={{ userlocation, setuserlocation }}>
        <SourceCordiProvider value={{ sourcecoordinates, setsourcecoordinates }}>
          <DestinationCordiProvider value={{ destinationcoordinates, setdestinationcoordinates }}>
            <DirectionDataProvider  >
            <CarSelectedAmountProvider>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="bg-blue-100">
                  {/* <SignUp/> */}
                  <Booking />
                </div>
                {/* <Cars/> */}
                <div className="col-span-2 bg-red-100 order-first md:order-last">
                  <Mapboxmap />
                </div>
              </div>
              </CarSelectedAmountProvider>
            </DirectionDataProvider>
          </DestinationCordiProvider>
        </SourceCordiProvider>
      </UserLocationContext.Provider>
      </SignedIn>
    </div>
  );
}
