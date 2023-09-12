import FilterSelect from "../../../components/FilterSelect";
import selectOptions from "../../../constants/selectOptions";

function UserFilter(props) {
  try {
    return (
      <>
        <div className="filter-menu active">
          <FilterSelect state={props.tempFilter} setState={props.setTempFilter} name={"blocked"} label={"حالة الحظر"} placeholder={"أيا يكن"} list={selectOptions.blocked} />
          <FilterSelect state={props.tempFilter} setState={props.setTempFilter} name={"active"} label={"النشاط"} placeholder={"أيا يكن"} list={selectOptions.active} />
          <FilterSelect state={props.tempFilter} setState={props.setTempFilter} name={"gender"} label={"الجنس"} placeholder={"أيا يكن"} list={selectOptions.gender} />
          <div className="filter-menu-buttons">
            <button
              className="filter-button reset"
              onClick={() => {
                props.setOpenFilter(false);
              }}
            >
              إغلاق
            </button>
            <button
              className="filter-button reset"
              onClick={() => {
                props.setFilter({ ...props.filter, ...props.tempFilter });
                props.setOpenFilter(false);
              }}
            >
              تطبيق
            </button>

            {props.tempFilter.blocked != -1 || props.tempFilter.active != -1 || props.tempFilter.gender != -1 ? (
              <button
                className="filter-button reset"
                onClick={() => {
                  props.setTempFilter({ search: props.tempFilter.search, gender: -1, blocked: -1, active: -1 });
                  props.setFilter({ ...props.filter, search: props.tempFilter.search, gender: -1, blocked: -1, active: -1 });
                  props.setOpenFilter(false);
                }}
              >
                إلغاء الفلتر
              </button>
            ) : null}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserFilter;
