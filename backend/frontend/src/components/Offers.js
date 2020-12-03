import React from "react";
import OfferItem from "./OfferItem";
const Offers = (props) => {
  const { list } = props;
  const items = list.map((item) => (
    <div className="col-md-4" key={item.id}>
      <OfferItem details={item} />
    </div>
  ));
  return (
    <>
      We have Amazing collection of pirated ebooks
      <div className="row">{items}</div>
    </>
  );
};

export default Offers;
