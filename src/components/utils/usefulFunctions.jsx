import style from '../../styles/productCard.module.css'

export const getWordCalification = (calification) => {
  switch (calification) {
    case 1:
      return "Regular";
    case 2:
      return "Decente";
    case 3:
      return "Bueno";
    case 4:
      return "Muy bueno";
    case 5:
      return "Excelente";
    default:
      break;
  }
};

export const getStarsCalification = (calification) => {
  switch (calification) {
    case 1:
      return (
        <span className={style.mainColorStar}>
          ★<span className={style.lightColorStar}>★★★★</span>
        </span>
      );
    case 2:
      return (
        <span className={style.mainColorStar}>
          ★★<span className={style.lightColorStar}>★★★</span>
        </span>
      );
    case 3:
      return (
        <span className={style.mainColorStar}>
          ★★★<span className={style.lightColorStar}>★★</span>
        </span>
      );
    case 4:
      return (
        <span className={style.mainColorStar}>
          ★★★★<span className={style.lightColorStar}>★</span>
        </span>
      );
    case 5:
      return <span className={style.mainColorStar}>★★★★★</span>;
    default:
      break;
  }
};


  /* ////////////// localStorageFuntions ////////////// */


export const getLocaStorageFavs = () => {
  const favs = localStorage.getItem("favs");
  return favs ? JSON.parse(favs) : [];
};

export const setLocalStorageFavs = (card) => {
  console.log(card);
  let favs = getLocaStorageFavs();
  const newFavs = favs.filter((fav) => {
    return fav.id === card.id;
  });

  if (newFavs.length === 0) {
    favs.push(card);
    localStorage.setItem("favs", JSON.stringify(favs));
  }
};

export const clearFromFavs = (id, name) => {
  let favs = getLocaStorageFavs();
  const index = favs.findIndex((fav) => fav.id === id);
  if (index !== -1) {
    favs.splice(index, 1);
    localStorage.setItem("favs", JSON.stringify(favs));
  }
};

export const isFav = (id) => {
  const favs = getLocaStorageFavs();
  const newFavs = favs.filter((fav) => {
    return fav.id === id;
  });
  return newFavs.length === 1;
};