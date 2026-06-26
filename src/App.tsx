import { useState, useEffect, useCallback } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw, 
  CheckCircle,
  Volume2,
  VolumeX,
  HelpCircle
} from 'lucide-react';

// --- AUDIO HELPERS ---
let audioCtx: AudioContext | null = null;
const initAudio = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
};

const playTone = (freq: number, type: OscillatorType, duration: number) => {
  if (!audioCtx) return;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
};

const playSwitchSound = () => {
  playTone(600, 'sine', 0.15);
  setTimeout(() => playTone(800, 'sine', 0.2), 150);
};

const playEndStepSound = () => {
  playTone(440, 'triangle', 0.4);
};

const playCompleteSound = () => {
  playTone(400, 'sine', 0.2);
  setTimeout(() => playTone(500, 'sine', 0.2), 200);
  setTimeout(() => playTone(600, 'sine', 0.4), 400);
};

const playTickSound = () => {
  playTone(523.25, 'sine', 0.04);
};

const playStartSound = () => {
  playTone(659.25, 'sine', 0.15);
};

interface RoutineStep {
  id: string;
  title: string;
  duration: number;
  switchAt?: number;
  description: string;
  color: string;
  ringColor: string;
  bgColor: string;
  btnBg: string;       // Static button background
  btnHoverBg: string;  // Static button hover background
  barBg: string;       // Static progress bar background
  how: string;
  why: string;
}

const ROUTINE: RoutineStep[] = [
  {
    id: 'piriformis',
    title: 'Piriformis Release',
    duration: 60,
    switchAt: 30, // Trigger switch sound halfway
    description: 'Sit on the floor. Place a massage ball under your right glute. Cross your right ankle over your left knee. Rest weight on a tender spot. Switch sides halfway (at 30s).',
    color: 'text-blue-500',
    ringColor: 'stroke-blue-500',
    bgColor: 'bg-blue-50',
    btnBg: 'bg-blue-600',
    btnHoverBg: 'hover:bg-blue-700',
    barBg: 'bg-blue-500',
    how: 'Sit on the floor. Place a massage ball under your right glute. Cross your right ankle over your left knee. Rest weight on a tender spot. Switch sides halfway (at 30s).',
    why: 'Releasing the piriformis muscle reduces deep glute tightness, relieves pressure on the sciatic nerve (which runs directly underneath or through the muscle), and improves external hip rotation, preparing your hips for pelvic hinging.'
  },
  {
    id: 'nerve-floss',
    title: 'Seated Nerve Floss',
    duration: 60,
    switchAt: 30, // Trigger switch sound halfway
    description: 'Sit on a chair, slump mid-back, tuck chin. Slowly straighten right leg while looking UP. Bend knee while tucking chin DOWN. Smooth motions. Switch legs at 30s.',
    color: 'text-indigo-500',
    ringColor: 'stroke-indigo-500',
    bgColor: 'bg-indigo-50',
    btnBg: 'bg-indigo-600',
    btnHoverBg: 'hover:bg-indigo-700',
    barBg: 'bg-indigo-500',
    how: 'Sit on a chair, slump mid-back, tuck chin. Slowly straighten right leg while looking UP. Bend knee while tucking chin DOWN. Smooth motions. Switch legs at 30s.',
    why: 'Nerve flossing (neural gliding) gently stretches and releases tension along the sciatic nerve pathway. Rather than stretching a muscle, it helps the nerve slide smoothly through its surrounding tissues, reducing neural tightness and lower back stiffness.'
  },
  {
    id: 'glute-bridges',
    title: 'Glute Bridges',
    duration: 60,
    description: 'Lie on your back, knees bent. Drive through heels to lift hips. Squeeze glutes hard at the top for 1 second, then lower slowly. Repeat for 60 seconds.',
    color: 'text-purple-500',
    ringColor: 'stroke-purple-500',
    bgColor: 'bg-purple-50',
    btnBg: 'bg-purple-600',
    btnHoverBg: 'hover:bg-purple-700',
    barBg: 'bg-purple-500',
    how: 'Lie on your back, knees bent. Drive through heels to lift hips. Squeeze glutes hard at the top for 1 second, then lower slowly. Repeat for 60 seconds.',
    why: 'Strengthening the glutes provides reciprocal inhibition to the hip flexors and hamstrings, causing them to naturally relax and lengthen. It also stabilizes the pelvis and lower back, facilitating a safer, deeper hip hinge during forward folds.'
  },
  {
    id: 'elevated-fold',
    title: 'Elevated Belly-to-Thigh Fold',
    duration: 120,
    description: 'Sit on a yoga block/book. Bend knees generously. Hinge at hips to glue your belly to your thighs. Slowly slide heels out until you feel a stretch, without losing belly contact.',
    color: 'text-teal-500',
    ringColor: 'stroke-teal-500',
    bgColor: 'bg-teal-50',
    btnBg: 'bg-teal-600',
    btnHoverBg: 'hover:bg-teal-700',
    barBg: 'bg-teal-500',
    how: 'Sit on a yoga block/book. Bend knees generously. Hinge at hips to glue your belly to your thighs. Slowly slide heels out until you feel a stretch, without losing belly contact.',
    why: 'Elevating the pelvis tilts it forward, encouraging a true hip hinge rather than rounding the lower back. Keeping the belly in contact with the thighs ensures your lumbar spine remains protected and straight, shifting the entire stretch into the hamstrings and calves where it belongs.'
  }
];

