import React from "react";

import Form from "./components/Form";
import List from "./components/List";
import EmojiPicker from "./components/EmojiPicker";

const App = () => {
  return (
    <div class="container mx-auto">
      <div class="flex flex-row mx-16">
        <List />
      </div>
    </div>
  );
};

export default App;
