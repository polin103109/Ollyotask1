export const folderTree = {
    //Grandfather
    id:"id1",
    name: "Folder 1",

    children: [
      { 
        id:"id2",
        name: "Folder 1.1",
        children:[
            {
            name:"Folder 1.1.1",
            age:"20"
            }
        ]
      },
      {
        name: "Folder 1.2",
        children: [
          {
            name: "Folder 1.2.1",
            children: [
              {
                name: "Folder 1.2.1.1",
              },
              {
                name: "Folder 1.2.1.2",
              },
            ],
          },
          {
            name: "Folder 1.2.3",
          },
        ],
      },
      {
        name: "Folder 1.3",
      },
    ],
  };
  