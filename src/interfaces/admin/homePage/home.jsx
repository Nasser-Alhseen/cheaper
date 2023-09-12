import { useEffect, useState } from "react";
import getCount from "./getCount";
import getCartChart from "./getCartChart";
import getCityChart from "./getCityChart";
import getStoreChart from "./getStoreChart";
import getUserChart from "./getUserChart";
import { genData } from "./data/data";
import Card from "../../../components/Card";
import Chart from "react-apexcharts";
import "./css/chartsContainer.css";

function Home(props) {
  const [loadingHomeCount, setLoadingHomeCount] = useState(true);
  const [loadingHomeUserChart, setLoadingHomeUserChart] = useState(true);
  const [loadingHomeStoreChart, setLoadingHomeStoreChart] = useState(true);
  const [loadingHomeCityChart, setLoadingHomeCityChart] = useState(true);
  const [loadingHomeCartChart, setLoadingHomeCartChart] = useState(true);

  const [cardsDataState, setCardsDataState] = useState(genData);

  useEffect(() => {
    getCount(props.userInformation, props.toast, props.setHomeCount);
  }, []);
  useEffect(() => {
    if (!props.homeCount.loading) setLoadingHomeCount(false);
  }, [props.homeCount]);

  useEffect(() => {
    // getCartChart(props.userInformation, props.toast, props.setHomeCartChart);
  }, []);
  useEffect(() => {
    if (!props.homeCartChart.loading) setLoadingHomeCartChart(false);
  }, [props.homeCartChart]);

  useEffect(() => {
    getCityChart(props.userInformation, props.toast, props.setHomeCityChart);
  }, []);
  useEffect(() => {
    if (!props.homeCityChart.loading) setLoadingHomeCityChart(false);
  }, [props.homeCityChart]);

  useEffect(() => {
    // getStoreChart(props.userInformation, props.toast, props.setHomeStoreChart);
  }, []);
  useEffect(() => {
    if (!props.homeStoreChart.loading) setLoadingHomeStoreChart(false);
  }, [props.homeStoreChart]);

  useEffect(() => {
    // getUserChart(props.userInformation, props.toast, props.setHomeUserChart);
  }, []);
  useEffect(() => {
    if (!props.homeUserChart.loading) setLoadingHomeUserChart(false);
  }, [props.homeUserChart]);

  const testData = {};

  try {
    return (
      <>
        <div className="cards">
          <div className="admin-home-charts-container">
            <Card index={1} unit={props.homeUserChart.unit} title={props.homeUserChart.title} color={props.homeUserChart.color} barValue={props.homeUserChart.barValue} value={props.homeUserChart.value} png={props.homeUserChart.png} series={props.homeUserChart.series} categories={props.homeUserChart.categories} loading={props.homeUserChart.loading} options={props.homeUserChart.options} />
            <Card index={2} unit={props.homeStoreChart.unit} title={props.homeStoreChart.title} color={props.homeStoreChart.color} barValue={props.homeStoreChart.barValue} value={props.homeStoreChart.value} png={props.homeStoreChart.png} series={props.homeStoreChart.series} categories={props.homeStoreChart.categories} loading={props.homeStoreChart.loading} options={props.homeStoreChart.options} />
            <Card index={3} unit={props.homeCartChart.unit} title={props.homeCartChart.title} color={props.homeCartChart.color} barValue={props.homeCartChart.barValue} value={props.homeCartChart.value} png={props.homeCartChart.png} series={props.homeCartChart.series} categories={props.homeCartChart.categories} loading={props.homeCartChart.loading} options={props.homeCartChart.options} />
            <Card index={4} unit={props.homeCartChart.unit} title={props.homeCartChart.title} color={props.homeCartChart.color} barValue={props.homeCartChart.barValue} value={props.homeCartChart.value} png={props.homeCartChart.png} series={props.homeCartChart.series} categories={props.homeCartChart.categories} loading={props.homeCartChart.loading} options={props.homeCartChart.options} />
          </div>

          <div
            className="cityChart"
            style={{
              background: props.homeCityChart.color.backGround,
              boxShadow: props.homeCityChart.color.boxShadow,
            }}
            //   layoutId={"expandableCard" + 3}
            //   layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <span>{"توزع المحلات على المدن"}</span>
            <div className="chartContainer">{props.homeCityChart.loading ? "loading" : <Chart options={props.homeCityChart.options} series={props.homeCityChart.options.series} type="bar" />}</div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Home;
