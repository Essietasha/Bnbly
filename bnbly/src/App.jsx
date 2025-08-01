import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Homepage from './pages/Homepage';

const App = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Homepage />} />
        </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App;
