const paginationBasic = (props) => {
  // const breeds = useRouteLoaderData("breeds");
  // const numberOfPages = (Math.ceil(breeds.length / 20))

  // const [pageNumber, setPageNumber] = useState(1)
  // const currentImages = pageNumber === 1 ? breeds.slice(0, pageNumber * 20) : breeds.slice(pageNumber * 20, (pageNumber + 1) * 20)
  // console.log(currentImages)
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
    <div className="pagination-container">
      <Pagination>{items}</Pagination>
      {/* <br />

            <Pagination size="lg">{items}</Pagination> */}
      {/* <br />

            <Pagination size="sm">{items}</Pagination> */}
    </div>
  );
};

export default Pagination;
