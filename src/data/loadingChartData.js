export const loadingChartData = {
  unit: " الأصناف ",
  title: "عدد المحلات",
  color: {
    backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
    boxShadow: "0px 10px 20px 0px #FDC0C7",
  },

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
      type: "gradient",
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
