import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import MyFavorites from './pages/MyFavorites';
import Apartments from './pages/Apartments';
import Experiences from './pages/Experiences';
import BecomeHost from './pages/BecomeHost';
import CreateListing from './pages/CreateListing';
import MyListings from './pages/MyListings';
import RoomCollectionPage from './pages/RoomCollectionPage';
import RoomsByLocationPage from './pages/RoomsByLocationPage';
import PaymentPage from './pages/PaymentPage';
import RoomDetailPage from './pages/RoomDetailPage';
import MyReservations from './pages/MyReservations';
import { roomDetailLoader } from './loaders/roomDetailLoader';
import { locationRoomsLoader } from './loaders/locationRoomsLoader';


const App = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='homes' element={<HomePage />} />
          <Route path='rooms' element={<Apartments />} />
          <Route path='experiences' element={<Experiences />} />
          <Route path='rooms/:roomId' element={<RoomDetailPage />} loader={roomDetailLoader} />
          <Route path='rooms/location/:location' element={<RoomsByLocationPage />} loader={locationRoomsLoader} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='payment/:reservationId' element={<PaymentPage />} />
          <Route path='myreservations' element={<MyReservations />} />

          <Route path='becomehost' element={ <ProtectedRoutes>  <BecomeHost />  </ProtectedRoutes> } />
          <Route path='createlisting' element={ <ProtectedRoutes> <CreateListing /> </ProtectedRoutes>} />
          <Route path='myfavorites' element={<ProtectedRoutes> <MyFavorites /> </ProtectedRoutes> } />
          <Route path='mylistings' element={ <ProtectedRoutes> <MyListings /> </ProtectedRoutes> } />
        </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
