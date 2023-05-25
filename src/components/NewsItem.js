import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div>
        <div
          className="card my-4"
          // style={{ width: "18rem" }}
        >
          <div style={{ height: "250px" }}>
            <img
              src={imageUrl}
              className="card-img-top"
              alt="image_one"
              style={{ width: "100%", margin: "auto", maxHeight: "250px" }}
            />
          </div>

          <div className="card-body">
            <div
              className="my-3"
              // style={{ height: "80px" }}
            >
              <h5 className="card-title text-truncate"> {title}</h5>
              <p className="card-text text-truncate">{description}</p>
            </div>

            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
