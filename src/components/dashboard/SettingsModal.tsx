import React, { useEffect, useState } from 'react';
import { X, User, Bell, CreditCard, Monitor, Check, Shield, Lock, Eye, Sliders, Database, Info, Loader2 } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { profile, isLoading: profileLoading, updateProfile, getDisplayName, getInitials } = useUserProfile();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isVisible, setIsVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [primaryInterest, setPrimaryInterest] = useState('');

  // Sync form state with profile data
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setAffiliation(profile.affiliation || '');
      setPrimaryInterest(profile.professional_identity || '');
    }
  }, [profile]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${isOpen ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none pointer-events-none'}`}>
      <div 
        className={`w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out flex flex-col md:flex-row max-h-[90vh] ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-mono text-base font-bold text-gray-900 uppercase tracking-[0.1em]">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden overflow-x-auto border-b border-gray-100">
          <div className="flex gap-1 p-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={14} />
                  <span className="text-[11px] font-medium uppercase tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-56 bg-gray-50/50 p-6 flex-col border-r border-gray-100 flex-shrink-0">
          <div className="mb-8">
            <h2 className="font-mono text-lg font-bold text-gray-900 uppercase tracking-[0.15em] mb-1">Settings</h2>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.1em]">Preferences and<br />Configuration</p>
          </div>
          
          <nav className="space-y-0.5 flex-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
                      : 'hover:bg-white/60 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-500'} />
                  <span className="text-[13px] font-medium uppercase tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-gray-200 mt-6">
             <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                 {getInitials()}
               </div>
               <div className="min-w-0">
                 <p className="text-sm font-medium text-gray-900 truncate">{getDisplayName()}</p>
                 <p className="text-[11px] text-gray-400 truncate">{user?.email || profile?.email || ''}</p>
               </div>
             </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto relative min-w-0">
          <button 
            onClick={onClose}
            className="hidden md:block absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>

          <div className="max-w-lg mx-auto md:mx-0">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-6">
                  <h3 className="font-mono text-xl font-bold uppercase tracking-widest mb-2">User Profile</h3>
                  <p className="text-xs font-mono text-gray-500">Manage your researcher identification and service preferences.</p>
                </div>

                {profileLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-gray-400" size={24} />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-[10px] font-mono font-medium text-gray-500 uppercase tracking-widest mb-2">Display Name</label>
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-white/60 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black transition-all font-sans" 
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-mono font-medium text-gray-500 uppercase tracking-widest mb-2">Bio</label>
                      <textarea 
                        rows={3} 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about your research interests..." 
                        className="w-full bg-white/60 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black transition-all font-sans resize-none" 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider sm:tracking-widest mb-2">Affiliation</label>
                        <input 
                          type="text" 
                          value={affiliation}
                          onChange={(e) => setAffiliation(e.target.value)}
                          placeholder="e.g. University of Oxford" 
                          className="w-full bg-white/60 border border-gray-200 rounded-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:border-black transition-all font-sans" 
                        />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider sm:tracking-widest mb-2">Primary Interest</label>
                        <input 
                          type="text" 
                          value={primaryInterest}
                          onChange={(e) => setPrimaryInterest(e.target.value)}
                          placeholder="e.g. Neuroscience" 
                          className="w-full bg-white/60 border border-gray-200 rounded-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:border-black transition-all font-sans" 
                        />
                      </div>
                    </div>

                    {profile?.country && (
                      <div className="p-4 bg-gray-50/50 border border-gray-200 rounded-xl">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Location</p>
                        <p className="text-sm font-medium text-gray-900">{profile.country}</p>
                      </div>
                    )}

                    {profile?.interests && profile.interests.length > 0 && (
                      <div className="p-4 bg-gray-50/50 border border-gray-200 rounded-xl">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Interests from Onboarding</p>
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((interest, i) => (
                            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">{interest}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-3 sm:p-4 bg-gray-50/50 border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                       <div className="flex items-start sm:items-center gap-3">
                          <div className="p-2 bg-white rounded-lg border border-gray-100 flex-shrink-0"><Database size={16} className="text-gray-400" /></div>
                          <div className="min-w-0">
                             <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-900">Optimization Usage</h4>
                             <p className="text-[9px] font-mono text-gray-400 uppercase leading-tight">Allow profile data for service optimization.</p>
                          </div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-end sm:self-auto">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>
                    
                    <div className="pt-4 flex items-center justify-center">
                       <button 
                         onClick={async () => {
                           setIsSaving(true);
                           const success = await updateProfile({
                             display_name: displayName || null,
                             affiliation: affiliation || null,
                             professional_identity: primaryInterest || null
                           });
                           if (success) {
                             toast({
                               title: 'Profile updated',
                               description: 'Your changes have been saved.',
                             });
                           }
                           setIsSaving(false);
                         }}
                         disabled={isSaving}
                         className="bg-black text-white px-10 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-[0.2em] font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-gray-400/20 disabled:opacity-50"
                       >
                         {isSaving ? 'Saving...' : 'Save Changes'}
                       </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-6">
                  <h3 className="font-mono text-xl font-bold uppercase tracking-widest mb-2">Service Alerts</h3>
                  <p className="text-xs font-mono text-gray-500">Configure real-time research updates and platform notifications.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Critical Product Updates", desc: "Security announcements and essential platform changes." },
                    { title: "System Maintenance Alerts", desc: "Notification of upcoming optimization and downtime." },
                    { title: "AI Synthesis Readiness", desc: "Alert when the engine has completed a significant research synthesis." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/60 border border-gray-200/50 rounded-xl">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-gray-900">{item.title}</h4>
                        <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-tight leading-relaxed">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-6">
                  <h3 className="font-mono text-xl font-bold uppercase tracking-widest mb-2">Security</h3>
                  <p className="text-xs font-mono text-gray-500">Manage account access and security protocols.</p>
                </div>
                <div className="space-y-4">
                   <div className="p-6 bg-white/60 border border-gray-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="p-2 bg-gray-50 rounded-lg"><Lock size={18} /></div>
                         <div>
                            <h4 className="text-xs font-mono font-bold uppercase tracking-tight">Change Password</h4>
                            <p className="text-[10px] text-gray-400 font-mono uppercase">Last updated 3 months ago</p>
                         </div>
                      </div>
                      <button className="text-[10px] font-mono font-bold uppercase tracking-widest border border-gray-200 px-4 py-1.5 rounded hover:bg-black hover:text-white transition-all">Update</button>
                   </div>
                   <div className="p-6 bg-white/60 border border-gray-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="p-2 bg-gray-50 rounded-lg"><Shield size={18} /></div>
                         <div>
                            <h4 className="text-xs font-mono font-bold uppercase tracking-tight">Two-Factor Auth</h4>
                            <p className="text-[10px] text-gray-400 font-mono uppercase">Add an extra layer of protection</p>
                         </div>
                      </div>
                      <button className="text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded hover:bg-emerald-100 transition-all">Enable</button>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-6">
                  <h3 className="font-mono text-xl font-bold uppercase tracking-widest mb-2">Privacy</h3>
                  <p className="text-xs font-mono text-gray-500">Control data tracking and service analytics.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/60 border border-gray-200/50 rounded-xl">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-gray-900">Analytical Tracking</h4>
                      <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-tight">Share anonymous usage metrics to improve platform intelligence.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl flex gap-3">
                     <Info size={16} className="text-indigo-400 flex-shrink-0" />
                     <p className="text-[10px] font-mono text-indigo-600 uppercase leading-relaxed">Your data is never shared externally. All tracking is used exclusively for internal service optimization.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-6">
                  <h3 className="font-mono text-xl font-bold uppercase tracking-widest mb-2">Billing</h3>
                  <p className="text-xs font-mono text-gray-500">Manage your subscription and payment methods.</p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white shadow-xl mb-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
                   <div className="relative z-10">
                     <div className="flex justify-between items-start mb-8">
                       <div>
                         <p className="text-[9px] font-mono uppercase tracking-widest text-gray-400 mb-1">Current Plan</p>
                         <h4 className="text-xl font-mono font-bold uppercase tracking-tight text-white border-b border-white/20 pb-1">Pro Researcher</h4>
                       </div>
                       <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-mono uppercase font-medium backdrop-blur-md border border-white/10 tracking-widest">Active</span>
                     </div>
                     <div className="flex justify-between items-end">
                       <div>
                         <p className="text-3xl font-serif">$29<span className="text-xs text-gray-400 font-mono ml-1">/MO</span></p>
                         <p className="text-[10px] text-gray-400 mt-2 font-mono uppercase tracking-widest">Next cycle: Nov 12, 2023</p>
                       </div>
                       <button className="bg-white text-black px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">Manage</button>
                     </div>
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4">Payment Method</h4>
                   <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-white/50">
                      <div className="w-10 h-6 bg-gray-200 rounded mr-3 shadow-inner"></div>
                      <div className="flex-1">
                        <p className="text-xs font-mono font-bold uppercase text-gray-900">Visa ending in 4242</p>
                        <p className="text-[10px] text-gray-400 font-mono uppercase">Expiry 12/24</p>
                      </div>
                      <button className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 hover:text-black">Edit</button>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
               <div className="space-y-8 animate-fadeIn">
                 <div className="mb-6">
                  <h3 className="font-mono text-lg font-bold uppercase tracking-[0.15em] mb-2">Appearance</h3>
                  <p className="text-sm text-gray-500">Manage interface configuration and accessibility.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button className="p-4 border-2 border-gray-900 rounded-xl bg-white flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                      <div className="absolute top-3 right-3 text-gray-900"><Check size={14} /></div>
                      <div className="w-full h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                        <span className="font-serif text-3xl text-gray-900">Aa</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-gray-700">Standard Light</span>
                   </button>
                   <button className="p-4 border border-emerald-500 rounded-xl bg-gray-900 flex flex-col items-center justify-center space-y-3 relative overflow-hidden group hover:border-emerald-400 transition-colors">
                      <div className="w-full h-16 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                        <span className="font-serif text-3xl text-white">Aa</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-white">Focused Dark</span>
                   </button>
                </div>
                
                <div className="space-y-3 mt-6">
                   <div className="flex items-center justify-between p-4 bg-gray-50/80 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-3">
                         <Eye size={16} className="text-gray-400" />
                         <span className="text-[11px] font-mono font-bold uppercase tracking-[0.12em] text-gray-700">Compact View</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-gray-50/80 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-3">
                         <Sliders size={16} className="text-gray-400" />
                         <span className="text-[11px] font-mono font-bold uppercase tracking-[0.12em] text-gray-700">High Contrast</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                   </div>
                </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
