import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const TABS = [
    { key: '123', label: '123' },
    { key: 'abc', label: 'abc' },
    { key: 'αβγ', label: 'αβγ' },
    { key: 'sin/cos', label: 'sin/cos' },
];
const KEYS = {
    '123': [
        ['x', 'n', '7', '8', '9', '÷', 'e', 'i', 'π'],
        ['<', '>', '4', '5', '6', '×', '²', '□', '√'],
        ['(', ')', '1', '2', '3', '−', '∞', '∀', '⌫'],
        ['⇧', '0', '.', '=', '+', '−', '←', '→', '↵'],
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
    'sin/cos': [
        ['sin', 'cos', 'tan', 'ln', 'log', 'exp', 'abs', '|□|', '||□||'],
        ['→', '←', '⇔', '∃', '∀', '|', '∈', '∋', '□ᶜ'],
        ['∪', '∩', '⊂', '→', '—', "□'", '∫', 'd', '⌫'],
        ['123', 'e', 'π', '∞', ',', ':', '.', '<', '↵'],
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
        else if (key === 'sin/cos') {
            setActiveTab('sin/cos');
        }
        else {
            onInput(shift ? key.toUpperCase() : key);
            if (shift)
                setShift(false);
        }
    };
    return (_jsxs("div", { style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2000,
            background: 'rgba(30, 30, 40, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '8px',
            paddingBottom: 'env(safe-area-inset-bottom, 8px)',
        }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '8px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }, children: [TABS.map(tab => (_jsx("button", { onClick: () => setActiveTab(tab.key), style: {
                            flex: 1,
                            padding: '8px 4px',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeTab === tab.key ? 'rgba(59,130,246,0.3)' : 'transparent',
                            color: activeTab === tab.key ? '#60a5fa' : 'rgba(255,255,255,0.5)',
                            fontSize: '13px',
                            fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                            cursor: 'pointer',
                        }, children: tab.label }, tab.key))), _jsx("button", { onClick: onClose, style: {
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'rgba(239,68,68,0.2)',
                            color: '#fca5a5',
                            fontSize: '13px',
                            cursor: 'pointer',
                        }, children: "\u2715" })] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' }, children: KEYS[activeTab].map((row, rowIdx) => (_jsx("div", { style: { display: 'flex', gap: '4px' }, children: row.map((key, keyIdx) => {
                        const isSpecial = ['⌫', '↵', '⇧', '123', 'abc', 'αβγ', 'sin/cos'].includes(key);
                        const isWide = key === '⇧' || key === '123' || key === 'abc' || key === 'αβγ' || key === 'sin/cos';
                        const isBackspace = key === '⌫';
                        const isEnter = key === '↵';
                        return (_jsx("button", { onClick: () => handleKey(key), style: {
                                flex: isWide ? 1.5 : 1,
                                padding: isSpecial ? '12px 8px' : '14px 4px',
                                borderRadius: '10px',
                                border: 'none',
                                background: isBackspace
                                    ? 'rgba(239,68,68,0.3)'
                                    : isEnter
                                        ? 'rgba(16,185,129,0.3)'
                                        : isSpecial
                                            ? 'rgba(255,255,255,0.15)'
                                            : 'rgba(255,255,255,0.1)',
                                color: isBackspace
                                    ? '#fca5a5'
                                    : isEnter
                                        ? '#6ee7b7'
                                        : 'white',
                                fontSize: key.length > 2 ? '11px' : '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '44px',
                                transition: 'all 0.1s ease',
                            }, children: key }, `${rowIdx}-${keyIdx}`));
                    }) }, rowIdx))) })] }));
}
//# sourceMappingURL=MathKeyboard.js.map