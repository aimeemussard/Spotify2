import React from 'react';
 
const Pagination = ({ resultsPerPage, totalResults, paginate, previous, next }) => {
   const pages = [];
 
   for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
      pages.push(i);
   }
 
   return (
      <div className="pagination-container">
        <button type='button' onClick={previous} className="pagination-button">Précédent</button>
        {pages.map((number) => (
            <button type='button' key={number} onClick={() => paginate(number)} className="pagination-button">{number}</button>
        ))}
        <button type='button' onClick={next} className="pagination-button">Suivant</button>
      </div>
   );
};
 
export default Pagination;