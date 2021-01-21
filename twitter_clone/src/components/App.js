import { useEffect } from "react";
import { useState } from "react";
import { authService } from "../fbase";
import AppRouter from "./AppRouter";
import Footer from "./Footer";
import Loader from "./Loader";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setUserObj(user);
      } else{
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}></AppRouter>
      ) : (
        <Loader />
      )}
      <Footer></Footer>
    </>
  );
}

export default App;
