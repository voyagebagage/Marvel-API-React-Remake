import "./index.css";

export default function ComicCard({ data, saveComicInFavoris }) {
  return (
    <div>
      {data &&
        data.map((comic, index) => (
          <div className="comicCard" key={comic._id}>
            <p>{index + 1}</p>
            <img
              id="comicPic"
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={"comic"}
            />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="title">{comic.title}</p>
                <input
                  type="button"
                  value="STAR"
                  onClick={() => saveComicInFavoris(comic, "comic")}
                />
              </div>
              <p className="descrpition">{comic.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
