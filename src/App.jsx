import { BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./routes/Layout"
import { routes } from "./navegation/Routes"
import Booking from "./routes/Booking";
import Administration from "./routes/Administration";
import UserBooking from "./routes/UserBooking";
import Favs from "./routes/Favs";
import { ProtectedRoute } from "./components/utils/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          {routes.map(({ id, path, Element }) => (<Route key={id} path={path} element={
            Element === Booking ? <ProtectedRoute rols={[1, 2]}><Element/></ProtectedRoute> : 
            Element === UserBooking ? <ProtectedRoute rols={[1, 2]}><Element/></ProtectedRoute> :
            Element === Favs ? <ProtectedRoute rols={[1, 2]}><Element/></ProtectedRoute> :
            Element === Administration ? <ProtectedRoute rols={[2]}><Element/></ProtectedRoute> : <Element/>
          } />))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
