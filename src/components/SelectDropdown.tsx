import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import type { SelectDropdownProps } from '../utils/interface';

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(true);
                setFocusedIndex(0);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex((prev) => (prev === null || prev === options.length - 1 ? 0 : prev + 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex((prev) => (prev === null || prev === 0 ? options.length - 1 : prev - 1));
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (focusedIndex !== null) handleSelect(options[focusedIndex].value);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby="select-dropdown-label"
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center"
            >
                <span id="select-dropdown-label">
                    {value ? options.find((opt) => opt.value === value)?.label : placeholder}
                </span>
                <LuChevronDown className={isOpen ? 'rotate-180 ml-2 transition-transform' : 'ml-2 transition-transform'} />
            </button>

            {isOpen && (
                <div
                    role="listbox"
                    aria-activedescendant={focusedIndex !== null ? `option-${options[focusedIndex].value}` : undefined}
                    tabIndex={-1}
                    onKeyDown={handleKeyDown}
                    className="absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10"
                >
                    {options.map((option, index) => (
                        <div
                            id={`option-${option.value}`}
                            role="option"
                            aria-selected={value === option.value}
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            onMouseEnter={() => setFocusedIndex(index)}
                            className={`px-3 py-2 text-sm cursor-pointer ${index === focusedIndex ? 'bg-gray-200' : 'hover:bg-gray-100'
                                }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectDropdown;
