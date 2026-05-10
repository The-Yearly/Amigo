import React from "react";
import { AlertCircle, X } from "lucide-react";
export default function ConfirmModal({
  isOpen,
  type = "confirm",
  data = null,

  onConfirm = () => {},
  onCancel = () => {},
  config = {},
}) {
  if (!isOpen) return null;
  const typeConfigs = {
    add: {
      title: `Promote to Admin?`,
      message: `Are you sure you want to promote ${data?.name} to admin? They will have access to admin features.`,
      confirmText: "Promote",
      confirmColor: "blue",
      icon: "question",
    },
    remove: {
      title: `Remove Admin?`,
      message: `Are you sure you want to remove ${data?.name} from admin? They will no longer have admin privileges.`,
      confirmText: "Remove",
      confirmColor: "red",
      icon: "alert",
    },
    delete: {
      title: `Delete Permanently?`,
      message: `Are you sure? This action cannot be undone.`,
      confirmText: "Delete",
      confirmColor: "red",
      icon: "alert",
    },
    confirm: {
      title: `Confirm Action?`,
      message: `Are you sure you want to proceed?`,
      confirmText: "Confirm",
      confirmColor: "blue",
      icon: "question",
    },
  };
  const finalConfig = {
    ...typeConfigs[type],
    ...config,
  };

  const colorMap = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      button: "bg-orange-600 hover:bg-orange-700",
    },
  };

  const colors = colorMap[finalConfig.confirmColor] || colorMap.blue;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-all opacity-60 hover:opacity-100"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-500" />
        </button>
        <div className="flex items-center justify-center mb-6">
          <div className={`p-3 rounded-full ${colors.bg}`}>
            <AlertCircle size={28} className={colors.text} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-[#002107] mb-2">
          {finalConfig.title}
        </h2>
        <p className="text-center text-[#727970] mb-8 leading-relaxed">
          {finalConfig.message}
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 text-[#1a1c1e] font-semibold rounded-2xl bg-[#e0e2dc] hover:bg-[#d4d6d0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {finalConfig.cancelText || "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${colors.button}`}
          >
            {finalConfig.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
