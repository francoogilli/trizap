import { useEffect, useRef, useState } from 'react';
import ChevronDown from 'reicon-react/icons/ChevronDown';
import Globe from 'reicon-react/icons/Globe';
import './agency-landing.css';

const companies = [
	{ name: 'Airbnb', className: 'partner-airbnb' },
	{ name: 'Shopify', className: 'partner-shopify' },
	{ name: 'Notion', className: 'partner-notion' },
	{ name: 'Linear', className: 'partner-linear' },
	{ name: 'Webflow', className: 'partner-webflow' },
	{ name: 'Figma', className: 'partner-figma' },
	{ name: 'Slack', className: 'partner-slack' },
	{ name: 'Stripe', className: 'partner-stripe' },
	{ name: 'Vercel', className: 'partner-vercel' },
	{ name: 'Framer', className: 'partner-framer' },
];

const navItems = [
	{ href: '#top' },
	{ href: '#servicio' },
	{ href: '#nosotros' },
	{ href: '#productos' },
	{ href: 'mailto:hello@alwayzz.studio' },
];

const translations = {
	es: {
		nav: ['Inicio', 'Servicio', 'Nosotros', 'Productos', 'Contacto'],
		services: ['Identidad de marca', 'Desarrollo de apps', 'Diseño visual', 'Video creativo', 'Iconografía'],
		servicesAriaLabel: 'Nuestros servicios',
		eyebrow: 'Construyendo Futuro',
		subtitle: 'Una comunidad creativa para fundadores, marcas y agencias que quieren software de calidad entregado a su ritmo.',
		primaryCta: 'Contáctanos',
		bookTitle: 'Agenda una llamada',
		bookDetail: 'Disponible',
		partnerLabel: 'Aliados de compañías líderes a nivel global',
		drawerDescription: 'Estudio creativo independiente',
		menu: 'Menú',
		openMenu: 'Abrir menú',
		closeMenu: 'Cerrar menú',
		brandLabel: 'Inicio de Trizap',
		languageLabel: 'Seleccionar idioma',
		languageCode: 'EN',
		languageNames: { es: 'Español', en: 'English' },
	},
	en: {
		nav: ['Home', 'Services', 'About', 'Products', 'Contact'],
		services: ['Brand Identity', 'App Development', 'Visual Design', 'Creative Video', 'Iconography'],
		servicesAriaLabel: 'Our services',
		eyebrow: 'Building the Future',
		subtitle: 'A creative community for founders, brands, and agencies who want quality software delivered on their timeline.',
		primaryCta: 'Contact us',
		bookTitle: 'Book a call',
		bookDetail: 'Available',
		partnerLabel: 'Partnered with top-tier companies globally',
		drawerDescription: 'Independent creative studio',
		menu: 'Menu',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		brandLabel: 'Trizap home',
		languageLabel: 'Select language',
		languageCode: 'ES',
		languageNames: { es: 'Spanish', en: 'English' },
	},
};

type Language = keyof typeof translations;
type Translation = (typeof translations)[Language];

function Brand({ label }: { label: string }) {
	return (
		<a className="brand" href="#top" aria-label={label}>
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
							{option === language && <span className="language-option-check" aria-hidden="true">✓</span>}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

function Navbar({ language, onSelectLanguage, text }: { language: Language; onSelectLanguage: (nextLanguage: Language) => void; text: Translation }) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const updateScrollState = () => setIsScrolled(window.scrollY > 16);

		updateScrollState();
		window.addEventListener('scroll', updateScrollState, { passive: true });
		return () => window.removeEventListener('scroll', updateScrollState);
	}, []);

	return (
		<>
			<header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
				<nav className="navbar" aria-label="Main navigation">
					<Brand label={text.brandLabel} />
					<div className="header-links">
						{navItems.map((link, index) => (
							<a className="header-link" href={link.href} aria-current={index === 0 ? 'page' : undefined} key={text.nav[index]}>
								{text.nav[index]}
							</a>
						))}
					</div>
					<LanguageSelector language={language} onSelectLanguage={onSelectLanguage} text={text} />
				</nav>
			</header>
		</>
	);
}

function CurvedLines() {
	return (
		<div className="line-art" aria-hidden="true">
			<div className="side-lines side-lines-left">
				{Array.from({ length: 20 }, (_, index) => (
					<span key={index} style={{ width: `${60 + index * 10}px`, animationDelay: `${index * 0.25}s` }} />
				))}
			</div>
			<div className="side-lines side-lines-right">
				{Array.from({ length: 20 }, (_, index) => (
					<span key={index} style={{ width: `${60 + index * 10}px`, animationDelay: `${index * 0.25}s` }} />
				))}
			</div>
			<div className="top-lines">
				{Array.from({ length: 20 }, (_, index) => (
					<span key={index} style={{ height: `${48 + index * 9}px`, animationDelay: `${index * 0.25}s` }} />
				))}
			</div>
		</div>
	);
}

function ServiceTicker({ text }: { text: Translation }) {
	return (
		<div id="servicio" className="service-ticker" aria-label={`${text.servicesAriaLabel}: ${text.services.join(', ')}`}>
			<div className="ticker-track" aria-hidden="true">
				{Array.from({ length: 4 }, (_, groupIndex) => (
					<div className="ticker-group" key={groupIndex}>
						{text.services.map((service) => (
							<span className="service-pill" key={service}>{service}</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

function TrustedBy({ text }: { text: Translation }) {
	return (
		<section id="nosotros" className="trusted-section" aria-label={text.partnerLabel}>
			<div className="trusted-inner">
				<p className="trusted-label">{text.partnerLabel}</p>
				<div className="partner-marquee">
					<div className="partner-track">
						{Array.from({ length: 4 }, (_, groupIndex) => (
							<div className="partner-group" aria-hidden={groupIndex > 0} key={groupIndex}>
								{companies.map((company) => (
									<span className={`partner-logo ${company.className}`} key={company.name}>{company.name}</span>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default function AgencyLanding() {
	const [language, setLanguage] = useState<Language>('es');
	const text = translations[language];

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	return (
		<div className="landing-page" id="top">
			<Navbar language={language} onSelectLanguage={setLanguage} text={text} />
			<main>
				<section className="hero">
					<CurvedLines />
					<div className="hero-content">
						<p className="hero-eyebrow">{text.eyebrow}</p>
						<ServiceTicker text={text} />
						<h1 className="hero-title">
							{language === 'es' ? (
								<>Somos una comunidad <span className="hero-serif">desarrollando</span> software</>
							) : (
								<>We are a community <span className="hero-serif">developing</span> software</>
							)}
						</h1>
						<p className="hero-subtitle">{text.subtitle}</p>
						<div className="cta-row">
							<a className="primary-cta" href="#productos">{text.primaryCta}</a>
							<a className="book-cta" href="mailto:hello@alwayzz.studio?subject=15-minute%20intro%20chat">
								<img src="https://framerusercontent.com/images/hfneFL6CHBi5BnNvCeOaqU9HqE4.png" alt="" width="40" height="40" />
								<span className="book-copy">
									<span className="book-title">{text.bookTitle}</span>
									<span className="book-detail"><span className="availability-dot" /><span className="availability-text">{text.bookDetail}</span></span>
								</span>
							</a>
						</div>
					</div>
					<div className="hero-blur" aria-hidden="true" />
					<div id="productos" className="anchor-target" aria-hidden="true" />
				</section>
				<TrustedBy text={text} />
			</main>
		</div>
	);
}
