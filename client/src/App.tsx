import './App.css'
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider } 
  from 'react-router-dom';
import Home from './pages/Home/Home';
import Collections from './pages/Collections/Collections';
import Layout from './components/Layout/Layout';
import Authentication from './pages/Authentication/Authentication';
import Registration from './pages/Registration/Registration';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import Organizers from './pages/Organizers/Organizers';
import Profile from './pages/Profile/Profile';
import Event from './pages/Event/Event';
import Collection from './pages/Collection/Collection';

import { AuthContext, UserContext } from './contexts'
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [ loggedIn, setLoggedIn ] = useState('')
  
  const setContext = useCallback(
    (newState: any) => {
      setLoggedIn(newState)
    },
    [loggedIn, setLoggedIn],
  )
  const getContextValue = useCallback(
    () => (setContext),
    [loggedIn, setContext],
  )

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="event/:id" element={<Event />} />
        <Route path="main" element={<Home />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collection/:id" element={<Collection />} />
        <Route path='create-event' element={<CreateEvent />} />
        <Route path="organizers" element={<Organizers />} />
        <Route path="profile" element={<Profile />} />
        <Route path='sign-in' element={<Authentication />} />
        <Route path='sign-up' element={<Registration />} />
      </Route>
    )
  );

  return (
    <AuthContext.Provider value={loggedIn}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
