import { validateData } from "../src/dashboard";
import { expect, test, describe } from 'vitest'

// Valid test data
const validData = {
  "collections": {
    "col-1": {
      "id": "col-1",
      "items": [
        "folder-1",
        "web-1"
      ],
      "name": "Finance & Investing"
    }
  },
  "folders": {
    "folder-1": {
      "id": "folder-1",
      "name": "All",
      "websites": [
        "web-1"
      ]
    }
  },
  "websites": {
    "web-1": {
      "iconUrl": "https://example.com/favicon.ico",
      "id": "web-1",
      "name": "Example Site",
      "searchUrl": "https://example.com/search?q=$searchcenter$"
    }
  }
};

describe('validateData - Basic Structure Tests', () => {
  test('should validate a properly structured payload', () => {
    expect(() => validateData(validData)).not.toThrow();
  });

  test('should validate an empty but properly structured payload', () => {
    const emptyValidPayload = {
      collections: {},
      folders: {},
      websites: {},
    };
    expect(() => validateData(emptyValidPayload)).not.toThrow();
  });

  test('should throw when collections is missing', () => {
    const missingCollections = {
      folders: {},
      websites: {},
    };
    expect(() => validateData(missingCollections)).toThrowError(
      "Invalid data structure: Missing collections, folders, or websites"
    );
  });

  test('should throw when folders is missing', () => {
    const missingFolders = {
      collections: {},
      websites: {},
    };
    expect(() => validateData(missingFolders)).toThrowError(
      "Invalid data structure: Missing collections, folders, or websites"
    );
  });

  test('should throw when websites is missing', () => {
    const missingWebsites = {
      collections: {},
      folders: {},
    };
    expect(() => validateData(missingWebsites)).toThrowError(
      "Invalid data structure: Missing collections, folders, or websites"
    );
  });
});

describe('validateData - Collection Tests', () => {
  test('should throw when collection is missing id', () => {
    const invalidCollection = JSON.parse(JSON.stringify(validData));
    delete invalidCollection.collections["col-1"].id;
    
    expect(() => validateData(invalidCollection)).toThrowError(
      "Invalid collection Finance & Investing: missing required fields"
    );
  });

  test('should throw when collection is missing name', () => {
    const invalidCollection = JSON.parse(JSON.stringify(validData));
    delete invalidCollection.collections["col-1"].name;
    
    expect(() => validateData(invalidCollection)).toThrowError(
      "Invalid collection col-1: missing required fields"
    );
  });

  test('should throw when collection is missing items array', () => {
    const invalidCollection = JSON.parse(JSON.stringify(validData));
    delete invalidCollection.collections["col-1"].items;
    
    expect(() => validateData(invalidCollection)).toThrowError(
      "Invalid collection Finance & Investing: missing required fields"
    );
  });

  test('should throw when collection items is not an array', () => {
    const invalidCollection = JSON.parse(JSON.stringify(validData));
    invalidCollection.collections["col-1"].items = "not an array";
    
    expect(() => validateData(invalidCollection)).toThrowError(
      "Invalid collection Finance & Investing: items is not an array"
    );
  });

  test('should throw when collection references non-existent item', () => {
    const invalidCollection = JSON.parse(JSON.stringify(validData));
    invalidCollection.collections["col-1"].items.push("non-existent-id");
    
    expect(() => validateData(invalidCollection)).toThrowError(
      'Invalid reference: Collection "Finance & Investing" references non-existent item "non-existent-id"'
    );
  });
});

describe('validateData - Folder Tests', () => {
  test('should throw when folder is missing id', () => {
    const invalidFolder = JSON.parse(JSON.stringify(validData));
    delete invalidFolder.folders["folder-1"].id;
    
    expect(() => validateData(invalidFolder)).toThrowError(
      "Invalid folder All: missing required fields"
    );
  });

  test('should throw when folder is missing name', () => {
    const invalidFolder = JSON.parse(JSON.stringify(validData));
    delete invalidFolder.folders["folder-1"].name;
    
    expect(() => validateData(invalidFolder)).toThrowError(
      "Invalid folder folder-1: missing required fields"
    );
  });

  test('should throw when folder is missing websites array', () => {
    const invalidFolder = JSON.parse(JSON.stringify(validData));
    delete invalidFolder.folders["folder-1"].websites;
    
    expect(() => validateData(invalidFolder)).toThrowError(
      "Invalid folder All: missing required fields"
    );
  });

  test('should throw when folder websites is not an array', () => {
    const invalidFolder = JSON.parse(JSON.stringify(validData));
    invalidFolder.folders["folder-1"].websites = "not an array";
    
    expect(() => validateData(invalidFolder)).toThrowError(
      "Invalid folder All: websites is not an array"
    );
  });

  test('should throw when folder references non-existent website', () => {
    const invalidFolder = JSON.parse(JSON.stringify(validData));
    invalidFolder.folders["folder-1"].websites.push("non-existent-website");
    
    expect(() => validateData(invalidFolder)).toThrowError(
      'Invalid reference: Folder "All" references non-existent website "non-existent-website"'
    );
  });
});

