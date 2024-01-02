
import './App.css'
import React, { useState } from 'react';



function App() {
  const [subfoldersVisible, setSubfoldersVisible] = useState(false);
  const clickFolder = () => {
    setSubfoldersVisible(!subfoldersVisible);
  };
  return (
  
      <div>
        <div className='folderDiv' onClick={clickFolder}>Folder</div>
        
        {subfoldersVisible && (
        <div className='subfolders'>
          <div className='subfolder'>Subfolder 1</div>
          <div className='subfolder'>Subfolder 2</div>
        
        </div>
      )}
      </div>
    
  );
}

export default App;

   
