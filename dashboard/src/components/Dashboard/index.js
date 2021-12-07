import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  CircularProgress,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip } from "recharts";

import useStyles from "../../utils/styles";

import mock from "./mock";
import PageTitle from "../PageTitle/PageTitle";
import Widget from "../Widget/Widget";
import { Typography } from "../Wrappers/Wrappers";

export default () => {
  var classes = useStyles();
  var theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(mock);

  useEffect(() => {
    onReloadData();
  }, []);

  const onReloadData = () => {
    // TODO: Move this to an services!
    fetch("http://localhost:4000/game/summery")
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setData(res);
      });
  };

  return (
    <>
      {loading ? (
        <CircularProgress disableShrink />
      ) : (
        <Container maxWidth="lg">
          <PageTitle
            title="Dashboard"
            button={
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={() => onReloadData()}
              >
                Refresh
              </Button>
            }
          />
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Widget
                title="Rounds"
                upperTitle
                disableWidgetMenu
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <div className={classes.visitsNumberContainer}>
                  <Typography size="xl" weight="medium">
                    {data.totalRounds}
                  </Typography>
                </div>
              </Widget>
            </Grid>
            <Grid item xs={6}>
              <Widget
                title="Users"
                upperTitle
                disableWidgetMenu
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <div className={classes.performanceLegendWrapper}>
                  <Grid container item alignItems={"center"}>
                    <Typography size="xl" weight="medium">
                      {data.totalUsers}
                    </Typography>
                  </Grid>
                </div>
              </Widget>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <Widget disableWidgetMenu>
                <Table className="mb-0">
                  <TableHead>
                    <TableRow>
                      <TableCell key={"id"}>Id</TableCell>
                      <TableCell key={"username"}>Username</TableCell>
                      <TableCell key={"rounds"}>Rounds</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.playersTop5Rounds.map(({ _id, username, rounds }, index) => (
                      <TableRow key={index}>
                        <TableCell className="pl-3 fw-normal">{index + 1}</TableCell>
                        <TableCell>{username}</TableCell>
                        <TableCell>{rounds}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Widget>
            </Grid>
            <Grid item md={6} xs={12}>
              <Widget disableWidgetMenu>
                <Table className="mb-0">
                  <TableHead>
                    <TableRow>
                      <TableCell key={"id"}>Id</TableCell>
                      <TableCell key={"Username"}>Username</TableCell>
                      <TableCell key={"winRate"}>WinRate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.playersTop5WinRate.map(
                      ({ id, username, winRate }) => (
                        <TableRow key={id}>
                          <TableCell className="pl-3 fw-normal">{id}</TableCell>
                          <TableCell>{username}</TableCell>
                          <TableCell>{winRate}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Widget>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item lg={6} xs={12}>
              <Widget
                header={
                  <div className={classes.title}>
                    <Typography variant="h5">Rounds</Typography>

                    {/* <Select
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
                    </Select> */}
                  </div>
                }
                upperTitle
                bodyClass={classes.bodyWidgetOverflow}
              >
                <div className={classes.bottomStatsContainer}>
                  <BarChart
                    data={data.roundsWeekly}
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
                    <Bar
                      dataKey="rounds"
                      fill={theme.palette["secondary"].main}
                    >
                      <LabelList dataKey="rounds" position="top" />
                    </Bar>
                  </BarChart>
                </div>
              </Widget>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
