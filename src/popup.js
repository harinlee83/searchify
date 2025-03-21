document.addEventListener("DOMContentLoaded", async function () {

  const searchInput = document.getElementById("searchInput");
  const collectionsContainer = document.getElementById("collectionsContainer");
  const gridContainer = document.getElementById("gridContainer");

  const inputTypeSelect = document.getElementById('inputType');
  const inputWrapper = document.getElementById('inputWrapper');


  inputTypeSelect.addEventListener('change', function() {
    if (this.value === 'multiple') {
      const textarea = document.createElement('textarea');
      textarea.id = 'searchInputTextArea';
      textarea.classList.add('w-full', 'px-3', 'py-1', 'rounded-l', 'bg-white', 'text-md', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500','leading-tight','h-full','resize-none');
      textarea.placeholder = 'Enter each search term on a new line';
      textarea.autofocus = true;
      inputWrapper.innerHTML = '';
      inputWrapper.appendChild(textarea);
    } else {

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'searchInput';
      input.classList.add('w-full', 'px-3', 'py-1', 'rounded-l', 'bg-white', 'text-xl', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
      input.placeholder = 'Enter search term...';
      input.autofocus = true;
      inputWrapper.innerHTML = '';
      inputWrapper.appendChild(input);
    }
  });

  async function initializeData() {
    const data = await chrome.storage.local.get(["collections"]);

    if (!data.collections) {
      const defaultData = {
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
      };
      await chrome.storage.local.set(defaultData);
    }
  }

  async function loadCollections() {
    const { collections } = await chrome.storage.local.get("collections");

    collectionsContainer.innerHTML = "";

    if (!collections || Object.keys(collections).length === 0) {
        collectionsContainer.innerHTML = `
          <div class="bg-gray-200 w-full text-center text-lg font-bold p-3">
            Create a collection in settings!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512 190.285"
            >
              <g transform="scale(0.39) translate(800,100) rotate(130)">
                <path
                  d="M512 62.269c-32.208 3.503-65.126 11.155-82.935 11.576-5.87.14-13.175-.651-5.825-3.929 17.743-7.915 39.85-13.415 61.461-14.291-4.787-1.077-9.548-2.473-15.993-4.683-42.916-14.717-91.165-23.694-138.308-23.756-39.015-.053-79.822 5.737-115.535 22.126 13.263 12.299 25.007 25.723 35.154 40.787 21.629 32.107 31.567 79.665-13.75 96.773-37.675 14.221-72.262-18.318-76.731-54.787-3.222-26.29 6.915-45.475 19.352-63.408 5.258-7.581 11.717-14.262 19.168-20.104C105.119-16.905 17.276 26.293 0 117.511 4.91 5.165 125.544-21.164 205.932 42.942c70.469-46.003 210.713-30.084 282.411 7.501-9.463-9.291-17.535-22.446-22.866-35.006-.79-1.859-4.569-8.993-4.29-12.878.102-1.443.766-2.442 2.348-2.553.903-.063 1.863.407 2.868 1.35 2.92 2.749 9.199 13.053 15.44 23.057C491.104 39.255 499.115 50.13 512 62.269zm-304.367-6.573c13.918 12.907 26.764 28.048 37.028 43.982 16.542 25.678 22.453 56.275-1.472 72.95-14.806 10.319-30.931 9.682-44.76 1.389-49.808-29.871-25.747-96.994 9.204-118.321z"
                />
              </g>
            </svg>
          </div>
        `;
        return;
    }

    Object.values(collections).forEach((collection) => {
        const tab = document.createElement("button");
        tab.className =
            "collection-tab py-2 px-4 mt-2 ml-2 mr-0 border-t-2 border-l-2 border-r-2 border-gray-100 rounded-t-lg text-sm text-gray-700 bg-white hover:bg-gray-300 whitespace-nowrap cursor-pointer";
        tab.textContent = collection.name;
        tab.dataset.id = collection.id;
        tab.setAttribute("tabindex", "0");

        tab.addEventListener("click", () => {
            loadGrid(collection.id);
            setActiveTab(tab);
        });

        collectionsContainer.appendChild(tab);
    });

    const firstTab = collectionsContainer.querySelector(".collection-tab");
    if (firstTab) {
        firstTab.click();
    }
}


  function setActiveTab(activeTab) {
    const tabs = document.querySelectorAll(".collection-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("bg-gray-200", "shadow-lg");
      if (!tab.classList.contains("bg-white")) {
        tab.classList.add("bg-white");
      }
    });

    activeTab.classList.remove("bg-white");
    activeTab.classList.add("bg-gray-200", "shadow-lg");
  }

  async function loadGrid(collectionId) {
    const { collections, folders, websites } = await chrome.storage.local.get([
      "collections",
      "folders",
      "websites",
    ]);

    gridContainer.innerHTML = "";

    const collection = collections[collectionId];
    if (!collection) return;

    collection.items.forEach((itemId) => {
      if (folders[itemId]) {
        createFolderButton(folders[itemId], websites);
      } else if (websites[itemId]) {
        createWebsiteButton(websites[itemId]);
      }
    });
  }

  function createFolderButton(folder, websites) {
    const button = document.createElement("button");
    button.className =
      "search-button rounded p-2 bg-white shadow-sm border border-gray-200 flex items-center gap-2 cursor-pointer h-fit hover:bg-gray-100 active:bg-[#f5f5dc] active:border-[#e0e0a0]";
    button.setAttribute("data-id", folder.id);
    button.setAttribute("tabindex", "0");

    const icon = document.createElement("div");
    icon.className = "w-6 h-6 flex items-center justify-center rounded-full";
    icon.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 48 48"
      >
        <path
          fill="#FFA000"
          d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
        ></path>
        <path
          fill="#FFCA28"
          d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
        ></path>
      </svg>
    `;

    const folderName = document.createElement("span");
    folderName.textContent = folder.name;

    button.appendChild(icon);
    button.appendChild(folderName);

    button.addEventListener("click", () => {
      folder.websites.forEach((websiteId) => {
        if (websites[websiteId]) {
          openWebsite(websites[websiteId]);
        }
      });
    });

    gridContainer.appendChild(button);
  }

  function createWebsiteButton(website) {
    const button = document.createElement("button");
    button.className =
      "search-button active rounded p-2 bg-white shadow-sm border border-gray-200 flex items-center gap-2 cursor-pointer h-fit hover:bg-gray-100 active:bg-[#f5f5dc] active:border-[#e0e0a0]";
    button.setAttribute("data-id", website.id);
    button.setAttribute("tabindex", "0");

    const iconWrapper = document.createElement("div");
    iconWrapper.className = "w-6 h-6 flex items-center justify-center";
    const icon = document.createElement("img");
    icon.src = website.iconUrl;
    iconWrapper.appendChild(icon);

    const websiteName = document.createElement("span");
    websiteName.textContent = website.name;

    button.appendChild(iconWrapper);
    button.appendChild(websiteName);

    button.addEventListener("click", () => openWebsite(website));

    gridContainer.appendChild(button);
  }

  function openWebsite(website) {

    if (inputTypeSelect.value == "single") {
      const searchTerm = searchInput.value.trim() || "";
      const url = website.searchUrl.replace(
        "$searchify$",
        encodeURIComponent(searchTerm)
      );
      chrome.tabs.create({ url: url, active: false });
    } else {
      const textArea = document.getElementById("searchInputTextArea")
      const searchTerms = textArea.value.trim().split('\n').map(term => term.trim()).filter(term => term.length > 0);

      searchTerms.forEach(term => {
        const url = website.searchUrl.replace(
          "$searchify$",
          encodeURIComponent(term)
        );
        chrome.tabs.create({ url: url, active: false });
      });
    }    
  }

  document.getElementById("dashboardButton").addEventListener("click", () => {
    chrome.tabs.create({ url: "dashboard.html" });
  });

  await initializeData();
  await loadCollections();
});
