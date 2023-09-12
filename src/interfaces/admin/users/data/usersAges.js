import { FaUser } from "react-icons/fa";

export const usersAges = {
  unit: " المستخدمين ",
  title: "عدد المستخدمين",
  color: {
    backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
    boxShadow: "0px 10px 20px 0px #FDC0C7",
  },
  barValue: 100,
  value: "9",
  png: FaUser,
  series: [44, 55, 41, 17, 15],
  chartOptions: {
    labels: ["Apple", "Mango", "Orange", "Watermelon"],
  },
  loading: false,
  options: {
    chart: {
      type: "donut",
    },
  },
};
