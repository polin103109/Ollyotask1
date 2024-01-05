import React, { useState,useEffect } from 'react';
import './App.css';
import { folderTree } from "./data";
import Folder from "./Folder";
import FolderContext from './FolderContext';


function App() {

  return (
    <div>
      <FolderContext/>
      <Folder folderTree={folderTree} />
    </div>
  );

}

export default App;
