import { useState } from "react";

function Convert() {
  const [valutaTill, setValutaTill] = useState("");
  const [valutaFrån, setValutaFrån] = useState("");
  const [belopp, setBelopp] = useState("");
  const [resultatLista, setResultatLista] = useState([]);

  function byggText(konvertering) {
    return `${konvertering.belopp} ${konvertering.från} är lika med ${konvertering.resultat} ${konvertering.till}`;
  }

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

  return (
    <div>
      <h1>Convert</h1>

      <label htmlFor="Valuta_till">Vilken valuta vill du växla till</label>
      <input
        type="text"
        placeholder="SEK, USD, GBP"
        id="Valuta_till"
        value={valutaTill}
        onChange={(e) => setValutaTill(e.target.value)}
      />

      <label htmlFor="Valuta_från">vilken valuta vill du växla ifrån</label>
      <input
        type="text"
        placeholder="SEK, USD, GBP"
        id="Valuta_från"
        value={valutaFrån}
        onChange={(e) => setValutaFrån(e.target.value)}
      />

      <label htmlFor="Belopp">Belopp</label>
      <input
        type="number"
        placeholder="Belopp"
        id="Belopp"
        value={belopp}
        onChange={(e) => setBelopp(e.target.value)}
      />

      <button onClick={HanteraKonvertering}>Convert</button>

      <ul id="res">
        <h3>Resultat</h3>
        {resultatLista.map((item, index) => (
          <li key={index}>{byggText(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Convert;
