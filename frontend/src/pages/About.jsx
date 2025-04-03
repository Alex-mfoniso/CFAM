import React from "react";
import { assets } from "../assets/asset";

const About = () => {
  return (
    <div>
      <div className="pl-[50px] pt-[30px] bg-black pb-[60px]">
        <h1 className="text-[60px] text-white font-extrabold">About us</h1>
        <p className="font-medium text-white mt-[20px] pr-[55%] text-[17px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit placeat id, quaerat nobis qui harum libero fugit ullam
          dolorem amet, dicta delectus dolores provident nulla autem architecto
          aperiam recusandae nam quas, dolorum ab. Neque, reprehenderit nobis at
          praesentium hic corrupti explicabo distinctio animi. Provident iure
          sint magnam officiis harum voluptatibus!
        </p>
        <div className="flex mt-[35px]">
          <p className="bg-[#fdfdfd] p-[20px]">GET INVOLVED</p>
          <p className="ml-[50px] bg-transparent p-[20px] text-[#fdfdfd] border">
            OUR PASTORS
          </p>
        </div>
      </div>
      <div className="relative bg-white  py-20 px-10">
        {/* First Section - Left Aligned */}
        <section className="relative flex justify-start items-center">
          <div className="relative w-[494px] h-[380px]">
            <img
              src={assets.strength}
              alt="Church Strength"
              className="w-[500px] h-[400px] object-cover"
            />
            <div className="absolute top-20 left-0 bg-white p-6 shadow-lg w-[450px] h-[320px] ml-70">
              <div className="border-2 border-black w-28 mb-4"></div>
              <h2 className="text-2xl font-bold">
                In our church we
                <br /> trust in the strength <br /> of God's love
              </h2>
              <p className="text-gray-600 mt-4 ">
                Lorem ipsum dolor sit amet consectetur adipiscing elit urna
                vitae ac vitae lacus ac proin ultricies eleifend dui ut felis
                bibendum ut amet nunc turpis diam urna quam congue. Tortor in
                egestas imperdiet posuere duis enim lectus consectetur arcu ac
                id in mauris.
              </p>
            </div>
          </div>
        </section>

        <div className="border border-gray-500 w-full max-w-6xl my-16"></div>

        {/* Second Section - Right Aligned */}
        <section className="relative flex justify-end items-center">
          <div className="relative w-[494px] h-[380px]">
            <img
              src={assets.mission}
              alt="Church Mission"
              className="w-[500px] h-[400px] object-cover"
            />
            <div className="absolute top-20 right-0 bg-white p-6 shadow-lg w-[450px] h-[320px] mr-70">
              <div className="border-2 border-black w-28 mb-4"></div>
              <h2 className="text-2xl font-bold">Our mission</h2>
              <p className="text-gray-600 mt-4">
                Lorem ipsum dolor sit amet consectetur adipiscing elit urna
                vitae a congue. Tortor in egestas imperdiet posuere duis enim
                lectus consectetur arcu ac id in mauris.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
