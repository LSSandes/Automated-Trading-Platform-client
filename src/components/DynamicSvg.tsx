import { useEffect, useState } from "react";
const svgShapes = [
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 1024 1024"
    className="absolute w-16 h-16 right-[50%] top-[32%] text-accent/20"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
  </svg>,

  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 1024 1024"
    className="absolute w-16 h-16 right-[20%] bottom-[30%] text-accent/20"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm63.5 375.8c4.4 0 8 3.6 8 8V475c0 4.4-3.6 8-8 8h-136c-.3 4.4-.3 9.1-.3 13.8v36h136.2c4.4 0 8 3.6 8 8V568c0 4.4-3.6 8-8 8H444.9c15.3 62 61.3 98.6 129.8 98.6 19.9 0 37.1-1.2 51.8-4.1 4.9-1 9.5 2.8 9.5 7.8v42.8c0 3.8-2.7 7-6.4 7.8-15.9 3.4-34.3 5.1-55.3 5.1-109.8 0-183-58.8-200.2-158H344c-4.4 0-8-3.6-8-8v-27.2c0-4.4 3.6-8 8-8h26.1v-36.9c0-4.4 0-8.8.3-12.8H344c-4.4 0-8-3.6-8-8v-27.2c0-4.4 3.6-8 8-8h31.7c19.7-94.2 92-149.9 198.6-149.9 20.9 0 39.4 1.9 55.3 5.4 3.7.8 6.3 4 6.3 7.8V346h.1c0 5.1-4.6 8.8-9.6 7.8-14.7-2.9-31.8-4.4-51.7-4.4-65.4 0-110.4 33.5-127.6 90.4h128.4z"></path>
  </svg>,

  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 1024 1024"
    className="absolute w-16 h-16 right-[40%] bottom-[35%] text-accent/20"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm22.3 665.2l.2 31.7c0 4.4-3.6 8.1-8 8.1h-28.4c-4.4 0-8-3.6-8-8v-31.4C401.3 723 359.5 672.4 355 617.4c-.4-4.7 3.3-8.7 8-8.7h46.2c3.9 0 7.3 2.8 7.9 6.6 5.1 31.7 29.8 55.4 74.1 61.3V533.9l-24.7-6.3c-52.3-12.5-102.1-45.1-102.1-112.7 0-72.9 55.4-112.1 126.2-119v-33c0-4.4 3.6-8 8-8h28.1c4.4 0 8 3.6 8 8v32.7c68.5 6.9 119.9 46.9 125.9 109.2.5 4.7-3.2 8.8-8 8.8h-44.9c-4 0-7.4-3-7.9-6.9-4-29.2-27.4-53-65.5-58.2v134.3l25.4 5.9c64.8 16 108.9 47 108.9 116.4 0 75.3-56 117.3-134.3 124.1zM426.6 410.3c0 25.4 15.7 45.1 49.5 57.3 4.7 1.9 9.4 3.4 15 5v-124c-36.9 4.7-64.5 25.4-64.5 61.7zm116.5 135.2c-2.8-.6-5.6-1.3-8.8-2.2V677c42.6-3.8 72-27.2 72-66.4 0-30.7-15.9-50.7-63.2-65.1z"></path>
  </svg>,

  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 1024 1024"
    className="absolute w-16 h-16 right-[50%] bottom-[25%] text-accent/20"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm146 658c0 4.4-3.6 8-8 8H376.2c-4.4 0-8-3.6-8-8v-38.5c0-3.7 2.5-6.9 6.1-7.8 44-10.9 72.8-49 72.8-94.2 0-14.7-2.5-29.4-5.9-44.2H374c-4.4 0-8-3.6-8-8v-30c0-4.4 3.6-8 8-8h53.7c-7.8-25.1-14.6-50.7-14.6-77.1 0-75.8 58.6-120.3 151.5-120.3 26.5 0 51.4 5.5 70.3 12.7 3.1 1.2 5.2 4.2 5.2 7.5v39.5a8 8 0 0 1-10.6 7.6c-17.9-6.4-39-10.5-60.4-10.5-53.3 0-87.3 26.6-87.3 70.2 0 24.7 6.2 47.9 13.4 70.5h112c4.4 0 8 3.6 8 8v30c0 4.4-3.6 8-8 8h-98.6c3.1 13.2 5.3 26.9 5.3 41 0 40.7-16.5 73.9-43.9 91.1v4.7h180c4.4 0 8 3.6 8 8V722z"></path>
  </svg>,

  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="absolute w-16 h-16 right-[30%] bottom-[22%] text-accent/20"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.858 5.485a1 1 0 00-1.715 1.03L7.633 9H7a1 1 0 100 2h1.834l.166.277V12H7a1 1 0 100 2h2v1a1 1 0 102 0v-1h2a1 1 0 100-2h-2v-.723l.166-.277H13a1 1 0 100-2h-.634l1.492-2.486a1 1 0 10-1.716-1.029L10.034 9h-.068L7.858 5.485z"
      clip-rule="evenodd"
    ></path>
  </svg>,
];
export default function DynamicSvg() {
  const [svgPositions, setSvgPositions] = useState<
    { svg: JSX.Element; top: number; left: number; duration: number }[]
  >([]);

  useEffect(() => {
    // Generate SVG positions once on mount
    const positions = Array.from({ length: 10 }).map(() => ({
      svg: svgShapes[Math.floor(Math.random() * svgShapes.length)],
      top: Math.random() * 100, // Random vertical position
      left: Math.random() * 100, // Random horizontal position
      duration: Math.random() * 10 + 5, // Animation duration (5-15 seconds)
    }));
    setSvgPositions(positions);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="absolute inset-0 z-10 w-full">
      {svgPositions.map((item, index) => (
        <div
          key={index}
          className="absolute animate-float opacity-50"
          style={{
            top: `${item.top}vh`,
            left: `${item.left}vw`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.svg}
        </div>
      ))}
    </div>
  );
}
