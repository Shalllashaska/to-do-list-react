import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { MainList, mainListLoader } from './pages/MainList';
import { Post, postLoader } from './pages/Post';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
        <Route index element={<MainList />} loader={mainListLoader} />
        <Route path="/add-post" element={<Post />} />
        <Route path="/post/:id/:readOnly" element={<Post />} loader={postLoader} />
        <Route path="*" element={<MainList />} />
    </Route>
));

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App
