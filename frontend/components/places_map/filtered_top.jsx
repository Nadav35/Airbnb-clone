import React from 'react';

const FilteredTop = ({ currentUser, spots}) => {
  if (spots.length === 0) {
    return (
      <div className="top-filter">
        <h1>Sorry, no spots were found</h1>
        <img src={window.sad_face} alt="sad face"></img>
      </div>
    );
  } else {
    return (
      <div className="found-spots">
        <h1>Here are your search results, {currentUser.username}</h1>
      </div>
    );
  }
};

export default FilteredTop;