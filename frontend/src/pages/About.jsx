import React from "react";
import { assets } from "../assets/asset";

const About = () => {
  return (
    <div>
     <div
  className="bg-cover bg-center text-white py-16 px-6 sm:px-12 lg:px-20"
  style={{ backgroundImage: `url(${assets.homeBg})` }} // Replace with your actual image path

>
  {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">About Us</h1>

  <p className="mt-6 max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit placeat
    id, quaerat nobis qui harum libero fugit ullam dolorem amet, dicta delectus
    dolores provident nulla autem architecto aperiam recusandae nam quas, dolorum ab.
    Neque, reprehenderit nobis at praesentium hic corrupti explicabo distinctio
    animi. Provident iure sint magnam officiis harum voluptatibus!
  </p>

  <div className="flex flex-col sm:flex-row gap-4 mt-8">
    <button className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100 transition">
      GET INVOLVED
    </button>
    <button className="border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition">
      OUR PASTORS
    </button>
  </div>
</div>

      <div className="relative bg-white py-16 px-4 sm:px-6 lg:px-10">
        {/* First Section - Left Aligned */}
        <section className="relative flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="relative w-full max-w-md lg:max-w-xl">
            <img
              src={assets.strength}
              alt="Church Strength"
              className="w-full h-auto object-cover rounded-md"
            />
            <div className="absolute top-10 left-0 bg-white p-6 shadow-lg w-[90%] sm:w-[85%] md:w-[420px] h-auto md:h-[300px]">
              <div className="border-2 border-black w-20 mb-4"></div>
              <h2 className="text-xl sm:text-2xl font-bold">
                In our church we
                <br />
                trust in the strength <br />
                of God's love
              </h2>
              <p className="text-gray-600 mt-4 text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur adipiscing elit urna
                vitae ac vitae lacus ac proin ultricies eleifend dui ut felis
                bibendum ut amet nunc turpis diam urna quam congue. Tortor in
                egestas imperdiet posuere duis enim lectus consectetur arcu ac
                id in mauris.
              </p>
            </div>
          </div>
        </section>

        <div className="border border-gray-300 w-full max-w-6xl my-16 mx-auto"></div>

        {/* Second Section - Right Aligned */}
        <section className="relative flex flex-col lg:flex-row-reverse items-center justify-center gap-8">
          <div className="relative w-full max-w-md lg:max-w-xl">
            <img
              src={assets.mission}
              alt="Church Mission"
              className="w-full h-auto object-cover rounded-md"
            />
            <div className="absolute top-10 right-0 bg-white p-6 shadow-lg w-[90%] sm:w-[85%] md:w-[420px] h-auto md:h-[300px]">
              <div className="border-2 border-black w-20 mb-4"></div>
              <h2 className="text-xl sm:text-2xl font-bold">Our mission</h2>
              <p className="text-gray-600 mt-4 text-sm sm:text-base">
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
            Meet John & Sophie,
            <br />
            our beloved pastors
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipiscing elit eiusmod in
            enim nibh,
            <br />
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
                <h2 className="text-2xl font-bold text-white mb-2">
                  John Carter
                </h2>
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
                  PRINCIPAL PASTOR
                </p>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
                  dignissimos.
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
                <h2 className="text-2xl font-bold text-white mb-2">
                  Sophie Carter
                </h2>
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
                  PRINCIPAL PASTOR
                </p>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
                  dignissimos.
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
