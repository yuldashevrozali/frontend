import { useState } from 'react';

type TabType = '123' | 'symbols' | 'abc' | 'αβγ';
type FractionMode = 'normal' | 'superscript' | null;
type FractionPart = 'numerator' | 'denominator';

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

// Keys layout - a/b va ˣ/ᵧ qo'shildi
const KEYS: Record<TabType, string[][]> = {
  '123': [
    ['x', 'n', '7', '8', '9', '÷', 'e', 'i', 'π'],
    ['<', '>', '4', '5', '6', '×', 'x²', 'xⁿ', '√'],
    ['(', ')', '1', '2', '3', '−', '∞', '□', '∀', '⌫'],
    ['⇧', 'a/b', 'ˣ/ᵧ', '0', '.', '=', '−', '←', '→', '↵'],
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
  
  // Fraction states
  const [fractionMode, setFractionMode] = useState<FractionMode>(null);
  const [fractionPart, setFractionPart] = useState<FractionPart>('numerator');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');

  // Convert string to superscript
  const toSuperscript = (str: string): string => {
    return str.split('').map(char => SUPERSCRIPT_MAP[char] || char).join('');
  };

  // Insert fraction into main input
  const insertFraction = () => {
    if (!numerator && !denominator) {
      setFractionMode(null);
      return;
    }
    
    if (fractionMode === 'superscript') {
      const supNum = toSuperscript(numerator);
      const supDen = toSuperscript(denominator);
      onInput(`^{${supNum}/${supDen}}`);
    } else {
      // LaTeX format for better math rendering compatibility
      onInput(`\\frac{${numerator}}{${denominator}}`);
    }
    
    // Reset fraction state
    setFractionMode(null);
    setFractionPart('numerator');
    setNumerator('');
    setDenominator('');
  };

  // Start fraction input mode
  const startFraction = (mode: FractionMode) => {
    setFractionMode(mode);
    setFractionPart('numerator');
    setNumerator('');
    setDenominator('');
  };

  const handleKey = (key: string) => {
    // 🔹 Fraction mode handling
    if (fractionMode) {
      if (key === '⌫') {
        if (fractionPart === 'numerator') {
          setNumerator(prev => prev.slice(0, -1));
        } else {
          setDenominator(prev => prev.slice(0, -1));
        }
      } else if (key === '↵' || key === '✓') {
        insertFraction();
      } else if (key === '⇄') {
        setFractionPart(prev => prev === 'numerator' ? 'denominator' : 'numerator');
      } else if (key === 'a/b' || key === 'ˣ/ᵧ') {
        // Ignore fraction buttons while already in fraction mode
        return;
      } else {
        // Add character to current fraction part
        let char = key;
        
        // Handle shift for letters
        if (shift && key.length === 1 && /[a-zA-Z]/.test(key)) {
          char = key.toUpperCase();
          setShift(false);
        }
        
        // Handle superscript conversion in superscript fraction mode
        if (fractionMode === 'superscript' && SUPERSCRIPT_MAP[char]) {
          char = SUPERSCRIPT_MAP[char]!;
        }
        
        if (fractionPart === 'numerator') {
          setNumerator(prev => prev + char);
        } else {
          setDenominator(prev => prev + char);
        }
      }
      return;
    }

    // 🔹 Normal key handling (original logic)
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
      setSuperscriptMode(!superscriptMode);
    } else if (key === 'a/b') {
      startFraction('normal');
    } else if (key === 'ˣ/ᵧ') {
      startFraction('superscript');
    } else if (superscriptMode) {
      if (SUPERSCRIPT_MAP[key]) {
        onInput(SUPERSCRIPT_MAP[key]);
      } else {
        onInput(key);
      }
    } else {
      const outputKey = shift && key.length === 1 && /[a-zA-Z]/.test(key)
        ? key.toUpperCase()
        : key;
      onInput(outputKey);
      if (shift && key.length === 1 && /[a-zA-Z]/.test(key)) {
        setShift(false);
      }
    }
  };

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
      {superscriptMode && !fractionMode && (
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

      {/* 🔷 Fraction Input UI */}
      {fractionMode && (
        <div style={{
          background: 'rgba(59,130,246,0.15)',
          borderRadius: '8px',
          padding: '8px',
          marginBottom: '6px',
          border: '1px solid rgba(59,130,246,0.3)',
        }}>
          {/* Numerator / Denominator Editor */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#60a5fa',
          }}>
            {/* Numerator */}
            <button
              onClick={() => setFractionPart('numerator')}
              style={{
                flex: 1,
                padding: '8px 4px',
                borderRadius: '6px',
                border: 'none',
                background: fractionPart === 'numerator' 
                  ? 'rgba(59,130,246,0.4)' 
                  : 'rgba(255,255,255,0.1)',
                color: fractionPart === 'numerator' ? '#fff' : '#94a3b8',
                fontSize: '14px',
                cursor: 'pointer',
                minHeight: '36px',
                transition: 'background 0.1s',
              }}
            >
              {numerator || <span style={{color: '#64748b'}}>Surat</span>}
            </button>
            
            {/* Fraction Bar */}
            <span style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              padding: '0 4px',
              minWidth: '30px'
            }}>
              <div style={{ width: '100%', height: '2px', background: '#60a5fa', margin: '2px 0' }}/>
              {fractionMode === 'superscript' && (
                <span style={{ fontSize: '9px', color: '#fbbf24' }}>x</span>
              )}
            </span>
            
            {/* Denominator */}
            <button
              onClick={() => setFractionPart('denominator')}
              style={{
                flex: 1,
                padding: '8px 4px',
                borderRadius: '6px',
                border: 'none',
                background: fractionPart === 'denominator' 
                  ? 'rgba(59,130,246,0.4)' 
                  : 'rgba(255,255,255,0.1)',
                color: fractionPart === 'denominator' ? '#fff' : '#94a3b8',
                fontSize: '14px',
                cursor: 'pointer',
                minHeight: '36px',
                transition: 'background 0.1s',
              }}
            >
              {denominator || <span style={{color: '#64748b'}}>Maxraj</span>}
            </button>
          </div>
          
          {/* Fraction Controls */}
          <div style={{
            display: 'flex',
            gap: '4px',
            marginTop: '6px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setFractionPart(prev => prev === 'numerator' ? 'denominator' : 'numerator')}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#94a3b8',
                fontSize: '10px',
                cursor: 'pointer',
              }}
            >
              ⇄ Almashtirish
            </button>
            <button
              onClick={insertFraction}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                background: 'rgba(16,185,129,0.3)',
                color: '#6ee7b7',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ✓ Tayyor
            </button>
            <button
              onClick={() => {
                setFractionMode(null);
                setNumerator('');
                setDenominator('');
              }}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                background: 'rgba(239,68,68,0.2)',
                color: '#fca5a5',
                fontSize: '10px',
                cursor: 'pointer',
              }}
            >
              ✕ Bekor qilish
            </button>
          </div>
          
          {/* Info Text */}
          <div style={{
            textAlign: 'center',
            marginTop: '4px',
            fontSize: '9px',
            color: '#94a3b8',
          }}>
            {fractionMode === 'superscript' 
              ? '📐 Darajali kasr: ^{a/b}' 
              : '📊 Oddiy kasr: \\frac{a}{b}'}
          </div>
        </div>
      )}

      {/* Keys Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {KEYS[activeTab].map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', gap: '3px' }}>
            {row.map((key, keyIdx) => {
              const isSpecial = ['⌫', '↵', '⇧', '123', 'abc', 'αβγ', '∞≠∈', 'a/b', 'ˣ/ᵧ'].includes(key);
              const isWide = key === '⇧' || key === '123' || key === 'abc' || key === 'αβγ' || key === '∞≠∈';
              const isBackspace = key === '⌫';
              const isEnter = key === '↵';
              const isEmpty = key === '';
              const isShift = key === '⇧';
              const isSuperscriptBtn = key === 'xⁿ';
              const isFractionBtn = key === 'a/b' || key === 'ˣ/ᵧ';

              if (isEmpty) {
                return <div key={`${rowIdx}-${keyIdx}`} style={{ flex: 1 }} />;
              }

              const displayKey = getDisplayKey(key);

              return (
                <button
                  key={`${rowIdx}-${keyIdx}`}
                  onClick={() => handleKey(key)}
                  disabled={!!fractionMode && isFractionBtn}
                  style={{
                    flex: isWide ? 1.3 : 1,
                    padding: isSpecial ? '10px 4px' : '12px 2px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isBackspace
                      ? 'rgba(239,68,68,0.25)'
                      : isEnter
                      ? 'rgba(16,185,129,0.25)'
                      : isFractionBtn
                      ? 'rgba(59,130,246,0.3)'
                      : isSuperscriptBtn && superscriptMode
                      ? 'rgba(249,115,22,0.5)'
                      : isSpecial
                      ? 'rgba(255,255,255,0.12)'
                      : 'rgba(255,255,255,0.08)',
                    color: isBackspace
                      ? '#fca5a5'
                      : isEnter
                      ? '#6ee7b7'
                      : isFractionBtn
                      ? '#93c5fd'
                      : isShift && shift
                      ? '#60a5fa'
                      : 'white',
                    fontSize: key.length > 2 ? '10px' : key.length > 1 ? '12px' : '14px',
                    fontWeight: '600',
                    cursor: fractionMode && isFractionBtn ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '42px',
                    transition: 'all 0.1s ease',
                    boxShadow: isShift && shift 
                      ? '0 0 0 2px #60a5fa' 
                      : isSuperscriptBtn && superscriptMode 
                      ? '0 0 0 2px #f97316'
                      : isFractionBtn
                      ? '0 0 0 2px #3b82f6'
                      : 'none',
                    opacity: fractionMode && isFractionBtn ? 0.5 : 1,
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