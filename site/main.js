// Fetch directories from GitHub API
// GitHub rate limiting is ... limiting
// const fetchTools = async () => {
//   try {
//     // Fetch data from the API
//     const response = await fetch('https://api.github.com/repos/bitnami/charts/contents/bitnami/');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching directories:', error);
//     throw error;
//   }
// };

// CHECK THIS: https://gridjs.io/docs
// Very promising:
//   Use custom class to store info about Tools
//   Use grid.js to render them

// Temporary. Once better implemented, in gh action, parse all kube versions for all
// defined tools, and define the array from result (ordered set)
const kubeVersions = Array.from({length: 10}, (x, i) => "v1." + (i+20))

const fetchTools = async () => {
  // Fetch tools index
  data = fetch('tools/index.yaml')
    .then(response => response.text())
    .then(yamlData => {
      const jsonData = jsyaml.load(yamlData);
      return jsonData;
    })
    .catch(error => console.error('Error fetching YAML file:', error));
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
    });
  } catch (error) {
    console.error('Error populating toolsDropdown:', error);
  }
};

const kubeVersionDropdown = document.getElementById('kube-version');

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

function getSelectedKubeVersion() {
  const dropdown = document.getElementById('kube-version');
  return dropdown.value;
}

// Cache the elements
const input = document.querySelector('#tools_form');
const submit = document.querySelector('[type="submit"]');
const table = document.querySelector('[class="responsive-table"]');

// Add a click listener to the submit button
submit.addEventListener('click', handleAddTool, false);
input.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    handleAddTool(e);
  }
})

// Add tool to matrix
function handleAddTool(e) {
  const tools = Array.from(document.querySelectorAll('option')).map(el => el.value);

  // Prevent the form from actually submitting
  e.preventDefault();

  // Check if input exists in tools array
  if (tools.includes(input.value)) {
    console.log('Found');
    if (!toolIsInTable(input.value)) {
      addToolRow(input.value);
    }
  } else {
    console.log('Not found');
  }
}

// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function refreshMatrix() {
  rows = table.getElementsByClassName('table-row');
  for (let row of rows) {
    toolName = row.querySelector('[data-label="Tool"').innerHTML;
    newRow = createRow(toolName);
    row.querySelector('[data-label="Min"]').innerHTML = newRow.querySelector('[data-label="Min"]').innerHTML;
    row.querySelector('[data-label="Max"]').innerHTML = newRow.querySelector('[data-label="Max"]').innerHTML;
  }
}

function toolIsInTable(toolName) {
  nodelist = table.querySelectorAll('[data-label="Tool"]');
  loadedTools = Array.from(nodelist).map(item => item.innerHTML)
  return loadedTools.includes(toolName)
}

function addToolRow(toolName) {
  table.appendChild(createRow(toolName));
}

function createRow(toolName) {
  row = document.createElement('li');
  row.classList.add("table-row");
  row.appendChild(createCell(1, "Tool", toolName));
  fetchToolData(toolName).then(jsonData => {
    versionInfo = jsonData.compat_matrix.find(item => item.kube_vers === getSelectedKubeVersion());
    row.appendChild(createCell(2, "Min", versionInfo?.versions?.min ? versionInfo.versions.min : 'undefined'));
    row.appendChild(createCell(3, "Max", versionInfo?.versions?.max ? versionInfo.versions.max : 'undefined'));
    // row.appendChild(createCell(4, "", ""));
  });
  return row;
}

function createCell(colIndex, label, content) {
  cell = document.createElement('div');
  cell.classList.add("col");
  cell.classList.add("col-" + colIndex);
  cell.dataset.label = label;
  cell.innerHTML = content;
  return cell;
}

function fetchToolData(toolName) {
  // Fetch the YAML file
  data = fetch('tools/' + toolName + '/data.yaml')
    .then(response => response.text())
    .then(yamlData => {
      // Parse the YAML data
      const jsonData = jsyaml.load(yamlData);
      // Now you can work with the JSON data
      // console.log(jsonData);
      return jsonData;
    })
    .catch(error => console.error('Error fetching YAML file:', error));
  return data;
}
