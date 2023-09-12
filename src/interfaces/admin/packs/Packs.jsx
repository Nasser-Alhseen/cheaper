import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import requestOptions from "../../../constants/requestOptions";
import PackItem from "./PackItem";
import AddPack from "./AddPack";
import UpdatePack from "./UpdatePack";

function Packs(props) {
  const [loading, setLoading] = useState(true);
  const [loadingPackChart, setLoadingPackChart] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.packs).map(async (packId, packIndex) => {
            const isTrue = true;
            //   const isTrue = await compare(searchOptions["roles"][props.search.field], props.search.operator, props.roles[role][props.search.field], props.search.word);
            if (isTrue) {
              return <PackItem key={packIndex} pack={props.packs[packId]} deletePack={deletePack} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} userInformation={props.userInformation} toast={props.toast} navigate={props.navigate} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.packs, currentEdit]);

  async function getPacks() {
    try {
      let response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/all`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
      let data = await response.json();
      if (data.success) {
        let finalPacks = {};
        await Promise.all(
          data.data.map(async (pack) => {
            finalPacks[pack.id] = pack;
          })
        );
        props.setPacks({ ...finalPacks });
      } else {
        console.log(data.error);
        props.toast.error("عذرا, حدث خطأ في السيرفر", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getPacks();
  }, []);
  useEffect(() => {
    if (props.packs != -1) setLoading(false);
  }, [props.packs]);

  async function getPackChart() {
    try {
      let response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/chartPack`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
      let data = await response.json();
      if (data.success) {
        let finalPacksCharts = {};
        await Promise.all(
          data.data.map(async (pack) => {
            finalPacksCharts[pack.id] = pack;
          })
        );
        props.setPacks({ ...finalPacksCharts });
      } else {
        console.log(data.error);
        props.toast.error("عذرا, حدث خطأ في السيرفر", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getPackChart();
  }, []);
  useEffect(() => {
    if (props.packChart != -1) setLoadingPackChart(false);
  }, [props.packChart]);

  async function deletePack(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
      const data = await response.json();
      if (data.success) {
        delete props.packs[id];
        props.setPacks({ ...props.packs });
        props.toast.success("تم حذف الباقة", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      props.toast.error("عذرا, حدث خطأ ما", {
        position: props.toast.POSITION.TOP_CENTER,
      });
      console.log(err);
    }
  }

  try {
    return (
      <>
        {loading ? (
          <div class="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            {items.map((item) => {
              return item;
            })}
            <div
              onClick={() => {
                setCurrentEdit(false);
                setAddNew(true);
              }}
            >
              add pack
            </div>
            {addNew ? (
              <>
                <AddPack packs={props.packs} setPacks={props.setPacks} setAddNew={setAddNew} userInformation={props.userInformation} navigate={props.navigate} toast={props.toast} />
              </>
            ) : null}
            {currentEdit ? (
              <>
                <UpdatePack packs={props.packs} setPacks={props.setPacks} currentEdit={props.packs[currentEdit]} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} navigate={props.navigate} toast={props.toast} />
              </>
            ) : null}

            {loadingPackChart ? "loading pack chart...." : "loaded"}
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Packs;
