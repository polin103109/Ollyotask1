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
            <div className='subfolder'>
            <Subfolder key={index} name={subfolder.name} subfolders={subfolder.subfolders} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [foldersVisible, setFoldersVisible] = useState(false);

  const clickFolder = () => {
    setFoldersVisible(!foldersVisible);
  };

  return (
    <div>
      <div className='folderDiv' onClick={clickFolder}>
        Folder
      </div>

      {foldersVisible && (
        <div className='subfolders'>
          <Subfolder
            name='Fruits'
            subfolders={[
              { name: 'Apple', subfolders: [{name:'applle',subfolders:[]}] },
              { name: 'Orange', subfolders: [{ name: 'Orangii', subfolders: [] }] },
            ]}
          />
          <Subfolder name='Animals' subfolders={[
            { name: 'Lion', subfolders: [] },
            { name: 'Tiger', subfolders: [{ name: 'Baby Tiger', subfolders: [] }] },
          ]} />
        </div>
      )}
    </div>
  );
}

export default App;
