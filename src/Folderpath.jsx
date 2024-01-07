import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFolderOpen } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const [folderStack, setFolderStack] = useState(['Home']);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folders, setFolders] = useState([]);

  const handleFolderClick = (folder) => {
    if (selectedFolder && selectedFolder.id === folder.id) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(folder);
    }

    let newStack;
    if (folderStack.includes(folder.name)) {
      const index = folderStack.indexOf(folder.name);
      newStack = folderStack.slice(0, index + 1);
    } else {
      newStack = [...folderStack, folder.name];
    }
    setFolderStack(newStack);
  };

  const handleBackClick = () => {
    if (folderStack.length > 1) {
      const newStack = [...folderStack];
      newStack.pop();
      setFolderStack(newStack);
    }
  };

  const handleDeleteFolder = (folderToDelete) => {
    const updatedFolders = deleteFolder(folderToDelete, folders);
    setFolders(updatedFolders);
    const folderNames = folderStack.filter(folder => folder !== folderToDelete.name);
    setFolderStack(folderNames);
  };

  const deleteFolder = (folderToDelete, foldersList) => {
    const updatedFolders = foldersList.map(folder => {
      if (folder.id === folderToDelete.id) {
        return null; 
      } else {
        const updatedChildren = deleteFolder(folderToDelete, folder.children || []);
        return { ...folder, children: updatedChildren };
      }
    }).filter(Boolean); 
    return updatedFolders;
  };

  const handleAddFolder = () => {
    if (newFolderName.trim() !== '') {
      const newFolder = {
        id: Date.now(),
        name: newFolderName,
        children: []
      };
      const updatedFolders = addFolderToSelected(selectedFolder, newFolder, folders);
      setFolders(updatedFolders);
      setNewFolderName("");
    }
  };

  const addFolderToSelected = (selected, newFolder, foldersList) => {
    if (!selected) {
      return [...foldersList, newFolder];
    }

    return foldersList.map((folder) => {
      if (folder.id === selected.id) {
        return {
          ...folder,
          children: [...folder.children, newFolder]
        };
      } else if (folder.children && folder.children.length > 0) {
        return {
          ...folder,
          children: addFolderToSelected(selected, newFolder, folder.children)
        };
      }
      return folder;
    });
  };

  const folderPath = folderStack.join('/');
  const renderSubFolders = (folder) => {
    const renderRecursiveSubFolders = (subFolder) => {
      if (subFolder.children.length > 0) {
        return (
          <div style={{ marginLeft: '20px' }}>
            {subFolder.children.map((childFolder) => (
              <div key={childFolder.id}>
                <FontAwesomeIcon
                  icon={selectedFolder && selectedFolder.id === childFolder.id ? faFolderOpen : faFolder}
                  onClick={() => handleFolderClick(childFolder)}
                />
                <span onClick={() => handleFolderClick(childFolder)} style={{ marginLeft: '10px',cursor: 'pointer' }}>
                  {childFolder.name}
                </span>
                <button style={{ width: '100px' }} onClick={() => handleDeleteFolder(childFolder)}>Delete</button>
                {renderRecursiveSubFolders(childFolder)}
              </div>
            ))}
          </div>
        );
      }
      return null;
    };

    if (folder.children && folder.children.length > 0) {
      return renderRecursiveSubFolders(folder);
    }
    return null;
  };

  return (
    <div>
     <button onClick={handleBackClick}>Back</button> 
     <b><span>Folder Path: {folderPath}</span></b>
      <div>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={handleAddFolder}>Add</button>
      </div>
      
      <hr />
      {folders.map(folder => (
        <div key={folder.id}>
          <FontAwesomeIcon
            icon={selectedFolder && selectedFolder.id === folder.id ? faFolderOpen : faFolder}
            onClick={() => handleFolderClick(folder)}
            style={{ cursor: "pointer" }}
          />
          <span onClick={() => handleFolderClick(folder)} style={{ marginLeft: '10px',cursor: "pointer" }}>{folder.name}</span>
          <button style={{ width: '100px' }} onClick={() => handleDeleteFolder(folder)}>Delete</button>
          {renderSubFolders(folder)}
        </div>
      ))}
    </div>
  );
};
export default Home;
