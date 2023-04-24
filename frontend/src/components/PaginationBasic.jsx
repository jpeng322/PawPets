import Pagination from 'react-bootstrap/Pagination';

const PaginationBasic = (props) => {

  let items = [];
  for (let number = 1; number <= props.numberOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={(e) => {
          // console.log(breeds)
          props.setPageNumber(parseInt(e.target.textContent));
        }}
        key={number}
        active={number === props.pageNumber}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className="pagination-container mt-4">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default PaginationBasic;
