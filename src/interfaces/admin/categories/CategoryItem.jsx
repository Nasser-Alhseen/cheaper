import { useState } from "react";
import deleteCategory from "./functions/deleteCategory";
import * as faw from "react-icons/fa";
import CategoryChart from "./CategoryChart";

function CategoryItem(props) {
  const [openDropDown, setOpenDropDown] = useState(false);

  function getIcon(iconName) {
    const Cur = faw[iconName];
    if (Cur) {
      return <Cur />;
    } else {
      return "";
    }
  }

  try {
    return (
      <>
        <div class="categories-container">
          <div class="categories-card">
            <div class="categories-card-header">
              <h1>{props.category.name}</h1>
              <div class="dropdown">
                <button
                  class="cat-dropbtn"
                  onClick={() => {
                    setOpenDropDown(!openDropDown);
                  }}
                >
                  •••
                </button>
                <ul id="myDropdown" class={"dropdown-content" + (openDropDown ? " show" : "")}>
                  <li>
                    <div
                      onClick={() => {
                        props.setAddNew(false);
                        props.setCurrentEdit(props.category.id);
                      }}
                    >
                      تعديل
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        deleteCategory(props.category.id, props.userInformation, props.categories, props.setCategories, props.toast);
                      }}
                    >
                      حذف
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="categories-card-content">
              <div className="categories-card-icon">{getIcon(props.category.emoji)}</div>
              <div class="categories-card-details">
                <h1>{props.category.count.offerTaken}</h1>
                <h2>العروض</h2>
              </div>
              <div class="categories-card-details">
                <h1>{props.category.count.user}</h1>
                <h2>المستخدمين</h2>
              </div>
              <div class="categories-card-details">
                <h1>{props.category.count.store}</h1>
                <h2>المحلات</h2>
              </div>
              <div class="categories-card-details">
                <h1>{props.category.checkWithImageOrNot == "مع صور حالات" ? "نعم" : "لا"}</h1>
                <h2 style={{ width: "max-content" }}>صور حالات</h2>
              </div>
              <CategoryChart id={props.category.id} name={props.category.name} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CategoryItem;
