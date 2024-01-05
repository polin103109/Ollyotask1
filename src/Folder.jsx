import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import "./folder.css";

export default function Folder({ folderTree }) {
  const [isVisible, setIsVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);

  const expand = () => {
    setIsVisible(!isVisible);
  };

  const handleDeleteFolder = () => {
    const folderIndex = folders.findIndex(folder => folder.name === newFolderName);
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

  return (
    <div className="mainfolder">
      <FontAwesomeIcon icon={faFolderOpen} />
      <span className="maintitle" onClick={expand}>
        {folderTree.name}
      </span>
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
            <button onClick={ handleDeleteFolder}>
              Delete
            </button>
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
