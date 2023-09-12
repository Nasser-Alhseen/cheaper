import CommentCard from "./CommentCard";

function Comments(props) {
  try {
    return (
      <>
        <div className="profile-right-reports">
          <div className="app-main-right-header">
            <span>53</span>
            <a href="#">رؤية جميع التعليقات</a>
          </div>

          <CommentCard />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Comments;
