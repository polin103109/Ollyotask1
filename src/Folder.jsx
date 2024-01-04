import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import "./folder.css";

export default function Folder({ folderTree }) {
  const [isVisible, setIsVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState(""); // Track new folder name
  const [folders, setFolders] = useState([]);

  const expand = () => {
    setIsVisible(!isVisible);
  };

  const handleCreateFolder = () => {
    
    const newFolder = {
      name: newFolderName,
      children: []
    };

    setFolders([...folders, newFolder]);
    setNewFolderName(""); 
  };
 

  return (
    <div className="mainfolder">
       <FontAwesomeIcon icon={faFolderOpen} />
      
    <span className="maintitle" onClick={expand}>{folderTree.name}</span>
      {isVisible && (
        <div>
          <div className="create-folder">
       <input
              type="text"
              value={newFolderName}
              
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
           <button onClick={handleCreateFolder}>+</button>
         </div>
            
          {folders.map((child, index) => (
            <div className="childfolder" key={index}>
              
              <Folder folderTree={child} key={index} />
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
}
