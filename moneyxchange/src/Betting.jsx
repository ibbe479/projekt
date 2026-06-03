import { useState, useEffect } from "react";

function Betting() {
  const [loading, setLoading] = useState(true);

  const [summaPengar, setsummaPengar] = useState(() => {
    const sparadSumma = localStorage.getItem("summa");
    if (sparadSumma) {
      return Number(sparadSumma);
    } else {
      localStorage.setItem("summa", 1000);
      return Number(1000);
    }
  });
  const [sparadValuta, setSparadValuta] = useState(() => {
    const sparadval = localStorage.getItem("sparadValutaLocal");
    if (sparadval) {
      return Number(sparadval);
    } else {
      return Number(0);
    }
  });

  const [köpt, setKöpt] = useState(() => {
    const tradeStatusBuy = localStorage.getItem("tradeStatusbuy");
    if (tradeStatusBuy == "true") return true;
    else {
      localStorage.setItem("tradeStatusbuy", false);
      return false;
    }
  });

  const [sell, setSell] = useState(() => {
    const tradeStatusSell = localStorage.getItem("tradeStatussell");
    if (tradeStatusSell == "true") return true;
    else {
      localStorage.setItem("tradeStatussell", false);
      return false;
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
        localStorage.setItem("sparadValutaLocal", result.quotes.USDSEK);
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
    if (!köpt && !sell) {
      return (
        <div>
          <button className="btn btn-success" onClick={startBuy}>
            Buy
          </button>
          <button className="btn btn-danger" onClick={startSell}>
            Sell
          </button>
        </div>
      );
    } else if (köpt) {
      return (
        <div>
          <button className="btn btn-info" onClick={avslutaBuy}>
            Close Trade
          </button>
        </div>
      );
    } else if (sell) {
      return (
        <div>
          <button className="btn btn-info" onClick={avslutaSell}>
            Close Trade
          </button>
        </div>
      );
    }
  }

  function startBuy() {
    setKöpt(true);
    localStorage.setItem("tradeStatusbuy", true);

    localStorage.setItem("inköpsKurs", sparadValuta);
    localStorage.setItem("summaPåkonto", summaPengar);
  }

  function startSell() {
    setSell(true);
    localStorage.setItem("tradeStatussell", true);

    localStorage.setItem("inköpsKurs", sparadValuta);
    localStorage.setItem("summaPåkonto", summaPengar);
  }

  function avslutaBuy() {
    setKöpt(false);
    localStorage.setItem("tradeStatusbuy", "false");

    const inköpsKurs = Number(localStorage.getItem("inköpsKurs"));

    const resutatAvKurserna = (sparadValuta - inköpsKurs) * 1000;

    const resutatetAvSumman = Number(summaPengar) + resutatAvKurserna;
    localStorage.setItem("summa", resutatetAvSumman.toFixed(2));
    setsummaPengar(resutatetAvSumman);
  }

  function avslutaSell() {
    setSell(false);
    localStorage.setItem("tradeStatussell", "false");

    const inköpsKurs = Number(localStorage.getItem("inköpsKurs"));

    const resutatAvKurserna = (inköpsKurs - sparadValuta) * 1000;

    const resutatetAvSumman = Number(summaPengar) + resutatAvKurserna;
    localStorage.setItem("summa", resutatetAvSumman.toFixed(2));
    setsummaPengar(resutatetAvSumman);
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

      <p>{summaPengar.toFixed(2)}</p>
      <p>USDxSEK ligger på {kollaLoading()} just nu</p>
      {buy()}

      {/**/}
    </div>
  );
}
export default Betting;
