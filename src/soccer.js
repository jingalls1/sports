import React from "react";
import ReactDOM from "react-dom";
import "./soccer.css";
import { Component } from "react";

const API = "https://www.reddit.com/r/soccerstreams__/.json";

export default class Soccer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redditData: [],
      defaultQuery: "redux",
      text: ""
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ redditData: data.data.children }));
  }

  render() {
    let reg = /^\[/;
    const threads = this.state.redditData.filter(soccer =>
      reg.test(soccer.data.title)
    );
    let d = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    return (
      <div>
        {/*<h2> Example Shit </h2>
        <ol>
          {this.state.redditData.map(hit => (
            <li key={hit.data.created_utc}>
              <a href={hit.data.url}>{hit.data.title}</a>
            </li>
          ))}
        </ol>*/}
        <br />
        <h2
          onClick={() => window.open("https://campusstreams.ga")}
          className="weather"
        >
          {" "}
          Soccer Games for {days[d.getDay()]}, {months[d.getMonth()]}{" "}
          {d.getDate()}
        </h2>
        <ol className="center">
          {threads.map(hit => (
            <li key={hit.data.created_utc}>
              <a
                href={hit.data.url}
                target="_blank"
                style={{ fontWeight: "bold" }}
              >
                {hit.data.title}
              </a>

              <div className="italicize">
                click the game above to find links
              </div>
            </li>
          ))}
        </ol>
        <div> </div>
      </div>
    );
  }
}
