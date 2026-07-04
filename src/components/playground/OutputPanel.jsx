import React from 'react';
import { Terminal, HelpCircle, Eye, Check } from 'lucide-react';

const OutputPanel = ({
  activeTab,
  selectedLang,
  compiledIframeCode,
  code,
  sqliteResults,
  markdownHtml,
  jsonValidation,
  terminalOutput
}) => {
  return (
    <div className={`flex-1 flex-col rounded-[24px] border border-white/10 overflow-hidden min-h-[380px] md:min-h-0 bg-[#0C0C0C] ${
      activeTab === 'preview' ? 'flex' : 'hidden md:flex'
    }`}>
      
      {/* Adaptive Output Area Header */}
      <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-[#121212]/50 select-none shrink-0">
        <div className="flex items-center gap-2">
          {selectedLang === 'html' || selectedLang === 'css' || selectedLang === 'svg' ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/40">Live View Output</span>
            </>
          ) : selectedLang === 'sqlite' ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#BE4C00]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/40">Database Record Table</span>
            </>
          ) : selectedLang === 'markdown' ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/40">Document Preview</span>
            </>
          ) : (
            <>
              <Terminal size={12} className="text-[#D7E2EA]/50" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/40">Terminal Console</span>
            </>
          )}
        </div>
      </div>

      {/* Adaptive Content container depending on selected language */}
      <div className="flex-1 min-h-0 bg-[#060606] relative">
        
        {/* Category 1: Frontend Browser Preview */}
        {(selectedLang === 'html' || selectedLang === 'css' || selectedLang === 'svg' || selectedLang === 'javascript' || selectedLang === 'typescript') && (
          <div className={`w-full h-full bg-[#0C0C0C] relative ${
            selectedLang === 'javascript' || selectedLang === 'typescript' ? 'hidden' : ''
          }`}>
            <iframe
              srcDoc={
                selectedLang === 'svg' 
                  ? `<style>body { background: #0C0C0C; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }</style><body>${compiledIframeCode || code}</body>`
                  : compiledIframeCode || `<style>body { background: #0C0C0C; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #D7E2EA; font-family: sans-serif; }</style><body><p style="opacity: 0.3; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Click "Run" to build</p></body>`
              }
              title="DevLab Interactive Sandbox Frame"
              sandbox="allow-scripts allow-modals allow-same-origin"
              className="w-full h-full border-none bg-transparent"
            />
          </div>
        )}

        {/* Category 2: SQLite database output table */}
        {selectedLang === 'sqlite' && (
          <div className="w-full h-full p-6 overflow-auto scrollbar-thin">
            {sqliteResults ? (
              <div className="w-full border border-white/10 rounded-xl overflow-hidden bg-[#121212]">
                <table className="w-full text-left text-xs leading-normal">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 select-none text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/60">
                      {sqliteResults.columns.map((col, idx) => (
                        <th key={idx} className="p-3 font-semibold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#D7E2EA]/85">
                    {sqliteResults.values.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-white/5 transition-colors">
                        {row.map((val, valIdx) => (
                          <td key={valIdx} className="p-3 font-mono text-[11px]">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center select-none text-[#D7E2EA]/30 gap-2">
                <HelpCircle size={28} className="opacity-40" />
                <span className="text-[10px] font-black uppercase tracking-widest">No Database query records compiled yet.</span>
                <span className="text-[9px] max-w-[280px] font-medium leading-relaxed opacity-60">Write a query inserting or reading tables and click Run Code.</span>
              </div>
            )}
          </div>
        )}

        {/* Category 3: Markdown Render preview */}
        {selectedLang === 'markdown' && (
          <div className="w-full h-full p-6 overflow-auto scrollbar-thin bg-[#0C0C0C]">
            {markdownHtml ? (
              <div
                className="prose prose-invert max-w-none prose-sm text-[#D7E2EA] font-sans"
                dangerouslySetInnerHTML={{ __html: markdownHtml }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center select-none text-[#D7E2EA]/30 gap-2">
                <Eye size={28} className="opacity-40" />
                <span className="text-[10px] font-black uppercase tracking-widest">Markdown Preview screen</span>
                <span className="text-[9px] max-w-[280px] font-medium leading-relaxed opacity-60">Write documentation in markdown format and click Run Code.</span>
              </div>
            )}
          </div>
        )}

        {/* Category 4: JSON Code validation check */}
        {selectedLang === 'json' && (
          <div className="w-full h-full p-6 overflow-auto scrollbar-thin bg-[#0C0C0C] font-mono text-xs">
            {jsonValidation ? (
              jsonValidation.valid ? (
                <div className="flex flex-col gap-4 border border-emerald-900/40 rounded-xl p-4 bg-emerald-950/10 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold uppercase tracking-widest text-[10px]">Schema valid</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed select-text">
                    {JSON.stringify(jsonValidation.schema, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="border border-red-950/40 rounded-xl p-4 bg-red-950/10 text-red-400 flex flex-col gap-2">
                  <span className="font-bold uppercase tracking-widest text-[10px]">Validation Failed</span>
                  <span className="text-[11px] select-text">{jsonValidation.error}</span>
                </div>
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center select-none text-[#D7E2EA]/30 gap-2">
                <Check size={28} className="opacity-40" />
                <span className="text-[10px] font-black uppercase tracking-widest">JSON Parser Schema validator</span>
                <span className="text-[9px] max-w-[280px] font-medium leading-relaxed opacity-60">Write configuration elements in JSON format and click Run.</span>
              </div>
            )}
          </div>
        )}

        {/* Category 5: Universal Compiler Console stdout */}
        {selectedLang !== 'html' && selectedLang !== 'css' && selectedLang !== 'svg' && selectedLang !== 'sqlite' && selectedLang !== 'markdown' && selectedLang !== 'json' && (
          <pre className="w-full h-full p-5 font-mono text-[11px] leading-relaxed text-[#D7E2EA]/85 overflow-y-auto select-text selection:bg-[#B600A8]/30 selection:text-white scrollbar-thin">
            {terminalOutput}
          </pre>
        )}

      </div>
    </div>
  );
};

export default React.memo(OutputPanel);
