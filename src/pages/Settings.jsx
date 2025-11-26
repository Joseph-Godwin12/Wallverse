import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Link } from "react-router-dom"; 

export default function Settings() {
  const [activeTab, setActiveTab] = useState("General");
  const [wallpaper, setWallpaper] = useState(null);
  const [results, setResults] = useState([])

  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const handleSearch = (query) => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data.results || []));
  };


  // Fetch wallpaper
  useEffect(() => {
    fetch(
      `https://api.unsplash.com/photos/random?query=landscape&orientation=landscape&client_id=${ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setWallpaper(data))
      .catch((err) => console.log(err));
  }, []);

  const downloadImage = () => {
    if (!wallpaper) return;
    const link = document.createElement("a");
    link.href = wallpaper.urls.full;
    link.download = "wallpaper.jpg";
    link.click();
  };

  return (   
    <div className=" sm:max-w-6xl mx-auto overflow-hidden">
      
      {/* Search Results */}
      {results.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Search Results</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {results.map((img) => (
              <Link key={img.id} to={`/showdetails/${img.id}`}>
                <img
                  src={img.urls.small}
                  alt={img.alt_description}
                  className="rounded-lg object-cover h-44 w-44 flex-shrink-0 hover:scale-[1.02] transition-transform"
                />
              </Link>
            ))}
          </div>
        </section>
      )}
      
     
      <div className="flex gap-3 mb-6 overflow-x-auto whitespace-nowrap border-b pb-2">
        {["General", "Profile", "Preferences", "History"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm border transition flex-shrink-0
              ${
                activeTab === tab
                  ? "bg-[#6b4cff] text-white border-[#6b4cff]"
                  : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

    
      
      {/* GENERAL TAB */}
      {activeTab === "General" && (
        <div className="bg-gray-100 rounded-xl border p-4 mx-0 sm:p-6 shadow-sm space-y-8 overflow-hidden"> 
          <section className="border-b pb-6">
            <h2 className="text-xl font-bold">Current Wallpaper</h2>
            <p className="text-sm text-gray-500 mb-4">Active on all displays</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden shadow-md">
                {wallpaper ? (
                  <img
                    src={wallpaper.urls.regular}
                    alt={wallpaper.alt_description}
                    className="w-full h-56 sm:h-80 object-cover" 
                  />
                ) : (
                  <div className="w-full h-56 sm:h-80 bg-gray-200 animate-pulse rounded-xl" />
                )}
              </div>

              
              <div className="ml-0 md:ml-5 pt-2"> 
                <h3 className="text-lg font-semibold">
                  {wallpaper?.description || "Beautiful Wallpaper"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  by {wallpaper?.user?.name || "Unknown"}
                </p>

                <p className="text-sm text-gray-500">
                  {wallpaper ? `${wallpaper.width} × ${wallpaper.height}` : ""}
                </p>

                
                <div className="mt-4 space-y-2 text-sm max-w-sm">
                  <p className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </p>

                  <p className="flex justify-between items-center">
                    <span className="font-medium">Applied:</span>
                    <span>2 hours ago</span>
                  </p>

                  <p className="flex justify-between items-center">
                    <span className="font-medium">Downloads:</span>
                    <span>{wallpaper?.downloads?.toLocaleString() || "1,258"}</span>
                  </p>
                </div>

                <div className="flex gap-3 mt-24 ml-28 flex-wrap">
                    <button className="px-4 py-2 rounded-md border border-blue-800 bg-gray-50 text-sm hover:bg-gray-100">
                        Change Wallpaper
                    </button>
                </div>
              </div>
            </div>
          </section>

          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg">Auto-Rotation</h3>
              <p className="text-sm text-gray-500 mt-1">
                Automatically change wallpapers
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm">Off</span>
                <label className="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" className="hidden peer" />
                  <span className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-[#6b4cff] transition" />
                  <span className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 peer-checked:translate-x-6 transition" />
                </label>
              </div>
            </div>

            <div className="bg-gray-100 p-6 border rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg">Display Settings</h3>
              <p className="text-sm text-gray-500 mt-1">Fit Mode</p>

              <div className="mt-4 flex flex-col sm:flex-row gap-5">
                <label className="flex items-start gap-2">
                  <input type="radio" name="fitmode" className="mt-1" />
                  <div>
                    <p className="font-medium text-sm">Fill Screen</p>
                    <p className="text-xs text-gray-500">Crop to fit</p>
                  </div>
                </label>

                <label className="flex items-start gap-2">
                  <input type="radio" name="fitmode" defaultChecked className="mt-1" />
                  <div>
                    <p className="font-medium text-sm">Fit Screen</p>
                    <p className="text-xs text-gray-500">Show all content</p>
                  </div>
                </label>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === "Profile" && (
        <div className="w-full bg-white shadow-sm rounded-xl border p-4 sm:p-6 overflow-hidden">
          <div className="bg-gray-100 shadow-sm rounded-xl p-4 sm:p-6 mb-6 border">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full">                   
                    <circle cx="50" cy="35" r="18" fill="white" />                    
                    <path
                      d="M 20 80 Q 20 55, 50 55 Q 80 55, 80 80 L 80 100 L 20 100 Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <button className="text-sm text-indigo-600 mt-2 hover:underline">
                  Change photo
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full mt-4 sm:mt-0">
                <div>
                  <p className="text-sm font-medium mb-1">Full name</p>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    defaultValue="Anita Kam"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Username</p>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    defaultValue="Nita"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <input
                    type="email"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    defaultValue="Anitakam@gmail.com"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Location</p>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    defaultValue="Lagos"
                  />
                </div>
                <div className="sm:col-span-2">
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition">
                        Save Changes
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-gray-100 shadow-sm rounded-xl p-4 sm:p-6 border">
            <h3 className="font-bold text-lg mb-4">Account Security</h3>

            {/* Change Password */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3">
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-sm">Change Password</p>
                <p className="text-xs text-gray-500">
                  Last updated 3 months ago
                </p>
              </div>
              <button className="px-4 py-1.5 border rounded-md text-sm hover:bg-white transition">
                Update
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-t">
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">
                  Add an extra layer of security
                </p>
              </div>

              {/* Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div
                  className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-500 transition-all
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-all
                peer-checked:after:translate-x-5"
                ></div>
              </label>
            </div>

            {/* Login Sessions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-t">
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-sm">Login Sessions</p>
                <p className="text-xs text-gray-500">
                  Manage your active sessions
                </p>
              </div>
              <button className="px-4 py-1.5 border rounded-md text-sm hover:bg-white transition">
                Update
              </button>
            </div>
          </div>

          {/* Logout Button Color Fixed */}
          <button 
            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Log out
          </button>
        </div>
      )}

      {/* PREFERENCES TAB */}
      {activeTab === "Preferences" && (
        <div className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold">Preferences</h2>
          <p className="text-sm text-gray-500 mt-1">
            Customize your app behavior and settings
          </p>

          <div className="mt-4">
            <p className="text-sm">Coming soon...</p>
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === "History" && (
        <div className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold">History</h2>
          <p className="text-sm text-gray-500 mt-1">
            View previously applied wallpapers
          </p>

          <div className="mt-4">
            <p className="text-sm">No history found.</p>
          </div>
        </div>
      )}
    </div>
  );
}