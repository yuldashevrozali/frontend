import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const TABS = [
    { key: '123', label: '123' },
    { key: 'symbols', label: '∞≠∈' },
    { key: 'abc', label: 'abc' },
    { key: 'αβγ', label: 'αβγ' },
];
// Keys layout matching the image exactly
const KEYS = {
    '123': [
        ['x', 'n', '7', '8', '9', '÷', 'e', 'i', 'π'],
        ['<', '>', '4', '5', '6', '×', 'x²', 'x□', '√'],
        ['(', ')', '1', '2', '3', '−', '∞', '□', '∀', '⌫'],
        ['⇧', '0', '.', '=', '+', '−', '←', '→', '↵'],
    ],
    'symbols': [
        ['∞', '≠', '∈', '∉', '⊂', '⊃', '∪', '∩', '∅'],
        ['≤', '≥', '≈', '≡', '∝', '∇', '∂', '∆', '∏'],
        ['∑', '∫', '∮', '⊥', '∥', '∠', '∡', '⌫', '↵'],
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
export default function MathKeyboard({ onInput, onClose }) {
    const [activeTab, setActiveTab] = useState('123');
    const [shift, setShift] = useState(false);
    const handleKey = (key) => {
        if (key === '⌫') {
            onInput('backspace');
        }
        else if (key === '↵') {
            onInput('enter');
        }
        else if (key === '⇧') {
            setShift(!shift);
        }
        else if (key === '123') {
            setActiveTab('123');
        }
        else if (key === 'abc') {
            setActiveTab('abc');
        }
        else if (key === 'αβγ') {
            setActiveTab('αβγ');
        }
        else if (key === '∞≠∈') {
            setActiveTab('symbols');
        }
        else if (key === 'x²') {
            onInput('²');
        }
        else if (key === 'x□') {
            onInput('^');
        }
        else {
            onInput(shift ? key.toUpperCase() : key);
            if (shift && key.length === 1 && /[a-zA-Z]/.test(key))
                setShift(false);
        }
    };
    return (_jsxs("div", { style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2000,
            background: '#1a1a2e',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '6px',
            paddingBottom: 'env(safe-area-inset-bottom, 6px)',
        }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    gap: '2px',
                    marginBottom: '6px',
                    paddingBottom: '6px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }, children: [TABS.map(tab => (_jsx("button", { onClick: () => setActiveTab(tab.key), style: {
                            flex: 1,
                            padding: '6px 2px',
                            borderRadius: '6px',
                            border: 'none',
                            background: activeTab === tab.key ? 'rgba(59,130,246,0.25)' : 'transparent',
                            color: activeTab === tab.key ? '#60a5fa' : 'rgba(255,255,255,0.4)',
                            fontSize: '12px',
                            fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                            cursor: 'pointer',
                        }, children: tab.label }, tab.key))), _jsx("button", { onClick: onClose, style: {
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'rgba(239,68,68,0.15)',
                            color: '#fca5a5',
                            fontSize: '14px',
                            cursor: 'pointer',
                        }, children: "\u2715" })] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: KEYS[activeTab].map((row, rowIdx) => (_jsx("div", { style: { display: 'flex', gap: '3px' }, children: row.map((key, keyIdx) => {
                        const isSpecial = ['⌫', '↵', '⇧', '123', 'abc', 'αβγ', '∞≠∈'].includes(key);
                        const isWide = key === '⇧' || key === '123' || key === 'abc' || key === 'αβγ' || key === '∞≠∈';
                        const isBackspace = key === '⌫';
                        const isEnter = key === '↵';
                        const isEmpty = key === '';
                        if (isEmpty) {
                            return _jsx("div", { style: { flex: 1 } }, `${rowIdx}-${keyIdx}`);
                        }
                        return (_jsx("button", { onClick: () => handleKey(key), style: {
                                flex: isWide ? 1.3 : 1,
                                padding: isSpecial ? '10px 4px' : '12px 2px',
                                borderRadius: '8px',
                                border: 'none',
                                background: isBackspace
                                    ? 'rgba(239,68,68,0.25)'
                                    : isEnter
                                        ? 'rgba(16,185,129,0.25)'
                                        : isSpecial
                                            ? 'rgba(255,255,255,0.12)'
                                            : 'rgba(255,255,255,0.08)',
                                color: isBackspace
                                    ? '#fca5a5'
                                    : isEnter
                                        ? '#6ee7b7'
                                        : 'white',
                                fontSize: key.length > 2 ? '10px' : key.length > 1 ? '12px' : '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '42px',
                                transition: 'all 0.1s ease',
                            }, children: key }, `${rowIdx}-${keyIdx}`));
                    }) }, rowIdx))) })] }));
}
//# sourceMappingURL=MathKeyboard.js.map