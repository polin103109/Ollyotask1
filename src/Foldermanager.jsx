
export const saveFoldersToLocalStorage = (folders) => {
  localStorage.setItem('folders', JSON.stringify(folders));
};

export const getFoldersFromLocalStorage = () => {
  const storedFolders = localStorage.getItem('folders');
  return storedFolders ? JSON.parse(storedFolders) : [];
};

export const clearFoldersFromLocalStorage = () => {
  localStorage.removeItem('folders');
};
