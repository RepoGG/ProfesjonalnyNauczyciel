import React, { useEffect } from "react";
import api from "./services/api";

const App = () => {
  useEffect(() => {
    api.get("/test").then((response) => {
      console.log(response.data);
    });
  }, []);

  return <div>Sprawdź konsolę</div>;
};

export default App;
