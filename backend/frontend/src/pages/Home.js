import Offers from "../components/Offers";
import React, { Component } from "react";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      offers: [],
      error: null,
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/publisher-offers/", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ offers: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }
  render() {
    const { error, loading, offers } = this.state;
    // console.log(offers)
    const result = loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error}!</div>
    ) : offers ? (
      <Offers list={offers} />
    ) : (
      <div>There is no offers</div>
    );
    return <div className="container">{result}</div>;
  }
}

export default Home;
