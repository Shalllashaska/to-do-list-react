import { useEffect, useState } from "react";

import { Routes, Route, Link } from 'react-router-dom';
import { MainList } from './pages/MainList';
import { CategoryList } from './pages/CategoryList';
import { PostAdd } from './pages/PostAdd';

function App() {
  const linkClass = 'bg-amber-200 hover:bg-amber-100 active:bg-amber-950 rounded p-2 m-1 h-10';
  const [BLData, setBLData] = useState(null);
  useEffect(() => {
    fetch("/api")
        .then((response) => response.json())
        .then((data) => {
          setBLData(data);
        })
  }, []);
  return (
      <div>
        <header className="flex w-full bg-gray-300">
          <div className="flex mx-auto my-auto h-20">
            <Link
                className={linkClass}
                to="/"
            >
              Posts
            </Link>
            <Link
                className={linkClass}
                to="/categories"
            >
              Categories
            </Link>
            <Link
                className={linkClass}
                to="/add-post"
            >
              Add Post
            </Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<MainList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/add-post" element={<PostAdd />} />
          <Route path="*" element={<MainList />} />
        </Routes>
      </div>
  );
}

export default App
