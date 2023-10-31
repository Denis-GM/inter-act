import './App.css'
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider } 
  from 'react-router-dom';
import Elementary from './pages/elementary/elementary';
import Collections from './pages/collections/collection';
import Layout from './shared/components/layout/layout';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="main" element={<Elementary />} />
        <Route path="collections" element={<Collections />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
