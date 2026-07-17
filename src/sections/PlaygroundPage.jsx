import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DevLabGuide from '../components/onboarding/DevLabGuide';
import { useUI } from '../context/UIContext';
import { LANGUAGES } from '../components/playground/constants';
import PlaygroundHero from '../components/playground/PlaygroundHero';
import WorkspaceHeader from '../components/playground/WorkspaceHeader';
import EditorPanel from '../components/playground/EditorPanel';
import OutputPanel from '../components/playground/OutputPanel';
import MobileActionsDrawer from '../components/playground/MobileActionsDrawer';
import { useWorkspaceState } from '../hooks/useWorkspaceState';
import { useCompilerRuntimes } from '../hooks/useCompilerRuntimes';
import { useRunCode } from '../hooks/useRunCode';

const PlaygroundPage = () => {
  const { isChatOpen, toggleChat, isAudioPlaying, toggleAudio } = useUI();
  
  const state = useWorkspaceState();
  const runtimes = useCompilerRuntimes(state.selectedLang, state.appendTerminalOutput);

  const editorRef = useRef(null);
  const workspaceRef = useRef(null);

  const handleRunCode = useRunCode({
    ...state,
    ...runtimes
  });

  // Global message listener for console logs redirect
  useEffect(() => {
    const handleLogs = (e) => {
      if (e.data && e.data.type === 'devlab-console-log') {
        state.appendTerminalOutput(e.data.log + '\n');
      }
    };
    window.addEventListener('message', handleLogs);
    return () => window.removeEventListener('message', handleLogs);
  }, [state]);

  // Handle Monaco load custom themes
  const handleEditorBeforeMount = (monaco) => {
    monaco.editor.defineTheme('avinish-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'B600A8', fontStyle: 'bold' },
        { token: 'string', foreground: 'BE4C00' },
        { token: 'number', foreground: '7621B0' },
        { token: 'regexp', foreground: 'f1fa8c' },
        { token: 'type', foreground: '61DAFB' },
        { token: 'delimiter', foreground: 'D7E2EA' },
      ],
      colors: {
        'editor.background': '#0C0C0C',
        'editor.foreground': '#D7E2EA',
        'editor.lineHighlightBackground': '#141414',
        'editorLineNumber.foreground': '#333333',
        'editorLineNumber.activeForeground': '#B600A8',
        'editor.lineHighlightBorder': '#7621B020',
        'editor.selectionBackground': '#7621B035',
        'editor.inactiveSelectionBackground': '#7621B015',
        'scrollbarSlider.background': '#252525',
        'scrollbarSlider.hoverBackground': '#333333',
        'scrollbarSlider.activeBackground': '#B600A8',
      }
    });
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  // Keyboard shortcut listener (Ctrl+Enter to compile)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode]);

  // Toggle editor fullscreen
  const toggleFullscreen = () => {
    if (!state.isFullscreen) {
      if (workspaceRef.current?.requestFullscreen) {
        workspaceRef.current.requestFullscreen();
      }
      state.setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      state.setIsFullscreen(false);
    }
  };

  // Monitor layout fullscreen exits
  useEffect(() => {
    const handleFsChange = () => {
      state.setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [state]);

  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(state.code);
    state.appendTerminalOutput("[Success] Copied active workspace code to clipboard.\n");
  };

  // Download script file
  const handleDownloadCode = () => {
    const blob = new Blob([state.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `devlab_source.${LANGUAGES.find(l => l.id === state.selectedLang)?.ext || 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    state.appendTerminalOutput(`[Success] Code downloaded successfully.\n`);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA]">
      {/* Chapter 1: Branding Landing Hero */}
      <PlaygroundHero
        isWorkspaceActive={state.isWorkspaceActive}
        onStartCoding={() => state.setIsWorkspaceActive(true)}
      />

      {/* Chapter 2: Monaco Editor Workspace Dashboard */}
      <AnimatePresence>
        {state.isWorkspaceActive && (
          <motion.section
            ref={workspaceRef}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 w-full h-full flex flex-col overflow-hidden bg-[#0C0C0C]"
            style={{ zIndex: 9910 }}
          >
            {/* Onboarding tutorial guide overlay */}
            <DevLabGuide onComplete={() => editorRef.current?.focus()} />

            {/* Dynamic CSS override to hide global chatbot & music players while coding */}
            <style>{`
              #chat-toggle-container,
              #ambient-toggle {
                display: none !important;
                pointer-events: none !important;
                opacity: 0 !important;
              }
            `}</style>

            {/* Top Workspace Header */}
            <WorkspaceHeader
              onBack={() => state.setIsWorkspaceActive(false)}
              selectedLang={state.selectedLang}
              isLangOpen={state.isLangOpen}
              setIsLangOpen={state.setIsLangOpen}
              onLangChange={state.handleLangChange}
              onRun={handleRunCode}
              onReset={state.handleReset}
              onClear={state.handleClear}
              onCopy={handleCopyCode}
              onDownload={handleDownloadCode}
              onToggleFullscreen={toggleFullscreen}
              isFullscreen={state.isFullscreen}
              showSettings={state.showSettings}
              setShowSettings={state.setShowSettings}
              fontSize={state.fontSize}
              setFontSize={state.setFontSize}
              showMinimap={state.showMinimap}
              setShowMinimap={state.setShowMinimap}
              showWordWrap={state.showWordWrap}
              setShowWordWrap={state.setShowWordWrap}
              onShowMobileMenu={() => state.setShowMobileMenu(true)}
              isAiOpen={isChatOpen}
              onToggleAi={toggleChat}
              isAudioPlaying={isAudioPlaying}
              onToggleAudio={toggleAudio}
            />

            {/* Split Screen Editor Layout */}
            <main className="flex-1 flex flex-col md:flex-row min-h-0 p-4 gap-4 overflow-y-auto md:overflow-hidden scrollbar-thin">
              
              {/* Mobile toggle tabs */}
              <div className="flex md:hidden border border-white/10 rounded-full p-1 bg-[#121212] w-full max-w-[280px] mx-auto mb-2 select-none shrink-0">
                <button
                  type="button"
                  onClick={() => state.setActiveTab('editor')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    state.activeTab === 'editor' ? 'bg-white text-black' : 'text-[#D7E2EA]/60'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => state.setActiveTab('preview')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    state.activeTab === 'preview' ? 'bg-white text-black' : 'text-[#D7E2EA]/60'
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Left Panel: Monaco Editor */}
              <EditorPanel
                activeTab={state.activeTab}
                selectedLang={state.selectedLang}
                code={state.code}
                setCode={state.setCode}
                onEditorBeforeMount={handleEditorBeforeMount}
                onEditorMount={handleEditorMount}
                fontSize={state.fontSize}
                showMinimap={state.showMinimap}
                showWordWrap={state.showWordWrap}
              />

              {/* Right Panel: Output Areas */}
              <OutputPanel
                activeTab={state.activeTab}
                selectedLang={state.selectedLang}
                compiledIframeCode={state.compiledIframeCode}
                code={state.code}
                sqliteResults={state.sqliteResults}
                markdownHtml={state.markdownHtml}
                jsonValidation={state.jsonValidation}
                terminalOutput={state.terminalOutput}
              />
            </main>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Mobile Actions Drawer Sheet */}
      <MobileActionsDrawer
        showMobileMenu={state.showMobileMenu}
        setShowMobileMenu={state.setShowMobileMenu}
        handleReset={state.handleReset}
        handleClear={state.handleClear}
        handleCopyCode={handleCopyCode}
        handleDownloadCode={handleDownloadCode}
        isAiOpen={isChatOpen}
        toggleAi={toggleChat}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
        fontSize={state.fontSize}
        setFontSize={state.setFontSize}
        showMinimap={state.showMinimap}
        setShowMinimap={state.setShowMinimap}
        showWordWrap={state.showWordWrap}
        setShowWordWrap={state.setShowWordWrap}
      />
    </div>
  );
};

export default PlaygroundPage;
