import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  MoreHorizontal,
  Eye,
  Search,
  Expand,
} from "lucide-react";

export default function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const [photo, setPhoto] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhoto = async () => {
      setLoading(true); // Ensure loading is true on ID change
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`
        );
        const data = await res.json();
        setPhoto(data);

        const rel = await fetch(
          `https://api.unsplash.com/photos/${id}/related?client_id=${ACCESS_KEY}`
        );
        // Changed to slice(0, 4) to ensure more content on the right sidebar
        const relJson = await rel.json();
        setRelated(relJson.results.slice(0, 4)); 

        setLoading(false);
      } catch (err) {
        console.error("Error fetching photo details:", err);
        setLoading(false);
        // Optionally navigate away or show an error state
      }
    };

    loadPhoto();
  }, [id, ACCESS_KEY]); // Dependency array added for safety and correctness

  const downloadImage = (url) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-purple-600 mx-auto mb-4"></div>
      </div>
    );
  }

  // Fallback if data loads but photo is null (e.g., deleted photo)
  if (!photo) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Photo not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Bar */}
      <div className="sticky top-0 z-10 p-4 border-b flex items-center gap-2 bg-white shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold truncate hidden sm:block">
            {photo.alt_description || "Wallpaper Details"}
        </h1>
      </div>

      {/* Main Content Grid: stacks on mobile, 2/3 and 1/3 layout on large screens */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-6">

        {/* LEFT SIDE (Main Photo Details) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-100 border rounded-xl shadow-sm p-3 sm:p-4">

            {/* TOP ACTION ROW */}
            {/* Added: flex-wrap for mobile stacking */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-3">

                {/* Stars / Likes */}
                <div className="flex items-center bg-white px-3 py-1 rounded-full gap-2 shadow-sm">
                  <span className="text-purple-600">★</span>
                  <span className="text-sm font-medium">
                    {photo.likes?.toLocaleString() || 0}
                  </span>
                </div>

                {/* DOWNLOAD BUTTON */}
                <button
                  onClick={() => downloadImage(photo.links.download)}
                  className="p-2 bg-white rounded-full hover:bg-gray-200 shadow-sm transition"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </button>

                {/* MORE - HIDDEN ON SMALL MOBILE SCREEN */}
                <button 
                    className="p-2 bg-white rounded-full hover:bg-gray-200 shadow-sm transition hidden sm:block"
                    title="More Options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <button className="bg-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow text-sm hover:bg-purple-700 transition">
                Set as wallpaper
              </button>
            </div>

            {/* IMAGE AREA */}
            <div className="relative bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={photo.urls.regular}
                alt={photo.alt_description}
                // MODIFIED: Reduced height for mobile, maintains height on desktop
                className="w-full h-[400px] md:h-[600px] object-cover" 
              />

              {/* CENTER BUTTON - Download */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => downloadImage(photo.links.download)}
                  className="p-5 rounded-full backdrop-blur bg-white/40 hover:bg-white/60 shadow-lg transition"
                  title="Download"
                >
                  <Download className="w-8 h-8 text-gray-800" />
                </button>
              </div>

              {/* RIGHT BOTTOM SMALL BUTTONS */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-3">
                <button 
                    className="bg-white/60 backdrop-blur p-2 rounded-full shadow hover:bg-white/90"
                    title="Expand Fullscreen"
                >
                  <Expand className="w-4 h-4 text-gray-700" />
                </button>

                {/* Search Button hidden on very small screens */}
                <button 
                    className="bg-white/60 backdrop-blur p-2 rounded-full shadow hover:bg-white/90 hidden sm:block"
                    title="Search Similar"
                >
                  <Search className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            {/* TITLE + DESCRIPTION */}
            <h2 className="text-xl font-bold mt-4">
              {photo.alt_description || "Untitled"}
            </h2>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {photo.description ||
                "A beautiful wallpaper from Unsplash. Photo by " + photo.user.name + "."}
            </p>

            {/* TAGS */}
            <div className="text-sm text-gray-500 mt-3 flex flex-wrap gap-2">
              <span className="font-medium">Tags:</span>
              {photo.tags?.slice(0, 7).map((tag) => (
                <span key={tag.title} className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full text-xs">
                  #{tag.title}
                </span>
              ))}
            </div>

             {/* User Info */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                <img
                    src={photo.user.profile_image.small}
                    alt={photo.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-sm">{photo.user.name}</p>
                    <p className="text-xs text-gray-500">@{photo.user.username}</p>
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (RELATED IMAGES) */}
        {/* On mobile (default), this flows below the main section. */}
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Related Wallpapers</h3>
          {related.map((img) => (
            <Link 
                key={img.id} 
                to={`/showdetails/${img.id}`} 
                className="group block transition hover:opacity-80"
            >
              <div className="rounded-xl  bg-white overflow-hidden">
                <div className="relative">
                  <img
                    src={img.urls.small}
                    className="w-full h-64 object-cover" // Adjusted height for related images
                    alt={img.alt_description}
                  />

                  {/* Download Button on related image */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent Link navigation
                      downloadImage(img.links.download);
                    }}
                    className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow z-10 group-hover:bg-gray-100 transition"
                    title="Download Related"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-2">{img.alt_description || "Untitled"}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    By {img.user.name}
                    </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}