import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { FiX, FiEdit2 } from "react-icons/fi";
import "../index.css";
import styled from "styled-components";

const Form = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [font, setFont] = useState("");
  const [currentId, setCurrentId] = useState("");

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
  }

  function saveOrUpdate() {
    if (currentId === "") {
      addProject({ name, color, font, id: uuidv4() });
    } else {
      updateProject({ name, color, font, id: currentId });
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

  return (
    <div class="container mx-auto">
      <div class="flex flex-row">
        {/* <div class="flex flex-col">
          <input
            class="p-2 mb-2 border-2 mt-2"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            class="p-2 mb-2 border-2"
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          ></input>
          <input
            class="p-2 mb-2 border-2"
            type="text"
            placeholder="Font"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          ></input>
          <input
            class="p-2 mb-2 bg-green-400"
            type="submit"
            value={currentId === "" ? "Save" : "Update"}
            onClick={() => saveOrUpdate()}
          />
        </div>  */}
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
                <div class="mx-2" />
                <button
                  class="p-2 mb-2 rounded text-lg"
                  onClick={() => deleteProject(project)}
                >
                  <FiX class="iconX" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
