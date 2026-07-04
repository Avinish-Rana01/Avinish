import React from 'react';
import Editor from '@monaco-editor/react';
import { LANGUAGES } from './constants';

const EditorPanel = ({
  activeTab,
  selectedLang,
  code,
  setCode,
  onEditorBeforeMount,
  onEditorMount,
  fontSize,
  showMinimap,
  showWordWrap
}) => {
  const currentLang = LANGUAGES.find(l => l.id === selectedLang);

  return (
    <div className={`flex-1 flex-col rounded-[24px] border border-white/10 overflow-hidden min-h-[380px] md:min-h-0 bg-[#0C0C0C] ${
      activeTab === 'editor' ? 'flex' : 'hidden md:flex'
    }`}>
      {/* Editor Header Tag */}
      <div className="h-10 border-b border-white/10 flex items-center px-4 justify-between bg-[#121212]/50 select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/40">Monaco Workspace</span>
        </div>
        {/* File name indicator */}
        <span className="text-[9px] font-mono text-[#D7E2EA]/30 uppercase">
          source.{currentLang?.ext || 'txt'}
        </span>
      </div>

      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={currentLang?.mode || 'text'}
          theme="avinish-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          beforeMount={onEditorBeforeMount}
          onMount={onEditorMount}
          loading={
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0C0C0C]">
              <span className="w-6 h-6 border-2 border-[#B600A8] border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Loading Monaco Workspace...</span>
            </div>
          }
          options={{
            fontSize: fontSize,
            minimap: { enabled: showMinimap },
            wordWrap: showWordWrap ? 'on' : 'off',
            lineNumbers: 'on',
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
            fontFamily: "'Courier New', Courier, monospace",
            tabSize: 2,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(EditorPanel);
