import { useEffect, useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import ShowItem from "../../../components/ShowItem";
import PermissionGroup from "./PermissionGroup";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import editBlock from "./functions/editBlock";
import deleteBlock from "./functions/deleteBlock";
import Button from "../../../components/Button";

function BlockItem(props) {
  const [index, setIndex] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [block, setBlock] = useState({
    reason: props.currentEdit.reason,
    duration: props.currentEdit.duration,
    show: props.currentEdit.restrictions.show,
    action: props.currentEdit.restrictions.action,
  });

  useEffect(() => {
    console.log(props.currentEdit);
    setBlock({ reason: props.currentEdit.reason, duration: props.currentEdit.duration, show: props.currentEdit.restrictions.show, action: props.currentEdit.restrictions.action });
  }, [props.currentEdit]);

  const [blockErrors, setBlockErrors] = useState({});
  const blockSchema = {
    reason: Joi.string().max(150).required().trim().messages(messages).label("سبب الحظر"),
    duration: Joi.number().integer().min(1).max(1e4).required().messages(messages).label("مدة الحظر"),
    show: Joi.array().items(Joi.string().trim().max(100)).required().min(1).messages(messages).label("صلاحيات القراءة"),
    action: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات التعديل"),
  };
  const joiBlock = Joi.object(blockSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={"سبب الحظر الجديد"} label={"سبب الحظر"} type={"text"} name={"reason"} onChange={handleSave} state={block} setState={setBlock} errors={blockErrors} setErrors={setBlockErrors} schema={blockSchema} />
            <Input placeholder={"كم يوما سيستمر الحظر؟"} label={"المدة"} type={"number"} name={"duration"} onChange={handleSave} state={block} setState={setBlock} errors={blockErrors} setErrors={setBlockErrors} schema={blockSchema} />
          </div>
        </form>

        <div className="header">صلاحيات التعديل</div>
        {Object.keys(props.permission).map((permissionGroup, permissionGroupIndex) => {
          return <PermissionGroup key={permissionGroupIndex} index={index} currentEdit={props.currentEdit} setIndex={setIndex} permission={props.permission} permissionGroup={permissionGroup} permissionGroupIndex={permissionGroupIndex} block={block} setBlock={setBlock} blockErrors={blockErrors} setBlockErrors={setBlockErrors} blockSchema={blockSchema} name={"action"} />;
        })}
        {blockErrors["action"]}

        <div className="header upcoming">صلاحيات القراءة</div>
        {props.show.map((showItem, showIndex) => {
          return <ShowItem key={showIndex} id={props.currentEdit.id} index={showIndex} showItem={showItem} role={block} setRole={setBlock} roleErrors={blockErrors} setRoleErrors={setBlockErrors} roleSchema={blockSchema} name={"show"} />;
        })}
        {blockErrors["show"]}
        <form className="role-footer">
          <div className="button-container">
            <Button classes={"action-button filter jsFilter"} action={() => editBlock(block, props.currentEdit, props.userInformation, setDuringAdd, props.blocks, props.setBlocks, props.toast)} text={"حفظ"} disabled={duringAdd} joiObject={joiBlock} state={block} setStateErrors={setBlockErrors} toast={props.toast} />
            <Button classes={"action-button filter jsFilter"} action={() => deleteBlock(props.currentEdit.id, props.userInformation, props.blocks, props.setBlocks, props.setCurrentEdit, props.toast)} text={"حذف"} disabled={duringAdd} joiObject={joiBlock} state={block} setStateErrors={setBlockErrors} toast={props.toast} dontValid={true} />
          </div>
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BlockItem;
