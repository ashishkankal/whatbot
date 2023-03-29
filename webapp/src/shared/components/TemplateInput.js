import classNames from "classnames";

export const TemplateInput = ({
  field,
  title,
  placeholder,
  type,
  value,
  onChange,
}) => {
  switch (type) {
    case "textarea":
    case "code":
      return (
        <div>
          <label
            htmlFor={field}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {title}
          </label>
          <div className="mt-2 mb-4">
            <textarea
              rows={4}
              name={field}
              id={field}
              className={classNames(
                type === "code" && "font-mono",
                "block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300",
                " placeholder:text-gray-400 focus:ring-2 focus:ring-inset ",
                " focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              )}
              placeholder={placeholder}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      );

    default:
      return (
        <div>
          <label
            htmlFor={field}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {title}
          </label>
          <div className="mt-2 mb-4">
            <input
              type={type}
              name={field}
              id={field}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={placeholder}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      );
  }
};
