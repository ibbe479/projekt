import { useState } from "react";

function Convert() {
  const [valutaTill, setValutaTill] = useState("");
  const [valutaFrån, setValutaFrån] = useState("");
  const [belopp, setBelopp] = useState("");
  const [resultatLista, setResultatLista] = useState(() => {
    const sparadLista = localStorage.getItem("valutaResultat");

    if (sparadLista) {
      return JSON.parse(sparadLista);
    } else {
      return [];
    }
  });

  function HanteraKonvertering() {
    if (!valutaTill || !valutaFrån || !belopp) {
      alert("Vänligen fyll i alla fält först!");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("apikey", import.meta.env.VITE_API_KEY);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/currency_data/convert?to=${valutaTill.toUpperCase()}&from=${valutaFrån.toUpperCase()}&amount=${belopp}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        const nyKonvertering = {
          belopp: belopp,
          från: valutaFrån.toUpperCase(),
          till: valutaTill.toUpperCase(),
          resultat: data.result,
        };

        const LitsanMedAllt = [...resultatLista, nyKonvertering];
        const uppdateradLista = LitsanMedAllt.slice(-5);
        setResultatLista(uppdateradLista);
        localStorage.setItem("valutaResultat", JSON.stringify(uppdateradLista));

        setValutaFrån("");
        setValutaTill("");
        setBelopp("");
      })
      .catch((error) => console.log("error", error));
  }

  function byggText(konvertering) {
    return `${konvertering.belopp} ${konvertering.från} är lika med ${konvertering.resultat} ${konvertering.till}`;
  }

  return (
    <div className="flex flex-row flex-wrap gap-8 justify-center">
      <div className="bg-white border-gray-200 rounded-xl w-80 sm:w-96 h-[550px] border shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Convert
        </h2>

        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Vilken valuta vill du växla ifrån
          </label>
          <input
            type="text"
            placeholder="SEK, USD, GBP"
            className="w-full bg-gray-50 text-black mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={valutaFrån}
            onChange={(e) => setValutaFrån(e.target.value)}
          />

          <label className="mb-1 block text-sm font-medium text-gray-700">
            Vilken valuta vill du växla till
          </label>
          <input
            type="text"
            placeholder="SEK, USD, GBP"
            className="w-full bg-gray-50 text-black mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={valutaTill}
            onChange={(e) => setValutaTill(e.target.value)}
          />

          <label className="mb-1 block text-sm font-medium text-gray-700">
            Belopp
          </label>
          <input
            type="number"
            placeholder="Belopp"
            value={belopp}
            className="w-full bg-gray-50 text-black mb-6 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setBelopp(e.target.value)}
          />
        </div>

        <button
          className="w-full mt-auto rounded-lg bg-blue-900 px-4 py-3 text-center text-sm font-bold uppercase text-white transition duration-200 ease-in-out hover:bg-blue-800"
          onClick={HanteraKonvertering}
        >
          Convert
        </button>
      </div>

      <div className="bg-white border-gray-200 rounded-xl w-80 sm:w-96 h-[550px] border shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Resultat
        </h2>
        <ul className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          {resultatLista.map((item, index) => (
            <li
              key={index}
              className="break-words overflow-wrap-anywhere mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 text-sm"
            >
              {byggText(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Convert;
