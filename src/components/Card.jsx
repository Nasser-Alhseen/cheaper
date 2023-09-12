import React, { useState } from "react";
import "../css/Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import LoadingChart from "./LoadingChart";
// import CircleChart from "../CircleChart";

// parent Card
const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  try {
    return <>{expanded ? <ExpandedCard param={props} setExpanded={setExpanded} expanded={expanded} /> : <CompactCard param={props} setExpanded={setExpanded} expanded={expanded} />}</>;
  } catch (err) {
    console.log(err);
  }
};

// Compact Card
function CompactCard({ param, setExpanded, expanded }) {
  const Png = param.png;
  try {
    return (
      <motion.div
        className="CompactCard"
        style={{
          background: param.color.backGround,
          boxShadow: param.color.boxShadow,
        }}
        layoutId={"expandableCard" + param.index}
        onClick={() => setExpanded(!expanded)}
        layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* <div className="chartIcon">
          
        </div> */}
        <CircularProgressbar value={param.barValue} text={param.loading ? "loading" : param.value} />
        {/* <CircleChart percentage={param.barValue} color={"blue"} /> */}
        <span>
          {param.title} <Png />
        </span>

        {/* <div className="detail">
          <Png />
          <span>
            {param.loading ? "loading" : param.value}
            <i>{param.unit}</i>
          </span>
          <span>اخر شهر</span>
        </div> */}
      </motion.div>
    );
  } catch (err) {
    console.log(err);
  }
}

// Expanded Card
function ExpandedCard({ param, setExpanded, expanded }) {
  try {
    return (
      <motion.div
        className="ExpandedCard"
        style={{
          background: param.color.backGround,
          boxShadow: param.color.boxShadow,
        }}
        layoutId={"expandableCard" + param.index}
        layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
          <UilTimes onClick={() => setExpanded(!expanded)} />
        </div>
        <span>{param.title}</span>
        <div className="chartContainer">{param.loading ? <LoadingChart /> : <Chart options={param.options} series={param.series} type="area" />}</div>
        <span>كل الأشهر</span>
      </motion.div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Card;
