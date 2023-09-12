import RateCard from "./RateCard";

function Rates(props) {
  try {
    return (
      <>
        <div className="profile-right-reports">
          <div className="app-main-right-header">
            <span>8.7</span>
            <a href="#">رؤية جميع التقيمات</a>
          </div>

          <RateCard />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Rates;
