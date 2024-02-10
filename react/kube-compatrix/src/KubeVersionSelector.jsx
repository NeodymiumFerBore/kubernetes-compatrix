import Select, { components } from "react-select";

const kubernetesLogoSvgUrl =
  "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg";

export default function KubeVersionSelector({
  options,
  defaultValue,
  kubeVersionChanged,
}) {
  // console.log("Rendering KuberVersionSelector");

  const Control = ({ children, ...props }) => (
    <components.Control {...props}>
      {" "}
      <img src={kubernetesLogoSvgUrl} width="20px" height="auto" />
      {children}
    </components.Control>
  );
  return (
    <>
      <Select
        defaultValue={defaultValue}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Control,
        }}
        styles={{
          menu: (base) => ({
            ...base,
            width: "max-content",
            minWidth: "100%",
          }),
        }}
        name="kube-version"
        options={options}
        className="kube-version"
        classNamePrefix="kube-version"
        inputId="kube-version"
        onChange={kubeVersionChanged}
      />
    </>
  );
}
