import React, { useState,useEffect } from 'react';
import './App.css';
import { folderTree } from "./data";
import Folder from "./Folder";


function App() {

  return (
    <div>
     
      <Folder folderTree={folderTree} />
    </div>
  );

}

export default App;
