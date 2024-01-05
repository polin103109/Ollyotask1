import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder,faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import Folder from "./Folder"; 

export default function FolderContext() {
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folders, setFolders] = useState([]);

  const handleCreateFolder = () => {
    const newFolder = {
        id: Date.now(),
        name: newFolderName,
        children: []
      };
  
      setFolders([...folders, newFolder]);
      setNewFolderName("");
  };




  const handleDeleteFolder = (folderId) => {
    const updatedFolders = folders.filter(folder => folder.id !== folderId);
    setFolders(updatedFolders);
  };

  const handleChange = (e) => {
    setNewFolderName(e.target.value);
  };
  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };
  return (
    <div>
      <span><b>Path:</b></span><br/>
      <input
        type="text"
        value={newFolderName}
        onChange={handleChange}
        placeholder="Enter folder name"
      />
      <button onClick={handleCreateFolder}>Add</button>
      {folders.map(folder => (
        <div key={folder.id}>
          <FontAwesomeIcon
            icon={selectedFolder && selectedFolder.id === folder.id ? faFolderOpen : faFolder}
            onClick={() => handleFolderClick(folder)}
            style={{ cursor: "pointer" }}
          />
          <span onClick={() => handleFolderClick(folder)} style={{ cursor: "pointer" }}>{folder.name}</span>
          <button style={{width:'100px'}} onClick={() => handleDeleteFolder(folder.id)}>Delete</button>
        </div>
      ))}
      <Folder
        folderTree={{ name: "Root Folder", children: folders }}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        handleCreateFolder={handleCreateFolder}
      />
    </div>
  );
}
