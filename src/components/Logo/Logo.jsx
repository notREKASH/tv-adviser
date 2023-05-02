import style from "./style.module.css";

export function Logo({ image, title, subtitles }) {
  return (
    <>
      <div className={style.container}>
        <img src={image} alt="" className={style.image} />
        <span className={style.title}>{title}</span>
      </div>
      <span className={style.subtitles}>{subtitles}</span>
    </>
  );
}
