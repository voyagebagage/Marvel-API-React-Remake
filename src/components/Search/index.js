export default function Search({
  value,
  setSearch,
  placeholder,
  handleSubmit,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder={placeholder}
          // name="Marvel"
          id="search"
          //   className="wrapper"
          value={value}
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" value="SEARCH" />
      </form>
    </div>
  );
}
