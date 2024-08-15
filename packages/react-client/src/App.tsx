import { useEffect, useState } from "react";
import { contract } from "contract";
import { initClient } from "@ts-rest/core";
import "./App.css";

const client = initClient(contract, {
  baseUrl: "http://localhost:3000",
  baseHeaders: {
    "x-app-source": "ts-rest",
  },
});

function App() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { body } = await client.getTest();
      console.log(body);
      setName(body.name);
      setAge(body.age);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>{name}</h1>
        <h2>{age}</h2>
      </div>
    </>
  );
}

export default App;
