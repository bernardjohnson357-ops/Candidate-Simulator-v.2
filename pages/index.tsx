import Link from "next/link";  // add this import at the top

// Replace the module buttons map with conditional links
{modules.map((module, idx) => (
  <div key={idx}>
    {idx === 0 ? (
      <Link href="/module1" legacyBehavior>
        <a className="w-full block px-4 py-3 bg-white rounded-2xl shadow hover:bg-gray-100 text-lg font-medium">
          {module}
        </a>
      </Link>
    ) : (
      <button
        className="w-full px-4 py-3 bg-gray-200 rounded-2xl shadow text-lg font-medium cursor-not-allowed"
        disabled
      >
        {module}
      </button>
    )}
  </div>
))}
