import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaMicrophone, FaRegClock, FaDownload } from "react-icons/fa";

const SermonPage = () => {
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const sermonsPerPage = 6;

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "sermons"));
        const sermonList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSermons(sermonList);
        setFilteredSermons(sermonList);

        const uniqueCategories = [
          "All",
          ...new Set(sermonList.map((sermon) => sermon.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredSermons(sermons);
    } else {
      setFilteredSermons(sermons.filter((sermon) => sermon.category === category));
    }
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = sermons.filter(
      (sermon) =>
        sermon.title.toLowerCase().includes(query) ||
        sermon.category.toLowerCase().includes(query)
    );
    setFilteredSermons(filtered);
    setCurrentPage(1);
  };

  const indexOfLastSermon = currentPage * sermonsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
  const currentSermons = filteredSermons.slice(indexOfFirstSermon, indexOfLastSermon);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Page Hero Section */}
      <section className="bg-[rgb(24,24,27)] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gray-600 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-zinc-800 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Spiritual <span className="text-gray-300 underline decoration-purple-600 decoration-4 underline-offset-8">Nourishment</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Access our library of life-transforming sermons. Listen, download, and grow in the wisdom of God through the shared Word.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar - Sticky with offset */}
      <div className="bg-white sticky top-[68px] md:top-[80px] z-40 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or category..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-purple-500 text-gray-700 transition"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar max-w-full">
            <FaFilter className="text-purple-600 hidden md:block" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 w-full flex-grow">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-purple-600 font-bold animate-pulse">Loading Sermons...</p>
          </div>
        ) : filteredSermons.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-inner border border-dashed border-gray-300">
            <p className="text-gray-400 text-2xl italic font-medium">
              No messages found in this category.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentSermons.map((sermon, index) => (
                <motion.div
                  key={sermon.id}
                  className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 transform group-hover:rotate-12 transition">
                      <FaMicrophone size={24} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg">
                      {sermon.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-[rgb(20,15,45)] mb-3 leading-tight min-h-[64px]">
                    {sermon.title}
                  </h2>
                  
                  <div className="flex items-center text-gray-400 text-sm mb-6">
                    <FaRegClock className="mr-2" />
                    <span>{sermon.date}</span>
                  </div>

                  <div className="mt-auto space-y-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <audio controls className="w-full h-8 opacity-80 hover:opacity-100 transition">
                        <source src={sermon.audioUrl} type="audio/mp3" />
                      </audio>
                    </div>
                    
                    <a
                      href={sermon.audioUrl}
                      download
                      className="button w-full flex items-center justify-center gap-2 group-hover:bg-[rgb(255,200,80)] group-hover:text-[rgb(40,30,80)]"
                    >
                      <FaDownload size={14} /> Download Audio
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {filteredSermons.length > sermonsPerPage && (
              <div className="flex justify-center mt-16 gap-3">
                {Array.from({ length: Math.ceil(filteredSermons.length / sermonsPerPage) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentPage(index + 1);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className={`w-12 h-12 rounded-2xl font-black transition-all ${
                        currentPage === index + 1 
                          ? "bg-[rgb(20,15,45)] text-white shadow-xl scale-110" 
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SermonPage;