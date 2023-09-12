function RoleHeader(props) {
  try {
    return (
      <>
        <div className="app-content-actions">
          <input
            className="search-bar"
            placeholder="بحث..."
            type="text"
            value={props.filter.name.value ? props.filter.name.value : ""}
            onChange={(event) => {
              props.setFilter({ ...props.filter, name: { ...props.filter.name, value: event.target.value } });
            }}
          />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RoleHeader;
