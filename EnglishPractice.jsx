import React, { useState } from 'react';
import { ChevronRight, Check, X, RotateCcw } from 'lucide-react';

const EnglishPractice = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentExerciseType, setCurrentExerciseType] = useState(null);

  // EXERCISE TYPE 1: Multiple Choice (Elige la palabra correcta)
  const multipleChoiceExercises = [
    {
      id: 'mc1',
      type: 'multipleChoice',
      text: 'She ___ to the cinema every weekend.',
      options: ['go', 'goes', 'going', 'gone'],
      correct: 1,
      explanation: 'Se usa "goes" porque el sujeto es tercera persona singular (she) y el verbo requiere la forma conjugada.'
    },
    {
      id: 'mc2',
      type: 'multipleChoice',
      text: 'If I had known about the party, I ___ gone.',
      options: ['would have', 'had', 'would', 'have'],
      correct: 0,
      explanation: '"would have" se usa en condicionales de tercer tipo (mixed conditional) con "had known".'
    },
    {
      id: 'mc3',
      type: 'multipleChoice',
      text: 'The project must be ___ by Friday.',
      options: ['completing', 'completed', 'complete', 'completes'],
      correct: 1,
      explanation: 'Con "must be" (pasiva), necesitamos el participio pasado "completed".'
    }
  ];

  // EXERCISE TYPE 2: Fill in the blanks (Rellena los huecos)
  const fillBlanksExercises = [
    {
      id: 'fb1',
      type: 'fillBlanks',
      text: 'Despite the _____, the match continued. The players were very _____ to win.',
      blanks: [
        { position: 1, answer: 'rain', hints: ['clima', '4 letras'] },
        { position: 2, answer: 'determined', hints: ['resueltos', 'adjetivo'] }
      ],
      explanation: 'Rain (lluvia) es una palabra común para clima. Determined (determinado) describe la actitud de los jugadores.'
    },
    {
      id: 'fb2',
      type: 'fillBlanks',
      text: 'The _____ between the two companies led to an ____ situation.',
      blanks: [
        { position: 1, answer: 'disagreement', hints: ['desacuerdo', '11 letras'] },
        { position: 2, answer: 'awkward', hints: ['incómodo', 'adjetivo'] }
      ],
      explanation: 'Disagreement (desacuerdo) es el sustantivo. Awkward (incómodo) describe la situación.'
    }
  ];

  // EXERCISE TYPE 3: Fill blanks with word options (Rellena y modula las palabras)
  const reorderBlanksExercises = [
    {
      id: 'rb1',
      type: 'reorderBlanks',
      text: 'The company _____ (ESTABLISH) in 1995 and _____ (GROW) significantly since then.',
      blanks: [
        { position: 1, baseWord: 'ESTABLISH', correctForm: 'was established', hints: ['pasiva, pasado'] },
        { position: 2, baseWord: 'GROW', correctForm: 'has grown', hints: ['present perfect'] }
      ],
      explanation: 'Primera: pasiva en pasado (was + participio pasado). Segunda: present perfect porque continúa hasta ahora.'
    },
    {
      id: 'rb2',
      type: 'reorderBlanks',
      text: 'If she _____ (STUDY) harder, she _____ (PASS) the exam.',
      blanks: [
        { position: 1, baseWord: 'STUDY', correctForm: 'studied', hints: ['conditional simple, pasado'] },
        { position: 2, baseWord: 'PASS', correctForm: 'would pass', hints: ['would + base verb'] }
      ],
      explanation: 'Condicional simple: pasado simple + would + infinitivo.'
    }
  ];

  // EXERCISE TYPE 4: Rewrite the sentence
  const rewriteExercises = [
    {
      id: 'rw1',
      type: 'rewrite',
      original: 'She is so intelligent that everyone respects her.',
      instruction: 'Reescribe usando "Such... that" en lugar de "So... that"',
      correctAnswers: [
        'She is such an intelligent person that everyone respects her.',
        'She is such a intelligent person that everyone respects her.'
      ],
      hints: ['Usa "Such + a/an + adjective + noun"', 'La estructura cambia pero el significado es igual'],
      explanation: 'Such + a/an + adjective + noun + that = So + adjective + that. Ambas expresan resultado.'
    },
    {
      id: 'rw2',
      type: 'rewrite',
      original: 'I haven\'t seen her since 2019.',
      instruction: 'Reescribe sin usar "since", usando "It is/has been"',
      correctAnswers: [
        'It has been since 2019 that I haven\'t seen her.',
        'It is a long time since I last saw her.',
        'It\'s been years since I last saw her.'
      ],
      hints: ['Cambia la perspectiva temporal', 'Puedes usar "last saw" en lugar de "haven\'t seen"'],
      explanation: 'Se puede expresar lo mismo enfatizando el tiempo transcurrido en lugar de la acción.'
    }
  ];

  const allExercises = [
    ...multipleChoiceExercises,
    ...fillBlanksExercises,
    ...reorderBlanksExercises,
    ...rewriteExercises
  ];

  const handleSelectAnswer = (exerciseId, optionIndex) => {
    if (!showResults) {
      setUserAnswers({ ...userAnswers, [exerciseId]: optionIndex });
    }
  };

  const handleFillBlankAnswer = (exerciseId, blankPosition, value) => {
    const key = `${exerciseId}-blank-${blankPosition}`;
    setUserAnswers({ ...userAnswers, [key]: value });
  };

  const handleRewriteAnswer = (exerciseId, value) => {
    setUserAnswers({ ...userAnswers, [exerciseId]: value });
  };

  const checkAnswer = (exerciseId) => {
    const exercise = allExercises.find(e => e.id === exerciseId);
    
    if (exercise.type === 'multipleChoice') {
      return userAnswers[exerciseId] === exercise.correct;
    } else if (exercise.type === 'fillBlanks') {
      return exercise.blanks.every(blank => {
        const key = `${exerciseId}-blank-${blank.position}`;
        return userAnswers[key]?.trim().toLowerCase() === blank.answer.toLowerCase();
      });
    } else if (exercise.type === 'reorderBlanks') {
      return exercise.blanks.every(blank => {
        const key = `${exerciseId}-blank-${blank.position}`;
        return userAnswers[key]?.trim().toLowerCase() === blank.correctForm.toLowerCase();
      });
    } else if (exercise.type === 'rewrite') {
      const userAnswer = userAnswers[exerciseId]?.trim().toLowerCase() || '';
      return exercise.correctAnswers.some(correct => 
        correct.toLowerCase().includes(userAnswer) || userAnswer.includes(correct.toLowerCase())
      );
    }
    return false;
  };

  const resetAnswers = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const currentExerciseData = allExercises[currentExercise];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">English Practice Hub</h1>
          <p className="text-gray-600">Mejora tu inglés con estos 4 tipos de ejercicios</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Ejercicio {currentExercise + 1} de {allExercises.length}
            </h2>
            <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
              {currentExerciseData.type === 'multipleChoice' && '📝 Opción Múltiple'}
              {currentExerciseData.type === 'fillBlanks' && '✍️ Rellenar Huecos'}
              {currentExerciseData.type === 'reorderBlanks' && '🔄 Modular Palabras'}
              {currentExerciseData.type === 'rewrite' && '✏️ Reescribir'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExercise + 1) / allExercises.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* EXERCISE TYPE 1: Multiple Choice */}
          {currentExerciseData.type === 'multipleChoice' && (
            <div>
              <p className="text-lg text-gray-800 mb-6">{currentExerciseData.text}</p>
              <div className="space-y-3">
                {currentExerciseData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(currentExerciseData.id, index)}
                    disabled={showResults}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      userAnswers[currentExerciseData.id] === index
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 hover:border-blue-400'
                    } ${showResults && (
                      index === currentExerciseData.correct
                        ? 'border-green-500 bg-green-50'
                        : index === userAnswers[currentExerciseData.id]
                        ? 'border-red-500 bg-red-50'
                        : ''
                    )} disabled:cursor-not-allowed`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option}</span>
                      {showResults && index === currentExerciseData.correct && <Check className="text-green-600" />}
                      {showResults && index === userAnswers[currentExerciseData.id] && index !== currentExerciseData.correct && <X className="text-red-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* EXERCISE TYPE 2: Fill Blanks */}
          {currentExerciseData.type === 'fillBlanks' && (
            <div>
              <p className="text-lg text-gray-800 mb-6">{currentExerciseData.text}</p>
              <div className="space-y-4">
                {currentExerciseData.blanks.map((blank, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hueco {blank.position} {blank.hints && `(${blank.hints.join(', ')})`}
                    </label>
                    <input
                      type="text"
                      placeholder={`Escribe la palabra...`}
                      value={userAnswers[`${currentExerciseData.id}-blank-${blank.position}`] || ''}
                      onChange={(e) => handleFillBlankAnswer(currentExerciseData.id, blank.position, e.target.value)}
                      disabled={showResults}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                    />
                    {showResults && (
                      <p className={`mt-2 text-sm ${userAnswers[`${currentExerciseData.id}-blank-${blank.position}`]?.toLowerCase() === blank.answer.toLowerCase() ? 'text-green-600' : 'text-red-600'}`}>
                        {userAnswers[`${currentExerciseData.id}-blank-${blank.position}`]?.toLowerCase() === blank.answer.toLowerCase() 
                          ? `✓ Correcto: ${blank.answer}` 
                          : `✗ Respuesta: ${blank.answer}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXERCISE TYPE 3: Reorder Blanks */}
          {currentExerciseData.type === 'reorderBlanks' && (
            <div>
              <p className="text-lg text-gray-800 mb-6">{currentExerciseData.text}</p>
              <div className="space-y-4">
                {currentExerciseData.blanks.map((blank, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modifica: <span className="text-blue-600 font-bold">{blank.baseWord}</span> {blank.hints && `(${blank.hints.join(', ')})`}
                    </label>
                    <input
                      type="text"
                      placeholder={`Escribe la forma correcta...`}
                      value={userAnswers[`${currentExerciseData.id}-blank-${blank.position}`] || ''}
                      onChange={(e) => handleFillBlankAnswer(currentExerciseData.id, blank.position, e.target.value)}
                      disabled={showResults}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                    />
                    {showResults && (
                      <p className={`mt-2 text-sm ${userAnswers[`${currentExerciseData.id}-blank-${blank.position}`]?.toLowerCase() === blank.correctForm.toLowerCase() ? 'text-green-600' : 'text-red-600'}`}>
                        {userAnswers[`${currentExerciseData.id}-blank-${blank.position}`]?.toLowerCase() === blank.correctForm.toLowerCase() 
                          ? `✓ Correcto: ${blank.correctForm}` 
                          : `✗ Respuesta: ${blank.correctForm}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXERCISE TYPE 4: Rewrite */}
          {currentExerciseData.type === 'rewrite' && (
            <div>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-400">
                <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Frase original:</span> "{currentExerciseData.original}"</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">Instrucción:</span> {currentExerciseData.instruction}</p>
              </div>
              <textarea
                placeholder="Escribe la frase reescrita aquí..."
                value={userAnswers[currentExerciseData.id] || ''}
                onChange={(e) => handleRewriteAnswer(currentExerciseData.id, e.target.value)}
                disabled={showResults}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100 min-h-24 resize-none"
              />
              {showResults && (
                <div className={`mt-4 p-4 rounded-lg ${checkAnswer(currentExerciseData.id) ? 'bg-green-50 border-l-4 border-green-400' : 'bg-orange-50 border-l-4 border-orange-400'}`}>
                  <p className={`font-semibold mb-2 ${checkAnswer(currentExerciseData.id) ? 'text-green-700' : 'text-orange-700'}`}>
                    {checkAnswer(currentExerciseData.id) ? '✓ Excelente' : '⚠️ Respuestas aceptables:'}
                  </p>
                  <ul className="space-y-1">
                    {currentExerciseData.correctAnswers.map((answer, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {answer}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Explanation and Buttons */}
        {showResults && (
          <div className="bg-indigo-50 rounded-lg p-6 mb-6 border-l-4 border-indigo-500">
            <h3 className="font-semibold text-indigo-900 mb-2">📚 Explicación</h3>
            <p className="text-gray-700">{currentExerciseData.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Comprobar Respuesta <Check size={20} />
            </button>
          ) : (
            <>
              <button
                onClick={resetAnswers}
                className="flex-1 bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
              >
                Intentar de Nuevo <RotateCcw size={20} />
              </button>
              <button
                onClick={() => {
                  if (currentExercise < allExercises.length - 1) {
                    setCurrentExercise(currentExercise + 1);
                    resetAnswers();
                  }
                }}
                disabled={currentExercise === allExercises.length - 1}
                className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                Siguiente Ejercicio <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-2 flex-wrap justify-center">
          {allExercises.map((exercise, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentExercise(idx);
                resetAnswers();
              }}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                idx === currentExercise
                  ? 'bg-blue-600 text-white'
                  : checkAnswer(exercise.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>📖 Basado en exámenes de Cambridge English</p>
        </div>
      </div>
    </div>
  );
};

export default EnglishPractice;
