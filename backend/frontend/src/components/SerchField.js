import React from "react";

const Search = (props) => {
  const { changeValue, changeFunction, clickFunction } = props;
  return (
    <div>
      <form>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInput">
              Name
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="inlineFormInput"
              value={changeValue}
              onChange={changeFunction}
              placeholder="Search..."
            />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-primary mb-2" onClick={(e) => clickFunction(e)} >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
