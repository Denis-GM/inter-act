import './App.css'
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider } 
  from 'react-router-dom';
import Elementary from './pages/elementary/Elementary';
import Collections from './pages/Collections/Collection';
import Layout from './shared/Layout/Layout';
import Authentication from './pages/Authentication/Authentication';
import Registration from './pages/Registration/Registration';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import Organizers from './pages/Organizers/Organizers';
import Profile from './pages/Profile/Profile';
import Event from './pages/Event/Event';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="event/:id" element={<Event />} />
        <Route path="main" element={<Elementary />} />
        <Route path="collections" element={<Collections />} />
        <Route path='create-event' element={<CreateEvent />} />
        <Route path="organizers" element={<Organizers />} />
        <Route path="profile" element={<Profile />} />
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
