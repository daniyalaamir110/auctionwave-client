import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Dot = ({ filled = false }) => {
  return (
    <div
      className={`w-[0.5rem] h-[0.5rem] shadow-neutral-600 shadow-sm ${
        filled ? "bg-blue-600" : "bg-white"
      } rounded-full`}
    />
  );
};

const Dots = ({ count = 0, current = 0 }) => {
  return (
    <div className="absolute bottom-[0.5rem] left-[50%] translate-x-[-50%] flex flex-row gap-[0.25rem] items-center">
      {[...new Array(count)].map((_, idx) => {
        return <Dot key={idx} filled={idx === current} />;
      })}
    </div>
  );
};

const Controls = ({ next = () => {}, previous = () => {} }) => {
  return (
    <div className="w-full h-full absolute flex flex-row justify-between items-center p-[0.5rem] z-50">
      <button onClick={previous}>
        <ChevronLeftIcon width={24} />
      </button>
      <button onClick={next}>
        <ChevronRightIcon width={24} />
      </button>
    </div>
  );
};

const Slide = ({ src, text = "" }) => {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <h1 className="">{text}</h1>
    </div>
  );
};

const Slider = ({ slides = [], current = 0 }) => {
  const count = slides.length || 0;

  return (
    <div
      className="h-full flex flex-row justify-between transition-all duration-500"
      style={{
        width: `${count * 100}%`,
        transform: `translateX(-${current * (100 / count)}%)`,
      }}
    >
      {slides.map((slide, idx) => {
        return <Slide key={idx} text={slide.text} />;
      })}
    </div>
  );
};

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    { text: "Slide 1" },
    { text: "Slide 2" },
    { text: "Slide 3" },
    { text: "Slide 4" },
  ];
  const count = slides.length;
  const next = () => setCurrent((current) => (current + 1) % count);
  const previous = () => setCurrent((current) => (current - 1) % count);
  return (
    <div className="w-full h-[20rem] shadow-sm rounded-xl relative overflow-hidden">
      <Dots current={current} count={count} />
      <Controls next={next} previous={previous} />
      <Slider slides={slides} current={current} />
    </div>
  );
};

export default Carousel;
