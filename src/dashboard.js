document.addEventListener("DOMContentLoaded", async () => {
  const collectionsContainer = document.getElementById("collections");

  const data = await chrome.storage.local.get();

  if (!data.collections) {
    collectionsContainer.innerHTML = "<p>No data found.</p>";
    return;
  }

  // Render collections
  Object.values(data.collections).forEach((collection) => {
    const collectionDiv = document.createElement("div");
    collectionDiv.className = "bg-white p-4 rounded-lg shadow";
    collectionDiv.id = `${collection.id}`;
    collectionDiv.innerHTML = `<div class="flex justify-between items-center"><h2 class="text-xl font-semibold truncate w-full">${collection.name}</h2><div class="flex w-full justify-end space-x-3 pr-4">
              <button
                class="text-blue-500 hover:text-blue-700  cursor-pointer edit-button"
                tabindex="0"
              >
                Edit
              </button>
              <span> | </span>
              <button
                class="text-red-500 hover:text-red-700  cursor-pointer delete-button"
                tabindex="0"
              >
                Delete
              </button>
            </div><button id="${collection.id}-minimizeBtn" class="text-gray-500 hover:text-gray-700 cursor-pointer" tabindex="0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                height="24"
                width="24"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 24 24"
                xml:space="preserve"
              >
                <g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                    <g data-name="collapse">
                    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                    <path d="M19 9h-2.58l3.29-3.29a1 1 0 1 0-1.42-1.42L15 7.57V5a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2z"/>
                    <path d="M10 13H5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 16.42V19a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"/>
                    </g>
                    </g>
              </svg>
            </button>
          </div>`;

    collectionsContainer.appendChild(collectionDiv);
    const minimizeBtn = document.getElementById(`${collection.id}-minimizeBtn`);

    minimizeBtn.addEventListener("click", () => {
      const contentDiv = document
        .getElementById(`${collection.id}`)
        .querySelector("ul");

      contentDiv.classList.toggle("hidden");

      const icon = minimizeBtn.querySelector("svg");

      if (contentDiv.classList.contains("hidden")) {
        icon.innerHTML = `<g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">

<g data-name="expand">

<rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>

<path d="M20 5a1 1 0 0 0-1-1h-5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L18 7.42V10a1 1 0 0 0 1 1 1 1 0 0 0 1-1z"/>

<path d="M10.71 13.29a1 1 0 0 0-1.42 0L6 16.57V14a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H7.42l3.29-3.29a1 1 0 0 0 0-1.42z"/>

</g>

</g>`;
      } else {
        icon.innerHTML = `<g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">

<g data-name="collapse">

<rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>

<path d="M19 9h-2.58l3.29-3.29a1 1 0 1 0-1.42-1.42L15 7.57V5a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2z"/>

<path d="M10 13H5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 16.42V19a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"/>

</g>

</g>
`;
      }
    });

    const engineList = document.createElement("ul");
    engineList.className = "space-y-2 engineList";

    collection.items.forEach((itemId) => {
      if (data.folders[itemId]) {
        const folder = data.folders[itemId];
        const folderItem = document.createElement("li");
        folderItem.innerHTML = `<div class="flex items-center space-x-2 mb-1">
                <strong class="truncate w-full">${folder.name}</strong>
                <div class="flex w-full justify-end space-x-3 pr-4">
                  <button
                    class="text-blue-500 hover:text-blue-700  cursor-pointer edit-button"
                    tabindex="0"
                  >
                    Edit
                  </button>
                  <span> | </span>
                  <button
                    class="text-red-500 hover:text-red-700  cursor-pointer delete-button"
                    tabindex="0"
                  >
                    Delete
                  </button>
                </div>
              </div>`;
        folderItem.className = "bg-gray-200 p-3 m-3 rounded-lg shadow";
        folderItem.id = `${folder.id}`;

        const folderWebsites = document.createElement("ul");
        folderWebsites.className = "ml-4 mt-2 folderList";

        folder.websites.forEach((websiteId) => {
          const website = data.websites[websiteId];
          if (website) {
            folderWebsites.innerHTML += `
                  <li class="flex items-center space-x-2 mb-1" id=${website.id}>
                    <img src="${website.iconUrl}" alt="${website.name}" class="w-5 h-5">
                    <span class="truncate w-full">${website.name}</span>
                    <div class="flex w-full justify-end space-x-3 pr-4">
                    <button
                      class="text-blue-500 hover:text-blue-700  cursor-pointer edit-button"
                      tabindex="0"
                    >
                      Edit
                    </button>
                    <span> | </span>
                    <button
                      class="text-red-500 hover:text-red-700  cursor-pointer delete-button"
                      tabindex="0"
                    >
                      Delete
                    </button>
                  </div>
                  </li>`;
          }
        });

        const addNewWebsite = document.createElement("button");
        addNewWebsite.setAttribute("tabindex", "0");
        addNewWebsite.className =
          "flex items-center space-x-2 bg-yellow-100 rounded-lg p-1 mt-2 cursor-pointer w-full";
        addNewWebsite.id = `${folder.id}-addNewWebsiteButton`;
        addNewWebsite.innerHTML = `
                         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
        <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
        <path fill="#fff" d="M14,21h20v6H14V21z"></path>
      </svg>
      <span class="text-md font-semibold">Add New Website</span>`;
        folderWebsites.appendChild(addNewWebsite);
        folderItem.appendChild(folderWebsites);
        engineList.appendChild(folderItem);
      } else if (data.websites[itemId]) {
        const website = data.websites[itemId];
        engineList.innerHTML += `
                <li class="flex items-center space-x-2  bg-gray-200 p-3 m-3 rounded-lg shadow" id=${website.id}>
                  <img src="${website.iconUrl}" alt="${website.name}" class="w-5 h-5">
                  <span class="truncate w-full">${website.name}</span>
                  <div class="flex w-full justify-end space-x-3 pr-4">
                    <button
                      class="text-blue-500 hover:text-blue-700  cursor-pointer edit-button"
                      tabindex="0"
                    >
                      Edit
                    </button>
                    <span> | </span>
                    <button
                      class="text-red-500 hover:text-red-700  cursor-pointer delete-button"
                      tabindex="0"
                    >
                      Delete
                    </button>
                  </div>
                </li>`;
      }
    });

    const addItemButton = document.createElement("button");
    addItemButton.setAttribute("tabindex", "0");
    addItemButton.className =
      "flex items-center space-x-2 bg-yellow-100 p-3 m-3 rounded-lg shadow cursor-pointer w-full";
    addItemButton.id = `${collection.id}-addNewItemButton`;
    addItemButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
        <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
        <path fill="#fff" d="M14,21h20v6H14V21z"></path>
      </svg>
      <span class="text-md font-semibold">Add New Website or Folder</span>
    `;
    collectionDiv.appendChild(engineList);
    document
      .getElementById(`${collection.id}`)
      .querySelector("ul")
      .appendChild(addItemButton);
  });

  Object.values(data.collections).forEach((collection) => {
    collection.items.forEach((itemId) => {
      const item = data.folders[itemId];
      if (item) {
        const addNewWebsiteButton = document.getElementById(
          `${item.id}-addNewWebsiteButton`
        );
        if (addNewWebsiteButton) {
          addNewWebsiteButton.addEventListener("click", async () => {
            showAddNewWebsitePopUp(collection, item);
          });
        }
      }
    });
  });

  Object.values(data.collections).forEach((collection) => {
    const addNewItemButton = document.getElementById(
      `${collection.id}-addNewItemButton`
    );
    if (addNewItemButton) {
      addNewItemButton.addEventListener("click", async () => {
        showAddNewItemPopUp(collection);
      });
    }
  });

  const addCollectionButton = document.createElement("button");
  addCollectionButton.setAttribute("tabindex", "0");
  addCollectionButton.className =
    "bg-yellow-100 p-4 rounded-lg shadow flex flex-row items-center gap-2 cursor-pointer w-full";
  addCollectionButton.id = "addCollectionButton";
  addCollectionButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
        <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
        <path fill="#fff" d="M14,21h20v6H14V21z"></path>
      </svg>
      <span class="text-xl font-semibold">Add New Collection</span>
    `;
  collectionsContainer.appendChild(addCollectionButton);

  addCollectionButton.addEventListener("click", async (event) => {
    showAddNewCollection();
  });

  const copyButton = document.getElementById("copyJson");

  await displayJson();

  copyButton.addEventListener("click", () => {
    const jsonTextarea = document.getElementById("jsonTextarea");
    navigator.clipboard
      .writeText(jsonTextarea.textContent)
      .then(() => {
        alert("JSON copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying JSON: ", err);
      });
  });

  addDeleteButtonEventListeners();

  addEditButtonEventListeners();

  addImportButtonEventListener();

});

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

async function displayJson() {
  const jsonTextarea = document.getElementById("jsonTextarea");

  const data = await chrome.storage.local.get([
    "collections",
    "folders",
    "websites",
  ]);

  jsonTextarea.textContent = JSON.stringify(data, null, 2);
}

async function showAddNewWebsitePopUp(collection, item) {
  const popup = document.createElement("div");
  popup.innerHTML = `
<div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
  <div class="bg-white p-6 rounded-2xl shadow-xl w-96">
    <h2 class="text-xl font-bold mb-4">Add New Website to "${item.name}"</h2>

    <label class="block mb-2">Name:</label>
    <input id="name" type="text" class="w-full p-2 border rounded mb-4" placeholder="Enter website name" />

    <label class="block mb-2">Search URL:</label>
    <input id="searchUrl" type="text" class="w-full p-2 border rounded mb-2" placeholder="Enter search URL" />
    <p class="text-sm text-gray-600 mb-4">Enter $searchify$ where you want the search query term to go.</p>

    <label class="block mb-2">Icon URL:</label>
    <input id="iconUrl" type="text" class="w-full p-2 border rounded mb-4" placeholder="Enter icon URL" />

    <div class="flex justify-end gap-4">
      <button id="cancelBtn" class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Cancel</button>
      <button id="createBtn" class="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Create</button>
    </div>
  </div>
</div>
`;

  document.body.appendChild(popup);
  document.getElementById("name").focus();

  // Handle popup interactions
  document
    .getElementById("cancelBtn")
    .addEventListener("click", () => popup.remove());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popup.remove();
    }
    if (event.key === "Enter") {
      document.getElementById("createBtn")?.click();
    }
  });

  document.getElementById("createBtn").addEventListener("click", async () => {
    const iconUrl = document.getElementById("iconUrl").value.trim();
    const name = document.getElementById("name").value.trim();
    const searchUrl = document.getElementById("searchUrl").value.trim();

    if (!iconUrl || !name || !searchUrl) {
      alert("Please fill out all fields.");
      return;
    }

    const newWebsite = {
      iconUrl,
      id: generateId(),
      name,
      searchUrl,
    };


    try {
      const data = await chrome.storage.local.get([
        "collections",
        "websites",
        "folders",
      ]);
      const collections = data.collections || {};
      const websites = data.websites || {};
      const folders = data.folders || {};

      websites[newWebsite.id] = newWebsite;


      const currentCollection = collections[collection.id];

      if (currentCollection) {

        const currentFolder = folders[item.id];

        if (currentFolder) {
          currentFolder.websites.push(newWebsite.id);

          currentCollection.items = currentCollection.items.map((itemId) => {
            if (itemId === currentFolder.id) {
              return currentFolder.id;
            }
            return itemId;
          });

          await chrome.storage.local.set({
            folders: { ...folders, [currentFolder.id]: currentFolder },
            collections,
            websites,
          });
        } else {
          console.log("Folder with the specified ID not found.");
        }
      } else {
        console.log("Collection with the specified ID not found.");
      }
    } catch (error) {
      console.error("Error updating storage:", error);
      alert("Failed to add website.");
    } finally {
      popup.remove();
      window.location.reload();
    }
  });
}

