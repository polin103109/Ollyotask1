
import React, { useState } from 'react';
import './App.css';

function Subfolder({ name, subfolders }) {
  const [subfoldersVisible, setSubfoldersVisible] = useState(false);

  const clickSubfolder = () => {
    setSubfoldersVisible(!subfoldersVisible);
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
              <Subfolder name={subfolder.name} subfolders={subfolder.subfolders} />
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

  return (
    <div className="main-folder-wrapper">
      <h1>Folder Management Hierarchy</h1>
      <div>
        <input type="text" placeholder='Input' value={inputValue} onChange={handleInput} />
        <button onClick={addSubfolder}>Add Subfolder</button>
      </div>
      
      <div className='subfolders'>
        {mainFolderSubfolders.map((subfolder, index) => (
          <div className='subfolder' key={index}>
            <Subfolder name={subfolder.name} subfolders={subfolder.subfolders} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
