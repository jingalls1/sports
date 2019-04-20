import React from "react";
import "./mlb.css";
import { Component } from "react";

const API = "https://www.reddit.com/r/MLBStreams.json";

class MLB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redditData: [],
      defaultQuery: "redux",
      text: "",
      loading: true
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data =>
        this.setState({ redditData: data.data.children, loading: false })
      );
  }

  removeGameThread = title => {
    let newTitle = title.replace("Game Thread: ", "Watch the ");
    return newTitle;
  };

  renderListOfGames = threads => {
    if (threads.length === 0) {
      return <div> No baseball games going on right now. Sorry bro! </div>;
    } else {
      return threads.map(hit => (
        <li key={hit.data.created_utc}>
          <a href={hit.data.url} target="_blank" style={{ fontWeight: "bold" }}>
            {this.removeGameThread(hit.data.title)}
          </a>

          <div className="italicize">click above to find stream links</div>
        </li>
      ));
    }
  };

  render() {
    let reg = /^Game/;
    const threads = this.state.redditData.filter(basketball =>
      reg.test(basketball.data.title)
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
    let content;
    if (this.state.loading) {
      content = (
        <div>
          <h2 className="loading">
            {" "}
            grabbing all the latest mlb games, hold up!!
          </h2>
          <div className="loader" />{" "}
        </div>
      );
    } else {
      content = (
        <div>
          <h2
            onClick={() => window.open("https://campusstreams.ga")}
            className="weather"
          >
            {" "}
            MLB Games for {days[d.getDay()]}, {months[d.getMonth()]}{" "}
            {d.getDate()}
          </h2>
          <ol className="center">{this.renderListOfGames(threads)}</ol>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default MLB;
