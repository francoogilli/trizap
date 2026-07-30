import { useEffect, useId, useRef, useState } from 'react';
import ChevronDown from 'reicon-react/icons/ChevronDown';
import Globe from 'reicon-react/icons/Globe';

export type Language = 'es' | 'en';

export type LanguageLabels = {
	languageLabel: string;
	optionNames: Record<Language, string>;
};

type Props = {
	language?: Language;
	defaultLanguage?: Language;
	onSelectLanguage?: (language: Language) => void;
	labels?: Record<Language, LanguageLabels>;
};

const defaultLabels: Record<Language, LanguageLabels> = {
	es: {
		languageLabel: 'Seleccionar idioma',
		optionNames: { es: 'Español', en: 'Ingles' },
	},
	en: {
		languageLabel: 'Select language',
		optionNames: { es: 'Spanish', en: 'English' },
	},
};

const languageOptions: Language[] = ['es', 'en'];

export default function LanguageSelector({
	language,
	defaultLanguage = 'es',
	onSelectLanguage,
	labels = defaultLabels,
}: Props) {
	const [internalLanguage, setInternalLanguage] = useState<Language>(defaultLanguage);
	const [isOpen, setIsOpen] = useState(false);
	const selectorRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuId = `language-menu-${useId().replace(/:/g, '')}`;
	const currentLanguage = language ?? internalLanguage;
	const currentLabels = labels[currentLanguage] ?? defaultLabels[currentLanguage];

	useEffect(() => {
		document.documentElement.lang = currentLanguage;
	}, [currentLanguage]);

	useEffect(() => {
		if (!isOpen) return;

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
				triggerRef.current?.focus();
			}
		};
		const closeOnOutsideClick = (event: PointerEvent) => {
			if (event.target instanceof Node && !selectorRef.current?.contains(event.target)) setIsOpen(false);
		};

		window.addEventListener('keydown', closeOnEscape);
		window.addEventListener('pointerdown', closeOnOutsideClick);
		return () => {
			window.removeEventListener('keydown', closeOnEscape);
			window.removeEventListener('pointerdown', closeOnOutsideClick);
		};
	}, [isOpen]);

	const selectLanguage = (nextLanguage: Language) => {
		setInternalLanguage(nextLanguage);
		onSelectLanguage?.(nextLanguage);
		setIsOpen(false);
		triggerRef.current?.focus();
	};

	return (
		<div className="relative mr-2.5 shrink-0" ref={selectorRef}>
			<button
				ref={triggerRef}
				className="inline-flex min-w-12 items-center justify-center gap-1.5 rounded-full border border-black/8 bg-white/[0.72] px-2.5 py-[9px] text-[11px] font-semibold leading-none tracking-[-0.02em] text-[#0a0a0a] transition-all duration-[180ms] hover:-translate-y-px hover:border-black/[0.18] hover:bg-white aria-[expanded=true]:border-black/[0.18] aria-[expanded=true]:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a]"
				type="button"
				aria-haspopup="menu"
				aria-expanded={isOpen}
				aria-controls={menuId}
				aria-label={currentLabels.languageLabel}
				title={currentLabels.languageLabel}
				onClick={() => setIsOpen((value) => !value)}
			>
				<Globe aria-hidden="true" size={15} weight="Outline" color="currentColor" />
				<span>{currentLanguage.toUpperCase()}</span>
				<ChevronDown
					className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					aria-hidden="true"
					size={13}
					weight="Outline"
					color="currentColor"
				/>
			</button>

			{isOpen && (
				<div
					id={menuId}
					className="absolute right-0 top-[calc(100%+10px)] z-20 grid min-w-[152px] rounded-[14px] border border-black/10 bg-white/[0.96] p-1.5 text-[#0a0a0a] shadow-[0_14px_34px_rgba(10,10,10,0.12)] backdrop-blur-md"
					role="menu"
					aria-label={currentLabels.languageLabel}
				>
					{languageOptions.map((option) => (
						<button
							className={`grid w-full grid-cols-[28px_1fr_auto] items-center gap-[9px] rounded-[9px] px-[9px] py-2.5 text-left text-xs font-medium leading-none transition-colors duration-[160ms] hover:bg-black/[0.06] focus-visible:bg-black/[0.06] focus-visible:outline-none ${option === currentLanguage ? 'bg-black/[0.06]' : ''}`}
							type="button"
							role="menuitemradio"
							aria-checked={option === currentLanguage}
							onClick={() => selectLanguage(option)}
							key={option}
						>
							<span className="w-7 text-[10px] font-bold tracking-[0.04em] text-[#6b6b6b]">{option.toUpperCase()}</span>
							<span>{currentLabels.optionNames[option]}</span>
							{option === currentLanguage && <span aria-hidden="true" className="text-sm font-bold text-[#17c964]">✓</span>}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