async function showAddNewItemPopUp(collection) {
  const popup = document.createElement("div");
  popup.innerHTML = `
<div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
  <div class="bg-white p-6 rounded-2xl shadow-xl w-96">
    <h2 class="text-xl font-bold mb-4">Add New Item to "${collection.name}"</h2>

    <!-- Toggle between Website and Folder -->
    <div class="flex mb-4 gap-4">
      <button id="websiteBtn" tabindex="0" class="w-full py-2 bg-blue-500 text-white rounded-lg  cursor-pointer hover:bg-blue-600 transition duration-200">Add Website</button>
      <button id="folderBtn" tabindex="0" class="w-full py-2 bg-gray-400 text-white rounded-lg  cursor-pointer hover:bg-gray-500 transition duration-200">Add Folder</button>
    </div>

    <!-- Website Form -->
    <div id="websiteForm" class="h-[300px]">
      <label class="block mb-2">Name:</label>
      <input id="name" type="text" class="w-full p-2 border rounded mb-4" placeholder="Enter website name" />

      <label class="block mb-2">Search URL:</label>
      <input id="searchUrl" type="text" class="w-full p-2 border rounded mb-2" placeholder="Enter search URL" />
      <p class="text-sm text-gray-600 mb-4">Enter $searchify$ where you want the search query term to go.</p>

      <label class="block mb-2">Icon URL:</label>
      <input id="iconUrl" type="text" class="w-full p-2 border rounded mb-4" placeholder="Enter icon URL" />
    </div>

    <!-- Folder Form -->
    <div id="folderForm" class="hidden h-[300px]">
      <label class="block mb-2">Folder Name:</label>
      <input id="folderName" type="text" class="w-full p-2 border rounded mb-4" placeholder="Enter folder name" />
    </div>

    <div class="flex justify-end gap-4">
      <button id="cancelBtn" class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Cancel</button>
      <button id="createBtn" class="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Create</button>
    </div>
  </div>
</div>
`;

  document.body.appendChild(popup);

  document
    .getElementById("cancelBtn")
    .addEventListener("click", () => popup.remove());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popup.remove();
    }
  });

  document.getElementById("websiteBtn").addEventListener("click", () => {
    document.getElementById("websiteForm").classList.remove("hidden");
    document.getElementById("folderForm").classList.add("hidden");
    document
      .getElementById("websiteBtn")
      .classList.add("bg-blue-500", "text-white");
    document
      .getElementById("websiteBtn")
      .classList.remove("bg-gray-400", "text-white");
    document
      .getElementById("folderBtn")
      .classList.remove("bg-blue-500", "text-white");
    document
      .getElementById("folderBtn")
      .classList.add("bg-gray-400", "text-white");
    document.getElementById("createBtn").textContent = "Create Website";
    document.getElementById("name").focus();
  });

  document.getElementById("folderBtn").addEventListener("click", () => {
    document.getElementById("folderForm").classList.remove("hidden");
    document.getElementById("websiteForm").classList.add("hidden");
    document
      .getElementById("folderBtn")
      .classList.add("bg-blue-500", "text-white");
    document
      .getElementById("folderBtn")
      .classList.remove("bg-gray-400", "text-white");
    document
      .getElementById("websiteBtn")
      .classList.remove("bg-blue-500", "text-white");
    document
      .getElementById("websiteBtn")
      .classList.add("bg-gray-400", "text-white");
    document.getElementById("createBtn").textContent = "Create Folder";
    document.getElementById("folderName").focus();
  });


  document.getElementById("websiteBtn").click();


  document.getElementById("createBtn").addEventListener("click", async () => {
    if (document.getElementById("folderForm").classList.contains("hidden")) {
      const iconUrl = document.getElementById("iconUrl").value.trim();
      const name = document.getElementById("name").value.trim();
      const searchUrl = document.getElementById("searchUrl").value.trim();

      if (!iconUrl || !name || !searchUrl) {
        alert("Please fill out all fields.");
        return;
      }

      const newWebsite = {
        iconUrl,
        id: generateId(),
        name,
        searchUrl,
      };

      try {
        const data = await chrome.storage.local.get([
          "collections",
          "websites",
        ]);
        const collections = data.collections || {};
        const websites = data.websites || {};
        websites[newWebsite.id] = newWebsite;

        const targetCollection = collections[collection.id];
        if (!targetCollection) throw new Error("Collection not found");

        targetCollection.items = targetCollection.items || [];
        targetCollection.items.push(newWebsite.id);

        await chrome.storage.local.set({
          collections,
          websites,
        });
      } catch (error) {
        console.error("Error updating storage:", error);
        alert("Failed to add website.");
      } finally {
        popup.remove();
        window.location.reload();
      }
    } else {
      const folderName = document.getElementById("folderName").value.trim();

      if (!folderName) {
        alert("Please enter a folder name.");
        return;
      }

      const newFolder = {
        id: generateId(),
        name: folderName,
        websites: [],
      };

      try {

        const data = await chrome.storage.local.get(["collections", "folders"]);
        const collections = data.collections || {};
        const folders = data.folders || {};

        folders[newFolder.id] = newFolder;

        const targetCollection = collections[collection.id];
        if (!targetCollection) throw new Error("Collection not found");

        targetCollection.items = targetCollection.items || [];
        targetCollection.items.push(newFolder.id);

        await chrome.storage.local.set({
          collections,
          folders,
        });
      } catch (error) {
        console.error("Error updating storage:", error);
        alert("Failed to add folder.");
      } finally {
        popup.remove();
        window.location.reload();
      }
    }
  });
}

