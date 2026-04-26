// StarRating.jsx
// Renders N filled stars and (max - N) outlined stars.
// Props:
//   rating  – number of filled stars (integer, 0–max)
//   max     – total stars to render (default 5)
//   size    – icon font size in px (default 18)

export default function StarRating({ rating, max = 5, size = 18 }) {
  return (
    <div className="flex text-yellow-500">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{
            fontSize: size,
            fontVariationSettings: `'FILL' ${i < rating ? 1 : 0}`,
          }}
        >
          star
        </span>
      ))}
    </div>
  );
}
