// Represent a tool at a given Kubernetes version
export class Tool {
  name;
  home;
  sources;
  compat_source;
  compat_matrix = [{}];

  constructor(name, data = {}) {
    this.name = name;
    this.update(data);
  }

  update(data) {
    Object.assign(this, data);
  }

  compatForKubeVersion(kubeVersion) {
    min = 'undefined';
    versionInfo = this.compat_matrix.find(item => item.kube_vers === kubeVersion);
    return {"min": this.getMin(kubeVersion), "max": this.getMax(kubeVersion)};
  }

  getMin(kubeVersion) {
    return this.compat_matrix.find(item => item.kube_vers === kubeVersion)?.versions?.min ?? 'undefined';
  }

  getMax(kubeVersion) {
    return this.compat_matrix.find(item => item.kube_vers === kubeVersion)?.versions?.max ?? 'undefined';
  }
}
