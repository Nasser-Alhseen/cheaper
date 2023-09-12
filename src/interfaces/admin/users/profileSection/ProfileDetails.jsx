import DetailsCard from "./DetailsCard";

function ProfileDetails(props) {
  try {
    return (
      <>
        <section className="details-profile-cards">
          <DetailsCard />
          <DetailsCard />
          <DetailsCard />
          <DetailsCard />
          <DetailsCard />
          <DetailsCard />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileDetails;
