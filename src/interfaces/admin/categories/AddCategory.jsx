import { useState } from "react";
import messages from "../../../constants/messages";
import Joi from "joi";
import Input from "../../../components/Input";
import CheckBox from "../../../components/CheckBox";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import Button from "../../../components/Button";
import ChooseIcon from "./ChooseIcon";
import addCategory from "./functions/addCategory";
import selectOptions from "../../../constants/selectOptions";

function AddCategory(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    checkWithImageOrNot: "ليس له صور حالات",
    emoji: "",
  });

  const [categoryErrors, setCategoryErrors] = useState({});
  const categorySchema = {
    name: Joi.string().required().trim().min(1).max(75).messages(messages).label("الاسم"),
    checkWithImageOrNot: Joi.string().required().trim().messages(messages).label("له صور حالة؟"),
    emoji: Joi.string().required().min(1).max(50).messages(messages).label("الأيقونة"),
  };
  const joiCategory = Joi.object(categorySchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
            <CheckBox placeholder={""} label={"له صور حالة؟"} name={"checkWithImageOrNot"} values={selectOptions.checkWithImageOrNot} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
            <ChooseIcon label={"اختر أيقونة"} name={"emoji"} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
          </div>
        </form>
        <Button action={() => addCategory(category, props.userInformation, setDuringAdd, props.setAddNew, props.categories, props.setCategories, props.toast)} text={"إرسال"} disabled={duringAdd} joiObject={joiCategory} state={category} setStateErrors={setCategoryErrors} toast={props.toast} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddCategory;