// --- VISUALIZATION COMPONENT ---
interface VisualizerProps {
  stepId: string;
  timeLeft: number;
  duration: number;
}

const Visualizer = ({ stepId, timeLeft, duration }: VisualizerProps) => {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  const FloorLine = () => (
    <line x1="10" y1="85" x2="90" y2="85" strokeWidth="3" strokeDasharray="4 4" className="stroke-slate-300" />
  );

  if (stepId === 'piriformis') {
    // Flip horizontal when switching sides
    const isFlipped = timeLeft <= (duration / 2);
    return (
      <svg viewBox="0 0 100 100" className={`w-full h-full transition-transform duration-700 ${isFlipped ? '-scale-x-100' : ''}`}>
        <FloorLine />
        <circle cx="30" cy="30" r="9" {...commonProps} />
        {/* Torso */}
        <line x1="30" y1="39" x2="20" y2="85" {...commonProps} />
        {/* Arm leaning back */}
        <line x1="27" y1="50" x2="10" y2="85" {...commonProps} />
        {/* Planted Leg */}
        <polyline points="20,85 55,70 65,85" {...commonProps} />
        {/* Crossed Leg */}
        <polyline points="20,85 55,85 45,65" {...commonProps} />
        {/* Massage Ball */}
        <circle cx="25" cy="80" r="4" className="fill-current stroke-none opacity-50" />
      </svg>
    );
  }

  if (stepId === 'nerve-floss') {
    // Alternate state every 2 seconds for a slow, smooth flossing pace
    const isExtended = Math.floor(timeLeft / 2) % 2 === 0;
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full transition-all duration-300">
        <FloorLine />
        {/* Chair */}
        <polyline points="30,50 50,50 50,85" strokeWidth="4" className="stroke-slate-300 fill-none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="30" y1="50" x2="30" y2="85" strokeWidth="4" className="stroke-slate-300" strokeLinecap="round" />
        
        {isExtended ? (
          <g {...commonProps}>
            <circle cx="55" cy="15" r="9" />
            <line x1="55" y1="24" x2="50" y2="50" />
            <line x1="50" y1="50" x2="90" y2="50" />
            <line x1="90" y1="50" x2="85" y2="40" /> {/* flexed foot */}
            <line x1="52" y1="35" x2="40" y2="50" /> {/* Arm */}
          </g>
        ) : (
          <g {...commonProps}>
            <circle cx="40" cy="25" r="9" />
            <path d="M42,34 Q30,40 50,50" />
            <polyline points="50,50 70,60 60,85" />
            <line x1="60" y1="85" x2="70" y2="85" /> {/* flat foot */}
            <line x1="42" y1="42" x2="50" y2="60" /> {/* Arm */}
          </g>
        )}
      </svg>
    );
  }

  if (stepId === 'glute-bridges') {
    // Alternate state every 2 seconds
    const isUp = Math.floor(timeLeft / 2) % 2 === 0;
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full transition-all duration-300">
        <FloorLine />
        <circle cx="20" cy="80" r="9" {...commonProps} />
        {isUp ? (
          <g {...commonProps}>
            <line x1="29" y1="80" x2="65" y2="45" /> {/* Torso straight to knee */}
            <line x1="65" y1="45" x2="75" y2="85" /> {/* Leg to floor */}
          </g>
        ) : (
          <g {...commonProps}>
            <line x1="29" y1="80" x2="55" y2="80" /> {/* Torso flat */}
            <polyline points="55,80 65,55 75,85" /> {/* Leg bent */}
          </g>
        )}
        <line x1="29" y1="80" x2="45" y2="80" {...commonProps} /> {/* Arm */}
      </svg>
    );
  }

  if (stepId === 'elevated-fold') {
    // Alternate state every 4 seconds to illustrate the slow heel slide
    const isSliding = Math.floor(timeLeft / 4) % 2 === 0;
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full transition-all duration-500">
        <FloorLine />
        <rect x="15" y="65" width="20" height="20" className="fill-slate-300 stroke-none" rx="2" />
        
        {isSliding ? (
          <g {...commonProps}>
            <circle cx="65" cy="40" r="9" />
            <line x1="25" y1="65" x2="58" y2="45" /> {/* Torso down */}
            <polyline points="25,65 60,65 85,85" /> {/* Legs sliding out */}
            <line x1="45" y1="52" x2="70" y2="70" /> {/* Arms reaching */}
          </g>
        ) : (
          <g {...commonProps}>
            <circle cx="55" cy="35" r="9" />
            <line x1="25" y1="65" x2="48" y2="40" /> {/* Torso up slightly */}
            <polyline points="25,65 55,50 65,85" /> {/* Legs bent tight */}
            <line x1="38" y1="50" x2="55" y2="68" /> {/* Arms holding shins */}
          </g>
        )}
      </svg>
    );
  }

  return null;
};

