import React, { useState, useRef } from 'react';
import { X, Upload, RotateCcw, Check, Image as ImageIcon, Sparkles, ShieldCheck } from 'lucide-react';
import { useLogo } from '../utils/logoManager';
import { MBKLogo } from './MBKLogo';
import { Language } from '../types';

interface LogoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
}

export const LogoUploaderModal: React.FC<LogoUploaderModalProps> = ({
  isOpen,
  onClose,
  lang = 'en',
}) => {
  const { customLogo, setCustomLogo, clearCustomLogo } = useLogo();
  const [previewLogo, setPreviewLogo] = useState<string | null>(customLogo);
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(lang === 'ar' ? 'يرجى تحميل ملف صورة صالح (PNG, SVG, JPG, WebP)' : 'Please upload a valid image file (PNG, SVG, JPG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewLogo(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewLogo(urlInput.trim());
  };

  const handleSave = async () => {
    if (previewLogo) {
      await setCustomLogo(previewLogo);
    } else {
      await clearCustomLogo();
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleReset = async () => {
    setPreviewLogo(null);
    await clearCustomLogo();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none">
      <div 
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl relative overflow-hidden"
      >
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                {lang === 'ar' ? 'تخصيص وتحديث شعار المنصة' : 'MBK Brand Logo Manager'}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                {lang === 'ar' ? 'قم بتحميل شعارك الخاص ليظهر في كامل المنصة وصفحة الترحيب' : 'Upload your logo file to apply across all headers, welcome page & mobile desk'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Live Preview Bar */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-mono text-slate-400 font-bold block uppercase tracking-wider">
              {lang === 'ar' ? 'المعاينة المباشرة (على كافة الشاشات)' : 'Live Brand Appearance Preview'}
            </span>
            <div className="flex items-center justify-around gap-4 pt-1">
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">
                  {previewLogo ? (
                    <img src={previewLogo} alt="Logo Preview" className="w-7 h-7 object-contain rounded" />
                  ) : (
                    <MBKLogo size="sm" glow />
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500">TopNav (32px)</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {previewLogo ? (
                    <img src={previewLogo} alt="Logo Preview" className="w-12 h-12 object-contain rounded-lg" />
                  ) : (
                    <MBKLogo size="lg" glow />
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500">Welcome (48px)</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                  {previewLogo ? (
                    <img src={previewLogo} alt="Logo Preview" className="w-16 h-16 object-contain rounded-xl" />
                  ) : (
                    <MBKLogo size="xl" glow />
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500">Hero (64px)</span>
              </div>
            </div>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
                : 'border-slate-700 hover:border-emerald-500/60 hover:bg-slate-800/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
            />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <p className="font-bold text-white text-sm mb-1">
              {lang === 'ar' ? 'انقر لاختيار ملف الشعار أو اسحبه هنا' : 'Click to browse or drop your logo here'}
            </p>
            <p className="text-xs font-mono text-slate-400">
              Supports PNG, JPG, SVG, WebP (Transparent PNG / SVG recommended)
            </p>
          </div>

          {/* Direct URL Input Fallback */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">
              {lang === 'ar' ? 'أو أدخل رابط صورة الشعار مباشرة:' : 'Or paste a direct image URL:'}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'تطبيق الرابط' : 'Apply URL'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'استعادة الشعار الافتراضي' : 'Reset to Default MBK Logo'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{lang === 'ar' ? 'تم الحفظ بنجاح!' : 'Applied Everywhere!'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'حفظ الشعار وتطبيقه' : 'Save & Apply Everywhere'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
