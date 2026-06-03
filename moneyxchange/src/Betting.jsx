import { useState, useEffect } from "react";

function Betting() {
  const [loading, setLoading] = useState(true);
  const [summaPengar, setsummaPengar] = useState(() => {
    const sparadSumma = localStorage.getItem("summa");
    if (sparadSumma) {
      return JSON.parse(sparadSumma);
    } else {
      return 1000;
    }
  });
  const [sparadValuta, setSparadValuta] = useState(() => {
    const sparadval = localStorage.getItem("sparadValutaLocal");
    if (sparadval) {
      return JSON.parse(sparadval);
    } else {
      return 0;
    }
  });

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", import.meta.env.VITE_API_KEY);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    setLoading(true);
    fetch(
      "https://api.apilayer.com/currency_data/live?source=usd&currencies=sek",
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        setSparadValuta(result.quotes.USDSEK);
        localStorage.setItem(
          "sparadValutaLocal",
          JSON.stringify(result.quotes.USDSEK),
        );
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const kollaLoading = () => {
    if (loading) {
      return <span className="loading loading-dots "></span>;
    } else {
      return sparadValuta;
    }
  };

  function buy() {
    summaPengar;
    sparadValuta;
  }

  return (
    <div>
      <p>
        Här kan du betta på valutan du, du kan betta att valutan kommer stiga
        eller sunka.
      </p>
      <p>
        Om du trycker på buy då tror du att valutan kommer att stiga, om du
        trycker på sell då tror du att valutan kopmmer sjuknkka
      </p>
      <p>
        När du känner dig redo kan du trycka på close trade för att sedan se
        ditt resultat
      </p>

      <p>{summaPengar}</p>
      <p>USDxSEK ligger på {kollaLoading()} just nu</p>
      <button className="btn btn-success">Buy</button>
      <button className="btn btn-danger">Sell</button>
      {/*<button className="btn btn-info">Close Trade</button>*/}
    </div>
  );
}
export default Betting;
