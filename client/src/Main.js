import React from "react";
import { Routes, Route } from "react-router";
import Sidebar from './components/Sidebar'
import Projects from './components/Projects'
import MyAccount from './components/MyAccount'
import Home from "./components/Home";

function Main() {
    return (
        <div className='pageContainer'>
          <Sidebar/>
          <div>
            <Routes>
              <Route path="*"  element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/myaccount" element={<MyAccount />} />
            </Routes>
          </div>
        </div>
      );
    }

export default Main
