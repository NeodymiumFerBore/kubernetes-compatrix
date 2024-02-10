import Select, { components } from "react-select";

export default function ToolForm({ options, defaults }) {
  console.log("Rendering ToolForm");

  return (
    <>
      <Select
        //defaultValue={[options[2], options[3]]}
        isMulti
        placeholder="Select tools..."
        name="tools"
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        options={options}
        className="tool-selection"
        classNamePrefix="tool-selection"
        inputId="tools"
        closeMenuOnSelect={false}
        //controlShouldRenderValue={false}
        styles={{
          option: (base, { data, isDisabled, isFocused, isSelected }) => {
            return {
              ...base,
              backgroundColor: isFocused ? "aquamarine" : "transparent",
              borderRadius: "360px",
              margin: "5px",
              maxWidth: "96%", // compensate weird overflow when changing margin
            };
          },
          container: (base) => ({
            ...base,
            minWidth: "240px",
            maxWidth: "800px",
          }),
        }}
      />
    </>
  );
}
