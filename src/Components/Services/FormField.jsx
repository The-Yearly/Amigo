// FormField.jsx
// Reusable labeled form field. Renders an input, select, or textarea
// based on the `as` prop.
//
// Props:
//   label       – field label string
//   as          – "input" | "select" | "textarea" (default "input")
//   icon        – optional Material Symbol name shown on left (input only)
//   options     – array of strings (select only)
//   rows        – number of rows (textarea only)
//   placeholder – placeholder text
//   type        – input type (default "text")
//   value       – controlled value
//   onChange    – change handler
//   className   – extra classes on the wrapper div

const BASE =
  "w-full bg-surface-container-high border border-outline-variant/10 rounded-lg px-4 py-3 focus:border-primary/35 focus:ring-2 focus:ring-primary/15 transition-all";

export default function FormField({
  label,
  as = "input",
  icon,
  options = [],
  rows = 4,
  placeholder,
  type = "text",
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-bold text-on-surface-variant mb-2 font-label">
        {label}
      </label>

      {as === "select" && (
        <select className={`${BASE} appearance-none`} value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}

      {as === "textarea" && (
        <textarea
          className={`${BASE} resize-none`}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      )}

      {as === "input" && (
        <div className="relative">
          {icon && (
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
              {icon}
            </span>
          )}
          <input
            type={type}
            className={`${BASE} ${icon ? "pl-10" : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
}
