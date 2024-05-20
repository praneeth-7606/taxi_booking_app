"use client"
import React, { useState, useEffect } from "react";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { DirectionDataProvider } from "../context/directiondatacontext";
import Mapboxmap from "../components/map/mapboxmap";
import Booking from "../components/Booking/booking";
import { UserLocationContext } from "../context/userlocationcontext";
import { SourceCordiProvider } from '@/app/context/sourcecordicontext';
import { DestinationCordiProvider } from '@/app/context/destinationcordicontext';
import Cars from "../components/Booking/cars";
export default function Home() {
  const [userlocation, setuserlocation] = useState<any>();
  const [sourcecoordinates, setsourcecoordinates] = useState<any>();
  const [destinationcoordinates, setdestinationcoordinates] = useState<any>();

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

      <UserLocationContext.Provider value={{ userlocation, setuserlocation }}>
        <SourceCordiProvider value={{ sourcecoordinates, setsourcecoordinates }}>
          <DestinationCordiProvider value={{ destinationcoordinates, setdestinationcoordinates }}>
            <DirectionDataProvider>
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
            </DirectionDataProvider>
          </DestinationCordiProvider>
        </SourceCordiProvider>
      </UserLocationContext.Provider>
      {/* </ClerkProvider> */}
    </div>
  );
}
