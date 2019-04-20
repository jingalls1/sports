// jshint esversion: 6

import React from "react";
//import ReactDOM from "react-dom";
import "./nba.css";
import { Component } from "react";

const API = "https://www.reddit.com/r/nbastreams.json";
const topStream = "";
let regexPattern = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

class NBA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redditData: [],
      text: "",
      loading: true,
      comments: "",
      thread: [],
      num: 0,
      num2: 0,
      num3: 0,
      linksArr: [],
      dataArr: [],
      arr: [
        "first link",
        "second link",
        "third link",
        "fourth link",
        "fifth link",
        "sixth link",
        "seventh link"
      ]
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data =>
        this.setState({ redditData: data.data.children, loading: false })
      );
  }

  removeGtTitle = title => {
    return title.replace("Game Thread: ", "");
  };

  removeHTTP = title => {
    if (title.includes("https")) {
      let removeStart = title.replace("https://", "");
      let removeEnd = removeStart.split("/")[0];
      return removeEnd;
    } else {
      let removeStart = title.replace("http://", "");
      let removeEnd = removeStart.split("/")[0];
      return removeEnd;
    }
  };

  finalFunc = index => {
    let reg = /^Game/;
    const threads = this.state.redditData.filter(basketball =>
      reg.test(basketball.data.title)
    );
    if (threads.length === this.state.dataArr.length) {
      //console.log('SHITSTAIN',this.state.dataArr[index][1].data.children[1].data.body);
      let fuckyText = this.state.dataArr[index][1].data.children[1].data.body;
      let goodText = fuckyText.match(regexPattern);
      let fuckyText1 = this.state.dataArr[index][1].data.children[2].data.body;
      let goodText1 = fuckyText1.match(regexPattern);
      let fuckyText2 = this.state.dataArr[index][1].data.children[3].data.body;
      let goodText2 = fuckyText2.match(regexPattern);
      console.log(goodText[0]);

      //console.log(JSON.stringify(this.state.dataArr[index][1].data.children))
      return (
        <div>
          <a href={goodText[0]} target="_blank" className="italicize">
            live link #1 ({this.removeHTTP(goodText[0])})
          </a>
          <br />
          <a href={goodText1[0]} target="_blank" className="italicize">
            live link #2 ({this.removeHTTP(goodText1[0])})
          </a>
          <br />
          <a href={goodText2[0]} target="_blank" className="italicize">
            live link #3 ({this.removeHTTP(goodText2[0])})
          </a>
        </div>
      );
    }
  };

  dataObject = data => {
    //console.log(JSON.stringify(data));
    //console.log("the first link", this.state.num3);
    let stateArr = this.state.dataArr;
    let dataCopy = data.slice();
    stateArr.push(dataCopy);
    this.setState({ dataArr: stateArr });
    //console.log(data);
    //console.log("you beter fucking save 1:36am 3/20/19");
  };

  componentDidUpdate() {
    let reg = /^Game/;
    const threads = this.state.redditData.filter(basketball =>
      reg.test(basketball.data.title)
    );
    let commentArr = [];
    if (this.state.num < threads.length) {
      for (let i = 0; i < threads.length; i++) {
        commentArr.push(threads[i].data.url);
      }
      this.setState({ num: this.state.num + 1, linksArr: commentArr });
    }
    //console.log(this.state.linksArr.length);
    if (this.state.num2 < 1 && this.state.linksArr.length > 0) {
      //do the shit in here only once
      //allows you to update the state in the didUpdate()
      for (let i = 0; i < this.state.linksArr.length; i++) {
        //fetch in here each of comment links
        //console.log(this.state.linksArr[0]);
        fetch(this.state.linksArr[i] + ".json")
          .then(response => response.json())
          .then(data => this.dataObject(data));
        this.setState({ num3: this.state.num3 + 1 });
      }
      this.setState({ num2: this.state.num2 + 1 });
    }
    // console.log('num of threads',threads.length)
    // console.log('num of data arr',this.state.dataArr.length)
    if (threads.length === this.state.dataArr.length) {
      console.log("cant believe you got this far");
      // console.log(this.state.dataArr);
      // //the first array index value will actually be the map index
      // console.log(this.state.dataArr[0][1].data.children[1].data.body);
    }
  }

  renderList = threads => {
    if (threads.length === 0) {
      return <li> No NBA games goin on right now. Check back later! </li>;
    } else {
      return threads.map((hit, index) => (
        <li key={hit.data.created_utc}>
          <a href={hit.data.url} target="_blank" className="boldTitle">
            {this.removeGtTitle(hit.data.title)}
          </a>

          {/*<div> {this.state.arr[index]} </div> */}
          <div> {this.finalFunc(index)} </div>
          <br />
        </li>
      ));
    }
  };

  render() {
    /*const threads = this.state.redditData.filter(
      game => game.data.link_flair_css_class === "gamethread"
    );
    */
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
        <h2 className="loading">
          {" "}
          grabbing all the latest nba games, hold up! <br />
          <br />
          <br />
          <div className="loader"> </div>
        </h2>
      );
    } else {
      content = (
        <div>
          <br />
          <h2
            onClick={() => window.open("https://campusstreams.ga")}
            className="weather"
          >
            {" "}
            NBA Games for {days[d.getDay()]}, {months[d.getMonth()]}{" "}
            {d.getDate()}
          </h2>
          <ol className="center">{this.renderList(threads)}</ol>
        </div>
      );
    }
    return <div> {content} </div>;
  }
}

export default NBA;
