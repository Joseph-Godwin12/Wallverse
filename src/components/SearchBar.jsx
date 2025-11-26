// import { useState } from "react";
// import { Search, ChevronDown } from "lucide-react";

// export default function SearchBar({ onSearch }) {
//   const [query, setQuery] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;
//     onSearch(query);
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <form
//         onSubmit={handleSubmit}
//         className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2"
//       >
//         <Search className="text-gray-500 w-5 h-5" />

//         <input
//           type="text"
//           placeholder="Search wallpapers"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="flex-1 bg-transparent outline-none px-3 text-sm"
//         />
//       </form>

//       {/* Avatar with Dropdown */}
//       <button className="flex items-center gap-2 hover:opacity-80 transition">
//         <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
//           <svg viewBox="0 0 100 100" className="w-full h-full">
//             {/* Head */}
//             <circle cx="50" cy="35" r="18" fill="white" />
//             {/* Body */}
//             <path
//               d="M 20 80 Q 20 55, 50 55 Q 80 55, 80 80 L 80 100 L 20 100 Z"
//               fill="white"
//             />
//           </svg>
//         </div>
//         <ChevronDown className="w-4 h-4 text-gray-600" />
//       </button>
//     </div>
//   );
// }