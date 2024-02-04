// Abstract class to provid child class the ability to dispatch events
// at object level (without relying on a DOM element)
class EventEmitter {
  listeners = {};

  // https://medium.com/@rheedhar/abstract-classes-in-javascript-d6510afac958
  // This trick makes the class abstract
  constructor() {
    if (this.constructor == EventEmitter) {
      throw new Error("EventEmitter is an abstract class and cannot be instantiated");
    }
  }

  // https://stackoverflow.com/questions/68564882/how-do-you-do-custom-events-on-a-javascript-es6-class
  emit(method, payload = null) {
    const callback = this.listeners[method];
    if(typeof callback === 'function'){
        callback(payload);
    }
  }

  addEventListener(method,callback) {
    this.listeners[method] = callback;
  }

  removeEventListener (method) {
    delete this.listeners[method];
  }
}

export class TopicSelector extends EventEmitter {
  /*
  Base HTML structure
  First element is provided by user, and will be used as parent element
  A root element will be created underneath, for namespaced css (namespace: "topic-selector-wrapper")
  <div class="your-selector-class", id="your-selector-id"
    <div class="topic-selector-wrapper" id="topic-selector-wrapper">
      <div class="search-input">
        <input type="text" placeholder="Search a tool...">
        <div class="autocom-box">
          <!-- here list are inserted from javascript -->
        </div>
        <div class="icon"><i class="fas fa-search"></i></div>
      </div>
    </div>
  </div>
  */
  suggestions = [];

  // When false, the selected text will be filled/kept in the input field
  // When true, selecting text will clear the input field
  clearFieldOnSelect = false;
  parentElement;
  rootElement;
  placeholder;
  constructor(rootElement, placeholder = "") {
    super();
    // For the class user, the root element is the parent element of this module
    // To ease CSS namespacing, we create our own root element, with our own class name
    this.parentElement = rootElement;
    this.placeholder = placeholder;

    // Setting all required elements
    this.rootElement = Object.assign(document.createElement("div"), {className: "topic-selector-wrapper"});
    this.searchWrapper = Object.assign(document.createElement("div"), {className: "search-input"});
    this.inputBox = Object.assign(document.createElement("input"), {type: "text", placeholder: this.placeholder});
    this.suggBox = Object.assign(document.createElement("div"), {className: "autocom-box"});
    this.icon = Object.assign(document.createElement("div"), {className: "icon"});
    this.icon.append(Object.assign(document.createElement("i"), {className: "fas fa-search"}));

    this.parentElement.append(this.rootElement);
    this.rootElement.append(this.searchWrapper);
    this.searchWrapper.append(this.inputBox);
    this.searchWrapper.append(this.suggBox);
    this.searchWrapper.append(this.icon);

    this.setupEvents();
  }

/**
 * Event handling
 * HTML elements are created when this class is intantiated
 * We need to delegate event handling to parentElement: https://makandracards.com/makandra/505516-event-delegation-without-jquery
 */
  setupEvents() {
    // Typing in input field
    this.parentElement.addEventListener("keyup", this.#eventHandler.bind(this));
  }

  #eventHandler(event) {
    if (event.target === this.inputBox) {
      switch (event.type) {
        case "keyup":
          this.handleTyping(event);
      }
    }
  }

  handleTyping(e) {
    let userData = e.target.value; //user entered data
    let matchingSuggestions = [];
    if(userData){
      this.icon.onclick = ()=>{
        console.log("Search button was clicked")
        // this.linkTag.click();
      }

      // Retrieve matching suggestions
      matchingSuggestions = this.suggestions.filter((data)=>{
        return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
      });

      // If there is no match, use the user input
      if(!matchingSuggestions.length)
        matchingSuggestions = [this.inputBox.value];

      // Update suggestion box entries
      this.searchWrapper.classList.add("active"); //show autocomplete box
      this.suggBox.replaceChildren(...matchingSuggestions.map(txt => this.createSuggestionEntry(txt)));
    } else {
      this.searchWrapper.classList.remove("active"); //hide autocomplete box
      this.icon.onclick = null; // disable button
    }
  }

  /* Text is selected */
  select(element){
    let selectData = element.currentTarget.textContent;
    this.inputBox.value = selectData;
    this.emit("select", { text: selectData });
    // Clear input field when required
    if (this.clearFieldOnSelect) {
      this.inputBox.value = null;
    }
    this.icon.onclick = ()=>{
      console.log("TopicSelector button was clicked");
    }
    this.searchWrapper.classList.remove("active");
  }

  createSuggestionEntry(textContent) {
    let elm = document.createElement("li");
    elm.textContent = textContent;
    elm.onclick = event => { this.select(event) };
    return elm;
  }

  /* Configuration methods */
  updateSuggestions(suggestions) {
    /**
     * @param {[list(string)]} suggestions
     */
    this.suggestions = suggestions;
  }
}
