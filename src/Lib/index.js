export const isThereFavInTheBrowser = (data, setData) => {
  let parseStorage = JSON.parse(localStorage.getItem("favMarvels"));
  if (parseStorage && parseStorage.length !== 0) {
    data.forEach((elemData) => {
      parseStorage.forEach((eParseStorage) => {
        if (elemData._id === eParseStorage._id) {
          data.splice(data.indexOf(elemData), 1, eParseStorage);
        }
      });
    });
  }
  setData(data);
};

export let parseStorageCharacters = JSON.parse(
  localStorage.getItem("favMarvels")
);
export let parseStorageComics = JSON.parse(localStorage.getItem("favComics"));
