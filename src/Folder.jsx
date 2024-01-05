import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import "./folder.css";

export default function Folder({ folderTree }) {
  const [isVisible, setIsVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [folderPath, setFolderPath] = useState([]);

  const expand = () => {
    setIsVisible(!isVisible);
  };

  const handleDeleteFolder = (folderId) => {
    const folderIndex = folders.findIndex(folder => folder.id === folderId);
    console.log("hitted")
    if (folderIndex !== -1) {
      const updatedFolders = [...folders];
      updatedFolders.splice(folderIndex, 1);
      setFolders(updatedFolders);
      setNewFolderName("");
    } else {
      alert("Folder does not exist!");
    }
  };

  const handleCreateFolder = () => {
    const newFolder = {
      id: Date.now(),
      name: newFolderName,
      children: []
    };

    setFolders([...folders, newFolder]);
    setNewFolderName("");
  };
  const updateFolderPath = (folderName) => {
    setFolderPath([...folderPath, folderName]);
  };
  const navigateToFolder = (index) => {
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
  };

  return (
    
    <div className="mainfolder">
     <div className="folder-path">
     
      </div>
      <FontAwesomeIcon icon={faFolderOpen} />
      <span className="maintitle" onClick={expand}>
        {folderTree.name}
      </span>
      {isVisible && (
        <div>
          <div className="create-folder">
           
          </div>

          {folders.map((child) => (
            <div className="childfolder" key={child.id}>
            <Folder folderTree={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
