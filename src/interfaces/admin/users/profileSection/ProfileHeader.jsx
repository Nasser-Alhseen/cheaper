function ProfileHeader(props) {
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <div className="profile-img-upload-section">
              <img src="test.png" />
              <input type="upload" className="upload-profile-img" />
            </div>
            <div className="left-side">
              <h1 className="profileHeader-js">اسم مقدم العرض</h1>
              <p>العنوان : حمص - الغوطة</p>
            </div>
          </div>
          <div className="right-side">
            <span className="amount">التصنيف : حلويات</span>
            <p>أوقات الافتتاح</p>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileHeader;