interface FarcasterUser {
  pfpUrl?: string;
  displayName?: string;
  username?: string;
}

interface FarcasterContext {
  user?: FarcasterUser;
  client?: {
    added?: boolean;
  };
}

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUTINE[0].duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Farcaster Mini App Integration States
  const [isFarcaster, setIsFarcaster] = useState<boolean>(false);
  const [farcasterContext, setFarcasterContext] = useState<FarcasterContext | null>(null);

  // Initialize Farcaster SDK on mount
  useEffect(() => {
    const initFarcaster = async () => {
      try {
        console.log("Initializing Farcaster SDK...");
        const context = await sdk.context;
        setFarcasterContext(context);
        setIsFarcaster(true);
        console.log("Farcaster SDK Context loaded:", context);
      } catch (err) {
        console.warn("Farcaster SDK context could not be loaded (likely running in regular browser):", err);
        setIsFarcaster(false);
      } finally {
        try {
          // Hide Farcaster native splash screen
          await sdk.actions.ready();
          console.log("Farcaster ready signal completed.");
        } catch (e) {
          console.warn("Could not call sdk.actions.ready() (likely running in regular browser):", e);
        }
      }
    };

    initFarcaster();
  }, []);

  // Tutorial Mode & Onboarding States
  const [tutorialMode, setTutorialMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('foldable_tutorial_mode');
    return saved !== null ? saved === 'true' : true;
  });
  const [showTutorial, setShowTutorial] = useState<boolean>(() => {
    const saved = localStorage.getItem('foldable_tutorial_mode');
    return saved !== null ? saved === 'true' : true;
  });
  const [dismissedSteps, setDismissedSteps] = useState<string[]>([]);

  const [isPreparing, setIsPreparing] = useState(false);
  const [prepareTime, setPrepareTime] = useState(3);

  const currentStep = ROUTINE[currentStepIndex];

  const toggleTutorialMode = () => {
    initAudio();
    setIsPreparing(false);
    
    if (showTutorial) {
      setShowTutorial(false);
      setTutorialMode(false);
      localStorage.setItem('foldable_tutorial_mode', 'false');
    } else {
      setShowTutorial(true);
      setTutorialMode(true);
      localStorage.setItem('foldable_tutorial_mode', 'true');
      setIsActive(false);
    }
  };

  // Preparation Timer Logic (3-second countdown)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isPreparing && prepareTime > 0) {
      interval = setInterval(() => {
        setPrepareTime((time) => {
          const nextTime = time - 1;
          if (soundEnabled) {
            if (nextTime > 0) {
              playTickSound();
            } else {
              playStartSound();
            }
          }
          if (nextTime === 0) {
            setIsPreparing(false);
            setIsActive(true);
          }
          return nextTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPreparing, prepareTime, soundEnabled]);

  // Timer Logic & Sound Triggers
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const nextTime = time - 1;
          
          if (soundEnabled) {
            // Check for half-way switch point
            if (currentStep.switchAt && nextTime === currentStep.switchAt) {
              playSwitchSound();
            } 
            // Check for end of exercise step
            else if (nextTime === 0) {
              if (currentStepIndex === ROUTINE.length - 1) {
                playCompleteSound();
              } else {
                playEndStepSound();
              }
            }
          }
          return nextTime;
        });
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (interval) {
        clearInterval(interval);
      }
      handleNext();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft, currentStepIndex, soundEnabled, currentStep]);

  const handleNext = useCallback(() => {
    setIsPreparing(false);
    if (currentStepIndex < ROUTINE.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      const nextStep = ROUTINE[nextStepIndex];
      setCurrentStepIndex(nextStepIndex);
      setTimeLeft(nextStep.duration);
      
      // Only show the tutorial overlay if setting is enabled and not already dismissed for that step
      if (tutorialMode && !dismissedSteps.includes(nextStep.id)) {
        setShowTutorial(true);
        setIsActive(false);
      } else {
        setShowTutorial(false);
        setIsPreparing(true);
        setPrepareTime(3);
        setIsActive(false);
      }
    } else {
      setIsActive(false);
      setIsFinished(true);
      localStorage.setItem('foldable_has_completed_once', 'true');
      setTutorialMode(false);
      localStorage.setItem('foldable_tutorial_mode', 'false');
      setShowTutorial(false);
    }
  }, [currentStepIndex, tutorialMode, dismissedSteps]);

  const handlePrev = () => {
    setIsPreparing(false);
    const currentDuration = ROUTINE[currentStepIndex].duration;
    
    if (timeLeft < currentDuration) {
      // Rewind to the beginning of current step and pause
      setTimeLeft(currentDuration);
      setIsActive(false);
    } else if (currentStepIndex > 0) {
      // Navigate to previous step and pause
      const prevStepIndex = currentStepIndex - 1;
      const prevStep = ROUTINE[prevStepIndex];
      setCurrentStepIndex(prevStepIndex);
      setTimeLeft(prevStep.duration);
      setIsActive(false);
      
      // Only show tutorial if in tutorialMode and not dismissed yet
      if (tutorialMode && !dismissedSteps.includes(prevStep.id)) {
        setShowTutorial(true);
      } else {
        setShowTutorial(false);
      }
    }
  };

  const toggleTimer = () => {
    initAudio(); // Initialize audio context upon user interaction
    if (isFinished) {
      resetRoutine();
    } else if (showTutorial) {
      // Mark current step tutorial as dismissed so it won't pop up again
      if (!dismissedSteps.includes(currentStep.id)) {
        setDismissedSteps((prev) => [...prev, currentStep.id]);
      }
      setShowTutorial(false);
      setIsPreparing(true);
      setPrepareTime(3);
    } else if (isPreparing) {
      setIsPreparing(false);
    } else {
      setIsActive(!isActive);
    }
  };

  const resetRoutine = () => {
    setCurrentStepIndex(0);
    setTimeLeft(ROUTINE[0].duration);
    setIsActive(false);
    setIsFinished(false);
    setIsPreparing(false);
    setPrepareTime(3);
    setDismissedSteps([]); // Clear dismissed state for a fresh routine run
    if (tutorialMode) {
      setShowTutorial(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // SVG Ring calculation
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm p-8 text-center border border-slate-100">
          <CheckCircle className="w-20 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Routine Complete!</h1>
          <p className="text-slate-500 mb-8 font-medium">Your movement practice for today is complete. Your hips and lower back are now more spacious and restored.</p>
          
          {isFarcaster && farcasterContext?.user && (
            <div className="flex items-center justify-center gap-3 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-100/60 max-w-xs mx-auto">
              {farcasterContext.user.pfpUrl && (
                <img 
                  src={farcasterContext.user.pfpUrl} 
                  alt={farcasterContext.user.displayName || farcasterContext.user.username} 
                  className="w-10 h-10 rounded-full border border-slate-200"
                />
              )}
              <div className="text-left">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Farcaster User</p>
                <p className="text-sm font-bold text-slate-700 leading-tight">{farcasterContext.user.displayName || farcasterContext.user.username}</p>
              </div>
            </div>
          )}

          {isFarcaster && (
            <div className="flex flex-col gap-3 mb-6">
              <button 
                onClick={async () => {
                  try {
                    await sdk.actions.composeCast({
                      text: "I just completed my 🧘‍♂️ Morning Mobility stretch routine on Foldable! Hips and lower back are feeling spacious and restored. #Foldable",
                      embeds: ["https://foldable.onfc.xyz/"]
                    });
                  } catch (e) {
                    console.error("Error composing cast:", e);
                  }
                }}
                className="flex items-center justify-center w-full gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-semibold transition-colors cursor-pointer shadow-sm shadow-teal-600/10"
              >
                Share Completion on Farcaster
              </button>

              {!farcasterContext?.client?.added && (
                <button 
                  onClick={async () => {
                    try {
                      await sdk.actions.addMiniApp();
                    } catch (e) {
                      console.error("Error adding mini app:", e);
                    }
                  }}
                  className="flex items-center justify-center w-full gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Add to Farcaster Menu
                </button>
              )}
            </div>
          )}

          <button 
            onClick={resetRoutine}
            className="flex items-center justify-center w-full gap-2 bg-slate-800 text-white py-4 rounded-xl font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            Do it again
          </button>
        </div>
      </div>
    );
  }

  // Calculate dynamic circular progress percentage
  const progressPercentage = isFinished ? 1 : (isPreparing ? 0 : 1 - (timeLeft / currentStep.duration));
  const strokeDashoffset = circumference - progressPercentage * circumference;

  return (
    <div className="app-viewport bg-slate-50 p-4 font-sans text-slate-800">
      
      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100 compact-container flex flex-col justify-between">
        {/* Header */}
        <div className={`p-6 ${currentStep.bgColor} transition-colors duration-500 compact-header-p`}>
          <div className="flex justify-between items-center mb-6 compact-header-mb">
            <h1 className="font-bold text-slate-800 tracking-tight">Morning Mobility</h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTutorialMode}
                className={`p-2 rounded-full border transition-colors ${
                  tutorialMode 
                    ? `bg-white ${currentStep.color} border-slate-200/50 shadow-sm` 
                    : 'bg-white/50 border-transparent hover:bg-white/80 text-slate-700'
                }`}
                title={tutorialMode ? "Disable tutorial explanation" : "Enable tutorial explanation"}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  initAudio();
                  setSoundEnabled(!soundEnabled);
                }}
                className="p-2 bg-white/50 hover:bg-white/80 rounded-full text-slate-700 transition-colors"
                title={soundEnabled ? "Mute sounds" : "Enable sounds"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <span className="text-sm font-semibold bg-white/60 px-3 py-1 rounded-full text-slate-700 compact-text-header whitespace-nowrap">
                Step {currentStepIndex + 1}/{ROUTINE.length}
              </span>
            </div>
          </div>
          
          {/* Timer Display */}
          <div className="relative flex flex-col items-center justify-center py-4 compact-timer-py">
            <div className="relative flex justify-center items-center">
              <svg className="w-64 h-64 transform -rotate-90 compact-timer-svg" viewBox="0 0 256 256">
                {/* Background Ring */}
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  className="stroke-slate-200"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  className={`${currentStep.ringColor} transition-all duration-1000 ease-linear`}
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Visualizer centered inside the progress ring - completely unblocked! */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`${currentStep.color} w-28 h-28 compact-visualizer-box`}>
                  <Visualizer stepId={currentStep.id} timeLeft={timeLeft} duration={currentStep.duration} />
                </div>
              </div>
            </div>
            
            {/* Timer Badge overlapping bottom of the ring dial to prevent visual blocking */}
            <div className="absolute -bottom-1 z-10 pointer-events-none">
              {isPreparing ? (
                <div className="flex flex-col items-center bg-white/90 border border-slate-200/60 px-4 py-1 rounded-xl compact-text-timer animate-pulse shadow-sm">
                  <span className="text-[11px] font-bold text-slate-500 mb-0.5">Prepare</span>
                  <span className="text-2xl font-extrabold tabular-nums leading-none">{prepareTime}</span>
                </div>
              ) : (
                <span className="text-3xl font-extrabold tabular-nums tracking-tight bg-white/90 border border-slate-200/60 px-4 py-1 rounded-2xl compact-text-timer shadow-sm">
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-8 compact-body-p">
          <h2 className="text-2xl font-bold mb-3 compact-text-title compact-title-mb">{currentStep.title}</h2>
          <p className="text-slate-600 leading-relaxed mb-8 min-h-[5rem] compact-text-desc compact-desc-mb">
            {currentStep.description}
          </p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={handlePrev}
              disabled={currentStepIndex === 0 && timeLeft === currentStep.duration}
              className="p-3 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <SkipBack className="w-6 h-6" fill="currentColor" />
            </button>

            <button 
              onClick={toggleTimer}
              className={`w-20 h-20 flex items-center justify-center rounded-full shadow-md text-white transition-transform hover:scale-105 active:scale-95 compact-btn-main ${isActive || isPreparing ? 'bg-slate-800 hover:bg-slate-900' : `${currentStep.btnBg} ${currentStep.btnHoverBg}`}`}
            >
              {isActive || isPreparing ? (
                <Pause className="w-8 h-8" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              )}
            </button>

            <button 
              onClick={handleNext}
              className="p-3 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all"
            >
              <SkipForward className="w-6 h-6" fill="currentColor" />
            </button>
          </div>

          {/* Up Next Preview nested inside the container to prevent iPhone SE clipping */}
          <div className="mt-8 compact-footer-mt">
            <div className="flex gap-2">
              {ROUTINE.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    idx < currentStepIndex ? 'bg-slate-800' : 
                    idx === currentStepIndex ? step.barBg : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sliding Onboarding/Tutorial Drawer */}
        <div 
          className={`absolute inset-x-0 bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-100 rounded-t-3xl shadow-2xl transition-transform duration-500 ease-out flex flex-col p-6 max-h-[85%] overflow-y-auto compact-drawer ${
            showTutorial ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* Accent Indicator bar */}
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
          
          <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
            <span className={`${currentStep.color} font-extrabold text-2xl`}>✦</span>
            {currentStep.title} Guide
          </h3>
          <p className="text-xs font-semibold text-slate-500 mb-4">
            Tutorial active
          </p>

          <div className="space-y-5 flex-1 mb-6 compact-drawer-grid">
            {/* "How" Section */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                How to do it
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {currentStep.how}
              </p>
            </div>

            {/* "Why" Section */}
            <div className={`${currentStep.bgColor} p-4 rounded-2xl border border-slate-200/50`}>
              <h4 className="text-xs font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${currentStep.ringColor.replace('stroke-', 'bg-')}`} />
                Why it works
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {currentStep.why}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              initAudio();
              setShowTutorial(false);
              // Mark the current step tutorial as dismissed so it doesn't show up again on navigation
              if (!dismissedSteps.includes(currentStep.id)) {
                setDismissedSteps((prev) => [...prev, currentStep.id]);
              }
              setIsPreparing(true);
              setPrepareTime(3);
              setIsActive(false);
            }}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all text-center cursor-pointer compact-drawer-btn ${
              currentStep.id === 'piriformis' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' :
              currentStep.id === 'nerve-floss' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' :
              currentStep.id === 'glute-bridges' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' :
              'bg-teal-600 hover:bg-teal-700 shadow-teal-200'
            }`}
          >
            Got it, let's go!
          </button>
        </div>
      </div>
    </div>
  );
}