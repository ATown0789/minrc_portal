import { useFormContext, Controller } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { findInputError } from "utils/findInputError";
import { isFormInvalid } from "utils/isFormInvalid";
import Select from "react-select";
import { MultiSelect } from "./MultiSelect";
import "./input.css";

export const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  className,
  rows,
  columns,
  control,
  options,
  checked,
  max,
  defaultValue,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <div className="job-form-input">
      <label htmlFor={id}>
        {label}
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          type={type}
          cols={columns}
          rows={rows}
          placeholder={placeholder}
          className={className}
          defaultValue={defaultValue}
          {...register(name, validation)}
        ></textarea>
      ) : type === "select" ? (
        <Controller
          name={name}
          rules={validation}
          render={({ field: { ref, ...field } }) => (
            <Select
              {...field}
              defaultValue={defaultValue}
              className="select-input"
              placeholder={placeholder}
              options={options}
              isClearable
            />
          )}
        />
      ) : type === "multiselect" ? (
        <div className="signup-multiselect">
          <Controller
            name={name}
            rules={validation}
            render={({ field: { ref, ...field } }) => (
              <MultiSelect
                {...field}
                placeholder={placeholder}
                defaultValue={defaultValue}
                name={name}
                control={control}
                options={options}
                max={max}
              />
            )}
          />
        </div>
      ) : (
        <input
          id={id}
          type={type}
          cols={columns}
          placeholder={placeholder}
          className={className}
          defaultValue={defaultValue}
          checked={checked}
          {...register(name, validation)}
        />
      )}
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.span className="input-error" {...framer_error}>
      <MdError />
      {message}
    </motion.span>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
