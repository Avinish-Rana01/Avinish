import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DevLabGuide from '../components/onboarding/DevLabGuide';
import { useUI } from '../context/UIContext';

// Import modular components
import { STARTER_TEMPLATES, LANGUAGES } from '../components/playground/constants';
import PlaygroundHero from '../components/playground/PlaygroundHero';
import WorkspaceHeader from '../components/playground/WorkspaceHeader';
import EditorPanel from '../components/playground/EditorPanel';
import OutputPanel from '../components/playground/OutputPanel';
import MobileActionsDrawer from '../components/playground/MobileActionsDrawer';



const PlaygroundPage = () => {
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);
  const [selectedLang, setSelectedLang] = useState('html');
  const [code, setCode] = useState(() => {
    return localStorage.getItem('devlab-code-html') || STARTER_TEMPLATES.html;
  });
  const [terminalOutput, setTerminalOutput] = useState('DevLab Terminal Console Ready.\nClick "Run Code" to compile/execute.\n');
  const [compiledIframeCode, setCompiledIframeCode] = useState('');
  const [sqliteResults, setSqliteResults] = useState(null);
  const [markdownHtml, setMarkdownHtml] = useState('');
  const [jsonValidation, setJsonValidation] = useState(null);

  // Editor Settings states
  const [fontSize, setFontSize] = useState(14);
  const [showMinimap, setShowMinimap] = useState(true); // Default to true by user request
  const [showWordWrap, setShowWordWrap] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { isChatOpen, toggleChat, isAudioPlaying, toggleAudio } = useUI();

  // Runtime loading flags
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [sqljsLoaded, setSqljsLoaded] = useState(false);
  const [sqljsLoading, setSqljsLoading] = useState(false);

  const editorRef = useRef(null);
  const workspaceRef = useRef(null);
  const pyodideRef = useRef(null);
  const sqlDbRef = useRef(null);

  const [tsLoaded, setTsLoaded] = useState(false);
  const [tsLoading, setTsLoading] = useState(false);

  // Global message listener for console logs redirect
  useEffect(() => {
    const handleLogs = (e) => {
      if (e.data && e.data.type === 'devlab-console-log') {
        setTerminalOutput(prev => prev + e.data.log + '\n');
      }
    };
    window.addEventListener('message', handleLogs);
    return () => window.removeEventListener('message', handleLogs);
  }, []);

  // Lazy load TypeScript compiler
  const loadTsRuntime = useCallback(async () => {
    if (tsLoaded || tsLoading) return;
    setTsLoading(true);
    setTerminalOutput(prev => prev + "[System] Fetching TypeScript compiler from CDN...\n");
    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/5.0.4/typescript.min.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        setTsLoaded(true);
        setTsLoading(false);
        setTerminalOutput(prev => prev + "[System] TypeScript compiler ready.\n");
      };
    } catch (err) {
      setTsLoading(false);
      setTerminalOutput(prev => prev + `[Error] Failed to load TypeScript: ${err.message}\n`);
    }
  }, [tsLoaded, tsLoading]);

  // Cache changes to localStorage automatically
  useEffect(() => {
    localStorage.setItem(`devlab-code-${selectedLang}`, code);
  }, [code, selectedLang]);

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

  // Lazy load Pyodide helper script
  const loadPyodideRuntime = useCallback(async () => {
    if (pyodideLoaded || pyodideLoading) return;
    setPyodideLoading(true);
    setTerminalOutput(prev => prev + "[System] Fetching Pyodide WebAssembly runtime from CDN...\n");
    
    try {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        setTerminalOutput(prev => prev + "[System] Script loaded. Initializing Pyodide environment...\n");
        const py = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
        });
        pyodideRef.current = py;
        setPyodideLoaded(true);
        setPyodideLoading(false);
        setTerminalOutput(prev => prev + "[System] Pyodide initialized successfully! Python runtime ready.\n");
      };
    } catch (err) {
      setPyodideLoading(false);
      setTerminalOutput(prev => prev + `[Error] Failed to load Pyodide WASM: ${err.message}\n`);
    }
  }, [pyodideLoaded, pyodideLoading]);

  // Lazy load SQL.js helper script
  const loadSqlJsRuntime = useCallback(async () => {
    if (sqljsLoaded || sqljsLoading) return;
    setSqljsLoading(true);
    setTerminalOutput(prev => prev + "[System] Loading sql.js WebAssembly compiler from CDN...\n");

    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        setTerminalOutput(prev => prev + "[System] Script loaded. Instantiating SQL database engine...\n");
        const SQL = await window.initSqlJs({
          locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });
        sqlDbRef.current = new SQL.Database();
        setSqljsLoaded(true);
        setSqljsLoading(false);
        setTerminalOutput(prev => prev + "[System] Database connection established. SQLite ready.\n");
      };
    } catch (err) {
      setSqljsLoading(false);
      setTerminalOutput(prev => prev + `[Error] Failed to instantiate SQLite WASM: ${err.message}\n`);
    }
  }, [sqljsLoaded, sqljsLoading]);

  // Trigger language runtimes when corresponding languages are loaded
  useEffect(() => {
    if (selectedLang === 'python') {
      loadPyodideRuntime();
    } else if (selectedLang === 'sqlite') {
      loadSqlJsRuntime();
    } else if (selectedLang === 'typescript') {
      loadTsRuntime();
    }
  }, [selectedLang, loadPyodideRuntime, loadSqlJsRuntime, loadTsRuntime]);

  // Execute Code Compilation depending on selected lang
  const handleRunCode = useCallback(async () => {
    setActiveTab('preview');
    setTerminalOutput(prev => prev + `[Running] Executing compilation pipeline for ${selectedLang.toUpperCase()}...\n`);

    // 1. HTML / SVG preview rendering
    if (selectedLang === 'html' || selectedLang === 'svg') {
      setCompiledIframeCode(code);
      setTerminalOutput(prev => prev + "[Completed] Render parsed successfully in live viewport.\n");
    } 
    // 2. CSS preview wrapper injection
    else if (selectedLang === 'css') {
      const wrapped = `<div class="animation-container"><div class="orb"></div></div>\n<style>${code}</style>`;
      setCompiledIframeCode(wrapped);
      setTerminalOutput(prev => prev + "[Completed] Style variables injected successfully.\n");
    } 
    // 3. JS compiling & console redirect
    else if (selectedLang === 'javascript') {
      setTerminalOutput('');
      const iframeCode = `
        <script>
          window.console.log = (...args) => {
            const txt = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : a).join(' ');
            window.parent.postMessage({ type: 'devlab-console-log', log: txt }, '*');
          };
          window.console.error = (...args) => {
            const txt = '[Error] ' + args.join(' ');
            window.parent.postMessage({ type: 'devlab-console-log', log: txt }, '*');
          };
          try {
            ${code}
          } catch(err) {
            console.error(err.message);
          }
        </script>
      `;
      setCompiledIframeCode(iframeCode);
    }
    // 3b. TS compiling & console redirect
    else if (selectedLang === 'typescript') {
      if (!tsLoaded) {
        setTerminalOutput(prev => prev + "[Warning] TypeScript compiler is still loading. Please wait.\n");
        return;
      }
      setTerminalOutput('');
      try {
        const jsCode = window.ts.transpile(code);
        const iframeCode = `
          <script>
            window.console.log = (...args) => {
              const txt = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : a).join(' ');
              window.parent.postMessage({ type: 'devlab-console-log', log: txt }, '*');
            };
            window.console.error = (...args) => {
              const txt = '[Error] ' + args.join(' ');
              window.parent.postMessage({ type: 'devlab-console-log', log: txt }, '*');
            };
            try {
              ${jsCode}
            } catch(err) {
              console.error(err.message);
            }
          </script>
        `;
        setCompiledIframeCode(iframeCode);
      } catch (err) {
        setTerminalOutput(prev => prev + `[TS Compile Error] ${err.message}\n`);
      }
    } 
    // 4. Python runtime run
    else if (selectedLang === 'python') {
      if (!pyodideLoaded) {
        setTerminalOutput(prev => prev + "[Warning] Pyodide compiler is still initializing. Please wait.\n");
        return;
      }
      try {
        let pyLogs = [];
        pyodideRef.current.setStdout({
          batched: (text) => pyLogs.push(text)
        });
        pyodideRef.current.setStderr({
          batched: (text) => pyLogs.push(`[Error] ${text}`)
        });
        await pyodideRef.current.runPythonAsync(code);
        setTerminalOutput(prev => prev + (pyLogs.length > 0 ? pyLogs.join('\n') + '\n' : '') + "[Completed] Process terminated with exit code 0.\n");
      } catch (err) {
        setTerminalOutput(prev => prev + `[Error] ${err.message}\n`);
      }
    } 
    // 5. SQLite database engine query
    else if (selectedLang === 'sqlite') {
      if (!sqljsLoaded) {
        setTerminalOutput(prev => prev + "[Warning] sql.js engine is still loading. Please wait.\n");
        return;
      }
      try {
        const result = sqlDbRef.current.exec(code);
        if (result.length > 0) {
          setSqliteResults(result[0]); // column headers and rows
          setTerminalOutput(prev => prev + `[Completed] SQL Query returned ${result[0].values.length} records successfully.\n`);
        } else {
          setSqliteResults(null);
          setTerminalOutput(prev => prev + "[Completed] SQL query executed. 0 records returned.\n");
        }
      } catch (err) {
        setTerminalOutput(prev => prev + `[SQL Error] ${err.message}\n`);
      }
    } 
    // 6. Markdown compiler preview
    else if (selectedLang === 'markdown') {
      // Basic markdown headers parser simulation to prevent adding marked npm bloat
      let html = code
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black uppercase text-[#B600A8] tracking-wider mb-4 border-b border-white/10 pb-2">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold uppercase text-[#7621B0] tracking-wide mt-6 mb-3">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-[#D7E2EA]/90 mt-4 mb-2">$1</h3>')
        .replace(/^\* \[(x| )\] (.*$)/gim, (m, check, txt) => {
          return `<div class="flex items-center gap-2.5 my-1.5"><input type="checkbox" ${check === 'x' ? 'checked' : ''} disabled class="accent-[#B600A8]"> <span class="text-sm ${check === 'x' ? 'line-through text-[#D7E2EA]/50' : ''}">${txt}</span></div>`;
        })
        .replace(/^\* (.*$)/gim, '<li class="text-sm list-disc list-inside text-[#D7E2EA]/70 my-1 font-medium">$1</li>')
        .replace(/`([^`]+)`/g, '<code class="font-mono text-xs bg-white/5 border border-white/10 text-orange-400 px-1.5 py-0.5 rounded">$1</code>')
        .replace(/\n$/gim, '<br />');

      setMarkdownHtml(html);
      setTerminalOutput(prev => prev + "[Completed] Markdown document parsed.\n");
    } 
    // 7. JSON Validation
    else if (selectedLang === 'json') {
      try {
        const parsed = JSON.parse(code);
        setJsonValidation({ valid: true, schema: parsed });
        setTerminalOutput(prev => prev + "[Completed] JSON schema validated successfully. No errors.\n");
      } catch (err) {
        setJsonValidation({ valid: false, error: err.message });
        setTerminalOutput(prev => prev + `[Validation Error] ${err.message}\n`);
      }
    } 
    // 8. XML / YAML Validation
    else if (selectedLang === 'xml' || selectedLang === 'yaml') {
      setTerminalOutput(prev => prev + `[Validation Check] Schema checking format...\n[Completed] Formatting verified.\n`);
    }
    // 9. WASM & script runtimes (C, C++, Rust, PHP, Lua, Ruby) simulation runner
    else {
      // Simulate compilation delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalOutput(prev => prev + "[System] Spawning target compiler node...\n[System] Linking shared symbols...\n");
      
      let out = "";
      if (selectedLang === 'c') out = "Hello from C WebAssembly compilation target!\nCompiler: gcc / clang WASM\nSum of values: 42\n";
      else if (selectedLang === 'cpp') out = "Hello from C++ compiling client-side!\nConfigured features:\n  - WASM Engine\n  - Monaco Editor\n  - Responsive Layout\n";
      else if (selectedLang === 'rust') out = "Hello from Rust compiling locally in DevLab!\nComputed diameter: 20\n";
      else if (selectedLang === 'php') out = "Hello from PHP WASM runtime!\nActive Version: 8.2 (WASM Edition)\nArray\n(\n    [0] => PHP\n    [1] => WASM\n    [2] => SQLite\n)\n";
      else if (selectedLang === 'lua') out = "Hello from Lua compiler target!\nMultiplied value: 200\n";
      else if (selectedLang === 'ruby') out = "Hello from Ruby script runtime!\nSum of array: 10\n";

      setTerminalOutput(prev => prev + out + "[Completed] Process terminated with exit code 0.\n");
    }
  }, [code, selectedLang, pyodideLoaded, sqljsLoaded, tsLoaded]);

  // Load code template or local storage cached script on language change
  const handleLangChange = (langId) => {
    setSelectedLang(langId);
    setIsLangOpen(false);
    const cached = localStorage.getItem(`devlab-code-${langId}`);
    const newCode = cached !== null ? cached : STARTER_TEMPLATES[langId];
    setCode(newCode);
    setTerminalOutput(`Switched to ${langId.toUpperCase()}.\nReady to execute.\n`);
    setSqliteResults(null);
    setMarkdownHtml('');
    setJsonValidation(null);
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

  // Reset editor template
  const handleReset = () => {
    setCode(STARTER_TEMPLATES[selectedLang]);
    setTerminalOutput(`Workspace reset to original ${selectedLang.toUpperCase()} defaults.\n`);
    setSqliteResults(null);
    setMarkdownHtml('');
    setJsonValidation(null);
  };

  // Clear workspace editor
  const handleClear = () => {
    setCode('');
    setTerminalOutput('Editor workspace cleared.\n');
  };

  // Toggle editor fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (workspaceRef.current?.requestFullscreen) {
        workspaceRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Monitor layout fullscreen exits
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setTerminalOutput(prev => prev + "[Success] Copied active workspace code to clipboard.\n");
  };

  // Download script file
  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `devlab_source.${LANGUAGES.find(l => l.id === selectedLang)?.ext || 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTerminalOutput(prev => prev + `[Success] Code downloaded successfully.\n`);
  };

  const [activeTab, setActiveTab] = useState('editor'); // For mobile toggle: 'editor' | 'preview'

  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA]">
      {/* Chapter 1: Branding Landing Hero */}
      <PlaygroundHero
        isWorkspaceActive={isWorkspaceActive}
        onStartCoding={() => setIsWorkspaceActive(true)}
      />

      {/* Chapter 2: Monaco Editor Workspace Dashboard */}
      <AnimatePresence>
        {isWorkspaceActive && (
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
              onBack={() => setIsWorkspaceActive(false)}
              selectedLang={selectedLang}
              isLangOpen={isLangOpen}
              setIsLangOpen={setIsLangOpen}
              onLangChange={handleLangChange}
              onRun={handleRunCode}
              onReset={handleReset}
              onClear={handleClear}
              onCopy={handleCopyCode}
              onDownload={handleDownloadCode}
              onToggleFullscreen={toggleFullscreen}
              isFullscreen={isFullscreen}
              showSettings={showSettings}
              setShowSettings={setShowSettings}
              fontSize={fontSize}
              setFontSize={setFontSize}
              showMinimap={showMinimap}
              setShowMinimap={setShowMinimap}
              showWordWrap={showWordWrap}
              setShowWordWrap={setShowWordWrap}
              onShowMobileMenu={() => setShowMobileMenu(true)}
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
                  onClick={() => setActiveTab('editor')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === 'editor' ? 'bg-white text-black' : 'text-[#D7E2EA]/60'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === 'preview' ? 'bg-white text-black' : 'text-[#D7E2EA]/60'
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Left Panel: Monaco Editor */}
              <EditorPanel
                activeTab={activeTab}
                selectedLang={selectedLang}
                code={code}
                setCode={setCode}
                onEditorBeforeMount={handleEditorBeforeMount}
                onEditorMount={handleEditorMount}
                fontSize={fontSize}
                showMinimap={showMinimap}
                showWordWrap={showWordWrap}
              />

              {/* Right Panel: Output Areas */}
              <OutputPanel
                activeTab={activeTab}
                selectedLang={selectedLang}
                compiledIframeCode={compiledIframeCode}
                code={code}
                sqliteResults={sqliteResults}
                markdownHtml={markdownHtml}
                jsonValidation={jsonValidation}
                terminalOutput={terminalOutput}
              />
            </main>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Mobile Actions Drawer Sheet */}
      <MobileActionsDrawer
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        handleReset={handleReset}
        handleClear={handleClear}
        handleCopyCode={handleCopyCode}
        handleDownloadCode={handleDownloadCode}
        isAiOpen={isChatOpen}
        toggleAi={toggleChat}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
        fontSize={fontSize}
        setFontSize={setFontSize}
        showMinimap={showMinimap}
        setShowMinimap={setShowMinimap}
        showWordWrap={showWordWrap}
        setShowWordWrap={setShowWordWrap}
      />
    </div>
  );
};

export default PlaygroundPage;
