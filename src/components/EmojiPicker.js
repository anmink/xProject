import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { FiX, FiEdit2 } from "react-icons/fi";

const EmojiPicker = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div>{chosenEmoji ? <span></span> : <span>No emoji Chosen</span>}</div>
  );
};

export default EmojiPicker;
