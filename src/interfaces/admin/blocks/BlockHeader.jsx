function BlockHeader(props) {
  try {
    return (
      <>
        <div className="app-content-actions">
          <input
            className="search-bar"
            placeholder="بحث..."
            type="text"
            value={props.filter.reason.value ? props.filter.reason.value : ""}
            onChange={(event) => {
              props.setFilter({ ...props.filter, reason: { ...props.filter.reason, value: event.target.value } });
            }}
          />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BlockHeader;
