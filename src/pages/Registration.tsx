import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, Code2, CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { apiFetch } from '../api';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    dept: 'DEVELOPMENT',
    studyLevel: 'Licence 3',
    major: 'Computer Science',
    img: ''
  });

  const nextStep = () => {
    if (step === 1) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.img) {
        alert("ACCESS DENIED: Please complete all Phase 1 fields (Name, Email, and Profile Image) before continuing.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        alert("ACCESS DENIED: Please enter a valid email address.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.studyLevel.trim() || !formData.major.trim()) {
        alert("ACCESS DENIED: Please specify your Study Level and Major before continuing.");
        return;
      }
    }
    setStep(s => s + 1);
  };
  const prevStep = () => setStep(s => s - 1);

  const handleDeploy = async () => {
    if (!formData.dept || !formData.role.trim()) {
      alert("ACCESS DENIED: Please specify your Target Department and Desired Role before committing.");
      return;
    }
    setIsDeploying(true);
    try {
      await apiFetch('/api/registrations', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setIsDeploying(false);
      setStep(4);
    } catch (error) {
      alert('Failed to commit registration. Check database connection.');
      setIsDeploying(false);
    }
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

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Legal_Identifier</label>
                       <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="FULL_NAME" className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-blue-400" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Institutional_Mail</label>
                       <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="EDU_MAIL@UNIVERSITY.EDU" className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-blue-400" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Profile Image</label>
                       <input required type="file" accept="image/*" onChange={e => {
                         const file = e.target.files?.[0];
                         if (file) {
                           const reader = new FileReader();
                           reader.onloadend = () => {
                             setFormData({...formData, img: reader.result as string});
                           };
                           reader.readAsDataURL(file);
                         }
                       }} className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-blue-400" />
                       {formData.img && (
                         <div className="mt-2 flex items-center space-x-4">
                           <img src={formData.img} alt="Preview" className="w-12 h-12 rounded-[10px] object-cover border border-white/10" />
                           <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">Image Loaded Checksum OK</span>
                         </div>
                       )}
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
                      <Cpu className="w-4 h-4" /> <span>Phase_02: Academic_Config</span>
                    </div>
                    <h2 className="text-5xl font-black italic text-white leading-none tracking-tighter uppercase">ACADEMICS.</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Study Level</label>
                       <input required type="text" value={formData.studyLevel} onChange={e => setFormData({...formData, studyLevel: e.target.value})} placeholder="e.g. Licence 3" className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-blue-400" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Major / Field of Study</label>
                       <input required type="text" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} placeholder="e.g. Computer Science" className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-blue-400" />
                    </div>
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
                      <Shield className="w-4 h-4" /> <span>Phase_03: Club_Config</span>
                    </div>
                    <h2 className="text-5xl font-black italic text-white leading-none tracking-tighter uppercase">ALIGNMENT.</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Target Department</label>
                       <select value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})} className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-blue-400">
                         <option value="ADMINISTRATION">ADMINISTRATION</option>
                         <option value="DEVELOPMENT">DEVELOPMENT</option>
                         <option value="DESIGN">DESIGN</option>
                         <option value="MEDIA">MEDIA</option>
                         <option value="ORGANIZATION">ORGANIZATION</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Desired Role</label>
                       <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Frontend Web Dev" className="w-full bg-zinc-900 border border-white/10 p-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-blue-400" />
                    </div>
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
                       Your identity has been added to the SDG array. <br /> Check your mail for initialization scripts.
                     </p>
                   </div>
                   <button 
                     onClick={() => navigate('/')}
                     className="bg-white text-black px-12 py-5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
                   >
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
