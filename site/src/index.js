// Setup Grid
grid = new gridjs.Grid({
    columns: ["Tool", "Min", "Max"],
    data: []
});
grid.render(document.getElementById("compat-table-wrapper"));

// Setup TopicSelector
topicSelector = new TopicSelector(document.getElementById("tool-selector-wrapper"), placeholder="Search a tool...");
topicSelector.clearFieldOnSelect = true;
topicSelector.addEventListener("select", handleAddTool);

let tools = [];
availableTools = [];

// Temporary. Once better implemented, in gh action, parse all kube versions for all
// defined tools, and define the array from result (ordered set)
const kubeVersions = Array.from({length: 10}, (x, i) => "v1." + (i+20))
const kubeVersionDropdown = document.getElementById('kube-version');

const fetchTools = async () => {
  // Fetch tools index
  data = fetch('tools/index.yaml')
    .then(response => response.text())
    .then(yamlData => { return jsyaml.load(yamlData); })
    .catch(error => console.error('Error fetching YAML file: ', error));
  return data;
}

function fetchToolData(toolName) {
  // Fetch the YAML file
  data = fetch('tools/' + toolName + '/data.yaml')
    .then(response => response.text())
    .then(yamlData => { return jsyaml.load(yamlData); })
    .catch(error => console.error('Error fetching YAML file: ', error));
  return data;
}

// Populate tool choices
const populateTools = async () => {
  try {
    const toolsDropdown = document.getElementById('tools');
    const data = await fetchTools();

    // Filter data where "type" is equal to "dir"
    const dirEntries = data.filter(item => item.type === 'dir');

    // Populate options
    dirEntries.forEach(item => {
      const option = document.createElement('option');
      option.value = item.name; // set the value as needed
      // option.textContent = item.name; // set the label as needed
      toolsDropdown.appendChild(option);
      availableTools.push(item.name);
    });
  } catch (error) {
    console.error('Error populating toolsDropdown: ', error);
  }
};

// Populate Kube versions dropdown
const populateKubeVersions = async () => {
//(async() => {
  // Populate dropdown options
  kubeVersions.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    kubeVersionDropdown.appendChild(option);
  });
  kubeVersionDropdown.value = kubeVersions.slice(-1);
};
//})();

// Call the function to populate dropdown on page load
populateTools();
populateKubeVersions();
topicSelector.updateSuggestions(availableTools);

function getSelectedKubeVersion() {
  const dropdown = document.getElementById('kube-version');
  return dropdown.value;
}

// Cache the elements
const input = document.querySelector('#tools-form');
const submit = document.querySelector('[type="submit"]');

// Add a click listener to the submit button
submit.addEventListener('click', handleAddTool, false);
input.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    handleAddTool(e);
  }
})

// Add tool to matrix
function handleAddTool(e) {
  // Check if input exists in tools array
  let input = e.detail;
  if (availableTools.includes(input)) {
    if (!toolAlreadySelected(input)) {
      fetchToolData(input).then(jsonData => {
        kubeVers = getSelectedKubeVersion()
        newTool = new Tool(input, jsonData);
        tools.push(newTool);

        grid.config.data.push([newTool.name, newTool.getMin(kubeVers), newTool.getMax(kubeVers)]);
        grid.forceRender();
      });
    } else {
      console.log('Already selected');
    }
  } else {
    console.log('Not found');
  }
}

function refreshMatrix() {
  data = []
  tools.forEach(tool => {
    kubeVers = getSelectedKubeVersion()
    data.push([tool.name, tool.getMin(kubeVers), tool.getMax(kubeVers)]);
  })
  grid.updateConfig({data: data}).forceRender();
}

function toolAlreadySelected(toolName) {
  return Array.from(tools).map(item => item.name).includes(toolName);
}
