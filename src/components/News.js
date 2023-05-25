import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class extends Component {
  constructor() {
    super();
    console.log(
      "This is super constructer. if we use constructure then we must use the super method."
    );
    this.state = {
      articles: [],
      loading: false, // using reload time
      page: 1,
    };
  }

  // componentDidMount() is life cycle method, it is run after render method
  async componentDidMount() {
    console.log("cdm");
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=de3a0b0e4ed54c36b5026c9872d7b63c&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let pd = await data.json();
    console.log(pd);
    this.setState({
      articles: pd.articles,
      totalResults: pd.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=de3a0b0e4ed54c36b5026c9872d7b63c&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let pd = await data.json();
    console.log(pd);
    this.setState({
      page: this.state.page - 1,
      articles: pd.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    console.log("Next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=de3a0b0e4ed54c36b5026c9872d7b63c&page=${
        this.state.page + 1
      } &pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let pd = await data.json();
      console.log(pd);
      this.setState({
        page: this.state.page + 1,
        articles: pd.articles,
        loading: false,
      });
    }
  };

  render() {
    // console.log("render");
    return (
      <div className="container my-4">
        <h3 className="text-center">This is our news components.</h3>
        {this.state.loading ? <Spinner /> : ""}
        <div className="row my-5">
          {this.state.loading
            ? ""
            : this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 30) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 70)
                          : ""
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
        <div className="container my-4">
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              className="btn btn-primary"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              className="btn btn-primary"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
