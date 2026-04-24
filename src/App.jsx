import { useEffect, useState } from "react";
import supabase from "./config/supabase";
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
      <Main />
    </>
  );
}

export default App;
