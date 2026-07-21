import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Graf() {
  const [loading, setLoading] = useState(true);
  const [valutaInput, setValutaInput] = useState("SEK");
  const [quotes, setQuotes] = useState({});
  const [sökTrigger, setSökTrigger] = useState(0);

  const end_date = new Date().toISOString().split("T")[0];
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  const start_date = d.toISOString().split("T")[0];

  function hanteraSökning(e) {
    e.preventDefault();
    setValutaInput(valutaInput.toUpperCase().trim());
    setSökTrigger((prev) => prev + 1);
  }
  useEffect(() => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("apikey", import.meta.env.VITE_API_KEY);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/currency_data/timeframe?start_date=${start_date}&end_date=${end_date}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        setQuotes(result.quotes || {});
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, [sökTrigger]);

  const options = {
    title: {
      text: ` USDx${valutaInput}`,
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: Object.keys(quotes),
    },
  };

  const series = [
    {
      name: `USDx${valutaInput}`,
      data: Object.keys(quotes).map(
        (date) => quotes[date][`USD${valutaInput}`],
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start gap-6 bg-white p-6 rounded-xl border shadow-lg mt-8 w-full ">
      <form onSubmit={hanteraSökning} className="w-full md:w-1/4 p-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Vilken valuta vill du jämföra mot USD?
        </label>
        <input
          type="text"
          placeholder="SEK, EUR, GBP"
          maxLength={3}
          className="w-full bg-gray-50 text-black p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold mb-3"
          value={valutaInput}
          onChange={(e) => setValutaInput(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-200 uppercase text-sm"
        >
          Visa i graf
        </button>
      </form>

      <div className="w-full md:w-3/4 p-2 flex justify-center items-center min-h-[350px]">
        {loading ? (
          <span className="loading loading-dots loading-lg text-blue-900"></span>
        ) : (
          <div className="mixed-chart w-full">
            <Chart
              options={options}
              series={series}
              type="line"
              height="350"
              width="100%"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Graf;
