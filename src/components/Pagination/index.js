export default function Pagination({ skip, setSkip, limit }) {
  return (
    <>
      <input
        type="button"
        value="<<<"
        onClick={() => setSkip(skip - 20 * limit)}
      />
      <input
        type="button"
        value="<<"
        onClick={() => setSkip(skip - 10 * limit)}
      />
      <input type="button" value="<" onClick={() => setSkip(skip - limit)} />
      <input type="button" value=">" onClick={() => setSkip(skip + limit)} />
      <input
        type="button"
        value=">>"
        onClick={() => setSkip(skip + 10 * limit)}
      />
      <input
        type="button"
        value=">>>"
        onClick={() => setSkip(skip + 20 * limit)}
      />
    </>
  );
}
