import { FaUser } from "react-icons/fa";

export const cityChartData = {
  unit: " باقة ",
  title: "عدد الباقات",
  color: {
    backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
    boxShadow: "0px 10px 20px 0px #FDC0C7",
  },
  barValue: 100,
  value: "9",
  png: FaUser,
  options: {
    chart: {
      type: "bar",
      height: "auto",
    },

    series: [
      {
        name: "عدد المحلات في المدينة",
        data: [
          {
            x: "حمص",
            y: 10,
          },
          {
            x: "دمشق",
            y: 18,
          },
          {
            x: "حلب",
            y: 13,
          },
          {
            x: "حمص",
            y: 10,
          },
          {
            x: "دمشق",
            y: 18,
          },
          {
            x: "حلب",
            y: 13,
          },
          {
            x: "حمص",
            y: 10,
          },
          {
            x: "دمشق",
            y: 18,
          },
          {
            x: "حلب",
            y: 13,
          },
          {
            x: "حمص",
            y: 10,
          },
          {
            x: "دمشق",
            y: 18,
          },
          {
            x: "حلب",
            y: 13,
          },
        ],
      },
    ],
  },
  loading: false,
};
