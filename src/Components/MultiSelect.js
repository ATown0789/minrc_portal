import React, { useRef } from "react";
import ReactSelect from "react-select";

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

  return (
    <ReactSelect
      isOptionSelected={isOptionSelected}
      isOptionDisabled={() =>
        maxSelect ? getValue()?.length >= maxSelect : false
      }
      styles={{ menu: (provided) => ({ ...provided, zIndex: 9 }) }}
      options={getOptions()}
      value={getValue()}
      onChange={onChange}
      hideSelectedOptions={false}
      isDisabled={disabled}
      closeMenuOnSelect={false}
      isMulti
      placeholder={props.placeholder}
    />
  );
};
