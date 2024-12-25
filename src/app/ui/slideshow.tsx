"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

const images = [
  "/photos/architektur/the_observer.jpg",
  "/photos/architektur/circles-1.jpg",
  "/photos/sw/nh1_lr.jpg",
  "/photos/composing/grün3.jpg",
  "/photos/sw/rendezvous.jpg",
  "/photos/wimmelbilder/siena_lr.jpg",
];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <div
          key={index}
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000",
            {
              "opacity-100": index === current,
              "opacity-0": index !== current,
            }
          )}
        >
          <Image 
            src={src}
            fill
            className="object-cover"
            alt={`Slide ${index + 1}`} // TODO: update
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}

export default Slideshow;