export default function PaginationRight({ skip, setSkip, limit }) {
  return (
    <div className="paginationStyle paginationRight">
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
