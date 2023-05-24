import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class extends Component {
  articles = [
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];

  constructor() {
    super();
    console.log(
      "This is super constructer. if we use constructure then we must use the super method."
    );
    this.state = {
      articles: this.articles,
    };
  }

  // componentDidMount() is life cycle method, it is run after render method
  async componentDidMount() {
    console.log("cdm");
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=de3a0b0e4ed54c36b5026c9872d7b63c";
    let data = await fetch(url);
    let pd = await data.json();
    console.log(pd);
    this.setState({ articles: pd.articles });
  }
  render() {
    // console.log("render");
    return (
      <div className="container my-4">
        <h3>This is our news components.</h3>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={
                    element.description ? element.description.slice(0, 70) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://c.ndtvimg.com/2023-05/t7okl8dg_ms-dhoni-and-hardik-pandya-bcci_625x300_23_May_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
