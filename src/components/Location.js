import React, { Component } from "react";
import { default as tt } from "@tomtom-international/web-sdk-services";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Whether from "./Whether";
import Wrapper from "./Wrapper";
import { VueWrapper } from "vuera";
import { VueInReact } from "vuera";

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [],
      searchResults: [],
      selectvalue: [],
    };
  }

  onSearchChange = async (searchVal) => {
    tt.services
      .fuzzySearch({
        key: "EHANXhGIfNSg4XiOMGskUA59ofuqAVJs",
        query: searchVal,
      })
      //   .go()
      .then((res) => {
        const amendRes = res.results;
        let arr = [];
        amendRes.map((item) => {
          const position = item.position;
          arr.push({
            label: item.address.freeformAddress,
            lat: position.lat,
            lng: position.lng,
            id: item.id,
          });
          return item;
        });
        this.setState({ searchResults: arr });
      })
      .catch((err) => {
        console.log("----err", err);
      });
  };

  onLocationChange = (event, values) => {
    let val = this.state.selectvalue;
    values.show = true;
    val.push(values);
    this.setState({
      selectvalue: val,
    });
  };

  onRemove = (e, id, key) => {
    e.preventDefault();
    if (id) {
      this.state.selectvalue.map((item) => {
        if (item && item.id === id) item.show = false;
        return item;
      });

      this.setState({
        selectvalue: this.state.selectvalue,
      });
    }
  };

  render() {
    const { searchResults, selectvalue } = this.state;
    const showVal =
      selectvalue.length > 0
        ? selectvalue.filter((item) => item.show).length
        : 0;
    return (
      <div>
        <h2>Whether Information</h2>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={searchResults}
          sx={{ width: 500 }}
          onChange={this.onLocationChange}
          onInputChange={(e) => this.onSearchChange(e.target.value)}
          renderInput={(params) => <TextField {...params} label="Location" />}
          className="autoSelect"
          value={null}
        />
        {showVal ? (
          <div className="cardWrapper">
            {selectvalue.map((value, key) => (
              <Whether
                {...{ value, searchResults, onRemove: this.onRemove, key }}
              />
            ))}
          </div>
        ) : (
          <div style={{ marginTop: "5rem" }}>No data to display</div>
        )}
        <div>
          <Wrapper />
        </div>
      </div>
    );
  }
}
