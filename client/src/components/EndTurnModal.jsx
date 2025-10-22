import React from "react";

const EndTurnModal = ({
  isOpen,
  onEndTurn,
  onClose,
  lastQuestion,
  lastAnswer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Your Turn Complete!
          </h2>

          {lastQuestion && (
            <div className="mb-6">
              <p className="text-gray-600 mb-2">You asked:</p>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <p className="text-lg font-medium text-green-800">
                  "{lastQuestion}"
                </p>
                {lastAnswer !== null && (
                  <p className="text-sm text-gray-600 mt-2">
                    Answer:{" "}
                    <span className="font-medium">
                      {lastAnswer ? "Yes" : "No"}
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Now eliminate characters based on the answer, then end your turn.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Continue Playing
            </button>
            <button
              onClick={onEndTurn}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              End Turn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndTurnModal;
