import React from "react";

import { Header } from "./components/lib";
import { Search } from "./components/quick-search/Search";
import { searchItems, mapItems } from "./utils/api";

function App() {
  return (
    <>
      <Header>
        <Search search={searchItems} debounce={600} mappingFn={mapItems} />
      </Header>
    </>
  );
}

export default App;
