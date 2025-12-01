import axios from "axios";
import { useEffect, useState } from "react";

function DashBoard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState("mens-watches");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const totalPages = 10;

  useEffect(() => {
    loadData();
  }, [page, search, maxPrice, minPrice]);

  const loadData = async () => {
    debugger;
    try {
      const result = await axios.get(
        "https://api.freeapi.app/api/v1/public/randomproducts",
        {
          params: {
            page,
            limit,
            inc: "category%2Cprice%2Cthumbnail%2Cimages%2Ctitle%2Cid",
            query: "mens-watches",
          },
          headers: { accept: "application/json" },
        }
      );
      if (result.data.statusCode == "200") {
        let items = result?.data?.data?.data;
        if (minPrice) items = items.filter((p) => p.price >= Number(minPrice));
        if (maxPrice) items = items.filter((p) => p.price <= Number(maxPrice));
        setData(items);
        setFilter(items);
        // setCategoryFilter(items);
        if (!items.length) {
          debugger;
          setIsDisabled(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    debugger;
    let query = e.toLowerCase();
    if (query.trim() !== "") {
      let items = filter?.filter((p) => p.title.toLowerCase().includes(query));
      console.log(items);
      setData(items);
    } else {
      setData(filter);
    }
  };

  const incrementPageNumber = () => {
    if (isDisabled) {
      setPage(page);
    } else {
      setPage(page + 1);
    }
  };
  const uniqCategory = [...new Set(filter.map((item) => item.category))];
  return (
    <>
      <crad className="">
        <div className="col-md-2">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Min Price
          </label>
          <input
            type="number"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-2">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Max Price
          </label>
          <input
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              let filtercetogorys = filter.filter((data) => {
                return data.category === e.target.value;
              });
              console.log(filtercetogorys);

              setData(filtercetogorys);
              setPage(1);
            }}
          >
            {uniqCategory.map((product) => {
              return <option value={product.category}>{product}</option>;
            })}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Search Title</label>
          <input
            onChange={(e) => {
              handleSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <table class="table-auto">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "90px" }}>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price (₹)</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  No Products Found
                </td>
              </tr>
            ) : (
              data.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product?.thumbnail}
                      alt={product.title}
                      className="img-fluid rounded"
                      style={{
                        height: "60px",
                        width: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ◀ Prev
          </button>

          <span className="fw-bold">Page {page}</span>

          <button
            className="btn btn-primary"
            disabled={page === totalPages}
            onClick={incrementPageNumber}
          >
            Next ▶
          </button>
        </div>
      </crad>
    </>
  );
}
export default DashBoard;
