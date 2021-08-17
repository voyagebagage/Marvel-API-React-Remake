export default function Pagination({ skip, setSkip, limit }) {
  return (
    <div className="wrapper">
      <input
        type="button"
        value="<<<"
        onClick={() => (skip >= 20 * limit ? setSkip(skip - 20 * limit) : null)}
      />
      <input
        type="button"
        value="<<"
        onClick={() => (skip >= 10 * limit ? setSkip(skip - 10 * limit) : null)}
      />
      <input
        type="button"
        value="<"
        onClick={() => (skip >= limit ? setSkip(skip - limit) : null)}
      />
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
    </div>
  );
}
