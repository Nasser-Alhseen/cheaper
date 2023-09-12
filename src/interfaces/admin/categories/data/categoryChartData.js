import { FaUser } from "react-icons/fa";

export const categoryChartData = {
  unit: " الأصناف ",
  title: "عدد المحلات",
  color: {
    backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
    boxShadow: "0px 10px 20px 0px #FDC0C7",
  },
  barValue: 100,
  value: "73",
  png: FaUser,
  series: [
    {
      name: "عدد المحلات",
      data: [],
    },
  ],
  categories: [],
  loading: true,
  options: {
    chart: {
      type: "area",
      width: 100,
      height: 100,
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
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: true, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#ff962c",
          },
          {
            offset: 100,
            color: "white",
            opacity: ".6",
          },
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["white", "black"],
    },
    point: {
      backgroundColor: "#00c7d6",
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
      categories: [],
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
