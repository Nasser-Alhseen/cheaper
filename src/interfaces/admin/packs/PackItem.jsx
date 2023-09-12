function PackItem(props) {
  try {
    return (
      <>
        {props.pack.name}
        <br />
        <div
          onClick={() => {
            props.setAddNew(false);
            props.setCurrentEdit(props.pack.id);
          }}
        >
          تعديل
        </div>
        <div
          onClick={() => {
            props.deletePack(props.pack.id);
          }}
        >
          حذف
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PackItem;
