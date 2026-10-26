import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JAVA_PROJECT_STAGES } from '../data/javaProjectCode';

export const JavaProjectViewerModal: React.FC = () => {
  const { showJavaModal, setShowJavaModal, activeJavaStage, setActiveJavaStage, showToastMessage } =
    useApp();

  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  if (!showJavaModal) return null;

  const currentStage =
    JAVA_PROJECT_STAGES.find((s) => s.id === activeJavaStage) || JAVA_PROJECT_STAGES[0];
  const activeFile = currentStage.files[selectedFileIndex] || currentStage.files[0];

  const handleCopyCode = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      showToastMessage(`Copied ${activeFile.path} to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadFile = () => {
    if (activeFile) {
      const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = activeFile.path.split('/').pop() || 'code.txt';
      link.click();
      URL.revokeObjectURL(url);
      showToastMessage(`Downloaded ${link.download}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-5xl h-[90vh] rounded-2xl bg-white shadow-2xl border border-[#e5e2dd] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-5 py-4 bg-[#ebe8e3] border-b border-[#e5e2dd] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c2410c] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">terminal</span>
            </div>
            <div>
              <h2 className="font-serif-title text-[18px] sm:text-[20px] font-bold text-[#1c1c19] leading-tight">
                Advanced Java Capstone Project Center
              </h2>
              <p className="text-[12px] text-[#59413a]">
                Eclipse Dynamic Web Project • Apache Tomcat 9 • MySQL JDBC Architecture
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowJavaModal(false)}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#f0ede9] text-[#1c1c19] flex items-center justify-center transition-colors border border-[#e5e2dd]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Stage Selector Tabs */}
        <div className="bg-[#f6f3ee] px-4 py-2 border-b border-[#e5e2dd] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {JAVA_PROJECT_STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => {
                setActiveJavaStage(stage.id);
                setSelectedFileIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                activeJavaStage === stage.id
                  ? 'bg-[#c2410c] text-white shadow-xs'
                  : 'bg-white text-[#59413a] hover:bg-[#ebe8e3] border border-[#e5e2dd]'
              }`}
            >
              <span className="font-mono">{stage.stageName}:</span> {stage.title.split(' ')[0]}...
            </button>
          ))}
        </div>

        {/* Stage Overview Banner */}
        <div className="px-5 py-3 bg-[#fff8f5] border-b border-[#ffdbd0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#c2410c] text-white">
                {currentStage.stageName}
              </span>
              <h3 className="font-serif-title font-semibold text-[#1c1c19] text-base">
                {currentStage.title}
              </h3>
            </div>
            <p className="text-xs text-[#59413a] mt-0.5">{currentStage.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-white hover:bg-[#f0ede9] text-[#1c1c19] text-xs font-semibold rounded-lg border border-[#e5e2dd] flex items-center gap-1 transition-all shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownloadFile}
              className="px-3 py-1.5 bg-[#c2410c] hover:bg-[#9b2f00] text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Main Content: Split View */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* File Tree & Instructions Sidebar */}
          <div className="w-full lg:w-72 bg-[#fcf9f4] border-r border-[#e5e2dd] p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
            <div>
              <span className="text-[11px] font-bold text-[#8d7168] uppercase tracking-wider block mb-2">
                Stage Files ({currentStage.files.length})
              </span>
              <div className="space-y-1">
                {currentStage.files.map((file, idx) => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                      selectedFileIndex === idx
                        ? 'bg-[#c2410c] text-white font-semibold shadow-xs'
                        : 'bg-white hover:bg-[#f0ede9] text-[#1c1c19] border border-[#e5e2dd]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {file.path.endsWith('.java')
                        ? 'code'
                        : file.path.endsWith('.sql')
                        ? 'database'
                        : file.path.endsWith('.xml')
                        ? 'settings'
                        : 'description'}
                    </span>
                    <span className="truncate">{file.path.split('/').pop()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="p-3 bg-white rounded-xl border border-[#e5e2dd] space-y-2">
              <span className="text-[11px] font-bold text-[#9b2f00] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">help</span>
                <span>Eclipse &amp; Tomcat Setup</span>
              </span>
              <pre className="text-[11px] text-[#59413a] whitespace-pre-wrap font-sans leading-relaxed">
                {currentStage.instructions}
              </pre>
            </div>

            {/* Common Errors & Solutions */}
            {currentStage.commonErrors.length > 0 && (
              <div className="p-3 bg-[#fff8f5] rounded-xl border border-[#ffdbd0] space-y-1.5">
                <span className="text-[11px] font-bold text-[#ba1a1a] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span>Common Error &amp; Fix</span>
                </span>
                {currentStage.commonErrors.map((err, i) => (
                  <div key={i} className="text-[11px] text-[#59413a] space-y-1">
                    <p className="font-semibold text-[#ba1a1a]">{err.error}</p>
                    <p className="text-[11px] text-[#59413a]">{err.solution}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-[#1e293b] text-[#f8fafc] overflow-hidden">
            {/* File Path & Metadata Tab */}
            <div className="px-4 py-2 bg-[#0f172a] border-b border-[#334155] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#94a3b8]">Path:</span>
                <span className="font-mono text-[#38bdf8] font-medium">{activeFile?.path}</span>
              </div>
              <span className="text-[11px] text-[#94a3b8] uppercase font-mono">
                {activeFile?.language}
              </span>
            </div>

            {/* Code Body */}
            <div className="flex-1 p-4 overflow-auto font-mono text-[12px] sm:text-[13px] leading-relaxed selection:bg-[#c2410c] selection:text-white">
              <pre className="whitespace-pre">{activeFile?.code}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
