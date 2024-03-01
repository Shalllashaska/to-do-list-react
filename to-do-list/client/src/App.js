import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { MainList, mainListLoader } from './pages/MainList';
import { CategoryList } from './pages/CategoryList';
import { Post, postLoader } from './pages/Post';
import { Layout } from "./Layout";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route index element={<MainList />} loader={mainListLoader} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/add-post" element={<Post />} />
        <Route path="/post/:id" element={<Post />} loader={postLoader} />
        <Route path="*" element={<MainList />} />
    </Route>
));

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App
