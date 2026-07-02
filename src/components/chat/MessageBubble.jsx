import React from 'react';

const parseMarkdown = (text) => {
  const parts = [];
  let lastIndex = 0;
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const textBefore = text.substring(lastIndex, match.index);
    if (textBefore) {
      parts.push({ type: 'text', content: textBefore });
    }
    parts.push({ type: 'code', language: match[1], content: match[2] });
    lastIndex = codeBlockRegex.lastIndex;
  }

  const remainingText = text.substring(lastIndex);
  if (remainingText) {
    parts.push({ type: 'text', content: remainingText });
  }

  return parts.map((part, index) => {
    if (part.type === 'code') {
      return (
        <pre
          key={index}
          style={{
            background: '#040404',
            padding: '12px',
            borderRadius: '8px',
            overflowX: 'auto',
            fontFamily: 'monospace',
            fontSize: '11px',
            border: '1px solid rgba(215, 226, 234, 0.08)',
            margin: '8px 0',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          <code>{part.content.trim()}</code>
        </pre>
      );
    }

    const lines = part.content.split('\n');
    return (
      <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {lines.map((line, lIndex) => {
          let cleanLine = line.trim();
          if (!cleanLine && line !== '') return <div key={lIndex} style={{ height: '8px' }} />;

          const isListItem = cleanLine.startsWith('- ') || cleanLine.startsWith('* ');

          // Escape HTML tags to prevent XSS
          let html = cleanLine
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

          // Parse Code Inline
          html = html.replace(/`([^`]+)`/g, '<code style="background: rgba(215, 226, 234, 0.08); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; color: #B600A8;">$1</code>');

          // Parse Bold
          html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

          // Parse Links
          html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #B600A8; text-decoration: underline; font-weight: 500;">$1</a>');

          if (isListItem) {
            const listContent = html.substring(2);
            return (
              <ul key={lIndex} style={{ margin: '2px 0 2px 18px', padding: 0, listStyleType: 'disc' }}>
                <li dangerouslySetInnerHTML={{ __html: listContent }} style={{ color: '#D7E2EA' }} />
              </ul>
            );
          }

          return (
            <p
              key={lIndex}
              style={{ margin: 0, color: '#D7E2EA', lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        })}
      </div>
    );
  });
};

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '85%',
        animation: 'ai-bubble-slide 0.3s ease-out',
        transformOrigin: isUser ? 'bottom right' : 'bottom left',
      }}
    >
      <div
        style={{
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          padding: '12px 16px',
          background: isUser
            ? 'rgba(118, 33, 176, 0.12)'
            : 'rgba(215, 226, 234, 0.03)',
          border: isUser
            ? '1px solid rgba(118, 33, 176, 0.28)'
            : '1px solid rgba(215, 226, 234, 0.06)',
          boxShadow: isUser
            ? '0 4px 12px rgba(118, 33, 176, 0.08)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontFamily: "'Kanit', sans-serif",
          fontSize: '14px',
          wordBreak: 'break-word',
        }}
      >
        {parseMarkdown(message.text)}
      </div>

      <style>{`
        @keyframes ai-bubble-slide {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default React.memo(MessageBubble);
