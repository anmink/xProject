import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";

import "../index.css";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import List from "./List";

const Form = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [font, setFont] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [visible, setVisible] = useState(false);
  const [emoji, setEmoji] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setEmoji(emojiObject.emoji);
    setVisible(false);
  };

  const ref = firebase.firestore().collection("project");

  function addProject(newProject) {
    ref
      .doc(newProject.id)
      .set(newProject)
      .catch((err) => {
        console.error(err);
      });
    setName("");
    setColor("");
    setFont("");
    setEmoji("");
  }

  function updateProject(project) {
    ref
      .doc(project.id)
      .update(project)
      .catch((err) => {
        console.error(err);
      });
    setName("");
    setColor("");
    setFont("");
    setCurrentId("");
    setEmoji("");
  }

  function saveOrUpdate() {
    if (currentId === "") {
      addProject({ name, color, font, emoji, id: uuidv4() });
    } else {
      updateProject({ name, color, font, emoji, id: currentId });
    }
  }

  const EmojiBox = styled.div`
    width: 48px;
    height: 48px;
    margin-top: 8px;
    margin-left: 16px;
    margin-right: 12px;
    border-radius: 5px;
    background-color: #333333;
  `;

  const Card = styled.div`
    width: 300px;
    height: 300px;

    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    border-radius: 5px;
    margin-top: 32px;
  `;

  return (
    <div class="container mx-auto">
      <div class="flex flex-row mt-4">
        <div class="flex flex-col shadow-md mt-2 rounded-md h-64 w-72">
          <div class="flex flex-row mt-4">
            {visible ? (
              <div class="mt-16 z-55 absolute">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            ) : null}
            <EmojiBox class="z-1 relative" onClick={() => setVisible(true)}>
              <div class="text-2xl mx-3 my-2">
                <span role="img">{emoji}</span>
              </div>
            </EmojiBox>
            <input
              class="p-3 my-2 form-checkbox rounded border focus:outline-none"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <input
            class="p-3 mx-4 form-checkbox rounded border w-content focus:outline-none"
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          ></input>
          <input
            class="p-3 mx-4 mt-2 form-checkbox rounded border focus:outline-none"
            type="text"
            placeholder="Font"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          ></input>
          <input
            class="p-3 mt-6 rounded-b-md bg-green-400 text-white"
            type="submit"
            value={currentId === "" ? "Save" : "Update"}
            onClick={() => saveOrUpdate()}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
