import React, { useContext, useState } from 'react';
import Image from 'next/image';
import carslist from '@/app/data/carslist';
import { DirectionDataContext } from '@/app/context/directiondatacontext';
import { CarSelectedAmountContext } from '@/app/context/carselectedamountcontext';

function Cars() {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const { directionData } = useContext(DirectionDataContext);
  const { setSelectedAmount } = useContext(CarSelectedAmountContext);

  const getCost = (charges: number) => {
    if (directionData && directionData.routes && directionData.routes[0]) {
      const distance = directionData.routes[0].distance; // distance in meters
      return (charges * distance * 0.000621371192).toFixed(2); // convert meters to miles
    }
    return '0.00';
  };

  const handleSelectCar = (index: number) => {
    setSelectedCar(index);
    // Update the selected amount here
    const selectedCarCharges = carslist[index].charges;
    setSelectedAmount(selectedCarCharges);
  };

  return (
    <div className="mt-3">
      <h2 className="font-medium text-[14px]">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {carslist.map((item, index) => (
          <div
            key={index}
            className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-400 cursor-pointer 
              ${index === selectedCar ? 'border-yellow-400 border-[2px]' : ''}`}
            onClick={() => handleSelectCar(index)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
              className="w-full"
            />
            <h2 className="text-[10px] text-gray-500">
              {item.name}
              {directionData && directionData.routes ? (
                <span className="float-right font-medium text-black">
                  {getCost(item.charges)}$
                </span>
              ) : null}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
