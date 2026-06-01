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
  }, []);

  return (
    <div>
      <ul
        id="lista"
        className="overflow-auto h-[50vh] border p-4 w-80 bg-primary-subtle"
      >
        <h1 className="">Förkortningar</h1>
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
