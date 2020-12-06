import React from "react";

import { Header } from "./components/lib";
import { Search } from "./components/search/Search";

function App() {
  return (
    <>
      <Header>
        <Search />
      </Header>
    </>
  );
}

export default App;
