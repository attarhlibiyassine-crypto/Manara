import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { placementQuestions } from '../data/placementQuestions';
import { useTranslation } from '../hooks/useTranslation';

const PlacementTest = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUserLevel } = useContext(UserContext);

    const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'question', 'results'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const startTest = () => {
        setCurrentScreen('question');
    };

    const handleAnswer = (selectedIndex) => {
        const isCorrect = selectedIndex === placementQuestions[currentQuestionIndex].correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        if (currentQuestionIndex < placementQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            finishTest(score + (isCorrect ? 1 : 0));
        }
    };

    const finishTest = (finalScore) => {
        const percentage = Math.round((finalScore / placementQuestions.length) * 100);
        let level = 'Beginner';
        if (percentage >= 80) {
            level = 'Advanced';
        } else if (percentage >= 40) {
            level = 'Intermediate';
        }
        
        // Save to context/localStorage
        setUserLevel(level);
        setCurrentScreen('results');
    };

    const percentage = Math.round((score / placementQuestions.length) * 100);
    const assignedLevel = percentage >= 80 ? 'Advanced' : percentage >= 40 ? 'Intermediate' : 'Beginner';


    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col">
            {/* Minimal Header */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 lg:px-40 bg-white dark:bg-slate-900 sticky top-0 z-10">
                <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => navigate('/')}>
                    <span className="material-symbols-outlined text-3xl">lightbulb</span>
                    <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Manara</h2>
                </div>
            </header>

            <main className="flex-1 max-w-[960px] mx-auto w-full py-10 px-6 flex flex-col justify-center">
                
                {/* SCREEN 1: WELCOME */}
                {currentScreen === 'welcome' && (
                    <section className="flex flex-col items-center text-center space-y-8 animate-fade-in">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                            <span className="material-symbols-outlined text-5xl">apartment</span>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-slate-900 dark:text-slate-100 text-4xl lg:text-5xl font-bold leading-tight">Découvre ton niveau en 15 minutes</h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                                Évaluez vos compétences techniques avec notre test adaptatif et obtenez un parcours d'apprentissage personnalisé.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                            <div className="flex flex-col items-center p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                <span className="material-symbols-outlined text-primary mb-2">quiz</span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">20 Questions</span>
                                <span className="text-xs text-slate-500">Test complet</span>
                            </div>
                            <div className="flex flex-col items-center p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                <span className="material-symbols-outlined text-primary mb-2">timer</span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">15 Mins</span>
                                <span className="text-xs text-slate-500">Session limitée</span>
                            </div>
                            <div className="flex flex-col items-center p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                <span className="material-symbols-outlined text-primary mb-2">bolt</span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">Instantané</span>
                                <span className="text-xs text-slate-500">Résultats directs</span>
                            </div>
                            <div className="flex flex-col items-center p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                <span className="material-symbols-outlined text-primary mb-2">sell</span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">Gratuit</span>
                                <span className="text-xs text-slate-500">Sans engagement</span>
                            </div>
                        </div>
                        <button 
                            onClick={startTest}
                            className="w-full max-w-md bg-primary hover:bg-amber-500 text-navy-900 font-bold py-4 rounded-xl shadow-lg transition-all text-lg cursor-pointer"
                        >
                            Commencer le Test
                        </button>
                    </section>
                )}

                {/* SCREEN 2: QUESTION VIEW */}
                {currentScreen === 'question' && (
                    <section className="flex flex-col space-y-8 animate-fade-in w-full max-w-3xl mx-auto">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-slate-900 dark:text-slate-100 font-bold">Progression du test</h3>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span className="text-sm font-mono">15:00</span>
                                </div>
                            </div>
                            <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="bg-primary h-full rounded-full transition-all duration-300" 
                                    style={{ width: `${((currentQuestionIndex) / placementQuestions.length) * 100}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Question {currentQuestionIndex + 1} sur {placementQuestions.length}</span>
                                <span>{Math.round(((currentQuestionIndex) / placementQuestions.length) * 100)}% complété</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center leading-snug">
                                {placementQuestions[currentQuestionIndex].question}
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {placementQuestions[currentQuestionIndex].options.map((option, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        className="group flex items-center p-5 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all text-left cursor-pointer"
                                    >
                                        <span className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center mr-4 group-hover:border-primary group-hover:bg-primary/10 text-sm font-bold shrink-0">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{option}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* SCREEN 3: RESULTS */}
                {currentScreen === 'results' && (
                    <section className="flex flex-col space-y-10 animate-fade-in w-full max-w-4xl mx-auto">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Félicitations !</h2>
                            <p className="text-slate-600 dark:text-slate-400">Votre analyse de compétences est terminée.</p>
                        </div>

                        <div className="bg-navy-900 dark:bg-slate-900 text-white rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <span className="material-symbols-outlined text-[200px]">auto_awesome</span>
                            </div>
                            
                            <div className="relative flex flex-col items-center">
                                <div className="size-40 rounded-full border-8 border-primary flex items-center justify-center flex-col bg-white/5 backdrop-blur-sm">
                                    <span className="text-4xl font-black text-primary">{percentage}%</span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-center mt-1">Score<br/>Global</span>
                                </div>
                                <div className="mt-4 px-6 py-2 bg-primary text-navy-900 rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
                                    Niveau {assignedLevel}
                                </div>
                            </div>
                            
                            <div className="flex-1 space-y-6 relative z-10 w-full">
                                <h3 className="text-xl font-bold border-b border-white/10 pb-2">Résumé</h3>
                                <p className="text-slate-300">
                                    Basé sur votre score de {score} sur {placementQuestions.length}, nous vous avons assigné le niveau <strong>{assignedLevel}</strong>. 
                                    Votre tableau de bord sera automatiquement filtré pour vous proposer les cours les plus adaptés à votre niveau.
                                </p>
                            </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex items-start gap-4">
                            <span className="material-symbols-outlined text-primary text-3xl">model_training</span>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Parcours d'apprentissage prêt</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Votre curriculum personnalisé a été généré avec succès. Vous pouvez maintenant accéder à votre tableau de bord.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="bg-primary hover:bg-amber-500 text-navy-900 font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Aller au Tableau de Bord
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default PlacementTest;
