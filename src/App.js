import React from "react";

import Form from "./components/Form";
import EmojiPicker from "./components/EmojiPicker";

const App = () => {
  return (
    <div class="container mx-auto">
      <div class="flex flex-row">
        {/* <Form /> */}
        <EmojiPicker />
      </div>
    </div>
  );
};

export default App;
