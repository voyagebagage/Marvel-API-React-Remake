import "./index.css";
export default function MarvelCard({ oneMarvel }) {
  const { name, thumbnail, description } = oneMarvel;
  // console.log(oneMarvel);
  return (
    <
      // className="wrapper"
    >
      <p>{name}</p>
      <img
        id="marvelPic"
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt=""
      />
      <p className="marvelDescription">{description}</p>
    </>
  );
}
