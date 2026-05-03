// AuthInput.jsx
// Labeled input with a left icon, used in auth forms (Sign In / Sign Up).
// Props:
//   id          – input id (links label)
//   label       – label text
//   type        – input type (default "text")
//   placeholder – placeholder string
//   icon        – Material Symbol icon name
//   required    – bool
//   value       – controlled value
//   onChange    – change handler
//   rightSlot   – optional ReactNode rendered top-right (e.g. "Forgot Password?" link)

export default function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  required = false,
  value,
  onChange,
  rightSlot,
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label
          htmlFor={id}
          className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant"
        >
          {label}
        </label>
        {rightSlot}
      </div>
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-2 border-outline-variant/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-md transition-all text-on-surface placeholder:text-outline/50"
        />
      </div>
    </div>
  );
}