describe('validateData - Website Tests', () => {
  test('should throw when website is missing id', () => {
    const invalidWebsite = JSON.parse(JSON.stringify(validData));
    delete invalidWebsite.websites["web-1"].id;
    
    expect(() => validateData(invalidWebsite)).toThrowError(
      "Invalid website Example Site: missing required fields"
    );
  });

  test('should throw when website is missing name', () => {
    const invalidWebsite = JSON.parse(JSON.stringify(validData));
    delete invalidWebsite.websites["web-1"].name;
    
    expect(() => validateData(invalidWebsite)).toThrowError(
      "Invalid website web-1: missing required fields"
    );
  });

  test('should throw when website is missing iconUrl', () => {
    const invalidWebsite = JSON.parse(JSON.stringify(validData));
    delete invalidWebsite.websites["web-1"].iconUrl;
    
    expect(() => validateData(invalidWebsite)).toThrowError(
      "Invalid website Example Site: missing required fields"
    );
  });

  test('should throw when website is missing searchUrl', () => {
    const invalidWebsite = JSON.parse(JSON.stringify(validData));
    delete invalidWebsite.websites["web-1"].searchUrl;
    
    expect(() => validateData(invalidWebsite)).toThrowError(
      "Invalid website Example Site: missing required fields"
    );
  });
});

describe('validateData - Orphaned Resources Tests', () => {
  test('should throw when website is orphaned (not referenced anywhere)', () => {
    const orphanedWebsite = JSON.parse(JSON.stringify(validData));
    orphanedWebsite.websites["web-2"] = {
      "iconUrl": "https://example2.com/favicon.ico",
      "id": "web-2",
      "name": "Example Site 2",
      "searchUrl": "https://example2.com/search?q=$searchcenter$"
    };
    
    expect(() => validateData(orphanedWebsite)).toThrowError(
      'Orphaned website: "Example Site 2" (web-2) is not referenced in any folder or collection'
    );
  });

  test('should not throw when website is directly referenced in collection (but not in folder)', () => {
    const validReference = JSON.parse(JSON.stringify(validData));
    validReference.websites["web-2"] = {
      "iconUrl": "https://example2.com/favicon.ico",
      "id": "web-2",
      "name": "Example Site 2",
      "searchUrl": "https://example2.com/search?q=$searchcenter$"
    };
    validReference.collections["col-1"].items.push("web-2");
    
    expect(() => validateData(validReference)).not.toThrow();
  });

  test('should not throw when all websites are properly referenced', () => {
    const complexValidData = {
      "collections": {
        "col-1": {
          "id": "col-1",
          "items": ["folder-1", "web-3"],
          "name": "Finance Collection"
        },
        "col-2": {
          "id": "col-2",
          "items": ["folder-2"],
          "name": "News Collection"
        }
      },
      "folders": {
        "folder-1": {
          "id": "folder-1",
          "name": "Finance Folder",
          "websites": ["web-1", "web-2"]
        },
        "folder-2": {
          "id": "folder-2",
          "name": "News Folder",
          "websites": ["web-4"]
        }
      },
      "websites": {
        "web-1": {
          "iconUrl": "https://example1.com/favicon.ico",
          "id": "web-1",
          "name": "Finance Site 1",
          "searchUrl": "https://example1.com/search?q=$searchcenter$"
        },
        "web-2": {
          "iconUrl": "https://example2.com/favicon.ico",
          "id": "web-2",
          "name": "Finance Site 2",
          "searchUrl": "https://example2.com/search?q=$searchcenter$"
        },
        "web-3": {
          "iconUrl": "https://example3.com/favicon.ico",
          "id": "web-3",
          "name": "Finance Site 3",
          "searchUrl": "https://example3.com/search?q=$searchcenter$"
        },
        "web-4": {
          "iconUrl": "https://example4.com/favicon.ico",
          "id": "web-4",
          "name": "News Site",
          "searchUrl": "https://example4.com/search?q=$searchcenter$"
        }
      }
    };
    
    expect(() => validateData(complexValidData)).not.toThrow();
  });
});