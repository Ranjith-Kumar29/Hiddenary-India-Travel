import React from 'react';
import { X, Check, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../data/translations';
import { LanguageCode } from '../../types/travel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentLanguage, setLanguage } = useApp();

  if (!isOpen) return null;

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#EAF5FD] text-[#0879C9]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">Select Language</h3>
              <p className="text-xs text-slate-500">Core UI fully translated into English, Tamil, and Hindi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
          {SUPPORTED_LANGUAGES.map(lang => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'border-[#0879C9] bg-[#EAF5FD]/80 text-[#102B4E] font-semibold shadow-xs'
                    : 'border-slate-100 hover:border-slate-200 hover:bg-[#F4F9FE] text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl select-none">{lang.flag}</span>
                  <div>
                    <div className="text-sm font-medium">{lang.nativeName}</div>
                    <div className="text-xs text-slate-500">{lang.name}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#0879C9]" />}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
          <span>Translations apply immediately across all portal sections</span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
