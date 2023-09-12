function DetailsCard(props) {
  try {
    return (
      <>
        <div className="details-profile-card">
          <div className="details-profile-card-header">
            <h1>الاسم</h1>
          </div>

          <div className="details-profile-card-body">
            <div className="details-profile-card-body-icon">
              <i className="material-icons">computer</i>
            </div>
            <input type="text" />
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default DetailsCard;
