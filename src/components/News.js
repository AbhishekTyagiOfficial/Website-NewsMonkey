import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalFirstLatter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log(
      "This is super constructer. if we use constructure then we must use the super method."
    );
    this.state = {
      articles: [],
      loading: false, // using reload time
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalFirstLatter(
      this.props.category
    )} - NewsMonkey`;
  }

  // componentDidMount() is life cycle method, it is run after render method
  async componentDidMount() {
    console.log("cdm");
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de3a0b0e4ed54c36b5026c9872d7b63c&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let pd = await data.json();
    console.log(pd);
    this.setState({
      articles: pd.articles,
      totalResults: pd.totalResults, //pd = parsedData
      loading: false,
    });
  }

  // handlePrevClick = async () => {
  //   console.log("Prev");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=de3a0b0e4ed54c36b5026c9872d7b63c&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let pd = await data.json();
  //   console.log(pd);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: pd.articles,
  //     loading: false,
  //   });
  // };
  // handleNextClick = async () => {
  //   console.log("Next");
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${
  //       this.props.category
  //     }&apiKey=de3a0b0e4ed54c36b5026c9872d7b63c&page=${
  //       this.state.page + 1
  //     } &pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let pd = await data.json();
  //     console.log(pd);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: pd.articles,
  //       loading: false,
  //     });
  //   }
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    console.log("cdm");
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de3a0b0e4ed54c36b5026c9872d7b63c&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let pd = await data.json();
    console.log(pd);
    this.setState({
      articles: this.state.articles.concat(pd.articles),
      totalResults: pd.totalResults, //pd = parsedData
      loading: false,
    });
  };

  render() {
    // console.log("render");
    return (
      <>
        <h3 className="text-center my-3">
          NewsMokey - Top Headlines from {this.props.category}
        </h3>
        {/* {this.state.loading ? <Spinner /> : ""} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-5">
              {
                // this.state.loading
                // ? ""
                // :
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4 " key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 50) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 100)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://c.ndtvimg.com/2023-05/t7okl8dg_ms-dhoni-and-hardik-pandya-bcci_625x300_23_May_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675"
                        }
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-primary "
            onClick={this.handlePrevClick}
            style={{
              marginleft: "4rem ",
            }}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-primary "
            onClick={this.handleNextClick}
            style={{
              marginRight: "10px",
            }}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