async function showAddNewCollection() {
  const popup = document.createElement("div");
  popup.innerHTML = `
  <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-2xl shadow-xl w-96">
      <h2 class="text-xl font-bold mb-4">Add New Collection</h2>
  
      <label class="block mb-2">Collection Name:</label>
      <input id="collectionName" type="text" class="w-full p-2 border rounded mb-4" placeholder="Enter collection name" />
  
      <div class="flex justify-end gap-4">
        <button id="cancelBtn" class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Cancel</button>
        <button id="createBtn" class="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Create</button>
      </div>
    </div>
  </div>
  `;

  document.body.appendChild(popup);

  document.getElementById("collectionName").focus();

  // Handle popup interactions
  document
    .getElementById("cancelBtn")
    .addEventListener("click", () => popup.remove());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popup.remove();
    }
    if (event.key === "Enter") {
      document.getElementById("createBtn")?.click();
    }
  });

  document.getElementById("createBtn").addEventListener("click", async () => {
    const collectionName = document
      .getElementById("collectionName")
      .value.trim();

    if (!collectionName) {
      alert("Please provide a collection name.");
      return;
    }

    const newCollection = {
      id: generateId(),
      name: collectionName,
      items: [], // items will be added later (websites or folders)
    };

    try {
      // Retrieve current storage for collections and folders
      const data = await chrome.storage.local.get(["collections"]);
      const collections = data.collections || [];

      // Add the new collection to the existing list
      collections[newCollection.id] = newCollection;

      // Save updated collections
      await chrome.storage.local.set({
        collections,
      });
    } catch (error) {
      console.error("Error updating storage:", error);
      alert("Failed to add collection.");
    } finally {
      popup.remove();
      window.location.reload();
    }
  });
}

