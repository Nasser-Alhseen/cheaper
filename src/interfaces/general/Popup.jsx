import { useEffect } from "react";

function Popup(props) {
  useEffect(() => {
    var modal = document.querySelector("#modal-window");
    window.onclick = function (event) {
      if (event.target == modal) {
        props.setCurrentShowBlocks(false);
      }
    };
  }, []);

  try {
    return (
      <>
        <div id="modal-window" className={"shadow hideModal showModal"} style={{ position: "fixed" }}>
          <div class="main-modal">
            <button
              class="btn btn-close"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {props.component}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Popup;
