import React from "react";

import { Header } from "./components/lib";
import { Search } from "./components/quick-search/Search";
import { searchItems, mapItems } from "./utils/api";
import { DropdownListDirections } from "./components/quick-search/QuickSearchComponents";

function App() {
  return (
    <>
      <Header>
        <Search
          debounce={600}
          mappingFn={mapItems}
          direction={DropdownListDirections.LEFT}
          search={searchItems}
        />
      </Header>
    </>
  );
}

export default App;
