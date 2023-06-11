import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function Whether(props) {
  const [data, setData] = useState([]);

  const { value, onRemove, key } = props;
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${value.lat}&lon=${value.lng}&units=metric&APPID=04ef3166fe68ee18047ef296dfa3b27b&units=metric`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchData();
  }, [value.lat, value.lng]);
  console.log(data.main);
  return data && data.main && value && value.label && value.show ? (
    <Card sx={{ minWidth: 275 }} className="card" key={key}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          style={{ marginBottom: "6px" }}
        >
          City Name: <span style={{ fontWeight: "bold" }}>{value.label}</span>
        </Typography>
        <Divider />
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          style={{ marginBottom: "6px" }}
        >
          Temprature:{" "}
          <span style={{ fontWeight: "bold" }}>{data.main.temp}</span> (degree
          Celcius)
        </Typography>
        <Divider />
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          style={{ marginBottom: "6px" }}
        >
          Feels like:{" "}
          <span style={{ fontWeight: "bold" }}>{data.main.feels_like}</span>{" "}
          (degree Celcius)
        </Typography>
        <Divider />
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          style={{ marginBottom: "6px" }}
        >
          Ground level:{" "}
          <span style={{ fontWeight: "bold" }}>{data.main.grnd_level}</span>
        </Typography>
        <Divider />
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          style={{ marginBottom: "6px" }}
        >
          Humidity:{" "}
          <span style={{ fontWeight: "bold" }}>{data.main.humidity}</span>
        </Typography>
        <Divider />
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          style={{ marginBottom: "6px" }}
        >
          Pressure:{" "}
          <span style={{ fontWeight: "bold" }}>{data.main.pressure}</span>
        </Typography>
        <Divider />
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Sea level:{" "}
          <span style={{ fontWeight: "bold" }}>{data.main.sea_level}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          style={{ marginLeft: "6rem" }}
          onClick={(e) => onRemove(e, value.id, key)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  ) : null;
}
