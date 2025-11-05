import { renderPaginationButtons } from "../utils/sessionUtils.js";

export default function PaginationControls({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "" 
}) {
  if (totalPages <= 1) return null;

  const buttons = renderPaginationButtons(currentPage, totalPages);

  return (
    <div className={`flex flex-col items-center space-y-4 mt-6 ${className}`}>
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex justify-center items-center space-x-2">
        {buttons.map((button) => {
          if (button.type === 'ellipsis') {
            return (
              <span key={button.key} className="text-gray-400">
                {button.label}
              </span>
            );
          }

          return (
            <button
              key={button.key}
              onClick={() => onPageChange(button.page)}
              disabled={button.disabled}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                button.disabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : button.current
                  ? 'bg-[#002147] text-white'
                  : 'bg-white text-[#002147] border border-gray-300 hover:bg-[#002147] hover:text-white'
              }`}
            >
              {button.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}