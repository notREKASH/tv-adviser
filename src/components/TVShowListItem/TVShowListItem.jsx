import { BACKDROP_MEDIUM_URL } from "../../config";
import style from "./style.module.css";

export function TVShowListItem({ tvShow, onClick }) {
  return (
    <div onClick={() => onClick(tvShow)} className={style.container}>
      <img
        className={style.img}
        alt={tvShow.name}
        src={BACKDROP_MEDIUM_URL + tvShow.backdrop_path}
      />
      <div className={style.title}>{tvShow.name}</div>
    </div>
  );
}
