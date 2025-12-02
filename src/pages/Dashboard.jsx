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
        let itemdata = result?.data?.data?.data;

        if (minPrice) items = items.filter((p) => p.price >= Number(minPrice));
        if (maxPrice) items = items.filter((p) => p.price <= Number(maxPrice));

        setData(items);
        setFilter(itemdata);
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
              {uniqCategory.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
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
