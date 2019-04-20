// jshint esversion: 6
import React from "react";
import NBA from "./nba.js";
import MLB from "./mlb.js";
import NFL from "./nfl.js";
import Soccer from "./soccer.js";
import { Button } from "@material-ui/core";
import "./styles.css";
import ReactDOM from 'react-dom';
import { Component } from "react";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "start"
    };
  }

  basketballHandler = () => {
    //
    this.setState({ content: "nba" });
  };
  baseballHandler = () => {
    this.setState({ content: "mlb" });
  };
  footballHandler = () => {
    this.setState({ content: "nfl" });
  };
  soccerHandler = () => {
    this.setState({ content: "soccer" });
  };

  setContent = () => {
    if (this.state.content === "nba") {
      return <NBA />;
    } else if (this.state.content === "mlb") {
      return <MLB />;
    } else if (this.state.content === "nfl") {
      return <NFL />;
    } else if (this.state.content === "soccer") {
      return <Soccer />;
    }
  };

  render() {
    return (
      <div className="App">
        <br style={{ lineHeight: "1.5" }} />
        <h1>What sport you wanna watch?</h1>
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "orange",
            borderRadius: "40px"
          }}
          onClick={this.basketballHandler}
        >
          Watch NBA Basketball
        </Button>
        &nbsp;&nbsp;
        <br style={{lineHeight: "1"}}/>
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "blue",
            borderRadius: "40px"
          }}
          onClick={this.baseballHandler}
        >
          Watch mlb baseball
        </Button>
        <br style={{ lineHeight: "1" }} />
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "brown",
            borderRadius: "40px"
          }}
          onClick={this.footballHandler}
        >
          Watch NFL football
        </Button>
        &nbsp;&nbsp;
        <br style={{lineHeight: "1"}}/>
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "gray",
            borderRadius: "40px"
          }}
          onClick={this.soccerHandler}
        >
          Watch Soccer
        </Button>
        <br style={{ lineHeight: "3" }} />
        {this.setContent()}
      </div>
    );
  }
}
