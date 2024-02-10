import { useEffect, useState } from "react";
import Form from "./Form";
import { DisplayCount } from "./DisplayCount";
import "./index.css";

import { countContext } from "./Context";

const colourOptions = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "yellow", label: "Yellow" },
  { value: "red", label: "Red" },
];

const loadFromLocalStorage = (key) => {
  const localValue = localStorage.getItem(key);
  if (localValue == null) {
    return [];
  }

  return JSON.parse(localValue);
};

export default function App() {
  console.log("Rendering App");
  const [tools, setTools] = useState(() => {
    return loadFromLocalStorage("TOOLS");
  });
  const [kubeVersion, setKubeVersion] = useState(() => {
    return loadFromLocalStorage("KUBE_VERSION");
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("TOOLS", JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem("KUBE_VERSION", JSON.stringify(kubeVersion));
  }, [kubeVersion]);

  function addTool(name) {
    setTools((currentTools) => {
      console.log("Adding tool: " + name);
      return [...currentTools, { name }];
    });
  }

  function deleteTool(name) {
    setTools((currentTools) => {
      console.log("Removing tool: " + name);
      return currentTools.filter((tool) => tool.name !== name);
    });
  }

  function handleKubeVersionChange(newVersion) {
    setKubeVersion((kubeVersion) => {
      console.log(
        "Kube version changed: from " +
          kubeVersion.value +
          " to " +
          newVersion.value
      );
      return newVersion;
    });
  }

  return (
    <>
      <div className="App">
        <countContext.Provider value={{ count, setCount }}>
          <DisplayCount />
        </countContext.Provider>
      </div>
      <Form
        tools={tools}
        itemSelected={addTool}
        itemUnselected={deleteTool}
        kubeVersionChanged={handleKubeVersionChange}
      />
      {/* Table div */}
      <div id="compat-table-wrapper"></div>
    </>
  );
}
