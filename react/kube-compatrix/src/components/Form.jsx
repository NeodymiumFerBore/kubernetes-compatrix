import ToolForm from "./ui/ToolSelector";
import KubeVersionSelector from "./ui/KubeVersionSelector";
import "./form.css";

const toolsOptions = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "yellow", label: "Yellow" },
  { value: "red", label: "Red" },
];

// const kubeVersions = [
//   { value: "v1.22", label: "v1.22" },
//   { value: "v1.23", label: "v1.23" },
//   { value: "v1.24", label: "v1.24" },
// ];

const kubeVersions = ["v1.22", "v1.23", "v1.24"];

export default function Form({
  // Tools
  availableTools,
  preselectedTools,
  itemSelected,
  itemUnselected,
  // Kube version
  availableKubeVersions,
  initialKubeVersion,
  kubeVersionChanged,
}) {
  // console.log("Rendering Form");

  return (
    <div className="data-form">
      <div className="kube-vers-form">
        <KubeVersionSelector
          options={kubeVersions.map((vers) => {
            return { value: vers, label: vers };
          })}
          defaultValue={kubeVersions[0]}
          kubeVersionChanged={kubeVersionChanged}
        />
      </div>
      <div className="tool-form">
        <ToolForm options={toolsOptions} />
      </div>
    </div>
  );
}
