import React from "react";

import { Header } from "./components/lib";
import { QuickSearch } from "./components/quick-search/QuickSearch";
import { searchItems, mapItems } from "./utils/api";

function App() {
  return (
    <>
      <Header>
        <QuickSearch search={searchItems} debounce={600} mappingFn={mapItems} />
      </Header>
    </>
  );
}

export default App;
