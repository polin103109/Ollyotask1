import React, { useState } from "react";
import "./folder.css";
export default function Folder( {folderTree }) {
  const [isVisible, setIsVisible] = useState(false);
  const expand = () => {
    setIsVisible(!isVisible);
  };
 
  return (
    <div className="mainfolder" >
     
    <span onClick={expand}>{folderTree.name}</span>
    {isVisible ? (
      folderTree.children.map((child,index) => {
        return (
          <div className="childfolder">
           <Folder folderTree={child} 
           id={index}/>
          </div>
        );
      })
    ) : (
      <>
      </>
    )}
  </div>
  );
}