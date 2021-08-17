import "./index.css";

export default function Search({
  value,
  setSearch,
  placeholder,
  handleSubmit,
  setLimit,
}) {
  return (
    // <div className="search-component">
    <form onSubmit={handleSubmit} className="search-component wrapper">
      <input
        type="search"
        placeholder={placeholder}
        // name="Marvel"
        id="search"
        //   className="wrapper"
        value={value}
        autoFocus
        onChange={(e) => {
          setSearch(e.target.value);
          setLimit(100);
        }}
      />
      <input type="submit" value="Search" id="search-button" />
    </form>
    // </div>
  );
}
// style={{ position: "absolute", top: 80 }}
