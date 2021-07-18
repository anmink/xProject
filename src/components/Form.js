import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { FiX, FiEdit2 } from "react-icons/fi";
import "../index.css";
import styled from "styled-components";
import Picker from "emoji-picker-react";

const Form = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [font, setFont] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [visible, setVisible] = useState(false);
  const [emoji, setEmoji] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setEmoji(emojiObject);
    setVisible(false);
  };

  const ref = firebase.firestore().collection("project");

  function getProjects() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setProjects(items);
    });
  }

  useEffect(() => {
    getProjects();
  }, []);

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
  }

  function deleteProject(project) {
    ref
      .doc(project.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  function editProject(project) {
    setName(project.name);
    setColor(project.color);
    setFont(project.font);
    setCurrentId(project.id);
    setEmoji(project.emoji);
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

  const ColorBox = styled.div`
    width: 48px;
    height: 48px;
    margin-left: 16px;
    margin-right: 16px;
    background-color: ${(props) => props.color};
    border-radius: 5px;
  `;

  const EmojiBox = styled.div`
    width: 48px;
    height: 48px;
    margin-top: 8px;
    margin-left: 16px;
    margin-right: 8px;
    border-radius: 5px;
    background-color: #333333;
  `;

  const Card = styled.div`
    width: content-box;
    height: content-box;
    border-radius: 5px;
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  `;

  return (
    <div class="container mx-auto">
      <div class="flex flex-row mt-4">
        <div class="flex flex-col shadow-md mt-2 rounded h-full max-w-max">
          <div class="flex flex-row mt-2">
            {visible ? (
              <div class="mt-16 z-55 absolute">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            ) : null}
            <EmojiBox class="z-1 relative" onClick={() => setVisible(true)}>
              <div class="text-2xl mx-3 my-2">
                <span role="img">{emoji.emoji}</span>
                {console.log(JSON.stringify(emoji))}
              </div>
            </EmojiBox>
            <input
              class="p-3 my-2 mr-4 form-checkbox rounded border"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <input
            class="p-3 mx-4 form-checkbox rounded border w-content"
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          ></input>
          <input
            class="p-3 mx-4 mt-2 form-checkbox rounded border"
            type="text"
            placeholder="Font"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          ></input>
          <input
            class="p-3 mt-4 rounded-b-md bg-green-400 text-white"
            type="submit"
            value={currentId === "" ? "Save" : "Update"}
            onClick={() => saveOrUpdate()}
          />
        </div>
        <div class="mr-2" />
        <div class="flex flex-col">
          {projects.map((project) => (
            <div
              class="flex flex-col shadow-md mt-2 rounded h-64 w-96"
              key={project.id}
            >
              <h1 class="p-2 mb-2 m-2">{project.name}</h1>
              <div class="flex flex-row">
                <ColorBox class="p-2 mb-2 m-2" color={project.color} />
                <div>{project.color}</div>
              </div>

              <p class="p-2 m-2">{project.font}</p>
              <div class="flex flex-row justify-center content-between">
                <button
                  class="p-2 mb-2 rounded"
                  onClick={() => {
                    editProject(project);
                  }}
                >
                  <FiEdit2 class="iconEdit" />
                </button>
                <button
                  class="p-2 mb-2 rounded"
                  onClick={() => {
                    deleteProject(project);
                  }}
                >
                  <FiX class="iconX" />
                </button>
                <div class="mx-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
