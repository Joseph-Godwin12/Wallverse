import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"; 
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  // ADDED: Loading state
  const [isLoading, setIsLoading] = useState(true); 

  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Load categories
  useEffect(() => {
    setIsLoading(true); // Start loading
    fetch(`https://api.unsplash.com/topics?per_page=30&client_id=${ACCESS_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setActiveCategory(data[0]);
        // Note: We won't set isLoading(false) here, as we need the wallpapers to load too.
      });
  }, []);

  // Load wallpapers for tabs (desktop)
  useEffect(() => {
    if (!activeCategory) return;

    fetch(
      `https://api.unsplash.com/topics/${activeCategory.id}/photos?per_page=12&client_id=${ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWallpapers(data);
        setIsLoading(false); // Set to false once wallpapers (and categories) are loaded
      });
  }, [activeCategory]);

  // Mobile fetch per category
  const fetchMobileImages = async (id) => {
    const res = await fetch(
      `https://api.unsplash.com/topics/${id}/photos?per_page=10&client_id=${ACCESS_KEY}`
    );
    return await res.json();
  };

  // ----------------------------------------------------
  // CONDITIONAL LOADING RENDER
  // ----------------------------------------------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wallpapers...</p>
        </div>
      </div>
    );
  }
  // ----------------------------------------------------

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* ----------------------
            MOBILE SECTIONS
          ---------------------- */}
      <div className="block md:hidden space-y-10">
        {categories.map((cat) => (
          <MobileCategorySection
            key={cat.id}
            category={cat}
            fetchImages={() => fetchMobileImages(cat.id)}
          />
        ))}
      </div>
      
      {/* ----------------------
            DESKTOP TABS
          ---------------------- */}
      <div className="hidden md:block">
        {/* Tabs */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm rounded-full border transition whitespace-nowrap
              ${
                activeCategory?.id === cat.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Wallpapers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {wallpapers.map((img) => (
            <DesktopWallpaperCard 
              key={img.id} 
              img={img} 
              ACCESS_KEY={ACCESS_KEY} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---

/* ------------------------------------
    IMAGE SCROLLER COMPONENT (MOBILE)
--------------------------------------- */
function ImageScroller({ images }) { 
  const scrollRef = useRef(null);
  const scrollAmount = 250; 

  const scroll = (direction) => {
    if (scrollRef.current) {
      const currentScroll = scrollRef.current.scrollLeft;

      if (direction === "left") {
        scrollRef.current.scroll({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        scrollRef.current.scroll({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative max-w-full">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 p-1.5 rounded-full shadow-md z-10"
        aria-label="Scroll Left"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>

      {/* Image Container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide snap-x px-8"
      >
        {images.map((img) => (
          // MODIFIED: Wrapped image in React Router's <Link> component
          <Link 
            key={img.id}
            to={`/showdetails/${img.id}`} // Use template literal for dynamic URL
            className="flex-shrink-0 snap-start w-[32%] relative block group" 
          >
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="rounded-lg object-cover h-36 w-full"
            />
            {/* OPTIONAL: Image Detail Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {img.user?.name || "View Details"}
            </div>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 p-1.5 rounded-full shadow-md z-10"
        aria-label="Scroll Right"
      >
        <ChevronRight size={20} className="text-gray-700" />
      </button>
    </div>
  );
}

// ---

/* ------------------------------------
    MOBILE SECTION COMPONENT
--------------------------------------- */
function MobileCategorySection({ category, fetchImages }) {
  const [images, setImages] = useState([]);
  const [isSectionLoading, setIsSectionLoading] = useState(true); // Loading state for individual sections

  useEffect(() => {
    fetchImages()
      .then((data) => {
        setImages(data);
        setIsSectionLoading(false);
      });
  }, []);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">{category.title}</h2>
      {isSectionLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-500"></div>
        </div>
      ) : (
        <ImageScroller images={images} />
      )}
    </section>
  );
}

// ---

/* ------------------------------------
    DESKTOP WALLPAPER CARD
--------------------------------------- */
function DesktopWallpaperCard({ img, ACCESS_KEY }) {
  const downloadImage = async (e) => {
    // Stop event propagation so the parent Link click is not triggered
    e.stopPropagation(); 
    
    const res = await fetch(
      `https://api.unsplash.com/photos/${img.id}/download?client_id=${ACCESS_KEY}`
    );
    const data = await res.json();
    window.open(data.url, "_blank");
  };

  return (
    // MODIFIED: Wrapped the card content in a React Router <Link>
    <Link 
        to={`/showdetails/${img.id}`} // Use template literal for dynamic URL
        className="rounded-xl overflow-hidden bg-white relative hover:shadow-sm transition cursor-pointer block"
    >
      <img
        src={img.urls.regular}
        alt={img.alt_description}
        className="w-full h-96 object-cover"
      />

      {/* Ensure the button is styled to be above the image layer */}
      <button
        onClick={downloadImage}
        className="absolute bottom-4 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-20"
      >
        <Download size={18} className="text-gray-700" />
      </button>
    </Link>
  );
}