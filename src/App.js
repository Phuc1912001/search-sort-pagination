import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);

  const sortOption = ["id", "name", "username", "email", "address.street"];

  useEffect(() => {
    loadUsersData(0, 4, 0);
  }, []);

  const loadUsersData = async (start, end, increase) => {
    return await axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_start=${start}&_end=${end}`
      )
      .then((response) => {
        setData(response.data);
        setCurrentPage(currentPage + increase);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    loadUsersData(0,4,0);
    
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`https://jsonplaceholder.typicode.com/users?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));
  };
  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    

    return await axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_sort=${value}&_order=asc`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <div>
          <button type="button" class="btn btn-primary">
            1
          </button>
          <button
            type="button"
            class="btn btn-primary ms-2"
            onClick={() => loadUsersData(4, 8, 1)}
          >
            Next
          </button>
        </div>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <div>
          <button
            type="button"
            class="btn btn-primary ms-2"
            onClick={() =>
              loadUsersData((currentPage - 1) * 4, currentPage * 4, -1)
            }
          >
            prev
          </button>
          <button type="button" class="btn btn-primary ms-2">
            {currentPage + 1}
          </button>
          <button
            type="button"
            class="btn btn-primary ms-2"
            onClick={() =>
              loadUsersData((currentPage + 1) * 4, (currentPage + 2) * 4, 1)
            }
          >
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            type="button"
            class="btn btn-primary ms-2"
            onClick={() =>
              loadUsersData((currentPage - 1) * 4, currentPage * 4, -1)
            }
          >
            prev
          </button>
          <button type="button" class="btn btn-primary ms-2">
            1
          </button>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form className="mt-5">
              <input
                type="text"
                className="table  w-50 "
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-warning ms-4"
                onClick={handleSearch}
              >
                search
              </button>
              <button
                type="button"
                className="btn btn-info ms-4"
                onClick={() => handleReset()}
              >
                reset
              </button>
            </form>
            <select onChange={handleSort} value={sortValue}>
              <option>làm ơn chọn</option>
              {sortOption.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.address.street}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 d-flex justify-content-center">
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
