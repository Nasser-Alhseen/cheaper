import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import requestOptions from "../../../constants/requestOptions";
import AddCategory from "./AddCategory";
import CategoryItem from "./CategoryItem";
import UpdateCategory from "./UpdateCategory";
import getCategories from "./functions/getCategories";
import "./css/categories.css";
import CategoriesCharts from "./CategoriesCharts";
import Popup from "../../general/Popup";
import CategoryHeader from "./CategorySearch";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";

function Categories(props) {
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [filter, setFilter] = useState(searchOptions.categories);

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.categories).map(async (categoryId, categoryIndex) => {
            // const isTrue = true;
            const isTrue = await compare(filter, { name: props.categories[categoryId].name, offerTaken: props.categories[categoryId].count.offerTaken, user: props.categories[categoryId].count.user, store: props.categories[categoryId].count.store });
            //   const isTrue = await compare(searchOptions["roles"][props.search.field], props.search.operator, props.roles[role][props.search.field], props.search.word);
            if (isTrue) {
              return <CategoryItem key={categoryIndex} category={props.categories[categoryId]} categories={props.categories} setCategories={props.setCategories} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.categories, currentEdit, filter]);

  useEffect(() => {
    if (props.categories == -1) getCategories(props.userInformation, props.setCategories, props.toast);
  }, []);
  useEffect(() => {
    if (props.categories != -1) setLoading(false);
  }, [props.categories]);

  try {
    return (
      <>
        {loading ? (
          <div class="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            <div class="profile-main-area">
              <button class="btn-show-right-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button class="btn-show-left-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

              <div class="main-categories">
                <section class="categories-left">
                  <CategoryHeader setAddNew={setAddNew} filter={filter} setFilter={setFilter} />

                  {items.map((item) => {
                    return item;
                  })}
                </section>
              </div>
            </div>

            {addNew ? (
              <>
                <Popup setOpen={setAddNew} component={<AddCategory categories={props.categories} setCategories={props.setCategories} setAddNew={setAddNew} userInformation={props.userInformation} navigate={props.navigate} toast={props.toast} />} />
              </>
            ) : null}
            {currentEdit ? (
              <>
                <Popup setOpen={setCurrentEdit} component={<UpdateCategory categories={props.categories} setCategories={props.setCategories} currentEdit={props.categories[currentEdit]} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} navigate={props.navigate} toast={props.toast} />} />
              </>
            ) : null}
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Categories;
