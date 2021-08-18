export default function PaginationLeft({ skip, setSkip, limit }) {
  return (
    <div className="paginationStyle paginationLeft">
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
    </div>
  );
}
