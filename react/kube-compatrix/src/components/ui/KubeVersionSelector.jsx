import Select, { components } from "react-select";
import SelectorWithIcon from "./SelectorWithIcon";
import kubeIcon from "../../assets/kubernetes-icon-color.svg";

export default function KubeVersionSelector({ options, kubeVersionChanged }) {
  return (
    <>
      <SelectorWithIcon
        iconSrc={kubeIcon}
        defaultValue={options[options.length - 1]}
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
