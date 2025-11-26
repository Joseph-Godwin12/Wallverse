import { useState, useEffect } from 'react';
import { Star, Download, MoreHorizontal } from 'lucide-react';
//import SearchBar from "../components/SearchBar";


export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([])

  const handleSearch = (query) => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data.results || []));
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      setLoading(true);
      const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=6&client_id=${ACCESS_KEY}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch favourites');
      
      const data = await response.json();
      setFavourites(data);
    } catch (error) {
      console.error('Error loading favourites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavourite = (id) => {
    setFavourites(prev => prev.filter(fav => fav.id !== id));
  };

  const handleDownload = (downloadLink) => {
    if (downloadLink) {
      window.open(downloadLink, '_blank');
    }
  };

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
    <div className="min-h-screen bg-white">
      {/* <div className="sticky top-0 bg-white z-10 pb-3">
              <SearchBar onSearch={handleSearch} />
            </div> */}
      
            {/* Search Results */}
            {results.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3">Search Results</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
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
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Favourites</h1>

        {favourites.length === 0 ? (
          <div className="text-center py-20">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No favourites yet</p>
            <p className="text-gray-400 text-sm">Start adding wallpapers to your favourites</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favourites.map((image) => (
              <div
                key={image.id}
                className="group relative rounded-xl overflow-hidden  hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-200">
                  <img
                    src={image.urls?.regular}
                    alt={image.alt_description || 'Favourite wallpaper'}
                    className="w-full h-96 object-cover"
                  />

                  {/* Top Right - Favourite Icon */}
                  <button
                    onClick={() => handleRemoveFavourite(image.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                    title="Remove from favourites"
                  >
                    <Star className="w-5 h-5 text-purple-600 fill-current" />
                  </button>

                  {/* Bottom Right - Download Icon */}
                  <button
                    onClick={() => handleDownload(image.links?.download)}
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all hover:bg-white hover:scale-110"
                    title="Download"
                  >
                    <Download className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Bottom Info */}
                <div className="bg-white p-4 flex items-center justify-between border-t border-gray-100">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {image.alt_description?.split(',')[0] || 'Untitled'}
                    </h3>
                  </div>
                  <button className="ml-2 text-gray-400 hover:text-gray-600 transition">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}