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

export default function Form({
  // Tools
  availableTools,
  preselectedTools,
  itemSelected,
  itemUnselected,
  // Kube version
  availableKubeVersions,
}) {
  return (
    <div className="data-form">
      <div className="kube-vers-form">
        <KubeVersionSelector
          options={availableKubeVersions.map((vers) => {
            return { value: vers, label: vers };
          })}
        />
      </div>
      <div className="tool-form">
        <ToolForm options={toolsOptions} />
      </div>
    </div>
  );
}
