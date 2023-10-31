import React, { useEffect } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./routing/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { useSelector, useDispatch } from "react-redux";
import { getRecentPost } from "./features/post/postsAction";

function Routing(rops) {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<HomePage />} />
      </Route>
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

function App() {
  const dispatch = useDispatch();
  // const { userInfo, token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getRecentPost());
  }, []);

  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
