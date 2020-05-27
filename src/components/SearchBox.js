import React from 'react';

const SearchBox = ({searchChange}) => {
    return (
      <div className="pa2">
      <input className="pa3 ba b--green bg-lightest-blue"
        type="search"
        placeholder="search robots"
        onChange={searchChange}//listen to the input event change
       />
      </div>
      );

}
export default SearchBox;
