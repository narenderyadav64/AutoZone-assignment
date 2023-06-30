import React, { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import DatatablePage from "./components/ResidentTable";
import Notification from "./components/Notification";

const App = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = debounce((name, callback) => {
    axios
      .get(`https://swapi.dev/api/planets/?search=${name}`)
      .then(({ data }) => {
        return callback(
          data.results.map((u) => ({
            label: u.name,
            value: u.name,
            ...u,
          }))
        );
      })
      .catch((e) => {
        Notification("error", e.message);
      });
  }, 1000);

  const makeMultipleRequests = async (residents) => {
    try {
      const requests = residents.map((residents) => axios.get(residents));
      const responses = await axios.all(requests);
      const data = responses.map((response) => response.data);
      setPeople(data);
      setLoading(false);
    } catch (e) {
      Notification("error", e.message);
    }
  };

  const onChange = (planet) => {
    const residents = planet.residents;
    setLoading(true);
    makeMultipleRequests(residents);
  };

  return (
    <div style={{ margin: 40 }}>
      <h1>Star Wars Planet Search</h1>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={onChange}
        placeholder="Search for planets"
      />

      <DatatablePage peoples={people} loading={loading} />
    </div>
  );
};

export default App;
