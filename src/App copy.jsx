import React, { useState } from 'react';
import './App.css';

function Subfolder({ name, subfolders, onClick, updatePath,currentPath}) {
  const [subfoldersVisible, setSubfoldersVisible] = useState(false);

  const clickSubfolder = () => {
    setSubfoldersVisible(!subfoldersVisible);
    updatePath(name);
  };

  return (
    <div>
      <div className='subfolder' onClick={clickSubfolder}>
        {name}
      </div>

      {subfoldersVisible && (
        <div className='subfolders'>
          {subfolders.map((subfolder, index) => (
            <div className='subfolder' key={index}>
              <Subfolder
                name={subfolder.name}
                subfolders={subfolder.subfolders}
                onClick={onClick}
                updatePath={updatePath}
                currentPath={`${currentPath} / ${name}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [mainFolderSubfolders, setMainFolderSubfolders] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [folderPath, setFolderPath] = useState('');

  console.log(mainFolderSubfolders);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const addSubfolder = () => {
    if (inputValue.trim() !== '') {
      setMainFolderSubfolders([
        ...mainFolderSubfolders,
        { name: inputValue, subfolders: [] },
      ]);
      setInputValue('');
    }
  };

  const handleSubfolderClick = (clickedFolderName) => {
    alert("helooooo");
  };
  const updatePath = (folderName) => {
    setFolderPath((prevPath) => {
      if (prevPath === '') {
        return folderName;
      } else {
        return `${prevPath} / ${folderName}`;
      }
    });
  };

  

  return (
    <div className="main-folder-wrapper">
      <h1>Folder Management Hierarchy</h1>
      <div className='foldernamediv'><span>Filepath:{folderPath}</span></div>
      <div>
        <input type="text" placeholder='Input' value={inputValue} onChange={handleInput} />
        <button onClick={addSubfolder}>Select Folder</button>
      </div>
      
      <div className='subfolders'>
        {mainFolderSubfolders.map((subfolder, index) => (
          <div className='subfolder' key={index}>
            <Subfolder
              name={subfolder.name}
              subfolders={subfolder.subfolders}
              onClick={() => handleSubfolderClick(subfolder.name)}
              updatePath={updatePath}
              currentPath={subfolder.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
