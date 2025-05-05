import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout";

import routes from "./router";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
