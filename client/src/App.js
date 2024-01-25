import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PersistLogin from "./features/auth/PersistLogin";
import SignIn from "./features/auth/SignIn";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import DashLayout from "./components/DashLayout";
import PageNotFound from "./features/pages/PageNotFound"
import SignUp from "./features/auth/SignUp";
import useTitle from "./hooks/useTitle";
import Home from "./features/pages/Home";
import Prefetch from "./features/auth/Prefetch";

function App() {
  useTitle('Whisper Social')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        {/* protected routes */}
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Home />} />

              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