async function addDeleteButtonEventListeners() {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const idToDelete = button.closest("[id]").id;

      if (!idToDelete) {
        console.error("No ID found for deletion.");
        return;
      }

      const popup = document.createElement("div");
      popup.innerHTML = `
        <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-2xl shadow-xl w-96">
            <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p class="mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div class="flex justify-end gap-4">
              <button id="cancelBtn" class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Cancel</button>
              <button id="confirmDeleteBtn" class="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Delete</button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(popup);

      // Focus on cancel button for accessibility
      document.getElementById("cancelBtn").focus();

      // Close popup on cancel
      document
        .getElementById("cancelBtn")
        .addEventListener("click", () => popup.remove());

      // Handle Escape and Enter keys
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") popup.remove();
      });

      // Delete logic
      document
        .getElementById("confirmDeleteBtn")
        .addEventListener("click", async () => {
          try {
            // Retrieve collections, folders, and websites from Chrome storage
            const data = await chrome.storage.local.get([
              "collections",
              "folders",
              "websites",
            ]);
            let collections = data.collections || {};
            let folders = data.folders || {};
            let websites = data.websites || {};

            // Check if it's a collection
            if (collections[idToDelete]) {
              // Get the items (folders and websites) in this collection
              const itemsToDelete = collections[idToDelete].items;

              // Process each item (either folder or website)
              itemsToDelete.forEach((itemId) => {
                // If it's a folder, delete the folder and its contained websites
                if (folders[itemId]) {
                  // Delete all websites in the folder
                  const websitesToDelete = folders[itemId].websites;
                  websitesToDelete.forEach((websiteId) => {
                    delete websites[websiteId];
                  });

                  // Delete the folder itself
                  delete folders[itemId];
                }
                // If it's a website, delete the website
                else if (websites[itemId]) {
                  delete websites[itemId];
                }
              });

              // Remove the collection itself
              delete collections[idToDelete];
            }
            // Check if it's a folder
            else if (folders[idToDelete]) {
              // Remove websites contained in this folder
              const websitesToDelete = folders[idToDelete].websites;
              websitesToDelete.forEach((websiteId) => {
                delete websites[websiteId];
              });

              // Remove the folder
              delete folders[idToDelete];

              // Remove the folder from any collection's items (just in case)
              for (const colId in collections) {
                collections[colId].items = collections[colId].items.filter(
                  (itemId) => itemId !== idToDelete
                );
              }
            }
            // Check if it's a website
            else if (websites[idToDelete]) {
              // Remove the website
              delete websites[idToDelete];

              // Remove the website from any folder's websites list
              for (const folderId in folders) {
                folders[folderId].websites = folders[folderId].websites.filter(
                  (webId) => webId !== idToDelete
                );
              }

              // Remove the website from any collection's items list
              for (const colId in collections) {
                collections[colId].items = collections[colId].items.filter(
                  (itemId) => itemId !== idToDelete
                );
              }
            } else {
              console.error(`Item with ID ${idToDelete} not found.`);
              return;
            }

            // Save updated data back to Chrome storage
            await chrome.storage.local.set({ collections, folders, websites });
          } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item.");
          } finally {
            popup.remove();
            window.location.reload();
          }
        });
    });
  });
}

async function addEditButtonEventListeners() {
  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const idToEdit = button.closest("[id]").id;

      if (!idToEdit) {
        console.error("No ID found for editing.");
        return;
      }

      try {
        const data = await chrome.storage.local.get([
          "collections",
          "folders",
          "websites",
        ]);
        let collections = data.collections || {};
        let folders = data.folders || {};
        let websites = data.websites || {};

        let item = null;
        let parentCollection = null;

        // First, check if the item to edit is a collection
        if (collections[idToEdit]) {
          item = collections[idToEdit];
        }
        // Then, check if it's a folder in the folders list
        else if (folders[idToEdit]) {
          item = folders[idToEdit];
        }
        // Finally, check if it's a website in the websites list
        else if (websites[idToEdit]) {
          item = websites[idToEdit];
        }

        if (!item) {
          console.error("Item not found for editing.");
          return;
        }

        let itemType = "website";
        if (item.websites) itemType = "folder";
        if (item.items) itemType = "collection";

        const popup = document.createElement("div");
        popup.innerHTML = `
          <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-2xl shadow-xl w-96">
              <h2 class="text-xl font-bold mb-4">Edit ${itemType}</h2>
              <label class="block mb-4">
                <span class="text-gray-700">Name:</span>
                <input id="editName" class="border rounded-lg w-full p-2" value="${
                  item.name || ""
                }" />
              </label>

              ${
                itemType === "website"
                  ? `


              <label class="block mb-4">
                <span class="text-gray-700">Search URL:</span>
                <input id="editSearchUrl" class="border rounded-lg w-full p-2" value="${
                  item.searchUrl || ""
                }" />
              </label>
                            <label class="block mb-4">
                <span class="text-gray-700">Icon URL:</span>
                <input id="editIconUrl" class="border rounded-lg w-full p-2" value="${
                  item.iconUrl || ""
                }" />
              </label>`
                  : ""
              }

              <div class="flex justify-end gap-4">
                <button id="cancelEditBtn" class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Cancel</button>
                <button id="saveEditBtn" class="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Save</button>
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(popup);
        document.getElementById("editName").focus();
        // Handle Escape and Enter keys
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") popup.remove();
        });

        // Cancel editing
        document
          .getElementById("cancelEditBtn")
          .addEventListener("click", () => popup.remove());

        // Save changes
        document
          .getElementById("saveEditBtn")
          .addEventListener("click", async () => {
            try {
              const updatedName = document.getElementById("editName").value;
              if (itemType === "website") {
                item.iconUrl = document.getElementById("editIconUrl").value;
                item.searchUrl = document.getElementById("editSearchUrl").value;
              }
              item.name = updatedName;

              // Update the correct data (collections, folders, websites) in storage
              await chrome.storage.local.set({
                collections,
                folders,
                websites,
              });
            } catch (error) {
              console.error("Error saving item:", error);
              alert("Failed to save changes.");
            } finally {
              popup.remove();
              window.location.reload();
            }
          });
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    });
  });
}

