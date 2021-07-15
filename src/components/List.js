import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const List = () => {
  const [projects, setProjects] = useState([]);

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
  });

  return (
    <div class="container mx-auto">
      {projects.map((item) => (
        <div class="flex flex-col" key={item.id}>
          <div class="p-2 mb-2 mt-2">{item.name}</div>
          <div class="p-2 mb-2">{item.color}</div>
          <div class="p-2 mb-2">{item.font}</div>
          <div class="p-2 mb-2">{item.id}</div>
          <div class="flex flex-row">
            <button class="p-2 mb-2 bg-green-400 ">Edit</button>
            <button class="p-2 mb-2 bg-red-400 ">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
