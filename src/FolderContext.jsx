import React, { useState } from "react";
import Folder from "./Folder"; // Replace this with your correct folder component import

export default function FolderContext() {
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);

  const handleCreateFolder = () => {
    const newFolder = {
      name: newFolderName,
      children: []
    };

    setFolders([...folders, newFolder]);
    setNewFolderName("");
  };

  return (
    <Folder
      folderTree={{ name: "Root Folder", children: folders }}
      newFolderName={newFolderName}
      setNewFolderName={setNewFolderName}
      handleCreateFolder={handleCreateFolder}
    />
  );
}