async function addImportButtonEventListener() {
  const exampleJSON = `{
  "collections": {
    "3f4g5h6": {
      "id": "3f4g5h6",
      "items": [
        "7j8k9l0",
        "i4j5k6l",
        "ks6vx34",
        "1t1lbjw",
        "dkwre97",
        "vsp3o5g"
      ],
      "name": "Finance & Investing"
    },
    "c9d8e7f6": {
      "id": "c9d8e7f6",
      "items": [
        "dk2myd0",
        "3kplznn",
        "ongxk5a",
        "ochxqj2",
        "4fntk9q"
      ],
      "name": "Cooking"
    },
    "d5e6f7g": {
      "id": "d5e6f7g",
      "items": [
        "h8i9j0k",
        "rn759li",
        "aitaen2",
        "ou9kbqu",
        "4ucu9ba",
        "kjn7s5c"
      ],
      "name": "Shopping"
    },
    "e5f6g7h8": {
      "id": "e5f6g7h8",
      "items": [
        "i9j1k2l3",
        "xitcjgg",
        "dpdjprx"
      ],
      "name": "Job Hunting"
    },
    "j2k3l4m": {
      "id": "j2k3l4m",
      "items": [
        "n5o6p7q",
        "r8s9t0u",
        "r7s8t9u",
        "v0w1x2y",
        "z3a4b5c",
        "d6e7f8g"
      ],
      "name": "Science"
    }
  },
  "folders": {
    "7j8k9l0": {
      "id": "7j8k9l0",
      "name": "All",
      "websites": [
        "k7l8m9n",
        "iehr83b",
        "4fpfxgy",
        "gs949zr",
        "q0jhpdz"
      ]
    },
    "h8i9j0k": {
      "id": "h8i9j0k",
      "name": "General Retailers",
      "websites": [
        "t7u8v9w",
        "x0y1z2a",
        "b3c4d5e",
        "f6g7h8i"
      ]
    },
    "i9j1k2l3": {
      "id": "i9j1k2l3",
      "name": "General Job Boards",
      "websites": [
        "u3v4w5x6",
        "y7z8a9b1",
        "c2d3e4f5",
        "g6h7i8j9"
      ]
    },
    "n5o6p7q": {
      "id": "n5o6p7q",
      "name": "Biology Databases",
      "websites": [
        "p6q7r8s",
        "t9u0v1w",
        "x2y3z4a",
        "b5c6d7e"
      ]
    },
    "r8s9t0u": {
      "id": "r8s9t0u",
      "name": "Publication Search",
      "websites": [
        "f8g9h0i",
        "j1k2l3m",
        "n4o5p6q"
      ]
    },
    "rn759li": {
      "id": "rn759li",
      "name": "Tech",
      "websites": [
        "1mycdo0",
        "4xyf3b9"
      ]
    }
  },
  "websites": {
    "1mycdo0": {
      "iconUrl": "https://www.bestbuy.com/favicon.ico",
      "id": "1mycdo0",
      "name": "BestBuy",
      "searchUrl": "https://www.bestbuy.com/site/searchpage.jsp?st=$searchify$"
    },
    "1t1lbjw": {
      "iconUrl": "https://mw4.wsj.net/mw5/content/logos/favicon.ico",
      "id": "1t1lbjw",
      "name": "MarketWatch",
      "searchUrl": "https://www.marketwatch.com/investing/stock/$searchify$"
    },
    "3kplznn": {
      "iconUrl": "https://www.allrecipes.com/favicon.ico",
      "id": "3kplznn",
      "name": "Allrecipes",
      "searchUrl": "https://www.allrecipes.com/search?q=$searchify$"
    },
    "4fntk9q": {
      "iconUrl": "https://www.bonappetit.com/favicon.ico",
      "id": "4fntk9q",
      "name": "Bon Appétit",
      "searchUrl": "https://www.bonappetit.com/search?q=$searchify$"
    },
    "4fpfxgy": {
      "iconUrl": "https://mw4.wsj.net/mw5/content/logos/favicon.ico",
      "id": "4fpfxgy",
      "name": "MarketWatch",
      "searchUrl": "https://www.marketwatch.com/investing/stock/$searchify$"
    },
    "4ucu9ba": {
      "iconUrl": "https://www.target.com/favicon.ico",
      "id": "4ucu9ba",
      "name": "Target",
      "searchUrl": "https://www.target.com/s?searchTerm=$searchify$"
    },
    "4xyf3b9": {
      "iconUrl": "https://www.microcenter.com/favicon.ico",
      "id": "4xyf3b9",
      "name": "MicroCenter",
      "searchUrl": "https://www.microcenter.com/search/search_results.aspx?Ntt=$searchify$"
    },
    "aitaen2": {
      "iconUrl": "https://www.amazon.com/favicon.ico",
      "id": "aitaen2",
      "name": "Amazon",
      "searchUrl": "https://www.amazon.com/s?k=$searchify$"
    },
    "b3c4d5e": {
      "iconUrl": "https://www.target.com/favicon.ico",
      "id": "b3c4d5e",
      "name": "Target",
      "searchUrl": "https://www.target.com/s?searchTerm=$searchify$"
    },
    "b5c6d7e": {
      "iconUrl": "https://www.phosphosite.org/favicon.ico",
      "id": "b5c6d7e",
      "name": "PhosphoSitePlus",
      "searchUrl": "https://www.phosphosite.org/simpleSearchSubmitAction.action?searchStr=$searchify$"
    },
    "c2d3e4f5": {
      "iconUrl": "https://www.glassdoor.com/favicon.ico",
      "id": "c2d3e4f5",
      "name": "Glassdoor",
      "searchUrl": "https://www.glassdoor.com/Job/jobs.htm?sc.keyword=$searchify$"
    },
    "d6e7f8g": {
      "iconUrl": "https://science.sciencemag.org/favicon.ico",
      "id": "d6e7f8g",
      "name": "Science",
      "searchUrl": "https://www.science.org/action/doSearch?AllField=$searchify$"
    },
    "dk2myd0": {
      "iconUrl": "https://www.reddit.com/favicon.ico",
      "id": "dk2myd0",
      "name": "r/Recipes",
      "searchUrl": "https://www.reddit.com/r/recipes/search/?q=$searchify$&restrict_sr=1"
    },
    "dkwre97": {
      "iconUrl": "https://www.nasdaq.com/sites/acquia.prod/files/favicon.ico",
      "id": "dkwre97",
      "name": "Nasdaq",
      "searchUrl": "https://www.nasdaq.com/market-activity/stocks/$searchify$"
    },
    "dpdjprx": {
      "iconUrl": "https://www.vault.com/favicon.ico",
      "id": "dpdjprx",
      "name": "Vault",
      "searchUrl": "https://vault.com/search/searchResults/$searchify$"
    },
    "f6g7h8i": {
      "iconUrl": "https://www.ebay.com/favicon.ico",
      "id": "f6g7h8i",
      "name": "eBay",
      "searchUrl": "https://www.ebay.com/sch/i.html?_nkw=$searchify$"
    },
    "f8g9h0i": {
      "iconUrl": "https://scholar.google.com/favicon.ico",
      "id": "f8g9h0i",
      "name": "Google Scholar",
      "searchUrl": "https://scholar.google.com/scholar?q=$searchify$"
    },
    "g6h7i8j9": {
      "iconUrl": "https://www.monster.com/favicon.ico",
      "id": "g6h7i8j9",
      "name": "Monster",
      "searchUrl": "https://www.monster.com/jobs/search/?q=$searchify$"
    },
    "gs949zr": {
      "iconUrl": "https://www.nasdaq.com/sites/acquia.prod/files/favicon.ico",
      "id": "gs949zr",
      "name": "Nasdaq",
      "searchUrl": "https://www.nasdaq.com/market-activity/stocks/$searchify$"
    },
    "i4j5k6l": {
      "iconUrl": "https://finance.yahoo.com/favicon.ico",
      "id": "i4j5k6l",
      "name": "Yahoo Finance",
      "searchUrl": "https://finance.yahoo.com/quote/$searchify$/"
    },
    "iehr83b": {
      "iconUrl": "https://seekingalpha.com/samw/favicon.ico",
      "id": "iehr83b",
      "name": "SeekingAlpha",
      "searchUrl": "https://seekingalpha.com/symbol/$searchify$"
    },
    "j1k2l3m": {
      "iconUrl": "https://sdfestaticassets-us-east-1.sciencedirectassets.com/shared-assets/103/images/favSD.ico",
      "id": "j1k2l3m",
      "name": "ScienceDirect",
      "searchUrl": "https://www.sciencedirect.com/search?qs=$searchify$"
    },
    "k7l8m9n": {
      "iconUrl": "https://finance.yahoo.com/favicon.ico",
      "id": "k7l8m9n",
      "name": "Yahoo Finance",
      "searchUrl": "https://finance.yahoo.com/quote/$searchify$/"
    },
    "kjn7s5c": {
      "iconUrl": "https://www.ebay.com/favicon.ico",
      "id": "kjn7s5c",
      "name": "eBay",
      "searchUrl": "https://www.ebay.com/sch/i.html?_nkw=$searchify$"
    },
    "ks6vx34": {
      "iconUrl": "https://seekingalpha.com/samw/favicon.ico",
      "id": "ks6vx34",
      "name": "SeekingAlpha",
      "searchUrl": "https://seekingalpha.com/symbol/$searchify$"
    },
    "n4o5p6q": {
      "iconUrl": "https://www.researchgate.net/favicon.ico",
      "id": "n4o5p6q",
      "name": "ResearchGate",
      "searchUrl": "https://www.researchgate.net/search?q=$searchify$"
    },
    "ochxqj2": {
      "iconUrl": "https://www.foodnetwork.com/favicon.ico",
      "id": "ochxqj2",
      "name": "Food Network",
      "searchUrl": "https://www.foodnetwork.com/search/$searchify$-"
    },
    "ongxk5a": {
      "iconUrl": "https://www.epicurious.com/favicon.ico",
      "id": "ongxk5a",
      "name": "Epicurious",
      "searchUrl": "https://www.epicurious.com/search?q=$searchify$"
    },
    "ou9kbqu": {
      "iconUrl": "https://www.walmart.com/favicon.ico",
      "id": "ou9kbqu",
      "name": "Walmart",
      "searchUrl": "https://www.walmart.com/search/?query=$searchify$"
    },
    "p6q7r8s": {
      "iconUrl": "https://www.ncbi.nlm.nih.gov/favicon.ico",
      "id": "p6q7r8s",
      "name": "PubMed",
      "searchUrl": "https://pubmed.ncbi.nlm.nih.gov/?term=$searchify$"
    },
    "q0jhpdz": {
      "iconUrl": "https://staticx.zacks.com/images/zacks/logos/favicon_1x_16x16.ico",
      "id": "q0jhpdz",
      "name": "Zacks",
      "searchUrl": "https://www.zacks.com/stock/quote/$searchify$"
    },
    "r7s8t9u": {
      "iconUrl": "https://www.ncbi.nlm.nih.gov/favicon.ico",
      "id": "r7s8t9u",
      "name": "NCBI",
      "searchUrl": "https://www.ncbi.nlm.nih.gov/search/all/?term=$searchify$"
    },
    "t7u8v9w": {
      "iconUrl": "https://www.amazon.com/favicon.ico",
      "id": "t7u8v9w",
      "name": "Amazon",
      "searchUrl": "https://www.amazon.com/s?k=$searchify$"
    },
    "t9u0v1w": {
      "iconUrl": "https://www.uniprot.org/favicon.ico",
      "id": "t9u0v1w",
      "name": "UniProt",
      "searchUrl": "https://www.uniprot.org/uniprot/?query=$searchify$"
    },
    "u3v4w5x6": {
      "iconUrl": "https://www.indeed.com/favicon.ico",
      "id": "u3v4w5x6",
      "name": "Indeed",
      "searchUrl": "https://www.indeed.com/jobs?q=$searchify$"
    },
    "v0w1x2y": {
      "iconUrl": "https://www.ebi.ac.uk/favicon.ico",
      "id": "v0w1x2y",
      "name": "EBI",
      "searchUrl": "https://www.ebi.ac.uk/ebisearch/search.ebi?db=allebi&query=$searchify$"
    },
    "vsp3o5g": {
      "iconUrl": "https://staticx.zacks.com/images/zacks/logos/favicon_1x_16x16.ico",
      "id": "vsp3o5g",
      "name": "Zacks",
      "searchUrl": "https://www.zacks.com/stock/quote/$searchify$"
    },
    "x0y1z2a": {
      "iconUrl": "https://www.walmart.com/favicon.ico",
      "id": "x0y1z2a",
      "name": "Walmart",
      "searchUrl": "https://www.walmart.com/search/?query=$searchify$"
    },
    "x2y3z4a": {
      "iconUrl": "https://www.genecards.org/favicon.ico",
      "id": "x2y3z4a",
      "name": "GeneCards",
      "searchUrl": "https://www.genecards.org/cgi-bin/carddisp.pl?gene=$searchify$"
    },
    "xitcjgg": {
      "iconUrl": "https://www.glassdoor.com/favicon.ico",
      "id": "xitcjgg",
      "name": "Glassdoor",
      "searchUrl": "https://www.glassdoor.com/Search/results.htm?keyword=$searchify$"
    },
    "y7z8a9b1": {
      "iconUrl": "https://www.linkedin.com/favicon.ico",
      "id": "y7z8a9b1",
      "name": "LinkedIn Jobs",
      "searchUrl": "https://www.linkedin.com/jobs/search/?keywords=$searchify$"
    },
    "z3a4b5c": {
      "iconUrl": "https://www.nature.com/static/images/favicons/nature/favicon.ico",
      "id": "z3a4b5c",
      "name": "Nature",
      "searchUrl": "https://www.nature.com/search?q=$searchify$"
    }
  }
}`;

  document.getElementById('exampleJSONBtn').addEventListener('click', () => {
    document.getElementById('importJsonTextarea').value = exampleJSON;
  });


  document
    .getElementById("importJsonBtn")
    .addEventListener("click", async () => {
      const jsonData = document.getElementById("importJsonTextarea").value;

      try {
        // Show confirmation popup before proceeding
        const confirmPopup = document.createElement("div");
        confirmPopup.innerHTML = `
        <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-2xl shadow-xl w-96">
            <h2 class="text-xl font-bold mb-4">Confirm Import</h2>
            <p class="mb-4">Are you sure you want to import this JSON data? This action will overwrite your current data and cannot be undone. Please ensure the data is correct.</p>
            <div class="flex justify-end gap-4">
              <button id="cancelImportBtn" class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Cancel</button>
              <button id="confirmImportBtn" class="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer" tabindex="0">Import</button>
            </div>
          </div>
        </div>
      `;

        document.body.appendChild(confirmPopup);

        // Focus on cancel button for accessibility
        document.getElementById("cancelImportBtn").focus();

        // Close popup on cancel
        document
          .getElementById("cancelImportBtn")
          .addEventListener("click", () => {
            confirmPopup.remove();
          });

        // Handle Escape and Enter keys
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") confirmPopup.remove();
          if (event.key === "Enter")
            document.getElementById("confirmImportBtn")?.click();
        });

        // Proceed with import on confirmation
        document
          .getElementById("confirmImportBtn")
          .addEventListener("click", async () => {
            try {
              // Parse the JSON data
              const newData = JSON.parse(jsonData);

              // Call the function to upload this data to storage
              await validateAndUploadData(newData);

              // Optionally, you can reset the textarea after successful import
              document.getElementById("importJsonTextarea").value = "";

              // Remove the confirmation popup
              window.location.reload();
            } catch (error) {
              alert(`Invalid JSON data or error uploading: ${error}`);
              console.info("Invalid JSON data or error uploading: ", error);
            } finally {
              confirmPopup.remove();
            }
          });
      } catch (error) {
        console.error("Error triggering import:", error);
      }
    });
}

