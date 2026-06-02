import { useState, useEffect } from "react";

function GetList() {
  const [lista, setLista] = useState({});
  const [sökFält, setSökFält] = useState("");

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", import.meta.env.VITE_API_KEY);

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
    <div className="bg-white border-gray-200 rounded-xl w-80 sm:w-96 h-[550px] border shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Förkortningar
      </h2>
      <input
        type="text"
        placeholder="Sök efter valuta"
        className="w-full bg-gray-50 text-black p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        value={sökFält}
        onChange={(e) => setSökFält(e.target.value)}
      />
      <ul className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {hanteraSök().length === 0 ? (
          <div className="flex justify-center p-10">
            <li>
              <span className="loading loading-dots loading-lg "></span>
            </li>
          </div>
        ) : (
          hanteraSök().map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default GetList;
