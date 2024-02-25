import { Routes, Route, NavLink } from 'react-router-dom';

import classNames from "classnames";
import { MainList } from './pages/MainList';
import { CategoryList } from './pages/CategoryList';
import { Post } from './pages/Post';

function App() {
  const linkClass = classNames(
      'bg-amber-200 hover:bg-amber-100 active:bg-amber-950',
      'rounded hover:rounded-2xl',
      'p-2 m-1 h-10 transition-all easy-linear'
  );
  return (
      <div>
        <header className="flex w-full bg-gray-300">
          <div className="flex mx-auto my-auto h-20">
            <NavLink
                className={linkClass}
                to="/"
            >Главная страница</NavLink>
            <NavLink
                className={linkClass}
                to="/categories"
            >Категории</NavLink>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<MainList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/add-post" element={<Post />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<MainList />} />
        </Routes>
      </div>
  );
}

export default App
