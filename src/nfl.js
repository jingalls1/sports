import React from "react";
import "./nfl.css";
import { Component } from "react";

const API = "https://www.reddit.com/r/nflstreams.json";

export default class NFL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redditData: [],
      defaultQuery: "redux",
      text: "",
      loading: false,
      comments: ""
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data =>
        this.setState({ redditData: data.data.children, loading: true })
      );
  }
  /*
  commentGrabber = link => {
    fetch(link)
      .then(response => response.json())
      .then(response => {
        //console.log(response[1])
        let commentsArr = response[1].data.children;
        console.log(commentsArr);
        let filteredComments = commentsArr.filter(comment =>
          comment.data.body.includes("http")
        );
        console.log(filteredComments);
        //from here, you'll just grab the replies
        //possibly do a filter to find out if theres links in the body
        //then return in the fetch link
        let theArr = [];
        return filteredComments.map(hit =>
          //<div>{JSON.stringify(hit.data.body)} </div>
          //LAST WORKED OVER HERE
          console.log(hit.data.body)
        );
      });
    //bring it back with a return statement
  };
*/
  sendLink = link => {
    this.commentGrabber(link);
  };

  commentGrabber = async link => {
    try {
      const data1 = await fetch(link);
      const data2 = await data1.json();
      const data3 = await (function() {
        console.log("this is the", data2);
        let commentsArr = data2[1].data.children;
        let filteredComments = commentsArr.filter(comment =>
          comment.data.body.includes("http")
        );
        return filteredComments.map(hit => hit.data.body);
      })();
      //console.log(data3);
      let toSend = JSON.stringify(data3);
      this.doSomething(toSend);
    } catch (err) {
      console.log(err);
    }
  };

  doSomething = sentData => {
    //console.log(sentData);
    let createString = sentData.toString();
    let links = createString.match(/\bhttps?:\/\/\S+/gi);
    //console.log(links);
    this.setState({ comments: links.toString() });
  };

  renderList = threads => {
    if (threads.length === 0) {
      return (
        <li>
          {" "}
          <div> No NFL games going on right now </div>{" "}
        </li>
      );
    } else {
      return threads.map(hit => (
        <li key={hit.data.created_utc}>
          <a href={hit.data.url} target="_blank">
            {hit.data.title}
          </a>

          <div className="italicize">{this.state.comments}</div>
          {this.sendLink(hit.data.url + ".json")}
        </li>
      ));
    }
  };

  render() {
    const threads = this.state.redditData.filter(
      game => game.data.link_flair_text === "Game Thread"
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
    if (!this.state.loading) {
      content = (
        <div className="loading">
          <br />
          <br />
          <h1> finding NFL games </h1>
        </div>
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
            NFL Games for {days[d.getDay()]}, {months[d.getMonth()]}{" "}
            {d.getDate()}
          </h2>
          <ol className="center">{this.renderList(threads)}</ol>
          <div> </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}
