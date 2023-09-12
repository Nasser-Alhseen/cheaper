async function compare(filter, values) {
  let result = true;
  await Promise.all(
    Object.keys(filter).map((filterKey) => {
      let value1 = values[filterKey],
        value2 = filter[filterKey].value;

      if (filter[filterKey].value == null || filter[filterKey].operator == null) {
        result &= true;
      } else {
        if (filter[filterKey].type == "text") {
          value1 = value1.toLowerCase();
          value2 = value2.toLowerCase();
          if (filter[filterKey].operator == "equal") {
            result &= value1 == value2;
          } else if (filter[filterKey].operator == "not equal") {
            result &= value1 != value2;
          } else if (filter[filterKey].operator == "contains") {
            result &= value1.indexOf(value2) !== -1;
          }
        } else if (filter[filterKey].type == "number") {
          value1 = +value1;
          value2 = +value2;
          if (filter[filterKey].operator == "equal") {
            result &= value1 == value2;
          } else if (filter[filterKey].operator == "not equal") {
            result &= value1 != value2;
          } else if (filter[filterKey].operator == "greater than") {
            result &= value1 > value2;
          } else if (filter[filterKey].operator == "greater than or equal") {
            result &= value1 >= value2;
          } else if (filter[filterKey].operator == "lettle than") {
            result &= value1 < value2;
          } else if (filter[filterKey].operator == "lettle than or equal") {
            result &= value1 <= value2;
          }
        } else if (filter[filterKey].type == "select") {
          if (value1 == "true" || value1 == "false") value1 = value1 == "true";
          if (value2 == "true" || value2 == "false") value2 = value2 == "true";
          if (filter[filterKey].operator == "equal") {
            result &= value1 == value2;
          } else if (filter[filterKey].operator == "not equal") {
            result &= value1 != value2;
          }
        } else if (filter[filterKey].type == "array") {
          if (filter[filterKey].operator == "contains") {
            result &= value1.includes(value2);
          } else if (filter[filterKey].operator == "not contains") {
            result &= !value1.includes(value2);
          }
        } else if (filter[filterKey].type == "date") {
          if (filter[filterKey].operator == "equal") {
            result &= value1 == value2;
          } else if (filter[filterKey].operator == "not equal") {
            result &= value1 != value2;
          } else if (filter[filterKey].operator == "greater than") {
            result &= value1 > value2;
          } else if (filter[filterKey].operator == "lettle than") {
            result &= value1 < value2;
          }
        }
      }
    })
  );

  return result;
}

export default compare;
