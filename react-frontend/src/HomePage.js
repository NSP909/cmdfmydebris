import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 h-[92vh]">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28 mb-10 mt-[8vh]">
          <div className="mr-auto place-self-center lg:col-span-7 ">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white mb-10">
              Our Purpose
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Our product serves the crucial function of assisting search and rescue personnel in locating individuals stranded in hazardous situations. By analyzing the debris within the area, we meticulously create comprehensive maps and databases, providing a detailed report of the surroundings. Moreover, our software facilitates the examination of structures, enabling the identification of deformities and structural damages.





<area shape="" coords="" href="" alt="" />
            </p>
          </div>
        </div>
      <div className="flex flex-row justify-center gap-20 items-center">
        <Link to="/search-rescue">
          <button className="w-[20vw] h-[5vh] download-btn">Search and Rescue</button>
        </Link>
        <Link to="/debris-detector">
          <button className="download-btn">Debris Analysis</button>
        </Link>
        <Link to="/house">
          <button className="download-btn">Structural Analysis</button>
        </Link>
      </div>
      </section>
    </div>
  );
};

export default HomePage;