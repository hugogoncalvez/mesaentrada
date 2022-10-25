import { Routes, Route } from 'react-router-dom';
import { Auth } from "./Auth/Auth";
import { Home } from "./components/Home.jsx";
import RequireAuth from './Auth/RequireAuth';




function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route element={<RequireAuth />}>
          <Route path='/home' element={<Home />} />
          <Route path="*" element={<Auth />} />  {/*page-not-found route*/}

        </Route>
      </Routes>
    </div>
  );
}

export default App;
