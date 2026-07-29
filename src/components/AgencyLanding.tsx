import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import './agency-landing.css';

const services = [
	'Brand Identity',
	'App Development',
	'Visual Design',
	'Creative Video',
	'Iconography',
];

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

const navLinks = ['Projects', 'Plans', 'Team', 'FAQs', 'Get in Touch'];

function Brand() {
	return (
		<a className="brand" href="#top" aria-label="Alwayzz home">
			<span>Trizap</span>
			<sup>®</sup>
		</a>
	);
}

function Navbar() {
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
					<Brand />
					<button
						className={`menu-button ${isOpen ? 'is-open' : ''}`}
						type="button"
						aria-expanded={isOpen}
						aria-controls="navigation-drawer"
						aria-label={isOpen ? 'Close menu' : 'Open menu'}
						onClick={() => setIsOpen((value) => !value)}
					>
						<span>Menu</span>
						<ChevronUp aria-hidden="true" size={16} strokeWidth={2} />
					</button>
				</nav>
			</header>

			<div
				id="navigation-drawer"
				className={`menu-drawer ${isOpen ? 'is-open' : ''}`}
				aria-hidden={!isOpen}
			>
				<nav className="drawer-navigation" aria-label="Menu">
					{navLinks.map((link) => (
						<a href={link === 'Get in Touch' ? 'mailto:hello@alwayzz.studio' : '#top'} onClick={() => setIsOpen(false)} key={link}>
							{link}
						</a>
					))}
				</nav>
				<footer className="drawer-footer">
					<span>Independent creative studio</span>
					<span>© {new Date().getFullYear()} Alwayzz</span>
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
					<span
						key={index}
						style={{
							width: `${60 + index * 10}px`,
							animationDelay: `${index * 0.25}s`,
						}}
					/>
				))}
			</div>
			<div className="side-lines side-lines-right">
				{Array.from({ length: 20 }, (_, index) => (
					<span
						key={index}
						style={{
							width: `${60 + index * 10}px`,
							animationDelay: `${index * 0.25}s`,
						}}
					/>
				))}
			</div>
			<div className="top-lines">
				{Array.from({ length: 20 }, (_, index) => (
					<span
						key={index}
						style={{
							height: `${48 + index * 9}px`,
							animationDelay: `${index * 0.25}s`,
						}}
					/>
				))}
			</div>
		</div>
	);
}

function ServiceTicker() {
	return (
		<div className="service-ticker" aria-label={`Our services: ${services.join(', ')}`}>
			<div className="ticker-track" aria-hidden="true">
				{Array.from({ length: 4 }, (_, groupIndex) => (
					<div className="ticker-group" key={groupIndex}>
						{services.map((service) => (
							<span className="service-pill" key={service}>
								{service}
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

function TrustedBy() {
	return (
		<section className="trusted-section" aria-label="Trusted partners">
			<div className="trusted-inner">
				<p className="trusted-label">Partnered with top-tier companies globally</p>
				<div className="partner-marquee">
					<div className="partner-track">
						{Array.from({ length: 4 }, (_, groupIndex) => (
							<div className="partner-group" aria-hidden={groupIndex > 0} key={groupIndex}>
								{companies.map((company) => (
									<span className={`partner-logo ${company.className}`} key={company.name}>
										{company.name}
									</span>
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
	return (
		<div className="landing-page" id="top">
			<Navbar />
			<main>
				<section className="hero">
					<CurvedLines />
					<div className="hero-content">
						<p className="hero-eyebrow">Construyendo Futuro</p>
						<ServiceTicker />
						<h1 className="hero-title">
							Somos una comunidad <span className="hero-serif">desarrollando</span> software
						</h1>
						<p className="hero-subtitle">
							A flexible design partnership for founders, brands, and agencies who want top craft delivered on their timeline.
						</p>
						<div className="cta-row">
							<a className="primary-cta" href="#plans">
								Contáctanos
							</a>
							<a className="book-cta" href="mailto:hello@alwayzz.studio?subject=15-minute%20intro%20chat">
								<img
									src="https://framerusercontent.com/images/hfneFL6CHBi5BnNvCeOaqU9HqE4.png"
									alt=""
									width="40"
									height="40"
								/>
								<span className="book-copy">
									<span className="book-title">Agenda una llamada</span>
									<span className="book-detail">
										<span className="availability-dot" />
										<span className="availability-text">Disponible</span>
									</span>
								</span>
							</a>
						</div>
					</div>
					<div className="hero-blur" aria-hidden="true" />
					<div id="plans" className="anchor-target" aria-hidden="true" />
				</section>
				<TrustedBy />
			</main>
		</div>
	);
}
