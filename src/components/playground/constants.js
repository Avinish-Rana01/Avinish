// Starter templates for all 17 supported languages in DevLab
export const STARTER_TEMPLATES = {
  html: `<!-- DevLab HTML Boilerplate -->
<div class="welcome-box">
  <h1>AVINISH DEVLAB</h1>
  <p>Write HTML, CSS, and JS to see live changes instantly in the browser.</p>
  <button id="glow-trigger">Tap Here</button>
</div>

<script>
  const btn = document.getElementById('glow-trigger');
  btn.addEventListener('click', () => {
    document.body.style.background = document.body.style.background === 'rgb(12, 12, 12)' ? '#1A0826' : '#0C0C0C';
    console.log("Visual background toggled!");
  });
</script>

<style>
  body {
    background: #0C0C0C;
    color: #D7E2EA;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
  }
  .welcome-box {
    text-align: center;
    padding: 40px;
    border-radius: 24px;
    background: #111;
    border: 1px solid rgba(118, 33, 176, 0.4);
    box-shadow: 0 10px 45px rgba(118, 33, 176, 0.15);
    max-width: 380px;
  }
  h1 {
    color: #B600A8;
    margin: 0 0 12px 0;
    font-size: 28px;
    letter-spacing: 0.05em;
  }
  p {
    font-size: 14px;
    line-height: 1.6;
    opacity: 0.75;
    margin-bottom: 25px;
  }
  button {
    background: linear-gradient(135deg, #7621B0, #B600A8);
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(182, 0, 168, 0.25);
    transition: transform 0.2s ease;
  }
  button:hover {
    transform: scale(1.05);
  }
</style>`,

  css: `/* CSS Keyframe Animation Sandbox */
.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0C0C0C;
}

.orb {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7621B0, #B600A8, #BE4C00);
  filter: drop-shadow(0 0 15px rgba(182, 0, 168, 0.5));
  animation: float 4s ease-in-out infinite alternate;
}

@keyframes float {
  0% {
    transform: translateY(-20px) scale(0.95);
    filter: drop-shadow(0 0 10px rgba(118, 33, 176, 0.4));
  }
  100% {
    transform: translateY(20px) scale(1.05);
    filter: drop-shadow(0 0 30px rgba(182, 0, 168, 0.7));
  }
}`,

  javascript: `// Frontend JavaScript Demo
console.log("Initializing local script runtime...");

const mathResult = Math.sqrt(256) * Math.PI;
console.log("Calculated circle coordinates: " + mathResult.toFixed(4));

const userData = {
  name: "Avinish Rana",
  role: "Frontend Engineer",
  skills: ["React", "JavaScript", "TailwindCSS"]
};
console.log("User metadata loaded:");
console.log(JSON.stringify(userData, null, 2));`,

  typescript: `// TypeScript Static Compilation sandbox
interface Developer {
  name: string;
  experienceYears: number;
  skills: string[];
}

const devInfo: Developer = {
  name: "Avinish Rana",
  experienceYears: 1.5,
  skills: ["React", "TypeScript", "WASM"]
};

function displayProfile(dev: Developer): void {
  console.log(\`Profile loaded: \${dev.name} (\${dev.experienceYears} Years Exp)\`);
  console.log("Active Technical stack: " + dev.skills.join(" • "));
}

displayProfile(devInfo);`,

  python: `# Python (Pyodide WebAssembly Runtime)
import math

print("Hello from Python running locally inside your browser via Pyodide WASM!")

# Calculate mathematical ranges
radius = 6.5
circumference = 2 * math.pi * radius
area = math.pi * (radius ** 2)

print(f"Circle calculations for radius = {radius}:")
print(f"  Circumference = {circumference:.4f}")
print(f"  Area          = {area:.4f}")
`,

  sqlite: `-- SQLite WASM Database Query Sandbox
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  priority TEXT,
  completed INTEGER
);

INSERT INTO tasks (title, priority, completed) VALUES ('Build DevLab Playground', 'HIGH', 1);
INSERT INTO tasks (title, priority, completed) VALUES ('Configure Monaco Theme', 'HIGH', 1);
INSERT INTO tasks (title, priority, completed) VALUES ('Optimize Pyodide Loader', 'MEDIUM', 0);

SELECT * FROM tasks;`,

  markdown: `# 🌌 DevLab Markdown Sandbox

Welcome to the **Markdown Preview renderer**. You can write standard GitHub-flavored Markdown here to preview it instantly.

## Core Features
- [x] Monaco editor custom theme
- [x] Responsive preview sheets
- [ ] Auto-saving changes

## Code Block Example
\`\`\`javascript
const test = () => {
  console.log("Built by Avinish Rana.");
};
\`\`\`
`,

  json: `{
  "name": "avinish-devlab",
  "version": "1.0.0",
  "description": "Premium browser sandbox environment",
  "runtimes": {
    "frontend": ["html", "css", "js", "ts"],
    "wasm": ["python", "sqlite", "c", "cpp", "rust", "php"]
  },
  "active": true
}`,

  c: `// C Language Playground
#include <stdio.h>

int main() {
    printf("Hello from C WebAssembly compilation target!\\n");
    printf("Compiler: gcc / clang WASM\\n");
    
    int a = 12;
    int b = 30;
    printf("Sum of values: %d\\n", (a + b));
    return 0;
}`,

  cpp: `// C++ Programming Sandbox
#include <iostream>
#include <vector>

int main() {
    std::cout << "Hello from C++ compiling client-side!\\n";
    
    std::vector<std::string> options = {"WASM Engine", "Monaco Editor", "Responsive Layout"};
    std::cout << "Configured features:\\n";
    for (const auto& opt : options) {
        std::cout << "  - " << opt << "\\n";
    }
    return 0;
}`,

  rust: `// Rust Language WASM compilation target
fn main() {
    println!("Hello from Rust compiling locally in DevLab!");
    
    let radius = 10;
    println!("Computed diameter: {}", radius * 2);
}`,

  php: `<?php
// PHP Sandbox
echo "Hello from PHP WASM runtime!\\n";
echo "Active Version: 8.2 (WASM Edition)\\n";

$data = ["PHP", "WASM", "SQLite"];
print_r($data);
?>`,

  lua: `-- Lua Script Sandbox
print("Hello from Lua compiler target!")
local x = 10
local y = 20
print("Multiplied value: " .. (x * y))`,

  ruby: `# Ruby Script Playground
puts "Hello from Ruby script runtime!"
values = [1, 2, 3, 4]
puts "Sum of array: #{values.sum}"`,

  yaml: `devlab:
  name: Avinish Playground
  version: 1.0.0
  features:
    - Monaco custom coloring
    - Pyodide runtime environment
    - SQL database execution
  active: true`,

  xml: `<?xml version="1.0" encoding="UTF-8"?>
<devlab>
  <name>Avinish Playground</name>
  <version>1.0.0</version>
  <active>true</active>
</devlab>`,

  svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="#7621B0" stroke-width="4" fill="#B600A8" fill-opacity="0.2"/>
  <path d="M35 50L45 60L65 40" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
};

