import { useEffect, useRef, useState } from 'react';
import Check from 'reicon-react/icons/Check';
import ChevronDown from 'reicon-react/icons/ChevronDown';
import Globe from 'reicon-react/icons/Globe';
import './agency-landing.css';

export type Language = 'es' | 'en';

export const LANGUAGE_CHANGE_EVENT = 'trizap:language-change';
export const LANGUAGE_STORAGE_KEY = 'trizap-language';

const navItems = [
	{ href: '/#top', section: 'top' },
	{ href: '/#servicio', section: 'servicio' },
	{ href: '/#about', section: 'about' },
	{ href: '/#products', section: 'products' },
	{ href: '/#contact', section: 'contact' },
] as const;

type NavSection = (typeof navItems)[number]['section'];

const translations = {
	es: {
		nav: ['Inicio', 'Servicio', 'Nosotros', 'Productos', 'Contacto'],
		brandLabel: 'Inicio de Trizap',
		languageLabel: 'Seleccionar idioma',
		languageNames: { es: 'Español', en: 'Inglés' },
	},
	en: {
		nav: ['Home', 'Services', 'About', 'Products', 'Contact'],
		brandLabel: 'Trizap home',
		languageLabel: 'Select language',
		languageNames: { es: 'Spanish', en: 'English' },
	},
};

type Translation = (typeof translations)[Language];

function Brand({ label }: { label: string }) {
	return (
		<a className="brand" href="/" aria-label={label}>
			<img src="/headerDark2.png" alt="" width={324} height={90} />
		</a>
	);
}

function LanguageSelector({ language, onSelectLanguage, text }: { language: Language; onSelectLanguage: (nextLanguage: Language) => void; text: Translation }) {
	const [isOpen, setIsOpen] = useState(false);
	const selectorRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const languageOptions: Language[] = ['es', 'en'];

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
		onSelectLanguage(nextLanguage);
		setIsOpen(false);
		triggerRef.current?.focus();
	};

	return (
		<div className="language-selector" ref={selectorRef}>
			<button
				ref={triggerRef}
				className="language-toggle"
				type="button"
				aria-haspopup="menu"
				aria-expanded={isOpen}
				aria-controls="language-menu"
				aria-label={text.languageLabel}
				title={text.languageLabel}
				onClick={() => setIsOpen((value) => !value)}
			>
				<Globe aria-hidden="true" size={15} weight="Outline" color="currentColor" />
				<span>{language.toUpperCase()}</span>
				<ChevronDown className={`language-caret ${isOpen ? 'is-open' : ''}`} aria-hidden="true" size={13} weight="Outline" color="currentColor" />
			</button>
			{isOpen && (
				<div id="language-menu" className="language-menu" role="menu" aria-label={text.languageLabel}>
					{languageOptions.map((option) => (
						<button
							className={`language-option ${option === language ? 'is-selected' : ''}`}
							type="button"
							role="menuitemradio"
							aria-checked={option === language}
							onClick={() => selectLanguage(option)}
							key={option}
						>
							<span className="language-option-code">{option.toUpperCase()}</span>
							<span>{text.languageNames[option]}</span>
							{option === language && <Check className="language-option-check" aria-hidden="true" size={14} weight="Filled" color="var(--green)" />}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

type Props = {
	defaultLanguage?: Language;
};

export default function Navbar({ defaultLanguage = 'es' }: Props) {
	const [language, setLanguage] = useState<Language>(defaultLanguage);
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState<NavSection>('top');
	const text = translations[language];

	const readStoredLanguage = () => {
		try {
			const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
			return storedLanguage === 'es' || storedLanguage === 'en' ? storedLanguage : null;
		} catch {
			return null;
		}
	};

	useEffect(() => {
		const storedLanguage = readStoredLanguage();
		if (storedLanguage) {
			setLanguage(storedLanguage);
			document.documentElement.lang = storedLanguage;
			window.dispatchEvent(new CustomEvent<Language>(LANGUAGE_CHANGE_EVENT, { detail: storedLanguage }));
		}

		const updateScrollState = () => setIsScrolled(window.scrollY > 16);

		updateScrollState();
		window.addEventListener('scroll', updateScrollState, { passive: true });
		return () => window.removeEventListener('scroll', updateScrollState);
	}, []);

	useEffect(() => {
		const updateActiveSection = () => {
			const activationLine = 120;
			const visibleSections = navItems
				.map(({ section }) => ({ section, top: document.getElementById(section)?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY }))
				.filter(({ top }) => top <= activationLine)
				.sort((first, second) => second.top - first.top);

			setActiveSection(visibleSections[0]?.section ?? 'top');
		};
		let frame: number | null = null;
		const handleScroll = () => {
			if (frame !== null) cancelAnimationFrame(frame);
			frame = requestAnimationFrame(updateActiveSection);
		};

		updateActiveSection();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);
		return () => {
			if (frame !== null) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, []);

	useEffect(() => {
		const syncLanguage = (event: Event) => {
			const nextLanguage = (event as CustomEvent<Language>).detail;
			if (nextLanguage === 'es' || nextLanguage === 'en') setLanguage(nextLanguage);
		};

		window.addEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
		return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
	}, []);

	const selectLanguage = (nextLanguage: Language) => {
		setLanguage(nextLanguage);
		document.documentElement.lang = nextLanguage;
		try {
			window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
		} catch {
			// The language still works for the current page if storage is unavailable.
		}
		window.dispatchEvent(new CustomEvent<Language>(LANGUAGE_CHANGE_EVENT, { detail: nextLanguage }));
	};

	return (
		<header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
			<nav className="navbar" aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}>
				<Brand label={text.brandLabel} />
				<div className="header-links">
					{navItems.map((link, index) => (
						<a className="header-link" href={link.href} aria-current={activeSection === link.section ? 'page' : undefined} onClick={() => setActiveSection(link.section)} key={text.nav[index]}>
							{text.nav[index]}
						</a>
					))}
				</div>
				<LanguageSelector language={language} onSelectLanguage={selectLanguage} text={text} />
			</nav>
		</header>
	);
}
