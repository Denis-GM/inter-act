import './App.css'
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider } 
  from 'react-router-dom';
import Elementary from './pages/elementary/elementary';
import Collections from './pages/collections/collection';
import Layout from './shared/components/layout/layout';
import Authentication from './pages/authentication/authentication';
import Registration from './pages/registration/registration';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="main" element={<Elementary />} />
        <Route path="collections" element={<Collections />} />
        <Route path='sign-in' element={<Authentication />} />
        <Route path='sign-up' element={<Registration />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
