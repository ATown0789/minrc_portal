import React, { useRef } from "react";
import Select, { components } from "react-select";
import { IoLocationOutline } from "react-icons/io5";
import { PiBriefcaseMetalLight } from "react-icons/pi";
import { BsGearWideConnected } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";

export const MultiSelect = (props) => {
  // isOptionSelected sees previous props.value after onChange
  const valueRef = useRef(props.value);
  valueRef.current = props.value;
  if (!valueRef.current) valueRef.current = [];

  const disabled = props.disabled;

  const selectAllOption = {
    value: "<SELECT_ALL>",
    label: "Select All",
  };

  const maxSelect = props.max;

  const isSelectAllSelected = () =>
    valueRef.current.length === props.options.length;

  const isOptionSelected = (option) =>
    valueRef.current.some(({ value }) => value === option.value) ||
    isSelectAllSelected();

  const getOptions = () =>
    !maxSelect ? [selectAllOption, ...props.options] : [...props.options];

  const getValue = () =>
    isSelectAllSelected() ? [selectAllOption] : props.value;

  const onChange = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      props.onChange(props.options, actionMeta);
    } else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      props.onChange([], actionMeta);
    } else if (
      actionMeta.action === "deselect-option" &&
      isSelectAllSelected()
    ) {
      props.onChange(
        props.options.filter(({ value }) => value !== option.value),
        actionMeta
      );
    } else {
      props.onChange(newValue || [], actionMeta);
    }
  };

  const ICONS = [
    <IoLocationOutline />,
    <PiBriefcaseMetalLight />,
    <BsGearWideConnected />,
    <FaGraduationCap />,
  ];

  let currentIcon = ICONS[props.icon];

  const Control = ({ children, ...props }) => {
    const style = { margin: "0", fontSize: "20px", color: "#c8b722" };

    return (
      <components.Control {...props}>
        <span style={style}>{currentIcon}</span> {children}
      </components.Control>
    );
  };

  const styles = {
    control: (css) => ({
      ...css,
      paddingLeft: "5px",
      // height: "41px",
      marginBottom: "0",
    }),
  };

  return (
    <Select
      {...props}
      className={props.className}
      components={{ Control }}
      classNamePrefix="multi-select"
      isOptionSelected={isOptionSelected}
      isOptionDisabled={() =>
        maxSelect ? getValue()?.length >= maxSelect : false
      }
      styles={styles}
      options={getOptions()}
      value={getValue()}
      onChange={onChange}
      hideSelectedOptions={false}
      isDisabled={disabled}
      closeMenuOnSelect={true}
      closeMenuOnScroll={true}
      isMulti
      placeholder={props.placeholder}
    />
  );
};
