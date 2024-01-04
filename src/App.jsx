import React, { useState,useEffect } from 'react';
import './App.css';
import { folderTree } from "./data";
import Folder from "./Folder";


function App() {
  const [path, setPath] = useState([""]);
  const updatePath = ({folderTree:{id}}) => {
    
    setPath([...path, folderTree.name]);
  };
  return (
    <div>
      <span>Path:{currentPath.join("+")}</span>
      <Folder folderTree={folderTree} currentPath={currentPath} updatePath={updatePath} />
    </div>
  );

}

export default App;
