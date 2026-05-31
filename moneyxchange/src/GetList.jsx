import { useState, useEffect } from "react";

function GetList() {
  const [lista, setLista] = useState({});

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "Dy3amnZygPaNGfeWocYlgnb81qcvocEp");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch("https://api.apilayer.com/currency_data/list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.currencies) {
          setLista(result.currencies);
        }
      })
      .catch((error) => console.log("error", error));
  }, []); // De tomma hakparenteserna [] här gör att loopen stoppas och körs bara 1 gång!

  return (
    <div>
      <h1>Lista över alla förkortningar</h1>
      <ul id="lista">
        {/* Detta skrev du HELT RÄTT! Det mappar ut objektet perfekt */}
        {Object.entries(lista).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetList;
