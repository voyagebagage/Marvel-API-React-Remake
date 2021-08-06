import "./index.css";

export default function ComicCard({ comic, index }) {
  return (
    <div className="comicCard">
      <p>{index + 1}</p>
      <img
        id="comicPic"
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={"no"}
      />
      <div>
        <p className="title">{comic.title}</p>
        <p className="descrpition">{comic.description}</p>
      </div>
    </div>
  );
}
