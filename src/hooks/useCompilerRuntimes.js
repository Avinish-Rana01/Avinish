import { useState, useEffect, useRef, useCallback } from 'react';

export const useCompilerRuntimes = (selectedLang, appendTerminalOutput) => {
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [sqljsLoaded, setSqljsLoaded] = useState(false);
  const [sqljsLoading, setSqljsLoading] = useState(false);
  const [tsLoaded, setTsLoaded] = useState(false);
  const [tsLoading, setTsLoading] = useState(false);

  const pyodideRef = useRef(null);
  const sqlDbRef = useRef(null);

  const loadTsRuntime = useCallback(async () => {
    if (tsLoaded || tsLoading) return;
    setTsLoading(true);
    appendTerminalOutput("[System] Fetching TypeScript compiler from CDN...\n");
    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/5.0.4/typescript.min.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        setTsLoaded(true);
        setTsLoading(false);
        appendTerminalOutput("[System] TypeScript compiler ready.\n");
      };
    } catch (err) {
      setTsLoading(false);
      appendTerminalOutput(`[Error] Failed to load TypeScript: ${err.message}\n`);
    }
  }, [tsLoaded, tsLoading, appendTerminalOutput]);

  const loadPyodideRuntime = useCallback(async () => {
    if (pyodideLoaded || pyodideLoading) return;
    setPyodideLoading(true);
    appendTerminalOutput("[System] Fetching Pyodide WebAssembly runtime from CDN...\n");
    
    try {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        appendTerminalOutput("[System] Script loaded. Initializing Pyodide environment...\n");
        const py = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
        });
        pyodideRef.current = py;
        setPyodideLoaded(true);
        setPyodideLoading(false);
        appendTerminalOutput("[System] Pyodide initialized successfully! Python runtime ready.\n");
      };
    } catch (err) {
      setPyodideLoading(false);
      appendTerminalOutput(`[Error] Failed to load Pyodide WASM: ${err.message}\n`);
    }
  }, [pyodideLoaded, pyodideLoading, appendTerminalOutput]);

  const loadSqlJsRuntime = useCallback(async () => {
    if (sqljsLoaded || sqljsLoading) return;
    setSqljsLoading(true);
    appendTerminalOutput("[System] Loading sql.js WebAssembly compiler from CDN...\n");

    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        appendTerminalOutput("[System] Script loaded. Instantiating SQL database engine...\n");
        const SQL = await window.initSqlJs({
          locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });
        sqlDbRef.current = new SQL.Database();
        setSqljsLoaded(true);
        setSqljsLoading(false);
        appendTerminalOutput("[System] Database connection established. SQLite ready.\n");
      };
    } catch (err) {
      setSqljsLoading(false);
      appendTerminalOutput(`[Error] Failed to instantiate SQLite WASM: ${err.message}\n`);
    }
  }, [sqljsLoaded, sqljsLoading, appendTerminalOutput]);

  useEffect(() => {
    if (selectedLang === 'python') {
      loadPyodideRuntime();
    } else if (selectedLang === 'sqlite') {
      loadSqlJsRuntime();
    } else if (selectedLang === 'typescript') {
      loadTsRuntime();
    }
  }, [selectedLang, loadPyodideRuntime, loadSqlJsRuntime, loadTsRuntime]);

  return {
    tsLoaded,
    pyodideLoaded,
    sqljsLoaded,
    pyodideRef,
    sqlDbRef
  };
};
