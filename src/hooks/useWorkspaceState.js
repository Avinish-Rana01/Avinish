import { useState, useEffect } from 'react';
import { STARTER_TEMPLATES } from '../components/playground/constants';

export const useWorkspaceState = () => {
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
  const [showMinimap, setShowMinimap] = useState(true);
  const [showWordWrap, setShowWordWrap] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  const appendTerminalOutput = (text) => setTerminalOutput(prev => prev + text);
  
  const setTerminalOutputDirect = (text) => setTerminalOutput(text);

  // Cache changes to localStorage automatically
  useEffect(() => {
    localStorage.setItem(`devlab-code-${selectedLang}`, code);
  }, [code, selectedLang]);

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

  const handleReset = () => {
    setCode(STARTER_TEMPLATES[selectedLang]);
    setTerminalOutput(`Workspace reset to original ${selectedLang.toUpperCase()} defaults.\n`);
    setSqliteResults(null);
    setMarkdownHtml('');
    setJsonValidation(null);
  };

  const handleClear = () => {
    setCode('');
    setTerminalOutput('Editor workspace cleared.\n');
  };

  return {
    isWorkspaceActive, setIsWorkspaceActive,
    selectedLang, handleLangChange,
    code, setCode,
    terminalOutput, setTerminalOutputDirect, appendTerminalOutput,
    compiledIframeCode, setCompiledIframeCode,
    sqliteResults, setSqliteResults,
    markdownHtml, setMarkdownHtml,
    jsonValidation, setJsonValidation,
    fontSize, setFontSize,
    showMinimap, setShowMinimap,
    showWordWrap, setShowWordWrap,
    isFullscreen, setIsFullscreen,
    showSettings, setShowSettings,
    isLangOpen, setIsLangOpen,
    showMobileMenu, setShowMobileMenu,
    activeTab, setActiveTab,
    handleReset, handleClear
  };
};
