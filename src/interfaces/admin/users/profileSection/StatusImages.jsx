import ShopsTable from "./ShopsTable";

function StatusImages(props) {
  try {
    return (
      <>
        <div className="profile-image-wrapper">
          <img src="test.png" />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StatusImages;
