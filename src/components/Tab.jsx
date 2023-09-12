import { NavLink } from "react-router-dom";

function Tab(props) {
  try {
    return (
      <>
        <NavLink
          to={"/" + props.tab.value}
          className={"item-link" + (props.currentTab == props.tab.value ? " active" : "")}
          onClick={() => {
            props.setCurrentTab(props.tab.value);
          }}
        >
          {props.tab.name}
        </NavLink>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Tab;
