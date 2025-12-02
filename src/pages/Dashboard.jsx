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
  }, [page, minPrice, maxPrice]);

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
        debugger;
        let items = result?.data?.data?.data;
        let itemdata = result?.data?.data?.data;

        if (minPrice) items = items.filter((p) => p.price >= Number(minPrice));
        if (maxPrice) items = items.filter((p) => p.price <= Number(maxPrice));

        setData(items);
        setFilter(itemdata);

        // Disable NEXT button if no items found
        setIsDisabled(items.length === 0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value) => {
    const query = value.toLowerCase();
    setSearch(value);

    if (query.trim() !== "") {
      const filtered = filter.filter((p) =>
        p.title.toLowerCase().includes(query)
      );
      setData(filtered);
    } else {
      setData(filter);
    }
  };
  const checkNextPage = async () => {
    debugger;
    try {
      const nextPage = page + 1;

      const result = await axios.get(
        "https://api.freeapi.app/api/v1/public/randomproducts",
        {
          params: {
            page: nextPage,
            limit,
            inc: "category%2Cprice%2Cthumbnail%2Cimages%2Ctitle%2Cid",
            query: "mens-watches",
          },
        }
      );

      const items = result?.data?.data?.data || [];
      if (items.length === 0) {
        setIsNextDisabled(true);
        return;
      }
      setPage(nextPage);
    } catch (err) {
      console.log(err);
    }
  };

  const uniqCategory = [...new Set(filter?.map((item) => item.category))];

  return (
    //  <>
    //   <crad className="">
    //     <div className="col-md-2">
    //       <label className="block mb-2.5 text-sm font-medium text-heading">
    //         Min Price
    //       </label>
    //       <input
    //         type="number"
    //         className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
    //         placeholder="Min"
    //         value={minPrice}
    //         onChange={(e) => {
    //           setMinPrice(e.target.value);
    //           setPage(1);
    //         }}
    //       />
    //     </div>
    //     <div className="col-md-2">
    //       <label className="block mb-2.5 text-sm font-medium text-heading">
    //         Max Price
    //       </label>
    //       <input
    //         className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
    //         type="number"
    //         placeholder="Max"
    //         value={maxPrice}
    //         onChange={(e) => {
    //           setMaxPrice(e.target.value);
    //           setPage(1);
    //         }}
    //       />
    //     </div>
    //     <div className="col-md-3">
    //       <label className="form-label">Category</label>
    //       <select
    //         className="form-select"
    //         value={category}
    //         onChange={(e) => {
    //           setCategory(e.target.value);
    //           let filtercetogorys = filter.filter((data) => {
    //             return data.category === e.target.value;
    //           });
    //           console.log(filtercetogorys);

    //           setData(filtercetogorys);
    //           setPage(1);
    //         }}
    //       >
    //         {uniqCategory.map((product) => {
    //           return <option value={product.category}>{product}</option>;
    //         })}
    //       </select>
    //     </div>
    //     <div className="col-md-3">
    //       <label className="form-label">Search Title</label>
    //       <input
    //         onChange={(e) => {
    //           handleSearch(e.target.value);
    //           setPage(1);
    //         }}
    //       />
    //     </div>

    //     <table class="table-auto">
    //       <thead className="table-dark">
    //         <tr>
    //           <th style={{ width: "90px" }}>Image</th>
    //           <th>Title</th>
    //           <th>Category</th>
    //           <th>Price (₹)</th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {data.length === 0 ? (
    //           <tr>
    //             <td colSpan="4" className="text-center py-3">
    //               No Products Found
    //             </td>
    //           </tr>
    //         ) : (
    //           data.map((product) => (
    //             <tr key={product.id}>
    //               <td>
    //                 <img
    //                   src={product?.thumbnail}
    //                   alt={product.title}
    //                   className="img-fluid rounded"
    //                   style={{
    //                     height: "60px",
    //                     width: "80px",
    //                     objectFit: "cover",
    //                   }}
    //                 />
    //               </td>
    //               <td>{product.title}</td>
    //               <td>{product.category}</td>
    //               <td>₹{product.price}</td>
    //             </tr>
    //           ))
    //         )}
    //       </tbody>
    //     </table>
    //     <div className="d-flex justify-content-between mt-3">
    //       <button
    //         className="btn btn-primary"
    //         disabled={page === 1}
    //         onClick={() => setPage(page - 1)}
    //       >
    //         ◀ Prev
    //       </button>

    //       <span className="fw-bold">Page {page}</span>

    //       <button
    //         className="btn btn-primary"
    //         disabled={page === totalPages}
    //         onClick={incrementPageNumber}
    //       >
    //         Next ▶
    //       </button>
    //     </div>
    //   </crad>
    // </>
    <div className="p-6 bg-black shadow-lg ">
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Min Price</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Max Price</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setCategory(e.target.value);
                const filtered = filter.filter(
                  (d) => d.category === e.target.value
                );
                setData(filtered);
                setPage(1);
              }}
            >
              {/* <option value="" onClick={() => setData(fil)}>
                All
              </option> */}
              {uniqCategory.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Search Title
            </label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No Products Found
          </p>
        ) : (
          data.map((product) => (
            <div
              key={product.id}
              className="bg-amber-200 shadow rounded-xl overflow-hidden"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 italic">
                <h3 className="font-semibold text-md">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-lg font-bold mt-2">₹{product.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          d
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ◀ Prev
        </button>

        <span className="font-semibold  text-white">Page {page}</span>

        <button
          className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isDisabled}
          onClick={checkNextPage}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
