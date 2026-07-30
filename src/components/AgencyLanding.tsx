import { useEffect, useState } from 'react';
import ChevronUp from 'reicon-react/icons/ChevronUp';
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
		languageLabel: 'Cambiar a inglés',
		languageCode: 'EN',
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
		languageLabel: 'Cambiar a español',
		languageCode: 'ES',
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

function Navbar({ language, onToggleLanguage, text }: { language: Language; onToggleLanguage: () => void; text: Translation }) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsOpen(false);
		};

		window.addEventListener('keydown', closeOnEscape);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', closeOnEscape);
		};
	}, [isOpen]);

	return (
		<>
			<header className="site-header">
				<nav className="navbar" aria-label="Main navigation">
					<Brand label={text.brandLabel} />
					<div className="header-links">
						{navItems.map((link, index) => (
							<a className="header-link" href={link.href} aria-current={index === 0 ? 'page' : undefined} key={text.nav[index]}>
								{text.nav[index]}
							</a>
						))}
					</div>
					<button className="language-toggle" type="button" onClick={onToggleLanguage} aria-label={text.languageLabel} title={text.languageLabel}>
						<Globe aria-hidden="true" size={15} weight="Outline" color="currentColor" />
						<span>{text.languageCode}</span>
					</button>
					<button
						className={`menu-button ${isOpen ? 'is-open' : ''}`}
						type="button"
						aria-expanded={isOpen}
						aria-controls="navigation-drawer"
						aria-label={isOpen ? text.closeMenu : text.openMenu}
						onClick={() => setIsOpen((value) => !value)}
					>
						<span>{text.menu}</span>
						<ChevronUp aria-hidden="true" size={16} weight="Outline" color="currentColor" />
					</button>
				</nav>
			</header>

			<div id="navigation-drawer" className={`menu-drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
				<nav className="drawer-navigation" aria-label="Menu">
					{navItems.map((link, index) => (
						<a href={link.href} onClick={() => setIsOpen(false)} key={text.nav[index]}>
							{text.nav[index]}
						</a>
					))}
				</nav>
				<footer className="drawer-footer">
					<span>{text.drawerDescription}</span>
					<span>© {new Date().getFullYear()} Trizap</span>
				</footer>
			</div>
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
	const toggleLanguage = () => setLanguage((current) => (current === 'es' ? 'en' : 'es'));

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	return (
		<div className="landing-page" id="top">
			<Navbar language={language} onToggleLanguage={toggleLanguage} text={text} />
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
