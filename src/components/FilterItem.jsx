import selectOptions from "../constants/selectOptions";

function FilterItem(props) {
  try {
    return (
      <>
        <div className="search-container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="filter-name">{props.item.name}</div>
            <select
              value={props.item.operator}
              onChange={(e) => {
                props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], operator: e.target.value } });
              }}
              className={"search-bar"}
              style={{ padding: "1px", marginLeft: "2px" }}
            >
              <option value={null}>أدخل طريقة المقارنة...</option>
              {selectOptions.operators[props.item.type].map((operator, operatorIndex) => {
                return (
                  <option key={operatorIndex} value={operator.value}>
                    {operator.name}
                  </option>
                );
              })}
            </select>
            
            {props.item.type == "select" ? (
              <select
                onChange={(e) => {
                  props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], value: e.target.value } });
                }}
                className={"search-bar"}
              >
                <option value={null}>أدخل القيمة ...</option>
                {selectOptions[props.filterKey].map((option, optionIndex) => {
                  return (
                    <option key={optionIndex} value={option.value}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            ) : props.item.type == "array" ? (
              <select
                onChange={(e) => {
                  props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], value: e.target.value } });
                }}
                className={"search-bar"}
              >
                <option value={null}>أدخل القيمة ...</option>
                {selectOptions[props.filterKey].map((option, optionIndex) => {
                  return (
                    <option key={optionIndex} value={option.value}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <input
                type={props.item.type}
                value={props.item.value}
                onChange={(e) => {
                  props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], value: e.target.value } });
                }}
                className={"search-bar"}
                placeholder="أدخل القيمة ..."
              />
            )}

            
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default FilterItem;
