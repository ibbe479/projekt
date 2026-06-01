import { useState } from "react";

function Convert() {
  const [valutaTill, setValutaTill] = useState("");
  const [valutaFrån, setValutaFrån] = useState("");
  const [belopp, setBelopp] = useState("");
  const [resultatLista, setResultatLista] = useState([]);

  function HanteraKonvertering() {
    if (!valutaTill || !valutaFrån || !belopp) {
      alert("Vänligen fyll i alla fält först!");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("apikey", "Dy3amnZygPaNGfeWocYlgnb81qcvocEp");

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
        setResultatLista(LitsanMedAllt.slice(-5));

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
    <div className="d-flex flex-row mb-3 gap-[10vh]">
      <fieldset className=" text-neutral fieldset bg-primary-subtle border-base-300 rounded-box w-80 h-[50vh]  border p-5 text-base-content shadow-md p-2">
        <legend className="fieldset-legend text-neutral">Convert</legend>

        <label>vilken valuta vill du växla ifrån</label>
        <input
          type="text"
          placeholder="SEK, USD, GBP"
          id="Valuta_från"
          className="input input-bordered w-full bg-white text-black "
          value={valutaFrån}
          onChange={(e) => setValutaFrån(e.target.value)}
        />

        <label>Vilken valuta vill du växla till</label>
        <input
          type="text"
          placeholder="SEK, USD, GBP"
          id="Valuta_till"
          className="input input-bordered w-full bg-white text-black "
          value={valutaTill}
          onChange={(e) => setValutaTill(e.target.value)}
        />

        <label htmlFor="Belopp">Belopp</label>
        <input
          type="number"
          placeholder="Belopp"
          id="Belopp"
          value={belopp}
          className="input input-bordered w-full bg-white text-black mb-4"
          onChange={(e) => setBelopp(e.target.value)}
        />

        <button
          className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
          onClick={HanteraKonvertering}
        >
          Convert
        </button>
      </fieldset>

      <ul
        id="res"
        className="text-neutral p-2 bg-primary-subtle border-base-300 rounded-box w-80  h-[50vh] border p-5 text-base-content shadow-md p-2"
      >
        <h3>Resultat</h3>
        {resultatLista.map((item, index) => (
          <li key={index}>
            {byggText(item)} <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Convert;
