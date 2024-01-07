import React, { useState,useEffect } from 'react';
import './App.css';
import { folderTree } from "./data";
import Folder from "./Folder";
import FolderContext from './FolderContext';
import Home from './Folderpath.jsx';


function App() {

  return (
    <div>
     
      {/* <FolderContext/> */}
      <Home/>
    {/* <Folder folderTree={folderTree} /> */}
    </div>
  );

}

export default App;
