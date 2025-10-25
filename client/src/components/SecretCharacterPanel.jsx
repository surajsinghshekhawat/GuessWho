import React from "react";

const SecretCharacterPanel = ({ 
  mySecretCharacter, 
  opponentEliminatedCharacters, 
  characters,
  onMakeGuess,
  isMyTurn,
  hasAskedQuestion,
  hasMadeGuess
}) => {
  const opponentRemainingCount = characters.length - opponentEliminatedCharacters.length;

  return (
    <div className="space-y-6">
      {/* Secret Character Display */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ctext font-family='Arial' font-size='16' x='20' y='20' text-anchor='middle'%3E?%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">
            Your Secret Character
          </h3>
          
          {mySecretCharacter ? (
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 bg-yellow-300 rounded-lg border-2 border-yellow-400 overflow-hidden">
                  <img
                    src={mySecretCharacter.image}
                    alt={mySecretCharacter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-800">
                  {mySecretCharacter.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Keep this secret!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/20 rounded-xl p-8 text-center">
              <div className="text-white/60 text-lg">
                Select your character to begin
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Opponent's Progress */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ctext font-family='Arial' font-size='16' x='20' y='20' text-anchor='middle'%3E?%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">
            Opponent's Progress
          </h3>
          
          {/* Progress Stats */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Remaining Characters</span>
              <span className="text-lg font-bold text-gray-800">{opponentRemainingCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(opponentRemainingCount / characters.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Mini Board */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Opponent's Board</h4>
            <div className="grid grid-cols-6 gap-1">
              {characters.map((character) => {
                const isEliminated = opponentEliminatedCharacters.includes(character.id);
                return (
                  <div
                    key={character.id}
                    className={`aspect-square rounded border transition-all duration-300 ${
                      isEliminated
                        ? 'bg-gray-400 border-gray-500 opacity-60'
                        : 'bg-yellow-300 border-yellow-400'
                    }`}
                  >
                    {!isEliminated ? (
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-600 text-xs font-bold">✕</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Game Actions */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ctext font-family='Arial' font-size='16' x='20' y='20' text-anchor='middle'%3E?%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">
            Game Actions
          </h3>
          
          <div className="space-y-3">
            <button
              onClick={onMakeGuess}
              disabled={!isMyTurn || hasAskedQuestion || hasMadeGuess}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                isMyTurn && !hasAskedQuestion && !hasMadeGuess
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              {hasMadeGuess ? 'Guess Made' : 'Make a Guess'}
            </button>
            
            <div className="text-center">
              <p className="text-white/80 text-sm">
                {isMyTurn 
                  ? hasAskedQuestion 
                    ? 'Eliminate characters and end your turn'
                    : hasMadeGuess
                    ? 'Wait for your guess result'
                    : 'Ask a question or make a guess'
                  : 'Wait for your turn'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretCharacterPanel;