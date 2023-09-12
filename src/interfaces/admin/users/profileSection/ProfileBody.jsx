import Comments from "./Comments";
import Rates from "./Rates";

function ProfileBody(props) {
  try {
    return (
      <>
        <section className="profile-right-section">
          <Rates />

          <Comments />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileBody;
