import { useEffect } from "react";
import supabase from "./config/supabase";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";

function App() {
  // async function getUsers() {
  //   const { data } = await supabase.from("USERS").select();
  //   console.log(data);
  // }

  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
