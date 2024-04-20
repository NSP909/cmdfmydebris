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
              The purpose of this website is to show our invention of how we can
              help those in natural disaster situations. With the use of drone
              footage, we can see who is affected and find ways to help them. At
              the same time, we are also able to identify the type of debris
              and how much of the debris is present at the site of the disaster
              in order to come up with solutions to fix this issue.
            </p>
          </div>
        </div>
      <div className="flex flex-row justify-center gap-80 items-center">
        <Link to="/search-rescue">
          <button className="w-[20vw] h-[5vh] download-btn">Search and Rescue</button>
        </Link>
        <Link to="/debris-detector">
          <button className="download-btn">Debris Detector</button>
        </Link>
      </div>
      </section>
    </div>
  );
};

export default HomePage;