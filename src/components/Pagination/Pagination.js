import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
import * as CONSTANTS from '../../constants';

const Pagination = (props) => {

    const { paginationClickHandler, pageNumber, numberOfPages } = props;

    return (
        <div className="Pagination">
            <button className="Pagination-button" onClick={() => paginationClickHandler(CONSTANTS.PREV_PAGE)} disabled={pageNumber <= 1 }>
                &larr;
            </button>
            <span className="Pagination-info">Page {pageNumber} out of {numberOfPages}</span>
            <button className="Pagination-button" onClick={() => paginationClickHandler(CONSTANTS.NEXT_PAGE)}>
                &rarr;
            </button>
        </div>
    )
};

Pagination.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    paginationClickHandler: PropTypes.func.isRequired
};

export default Pagination;