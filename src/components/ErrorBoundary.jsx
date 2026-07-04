import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an execution exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA] flex flex-col items-center justify-center p-6 text-center select-none font-sans">
          <div className="max-w-md flex flex-col gap-6 items-center">
            <span className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center text-red-500 bg-red-950/10 text-xl font-bold animate-pulse">
              !
            </span>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-black uppercase tracking-wider text-white">
                Something went wrong
              </h2>
              <p className="text-xs text-[#D7E2EA]/60 leading-relaxed max-w-[320px]">
                An unexpected application exception occurred. Try reloading or returning to the home layout.
              </p>
            </div>
            {this.state.error && (
              <pre className="w-full bg-white/5 border border-white/10 rounded-xl p-3 font-mono text-[10px] text-left text-orange-400 overflow-x-auto max-h-[140px] select-text">
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="px-6 py-2 bg-white text-black hover:bg-slate-200 font-semibold text-xs uppercase tracking-wider rounded-full transition-transform active:scale-95 cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
