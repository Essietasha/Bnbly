import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/Homepage';
import RoomCollectionPage from './pages/RoomCollectionPage';
import RoomDetailPage from './pages/RoomDetailPage';
import { roomsLoader } from './loaders/roomsLoader';
import { roomDetailLoader } from './loaders/roomDetailLoader';

const App = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='rooms/:collectionName' element={<RoomCollectionPage />} loader={roomsLoader} />
          <Route path='rooms/:collectionName/:roomId' element={<RoomDetailPage />} loader={roomDetailLoader} />
        </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App;
