import { useEffect, useState } from "react";
const Loading = () => {
// add this here
// // const Loading = ({ onComplete }) => {
  // const [show, setShow] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShow(false);
  //     if (onComplete) onComplete(); // Call the callback when loading is done
  //   }, 1000); // 1 seconds delay

  //   return () => clearTimeout(timer); // Cleanup timer
  // }, []);

  // if (!show) return null; // Hide loading after 1 sec

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
