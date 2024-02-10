import React from "react";
import Select, { components } from "react-select";

export default class SelectorWithIcon extends React.Component {
  sidePadding = "6px";
  gapSpacing = "3px";
  constructor(props) {
    super(props);
    this.Control = ({ children, ...props }) => (
      <components.Control {...props}>
        <img
          src={this.props.iconSrc}
          width={this.props.iconWidth}
          height={this.props.iconHeight}
        />
        {children}
      </components.Control>
    );
  }

  render() {
    return (
      <Select
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Control: this.Control,
        }}
        styles={{
          control: (base) => ({
            ...base,
            display: "flex",
            gap: this.gapSpacing,
            paddingLeft: this.sidePadding,
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: 0,
            paddingRight: this.sidePadding,
          }),
          menu: (base) => ({
            ...base,
            width: "max-content",
            minWidth: "100%",
          }),
        }}
        {...this.props}
      />
    );
  }
}

SelectorWithIcon.defaultProps = {
  iconSrc: "https://www.svgrepo.com/show/374167/vite.svg",
  iconWidth: "20px",
  iconHeight: "auto",
};
