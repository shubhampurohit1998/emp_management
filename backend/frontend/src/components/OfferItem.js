import React from "react";
import {useHistory} from 'react-router-dom'
const OfferItem = (props) => {
  const { description, price } = props.details;
  const history = useHistory()
  const goToPayment = (price, description) => {
    history.push(`/pay/${price}/${description}`)
  }
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src="..." alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{price}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-primary" onClick={() => goToPayment(price, description)}>
          Buy now
        </button>
        <button
          type="button"
          className="btn btn-dark"
          style={{ margin: "5px" }}
        >
          Save for later
        </button>
      </div>
    </div>
  );
};

export default OfferItem;
