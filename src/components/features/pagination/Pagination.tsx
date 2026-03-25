import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginateProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selectedPage: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({ pageCount, currentPage, onPageChange }) => {
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1); // ReactPaginate is 0-indexed, but backend is 1-indexed
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={7}
            pageCount={pageCount}
            forcePage={currentPage - 1} // Sync current page state to visual UI
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            activeClassName="active"
            disabledClassName="disible"
        />
    );
}

export default Paginate;