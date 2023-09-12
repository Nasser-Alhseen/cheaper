import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";

function GeneralHome(props) {
  const [currentTab, setCurrentTab] = useState("home");

  try {
    return (
      <>
        <Navbar tabs={[]} setCurrentTab={setCurrentTab} currentTab={currentTab} toast={props.toast} navigate={props.navigate} />

        <Routes></Routes>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default GeneralHome;
