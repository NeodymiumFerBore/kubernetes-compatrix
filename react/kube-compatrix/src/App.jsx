import { useEffect, useState } from "react";
import Form from "./components/Form";
import "./css/index.css";

// Contexts
import { selectedKubeVersionsContext } from "./Context";

const tools = [
  { value: "toto", label: "Toto" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "yellow", label: "Yellow" },
  { value: "red", label: "Red" },
];

const availableKubeVersions = ["v1.22", "v1.23", "v1.24"];

const loadFromLocalStorage = (key) => {
  const localValue = localStorage.getItem(key);
  if (localValue == null) {
    return null;
  }

  return JSON.parse(localValue);
};

export default function App() {
  const [selectedTools, setSelectedTools] = useState(() => {
    //return loadFromLocalStorage("TOOLS");
  });
  const [selectedKubeVersion, setSelectedKubeVersion] = useState(() => {
    return loadFromLocalStorage("KUBE_VERSION");
  });

  useEffect(() => {
    console.log("Kube version changed: " + selectedKubeVersion);
    availableKubeVersions.includes(selectedKubeVersion) &&
      localStorage.setItem("KUBE_VERSION", JSON.stringify(selectedKubeVersion));
  }, [selectedKubeVersion]);

  function addTool(name) {
    setSelectedTools((currentTools) => {
      console.log("Adding tool: " + name);
      return [...currentTools, { name }];
    });
  }

  function deleteTool(name) {
    setSelectedTools((currentTools) => {
      console.log("Removing tool: " + name);
      return currentTools.filter((tool) => tool.name !== name);
    });
  }

  return (
    <>
      <selectedKubeVersionsContext.Provider
        value={{ selectedKubeVersion, setSelectedKubeVersion }}
      >
        <Form
          tools={tools}
          availableKubeVersions={availableKubeVersions}
          itemSelected={addTool}
          itemUnselected={deleteTool}
        />
      </selectedKubeVersionsContext.Provider>
      {/* Table div */}
      <div id="compat-table-wrapper"></div>
    </>
  );
}
