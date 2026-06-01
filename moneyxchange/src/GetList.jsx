import { useState, useEffect } from "react";

function GetList() {
  const [lista, setLista] = useState({});
  const [sökFält, setSökFält] = useState("");

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "FWrUebpaPLwwCEcCjoyDmclvTTUTZOyH");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch("https://api.apilayer.com/currency_data/list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLista(result.currencies);
      })
      .catch((error) => console.log("error", error));
  }, []);

  function hanteraSök() {
    if (sökFält == "") {
      return Object.entries(lista);
    }

    return Object.entries(lista).filter(([förkorting, land]) => {
      return (
        förkorting.toLowerCase().includes(sökFält.toLowerCase()) ||
        land.toLowerCase().includes(sökFält.toLowerCase())
      );
    });
  }

  return (
    <div>
      <ul
        id="lista"
        className="overflow-auto h-[50vh] border p-4 w-80 bg-primary-subtle"
      >
        <h1 className="">Förkortningar</h1>
        <input
          type="text"
          placeholder="Sök efter valuta"
          id="sökFält"
          className="input input-bordered w-full bg-white text-black "
          value={sökFält}
          onChange={(e) => setSökFält(e.target.value)}
        />
        {hanteraSök().map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetList;
