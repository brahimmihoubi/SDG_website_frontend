import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, Code2, CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

const Registration = () => {
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      nextStep();
    }, 3000);
  };

  return (
    <div className="pt-24 min-h-screen bg-black flex flex-col justify-center items-center px-4 overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      
      <div className="max-w-2xl w-full relative z-10">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-16 px-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-black text-xs transition-all ${
                step >= i ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'bg-zinc-900 text-gray-600 border border-white/10'
              }`}>
                0{i}
              </div>
              {i < 4 && (
                <div className={`absolute top-5 left-10 w-full h-[1px] -z-10 ${
                  step > i ? 'bg-blue-600' : 'bg-white/5'
                }`} style={{ width: 'calc(100% + 40px)' }}></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-1px shadow-2xl rounded-sm">
          <div className="bg-black p-10 md:p-16 space-y-12 min-h-[500px] flex flex-col">
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10 flex-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-blue-500 font-mono text-[10px] tracking-widest uppercase">
                      <Terminal className="w-4 h-4" /> <span>Phase_01: Identity_Verification</span>
                    </div>
                    <h2 className="text-5xl font-black italic text-white leading-none tracking-tighter uppercase">WHO ARE YOU?</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Legal_Identifier</label>
                       <input type="text" placeholder="FULL_NAME" className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-blue-400" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Institutional_Mail</label>
                       <input type="email" placeholder="EDU_MAIL@UNIVERSITY.EDU" className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-blue-400" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10 flex-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-blue-500 font-mono text-[10px] tracking-widest uppercase">
                      <Cpu className="w-4 h-4" /> <span>Phase_02: Specialization_Config</span>
                    </div>
                    <h2 className="text-5xl font-black italic text-white leading-none tracking-tighter uppercase">CORE STACK.</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Software_Engineer', 'Infosec_Researcher', 'Data_Architect', 'Infrastructure_Lead'].map((role) => (
                      <button key={role} className="p-6 border border-white/10 bg-zinc-900/50 hover:border-blue-500 transition-all text-left group">
                         <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 group-hover:text-blue-500">NODE_TYPE</div>
                         <div className="text-white font-bold italic tracking-tight">{role}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10 flex-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-blue-500 font-mono text-[10px] tracking-widest uppercase">
                      <Shield className="w-4 h-4" /> <span>Phase_03: Security_Review</span>
                    </div>
                    <h2 className="text-5xl font-black italic text-white leading-none tracking-tighter uppercase">FINAL_ENV.</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-zinc-900 border border-blue-500/30 rounded-sm space-y-4">
                       <p className="font-mono text-xs text-blue-400">
                         &gt; Initializing final checksum... <br/>
                         &gt; Verifying integrity... <br/>
                         &gt; Peer review required: YES
                       </p>
                    </div>
                    <label className="flex items-center space-x-4 cursor-pointer group">
                       <input type="checkbox" className="w-6 h-6 bg-black border border-white/10 rounded-sm checked:bg-blue-600 transition-all" />
                       <span className="text-xs text-gray-400 font-medium uppercase tracking-widest leading-relaxed">
                         I AGREE TO ALL PROTOCOLS AND SDG ETHICAL BOUNDARIES.
                       </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
                >
                   <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                   </div>
                   <div className="space-y-4">
                     <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">NODE_DEPLOYED.</h2>
                     <p className="text-gray-500 font-medium uppercase tracking-widest leading-loose">
                       Your identity has been added to the SDG array. <br/> Check your mail for initialization scripts.
                     </p>
                   </div>
                   <button className="bg-white text-black px-12 py-5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                     Return_to_Core
                   </button>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 4 && (
              <div className="pt-10 flex justify-between">
                {step > 1 ? (
                  <button onClick={prevStep} className="flex items-center space-x-2 text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all">
                    <ArrowLeft className="w-4 h-4" /> <span>SEQ_BACK</span>
                  </button>
                ) : <div></div>}
                <button 
                  onClick={step === 3 ? handleDeploy : nextStep} 
                  disabled={isDeploying}
                  className="bg-blue-600 text-white px-10 py-5 rounded-sm font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-white hover:text-black transition-all flex items-center"
                >
                  {isDeploying ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> DEPLOYING...</>
                  ) : (
                    <>{step === 3 ? 'COMMIT_CHANGES' : 'NEXT_PHASE'} <ArrowRight className="ml-2 w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 font-mono text-[8px] text-zinc-800 space-y-1">
         <div>[SYSTEM_KERNEL]: v.4.2.1-sdg</div>
         <div>[ENCRYPTION]: AES-256-GCM</div>
         <div>[TERMINAL]: TTY1_REG</div>
      </div>
    </div>
  );
};

export default Registration;
