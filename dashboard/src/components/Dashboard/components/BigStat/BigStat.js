import React, { useState } from "react";

import { Select, MenuItem, Input } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

export default function BigStat(props) {
  var { roundsWeekly } = props;
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [value, setValue] = useState("weekly");

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">Rounds</Typography>

          <Select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            input={
              <Input
                disableUnderline
                classes={{ input: classes.selectInput }}
              />
            }
            className={classes.select}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </div>
      }
      upperTitle
      bodyClass={classes.bodyWidgetOverflow}
    >
      <div className={classes.bottomStatsContainer}>
        <BarChart
          data={roundsWeekly}
          width={550}
          height={250}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rounds" fill={theme.palette["secondary"].main}>
            <LabelList dataKey="rounds" position="top" />
          </Bar>
        </BarChart>
      </div>
    </Widget>
  );
}

// #######################################################################

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
