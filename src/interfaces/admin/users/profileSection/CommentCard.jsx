function CommentCard(props) {
  try {
    return (
      <>
        <div className="card-wrapper">
          <div className="card">
            <div className="profile-info-wrapper">
              <div className="fix-profile-image-wrapper">
                <div className="profile-img-wrapper">
                  <img src="https://source.unsplash.com/featured/1200x900/?woman,cool" alt="Review" />
                </div>
                <div className="profile-info-wrapper-name">
                  <h1>جيسيكا فرانسيس</h1>
                  <p>@jeseca_fransis</p>
                </div>
              </div>
              <div className="profile-info-wrapper-date">
                <p>2023/09/12</p>
              </div>
            </div>
            <p> يتتير يرمكءئ سقايب سفلب سالةبة سقللللللب</p>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CommentCard;
