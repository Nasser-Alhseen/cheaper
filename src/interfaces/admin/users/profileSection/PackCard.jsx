function PackCard(props) {
  try {
    return (
      <>
        <div className="received-item-line">
          <div className="progress-line">
            <span className="time start">2023/01/31</span>
            <span className="time end">2023/03/31</span>
          </div>
          <div className="received-items-content">
            <div className="perfect-card-container" dir="ltr">
              <div className="perfect-card">
                <div className="perfect-card-right">
                  <img src="test.png" />
                </div>

                <div className="perfect-card-left">
                  <div className="perfect-card-left-header">
                    <h1>اسم الباقة</h1>
                    <h2>سعر الباقة</h2>
                  </div>
                  <div className="perfect-card-left-body">
                    <h1>تم الشراء : 28</h1>
                    <h2>لم يتم الشراء : 8</h2>
                    <h3> المدة </h3>
                  </div>
                </div>

                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PackCard;
