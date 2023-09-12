function Loading(props) {
  try {
    return (
      <>
        <div className="loading-container">
          <video className="loading-video" autoPlay muted loop>
            <source src="videos/loading.mp4" type="video/mp4" />
          </video>
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Loading;
