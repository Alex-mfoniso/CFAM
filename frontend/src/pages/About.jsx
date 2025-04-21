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

      <div className="mx-auto px-4 py-12 font-sans bg-black">
  {/* Heading section */}
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-white mb-4">
      Meet John & Sophie,<br />
      our beloved pastors
    </h1>
    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      Lorem ipsum dolor sit amet consectetur adipiscing elit eiusmod in enim nibh,<br />
      porta sed at maecenas viverra varius id sit in non dui.
    </p>
  </div>

  {/* Divider */}
  <div className="border-t border-gray-300 my-8"></div>

  {/* Pastor profiles */}
  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    {/* Pastor 1 */}
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 mb-6 overflow-hidden rounded-full border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
            alt="Pastor John Carter"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center w-full">
          <h2 className="text-2xl font-bold text-white mb-2">John Carter</h2>
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">PRINCIPAL PASTOR</p>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dignissimos.
          </p>
        </div>
      </div>
    </div>

    {/* Pastor 2 */}
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 mb-6 overflow-hidden rounded-full border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
            alt="Pastor Sophie Carter"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center w-full">
          <h2 className="text-2xl font-bold text-white mb-2">Sophie Carter</h2>
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">PRINCIPAL PASTOR</p>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, dignissimos.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default About;
