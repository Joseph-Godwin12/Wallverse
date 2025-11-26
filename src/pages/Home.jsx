import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Handle search from Layout component
  useEffect(() => {
    if (location.state?.searchQuery) {
      handleSearch(location.state.searchQuery);
    }
  }, [location.state]);

  // Search wallpapers
  const handleSearch = (query) => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data.results || []));
  };

  // Fetch all data
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(
        `https://api.unsplash.com/photos?order_by=latest&per_page=12&client_id=${ACCESS_KEY}`
      ).then((res) => res.json()),
      fetch(
        `https://api.unsplash.com/photos?order_by=popular&per_page=12&client_id=${ACCESS_KEY}`
      ).then((res) => res.json()),
      fetch(
        `https://api.unsplash.com/topics?per_page=12&client_id=${ACCESS_KEY}`
      ).then((res) => res.json()),
    ])
      .then(([trendingData, popularData, categoriesData]) => {
        setTrending(trendingData);
        setPopular(popularData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-purple-600 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Search Results */}
      {results.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Search Results</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {results.map((img) => (
              <Link key={img.id} to={`/showdetails/${img.id}`}>
                <img
                  src={img.urls.small}
                  alt={img.alt_description}
                  className="rounded-lg object-cover h-40 w-40 flex-shrink-0 hover:scale-105 transition-transform"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trending */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Trending Wallpapers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.slice(0, 4).map((img) => (
            <Link key={img.id} to={`/showdetails/${img.id}`}>
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="rounded-lg object-cover h-52 w-full hover:scale-105 transition-transform"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Explore by Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((cat) => (
            <Link key={cat.id} to={`/showdetails/${cat.cover_photo?.id}`}>
              <div className="rounded-lg overflow-hidden bg-gray-200 cursor-pointer hover:scale-105 transition-transform">
                <img
                  src={cat.cover_photo?.urls.small}
                  alt={cat.title}
                  className="h-52 w-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Popular Wallpapers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popular.slice(0, 4).map((img) => (
            <Link key={img.id} to={`/showdetails/${img.id}`}>
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="rounded-lg object-cover h-52 w-full hover:scale-105 transition-transform"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}