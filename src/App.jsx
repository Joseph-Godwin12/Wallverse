import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Favourites from "./pages/Favourites";
import Notification from "./pages/Notification";
import Settings from "./pages/Settings";
import ProfileTab from "./pages/ProfileTab"
import ShowDetails from "./pages/ShowDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/showdetails/:id" element={<ShowDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/settings" element={<Settings />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
