function BlockName(props) {
  try {
    return (
      <div
        class="role-card"
        onClick={() => {
          props.setCurrentEdit(props.block);
          props.setAddNew(false);
        }}
      >
        <div class="role-card-content">
          <div class="role-card-info-wrapper">
            <div class="role-card-info">
              <i class="fa-duotone fa-apartment"></i>
              <div class="role-card-info-title">
                <h3>{props.block.reason}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BlockName;
