import React from "react";

import { Header } from "./components/lib";
import { Search } from "./components/search/Search";
import { searchItems, mapItems } from "./utils/api";
import { DropdownListDirections } from "./components/quick-search/QuickSearchComponents";

function App() {
  return (
    <>
      <Header>
        <Search
          debounce={200}
          search={searchItems}
          mappingFn={mapItems}
          direction={DropdownListDirections.RIGHT}
        />
        <Search
          debounce={800}
          search={searchItems}
          mappingFn={mapItems}
          direction={DropdownListDirections.LEFT}
        />
      </Header>
    </>
  );
}

export default App;
