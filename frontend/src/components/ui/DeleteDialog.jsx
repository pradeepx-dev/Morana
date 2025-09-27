import React from 'react'
import { X, AlertTriangle, Trash2 } from 'lucide-react'

const DeleteDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  destructive = true,
  itemName = ""
}) => {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${destructive ? 'bg-red-600 bg-opacity-20' : 'bg-blue-600 bg-opacity-20'}`}>
              {destructive ? (
                <AlertTriangle className={`w-6 h-6 ${destructive ? 'text-red-400' : 'text-blue-400'}`} />
              ) : (
                <Trash2 className={`w-6 h-6 ${destructive ? 'text-red-400' : 'text-blue-400'}`} />
              )}
            </div>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
          </div>
          
          {!loading && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-300 leading-relaxed">
            {message}
          </p>
          {itemName && (
            <div className="mt-3 p-3 bg-gray-800 rounded-lg">
              <p className="text-white font-medium">"{itemName}"</p>
            </div>
          )}
          {destructive && (
            <div className="mt-4 p-3 bg-red-600 bg-opacity-10 border border-red-600 rounded-lg">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                This action cannot be undone.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white rounded-lg transition-colors font-medium"
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
              destructive
                ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white'
                : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                {confirmText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteDialog