import SelectorWithIcon from "./SelectorWithIcon";
import kubeIcon from "../../assets/kubernetes-icon-color.svg";
import { useContext } from "react";
import { selectedKubeVersionsContext } from "../../Context";

export default function KubeVersionSelector({ options }) {
  const { setSelectedKubeVersion } = useContext(selectedKubeVersionsContext);
  const { selectedKubeVersion } = useContext(selectedKubeVersionsContext);

  return (
    <>
      <SelectorWithIcon
        iconSrc={kubeIcon}
        options={options}
        defaultValue={
          options.find((d) => d.value == selectedKubeVersion) ||
          options.slice(-1)
        }
        name="kube-version"
        className="kube-version"
        classNamePrefix="kube-version"
        inputId="kube-version"
        onChange={(version) => setSelectedKubeVersion(version.value)}
      />
    </>
  );
}