// Supported language classifications and parameters
export const LANGUAGES = [
  { id: 'html', name: 'HTML', category: 'frontend', mode: 'html', runtime: 'Iframe Preview', ext: 'html' },
  { id: 'css', name: 'CSS', category: 'frontend', mode: 'css', runtime: 'Styles Injection', ext: 'css' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', mode: 'javascript', runtime: 'Console / Preview', ext: 'js' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', mode: 'typescript', runtime: 'JS Transpiler', ext: 'ts' },
  { id: 'python', name: 'Python', category: 'runtime', mode: 'python', runtime: 'Pyodide WASM', ext: 'py' },
  { id: 'sqlite', name: 'SQLite', category: 'runtime', mode: 'sql', runtime: 'sql.js WASM', ext: 'sqlite' },
  { id: 'c', name: 'C', category: 'wasm', mode: 'c', runtime: 'WASM Compiler', ext: 'c' },
  { id: 'cpp', name: 'C++', category: 'wasm', mode: 'cpp', runtime: 'WASM Compiler', ext: 'cpp' },
  { id: 'rust', name: 'Rust', category: 'wasm', mode: 'rust', runtime: 'rustc WASM', ext: 'rs' },
  { id: 'php', name: 'PHP', category: 'wasm', mode: 'php', runtime: 'PHP-WASM', ext: 'php' },
  { id: 'lua', name: 'Lua', category: 'runtime', mode: 'lua', runtime: 'Lua VM', ext: 'lua' },
  { id: 'ruby', name: 'Ruby', category: 'runtime', mode: 'ruby', runtime: 'Ruby VM', ext: 'rb' },
  { id: 'markdown', name: 'Markdown', category: 'preview', mode: 'markdown', runtime: 'Markdown Render', ext: 'md' },
  { id: 'json', name: 'JSON', category: 'preview', mode: 'json', runtime: 'Validation', ext: 'json' },
  { id: 'yaml', name: 'YAML', category: 'preview', mode: 'yaml', runtime: 'Validation', ext: 'yaml' },
  { id: 'xml', name: 'XML', category: 'preview', mode: 'xml', runtime: 'Validation', ext: 'xml' },
  { id: 'svg', name: 'SVG', category: 'frontend', mode: 'xml', runtime: 'SVG Renderer', ext: 'svg' }
];
