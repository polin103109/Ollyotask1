import React, { useState } from 'react';
import { saveFoldersToLocalStorage, getFoldersFromLocalStorage } from './Foldermanager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faFolder, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import './Folderpath.css';

const Home = () => {
  const [showColorEdit, setShowColorEdit] = useState(false);
  const [folderStack, setFolderStack] = useState(['Home']);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [folders, setFolders] = useState(getFoldersFromLocalStorage() || []);
  const [sortOrder, setSortOrder] = useState('ascending');
    const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    sortFolders(e.target.value);
  };
  const sortFolders = (order) => {
    const sortedFolders = [...folders];
    sortedFolders.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (order === 'ascending') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setFolders(sortedFolders);
    saveFoldersToLocalStorage(sortedFolders);
  };


const handleColor = () => {
    setShowColorEdit(!showColorEdit);
  };

  const colorEditOptions = (folder) => {
    const handleColorChange = (e) => {
      const updatedFolders = folders.map((f) => {
        if (f.id === folder.id) {
          console.log(e.target.value)
         return { ...f, color: e.target.value };
        } else {
          return f;
        }
      });
      setFolders(updatedFolders);
      saveFoldersToLocalStorage(updatedFolders);
    };

    const handleDeleteFolder = (folderToDelete) => {
      const updatedFolders = deleteFolder(folderToDelete, folders);
      setFolders(updatedFolders);
      saveFoldersToLocalStorage(updatedFolders);
      const folderNames = folderStack.filter((folder) => folder !== folderToDelete.name);
      setFolderStack(folderNames);
    };

    const deleteFolder = (folderToDelete, foldersList) => {
      const updatedFolders = foldersList.map((f) => {
        if (f.id === folderToDelete.id) {
          return null;
        } else {
          const updatedChildren = deleteFolder(folderToDelete, f.children || []);
          return { ...f, children: updatedChildren };
        }
      }).filter(Boolean);
      return updatedFolders;
    };

    if (showColorEdit) {
      return (
        <div className='coloranddelete'>
        <div className="colorEditOptions">
          <button>Edit Color</button>
          <select value={folder.color} onChange={handleColorChange}>
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
          </select>
          </div>
        <button onClick={() => handleDeleteFolder(folder)}>Delete</button>
        </div>
      );
    }
    return null;
  };

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

  const handleAddFolder = () => {
    if (newFolderName.trim() !== '') {
      const newFolder = {
        id: Date.now(),
        name: newFolderName,
        color: selectedColor, 
        children: []
      };
      const updatedFolders = addFolderToSelected(selectedFolder, newFolder, folders);
      setFolders(updatedFolders);
      saveFoldersToLocalStorage(updatedFolders);
      setNewFolderName('');
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
          <div className="childfolderdiv">
            {subFolder.children.map((childFolder) => (
              <div key={childFolder.id}>
                <FontAwesomeIcon
                  icon={selectedFolder && selectedFolder.id === childFolder.id ? faFolderOpen : faFolder}
                  onClick={() => handleFolderClick(childFolder)}
                  style={{ cursor: 'pointer', color:childFolder.color}}
                />
                <span id="spantag" onClick={() => handleFolderClick(childFolder)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                  {childFolder.name}
                  </span>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                    onClick={handleColor}
                  />
                
                {colorEditOptions(childFolder)}
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
    <div className='maindiv'>
      <button onClick={handleBackClick}>Back</button>
      <span id="folderspan" >Folder Path: {folderPath}</span>
      <div className='inputadd'>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={handleAddFolder}>Add</button>
      </div>
      <div className='sortingdiv'>  
        <select value={sortOrder} className="customSelect" onChange={handleSortOrderChange}>
          <option value="ascending">Sort By Ascending</option>
          <option value="descending">Sort By Descending</option>
        </select>
      </div>
      <div className="colorpickerdiv"></div>

      <hr />
      {folders.map((folder) => (
        <div className="mainfolder" key={folder.id}>
          <FontAwesomeIcon
            icon={selectedFolder && selectedFolder.id === folder.id ? faFolderOpen : faFolder}
            onClick={() => handleFolderClick(folder)}
            style={{ cursor: 'pointer', color:folder.color }}
          />
          <span id="spantag"onClick={() => handleFolderClick(folder)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
            {folder.name}
            </span>
            <FontAwesomeIcon
              icon={faEllipsisV}
              style={{ marginLeft: '5px', cursor: 'pointer' }}
              onClick={handleColor}
            />
         
          {renderSubFolders(folder)}
          {colorEditOptions(folder, folder.color)}
        </div>
      ))}
      
    </div>
  );
};

export default Home;
