import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const SermonPage = () => {
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const sermonsPerPage = 6; // Number of sermons per page

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        setLoading(true); // Start loading
        const querySnapshot = await getDocs(collection(db, "sermons"));
        const sermonList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSermons(sermonList);
        setFilteredSermons(sermonList);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(sermonList.map((sermon) => sermon.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSermons();
  }, []);

  // Filter sermons by category
  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredSermons(sermons);
    } else {
      setFilteredSermons(sermons.filter((sermon) => sermon.category === category));
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter sermons based on search query
    const filtered = sermons.filter(
      (sermon) =>
        sermon.title.toLowerCase().includes(query) ||
        sermon.category.toLowerCase().includes(query)
    );

    setFilteredSermons(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination Logic
  const indexOfLastSermon = currentPage * sermonsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
  const currentSermons = filteredSermons.slice(indexOfFirstSermon, indexOfLastSermon);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Sermons</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search sermons by title or category..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Sermon List */}
          <div className="grid md:grid-cols-3 gap-6">
            {currentSermons.map((sermon) => (
              <div key={sermon.id} className="bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-semibold">{sermon.title}</h2>
                <p className="text-gray-600">{sermon.date}</p>
                <p className="text-sm text-blue-500">{sermon.category}</p>
                <audio controls className="mt-2 w-full">
                  <source src={sermon.audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                {/* Download Button */}
                <a
                  href={sermon.audioUrl}
                  download
                  className="mt-2 block bg-green-600 text-white text-center px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Download Sermon
                </a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(filteredSermons.length / sermonsPerPage) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-md ${
                    currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SermonPage;