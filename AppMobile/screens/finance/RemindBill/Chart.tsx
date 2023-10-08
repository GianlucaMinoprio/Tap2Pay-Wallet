import React, { memo } from "react";
import { StyleSheet } from "react-native";
import useLayout from "hooks/useLayout";

import HighchartsReactNative from "@highcharts/highcharts-react-native";

import { dataChart } from "./data";

const ChartLine = memo(() => {
  const { width } = useLayout();

  const options = {
    chart: {
      type: "spline",
      scrollablePlotArea: {
        minWidth: width * 2,
        scrollPositionX: 1,
      },
      animation: true,
      backgroundColor: "#1F2933",
      style: {
        fontFamily: "Overpass",
        fontSize: "30px",
      },
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      labels: {
        overflow: "justify",
      },
      gridLineColor: "#363E49",
      gridLineDashStyle: "Dash",
      gridLineWidth: 0,
      lineWidth: 0,
      tickLength: 0,
      title: {
        text: "",
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      minorGridLineWidth: 0,
      gridLineWidth: 1,
      gridLineColor: "#3E4C59",
      alternateGridColor: null,
    },
    tooltip: {
      valueSuffix: " ",
      animation: true,
      backgroundColor: "#323F4B",
      borderColor: undefined,
      borderRadius: 24,
      borderWidth: 0,
      crosshairs: true,
      shape: "callout",
      headerFormat:
        '<td style="font-size: 15px"><b>{point.key}</b></td></tr><br>',
      pointFormat: '<td style="text-align: right"><b>${point.y}</b></td></tr>',
      dateTimeLabelFormats: {},
      style: {
        color: "#FFFFFF",
        fontSize: 10,
      },
    },
    plotOptions: {
      spline: {
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 4,
          },
        },
        marker: {
          enabled: false,
        },
        pointStart: Date.UTC(2021, 0, 1),
        pointIntervalUnit: "day",
      },
    },
    credits: {
      text: "",
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Expense",
        data: dataChart,
      },
    ],
    navigation: {
      menuItemStyle: {
        fontSize: "0px",
      },
    },
  };

  return (
    <>
      <HighchartsReactNative
        styles={styles.chart}
        options={options}
        useSSL
        useCDN
      />
    </>
  );
});

export default ChartLine;

const styles = StyleSheet.create({
  chart: {
    marginTop: 32,
    height: 250,
    flex: 1,
  },
});
