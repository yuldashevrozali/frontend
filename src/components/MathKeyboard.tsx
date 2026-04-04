import { useState } from 'react';

type TabType = '123' | 'symbols' | 'abc' | 'αβγ';

const TABS: { key: TabType; label: string }[] = [
  { key: '123', label: '123' },
  { key: 'symbols', label: '∞≠∈' },
  { key: 'abc', label: 'abc' },
  { key: 'αβγ', label: 'αβγ' },
];

// Superscript mapping
const SUPERSCRIPT_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '-': '⁻', '+': '⁺', '=': '⁼', '(': '⁽', ')': '⁾',
  'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
  'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
  'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
  'p': 'ᵖ', 'q': 'q', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ',
  'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
};

// Keys layout
const KEYS: Record<TabType, string[][]> = {
  '123': [
    ['x', 'n', '7', '8', '9', '÷', 'e', 'i', 'π'],
    ['<', '>', '4', '5', '6', '×', 'x²', 'xⁿ', '√'],
    ['(', ')', '1', '2', '3', '−', '∞', '□', '∀', '⌫'],
    ['⇧', '0', '.', '=', '+', '−', '←', '→', '↵'],
  ],
  'symbols': [
    ['∞', '≠', '∈', '∉', '', '', '∪', '', '∅'],
    ['≤', '≥', '≈', '≡', '∝', '∇', '∂', '∆', '∏'],
    ['∑', '∫', '∮', '⊥', '', '∠', '', '⌫', '↵'],
    ['123', '→', '←', '⇔', '⇒', '⇐', '∀', '∃', ''],
  ],
  'abc': [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
    ['123', ',', ' ', '.', '↵', '←', '→', '↑', '↓'],
  ],
  'αβγ': [
    ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'λ'],
    ['μ', 'ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'φ', 'ω'],
    ['Γ', 'Δ', 'Θ', 'Λ', 'Ξ', 'Π', 'Σ', 'Φ', '⌫'],
    ['123', '∞', '', '∈', '', '⊂', '∪', '∩', '↵'],
  ],
};

interface MathKeyboardProps {
  onInput: (value: string) => void;
  onClose: () => void;
}

export default function MathKeyboard({ onInput, onClose }: MathKeyboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('123');
  const [shift, setShift] = useState(false);
  const [superscriptMode, setSuperscriptMode] = useState(false);

  const handleKey = (key: string) => {
    if (key === '⌫') {
      onInput('backspace');
    } else if (key === '↵') {
      onInput('enter');
    } else if (key === '⇧') {
      setShift(!shift);
    } else if (key === '123') {
      setActiveTab('123');
    } else if (key === 'abc') {
      setActiveTab('abc');
    } else if (key === 'αβγ') {
      setActiveTab('αβγ');
    } else if (key === '∞≠∈') {
      setActiveTab('symbols');
    } else if (key === 'x²') {
      onInput('²');
    } else if (key === 'xⁿ') {
      // Toggle superscript mode - ALL subsequent input becomes superscript
      setSuperscriptMode(!superscriptMode);
    } else if (superscriptMode) {
      // In superscript mode - convert everything to superscript
      if (SUPERSCRIPT_MAP[key]) {
        onInput(SUPERSCRIPT_MAP[key]);
      } else {
        // For characters without superscript, output as-is
        onInput(key);
      }
    } else {
      // Normal input
      const outputKey = shift && key.length === 1 && /[a-zA-Z]/.test(key)
        ? key.toUpperCase()
        : key;
      onInput(outputKey);
      // Auto-reset shift after typing a letter
      if (shift && key.length === 1 && /[a-zA-Z]/.test(key)) {
        setShift(false);
      }
    }
  };

  // Get display key (uppercase if shift is active on abc tab)
  const getDisplayKey = (key: string): string => {
    if (activeTab === 'abc' && shift && key.length === 1 && /[a-z]/.test(key)) {
      return key.toUpperCase();
    }
    return key;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2000,
      background: '#1a1a2e',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '6px',
      paddingBottom: 'env(safe-area-inset-bottom, 6px)',
    }}>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '2px',
        marginBottom: '6px',
        paddingBottom: '6px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '6px 2px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === tab.key ? 'rgba(59,130,246,0.25)' : 'transparent',
              color: activeTab === tab.key ? '#60a5fa' : 'rgba(255,255,255,0.4)',
              fontSize: '12px',
              fontWeight: activeTab === tab.key ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={onClose}
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: 'none',
            background: 'rgba(239,68,68,0.15)',
            color: '#fca5a5',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      {/* Superscript indicator */}
      {superscriptMode && (
        <div style={{
          textAlign: 'center',
          padding: '4px',
          background: 'rgba(249,115,22,0.3)',
          borderRadius: '6px',
          marginBottom: '4px',
          fontSize: '12px',
          color: '#fbbf24',
          fontWeight: 'bold',
        }}>
          ⚡ Daraja rejimi: barcha belgilar darajaga yoziladi
        </div>
      )}

      {/* Keys */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {KEYS[activeTab].map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', gap: '3px' }}>
            {row.map((key, keyIdx) => {
              const isSpecial = ['⌫', '↵', '⇧', '123', 'abc', 'αβγ', '∞≠∈'].includes(key);
              const isWide = key === '⇧' || key === '123' || key === 'abc' || key === 'αβγ' || key === '∞≠∈';
              const isBackspace = key === '⌫';
              const isEnter = key === '↵';
              const isEmpty = key === '';
              const isShift = key === '⇧';
              const isSuperscriptBtn = key === 'xⁿ';

              if (isEmpty) {
                return <div key={`${rowIdx}-${keyIdx}`} style={{ flex: 1 }} />;
              }

              const displayKey = getDisplayKey(key);

              return (
                <button
                  key={`${rowIdx}-${keyIdx}`}
                  onClick={() => handleKey(key)}
                  style={{
                    flex: isWide ? 1.3 : 1,
                    padding: isSpecial ? '10px 4px' : '12px 2px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isBackspace
                      ? 'rgba(239,68,68,0.25)'
                      : isEnter
                      ? 'rgba(16,185,129,0.25)'
                      : isSuperscriptBtn && superscriptMode
                      ? 'rgba(249,115,22,0.5)'
                      : isSpecial
                      ? 'rgba(255,255,255,0.12)'
                      : 'rgba(255,255,255,0.08)',
                    color: isBackspace
                      ? '#fca5a5'
                      : isEnter
                      ? '#6ee7b7'
                      : isShift && shift
                      ? '#60a5fa'
                      : 'white',
                    fontSize: key.length > 2 ? '10px' : key.length > 1 ? '12px' : '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '42px',
                    transition: 'all 0.1s ease',
                    boxShadow: isShift && shift ? '0 0 0 2px #60a5fa' : (isSuperscriptBtn && superscriptMode ? '0 0 0 2px #f97316' : 'none'),
                  }}
                >
                  {displayKey}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
