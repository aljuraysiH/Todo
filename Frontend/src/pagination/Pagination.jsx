import ReactPaginate from "react-paginate";
import { useState } from "react";

import Todo from "../components/Todo/Todo";

import "./Pagination.scss";
const Pagination = ({ list }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const todoPerPage = 5;
  const todosVisited = pageNumber * todoPerPage;
  const pageCount = Math.ceil(list?.length / todoPerPage);

  const displayTodos = list
    ?.slice(todosVisited, todosVisited + todoPerPage)
    ?.map((todo) => (
      <Todo
        key={todo.id}
        title={todo.title}
        id={todo._id}
        completed={todo.completed}
      />
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <div className="todosContainer">{displayTodos}</div>
      {list?.length > 5 && (
        <ReactPaginate
          previousLabel="السابق"
          nextLabel="التالي"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="pagination"
          previousLinkClassName="prevLink"
          nextLinkClassName="nextLink"
          disabledClassName="disabled"
          activeClassName="active"
        />
      )}
    </>
  );
};
export default Pagination;