async function validateAndUploadData(payload) {
  try {
    validateData(payload);
    // If validation passes, upload the object to Chrome Storage
    await chrome.storage.local.set({
      collections: payload.collections,
      folders: payload.folders,
      websites: payload.websites,
    });

  } catch (error) {
    throw error; // Re-throw the error for handling at a higher level if needed
  }
}

export function validateData(payload) {
  // Check if the general structure is valid
  if (!payload.collections || !payload.folders || !payload.websites) {
    throw new Error(
      "Invalid data structure: Missing collections, folders, or websites"
    );
  }

  // Create sets to track referenced IDs
  const websiteIdsInPayload = new Set(Object.keys(payload.websites));
  const folderIdsInPayload = new Set(Object.keys(payload.folders));
  const referencedWebsiteIds = new Set();
  const referencedFolderIds = new Set();

  // Check collections for valid structure and references
  for (const collectionId in payload.collections) {
    const collection = payload.collections[collectionId];

    // Check for required collection fields
    if (!collection.id || !collection.name || !collection.items) {
      throw new Error(
        `Invalid collection ${
          collection.name || collectionId
        }: missing required fields (id, name, or items)`
      );
    }

    if (!Array.isArray(collection.items)) {
      throw new Error(
        `Invalid collection ${collection.name}: items is not an array`
      );
    }

    for (const itemId of collection.items) {
      // Ensure itemId exists in either folders or websites
      if (!folderIdsInPayload.has(itemId) && !websiteIdsInPayload.has(itemId)) {
        throw new Error(
          `Invalid reference: Collection "${collection.name}" references non-existent item "${itemId}"`
        );
      }

      // Track referenced item
      if (folderIdsInPayload.has(itemId)) {
        referencedFolderIds.add(itemId);
      } else if (websiteIdsInPayload.has(itemId)) {
        referencedWebsiteIds.add(itemId);
      }
    }
  }

  // Check folders for valid structure and website references
  for (const folderId in payload.folders) {
    const folder = payload.folders[folderId];

    // Check for required folder fields
    if (!folder.id || !folder.name || !folder.websites) {
      throw new Error(
        `Invalid folder ${
          folder.name || folderId
        }: missing required fields (id, name, or websites)`
      );
    }

    if (!Array.isArray(folder.websites)) {
      throw new Error(
        `Invalid folder ${folder.name}: websites is not an array`
      );
    }

    for (const websiteId of folder.websites) {
      if (!websiteIdsInPayload.has(websiteId)) {
        throw new Error(
          `Invalid reference: Folder "${folder.name}" references non-existent website "${websiteId}"`
        );
      }
      referencedWebsiteIds.add(websiteId);
    }
  }

  // Check websites for valid structure
  for (const websiteId in payload.websites) {
    const website = payload.websites[websiteId];

    // Check for required website fields
    if (
      !website.id ||
      !website.name ||
      !website.iconUrl ||
      !website.searchUrl
    ) {
      throw new Error(
        `Invalid website ${
          website.name || websiteId
        }: missing required fields (id, name, iconUrl, or searchUrl)`
      );
    }
  }

  // Check for orphaned websites (not referenced in folders or collections)
  for (const websiteId of websiteIdsInPayload) {
    if (!referencedWebsiteIds.has(websiteId)) {
      throw new Error(
        `Orphaned website: "${payload.websites[websiteId].name}" (${websiteId}) is not referenced in any folder or collection`
      );
    }
  }
}
