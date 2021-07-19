import React, { useState, useEffect } from "react";
import { FiX, FiEdit2 } from "react-icons/fi";
import firebase from "../firebase";
import styled from "styled-components";
import "../index.css";
import Masonry from "react-masonry-css";
import Form from "./Form";

const List = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [font, setFont] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [visible, setVisible] = useState(false);
  const [emoji, setEmoji] = useState("");
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
    margin-right: 12px;
    border-radius: 5px;
    background-color: red;
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

  const breakpointColumnsObj = {
    1500: 3,
    1100: 2,
    600: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      <Form />

      {projects.map((project) => (
        <div class="" key={project.id}>
          <Card>
            <div class="flex flex-row mt-4">
              <EmojiBox class="z-1 relative">
                <div class="text-2xl mx-3 my-2">
                  <span role="img">{project.emoji}</span>
                </div>
              </EmojiBox>
              <h1>{project.name}</h1>
            </div>

            <div class="flex flex-row">
              <ColorBox class="" color={project.color} />
              <div>{project.color}</div>
            </div>

            <p class="ml-4 mt-4">{project.font}</p>
            <div class="flex flex-row justify-center">
              <button
                class=""
                onClick={() => {
                  editProject(project);
                }}
              >
                <FiEdit2 class="iconEdit" />
              </button>
              <button
                class=""
                onClick={() => {
                  deleteProject(project);
                }}
              >
                <FiX class="iconX" />
              </button>
            </div>
          </Card>
        </div>
      ))}
    </Masonry>
  );
};

export default List;
