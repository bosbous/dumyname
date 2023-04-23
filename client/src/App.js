import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
// import Layout from "scenes/layout";
// import Dashboard from "scenes/dashboard";
import Login from "components/Login";
import Register from "components/Register";
import Taskpage from "components/Taskpage";
import Body from "components/Body";
import Home from "components/Home";
import LinkPage from "components/LinkPage";
import Unauthorized from "components/Unauthorized";
// import Layout from "components/layout";
import Layout from "components/Layout";
import Editor from "components/Editor";
import Admin from "components/Admin";
import Lounge from "components/Lounge";
import Missing from "components/Missing";

import RequireAuth from "components/RequireAuth";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};
function App() {
  // const mode = useSelector((state) => state.global.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* <Route element={<Layout />}> */}
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/" element={<Test />} /> */}
          {/* </Route> */}
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/" element={<Layout />}> */}
          {/* public routes */}
          {/* <Route path="/" element={< />} /> */}
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route path="task" element={<Taskpage />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              {/* you can put more than one wroute */}
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
              }
            >
              <Route path="lounge" element={<Lounge />} />
            </Route>

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
