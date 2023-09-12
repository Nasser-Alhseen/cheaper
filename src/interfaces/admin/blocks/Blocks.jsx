import BlockItem from "./BlockItem";
import AddBlockForm from "./AddBlockForm";
import { useEffect, useRef, useState } from "react";
import requestOptions from "../../../constants/requestOptions";
import { trainingPermission } from "../../../constants/permissions";
import selectOptions from "../../../constants/selectOptions";
import Loading from "../../general/Loading";
import BlockName from "./BlockName";
import jsonParse from "../../../functions/jsonParse";
import getBlocks from "./functions/getBlocks";
import "./css/block.css";
import searchOptions from "../../../constants/searchOptions";
import BlockHeader from "./BlockHeader";

function Blocks(props) {
  const cardRef = useRef();
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [filter, setFilter] = useState(searchOptions.blocks);

  useEffect(() => {
    if (!currentEdit) setAddNew(true);
  }, [currentEdit]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.blocks).map(async (block, blockIndex) => {
          const isTrue = await compare(filter, { reason: props.blocks[block].reason });
          if (isTrue) {
            return <BlockName key={blockIndex} block={props.blocks[block]} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} />;
          }
        })
      );
      setItems([...newArr]);
    };

    populateArray();
  }, [filter, props.blocks, currentEdit]);

  useEffect(() => {
    setCurrentEdit(false);
  }, [filter]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlocks(props.userInformation, props.setBlocks, props.toast);
  }, []);
  useEffect(() => {
    if (props.blocks != -1) setLoading(false);
  }, [props.blocks]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      for (const card of cardRef.current.getElementsByClassName("role-card")) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    if (cardRef.current) {
      cardRef.current.onmousemove = handleMouseMove;
    }
  }, [cardRef.current]);

  try {
    return (
      <>
        {loading ? (
          <div class="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            <div class="main-area">
              <button class="btn-show-right-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button class="btn-show-left-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

              <div class="role-right-area">
                <div id="role-cards" ref={cardRef}>
                  <div
                    class="role-card"
                    style={{ "--mouse-x": " 243.38641357421875px", "--mouse-y": "32px" }}
                    onClick={() => {
                      setCurrentEdit(false);
                      setAddNew(true);
                    }}
                  >
                    <div class="role-card-content">
                      <div class="role-card-info-wrapper">
                        <div class="role-card-info">
                          <i class="fa-duotone fa-apartment"></i>
                          <div class="role-card-info-title">
                            <h3>حظر جديد</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {items.map((item) => {
                    return item;
                  })}
                </div>
              </div>
            </div>
            <div class="tasks-wrapper">
              <BlockHeader filter={filter} setFilter={setFilter} />
              {currentEdit && <BlockItem toast={props.toast} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} blocks={props.blocks} setBlocks={props.setBlocks} permission={trainingPermission} show={selectOptions.show} userInformation={props.userInformation} />}
              {addNew && <AddBlockForm toast={props.toast} blocks={props.blocks} setBlocks={props.setBlocks} permission={trainingPermission} show={selectOptions.show} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} />}
            </div>
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Blocks;
