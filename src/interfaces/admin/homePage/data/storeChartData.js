import { FaUser } from "react-icons/fa";

export const storeChartData = {
  unit: " محل ",
  title: "عدد المحلات",
  color: {
    backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
    boxShadow: "0px 10px 20px 0px #FDC0C7",
  },
  barValue: 100,
  value: "7",
  png: FaUser,
  series: [
    {
      name: "عدد المحلات",
      data: [5, 9, 7],
    },
  ],
  categories: ["8-9-2023", "8-10-2023", "8-11-2023"],
  loading: false,
  options: {
    chart: {
      type: "area",
      height: "auto",
    },

    dropShadow: {
      enabled: false,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 3,
      color: "#000",
      opacity: 0.35,
    },

    fill: {
      colors: ["#000"],
      // type: "gradient",
      // gradient: {
      //   shade: "dark",
      //   type: "horizontal",
      //   shadeIntensity: 0.5,
      //   gradientToColors: true, // optional, if not defined - uses the shades of same color in series
      //   inverseColors: true,
      //   opacityFrom: 1,
      //   opacityTo: 1,
      //   stops: [0, 50, 100],
      //   colorStops: [
      //     {
      //       offset: 0,
      //       color: "red",
      //     },
      //     {
      //       offset: 50,
      //       color: "yellow",
      //     },
      //     {
      //       offset: 100,
      //       color: "blue",
      //     },
      //   ],
      // },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["white", "black"],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    grid: {
      show: true,
    },
    xaxis: {
      // type: "datetime",
      categories: ["8-8-2023", "8-9-2023", "8-10-2023"],
    },
    yaxis: [
      {
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    ],
  },
};
