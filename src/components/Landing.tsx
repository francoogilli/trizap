import { useEffect, useState } from 'react';
import ChartBarTrendUp from 'reicon-react/icons/ChartBarTrendUp';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LANGUAGE_CHANGE_EVENT, type Language } from './Navbar';
import './agency-landing.css';

gsap.registerPlugin(ScrollTrigger);

const translations = {
	es: {
		services: ['Servicios de software', 'Equipo Scrum', 'Aumento del personal', 'Desarrollo de productos', 'Ingeniería de software', 'Diseño UX/UI', 'Consultoría tecnológica', 'Talento especializado'],
		servicesAriaLabel: 'Nuestros servicios',
		eyebrow: 'Construyendo Futuro',
		subtitle: 'Diseñamos y desarrollamos software a medida para convertir ideas ambiciosas en productos digitales que funcionan.',
		primaryCta: 'Contanos tu proyecto',
		bookTitle: 'Hablemos de tu proyecto',
		bookDetail: 'Disponible',
	},
	en: {
		services: ['Software services', 'Scrum team', 'Staff augmentation', 'Product development', 'Software engineering', 'UX/UI design', 'Technology consulting', 'Specialized talent'],
		servicesAriaLabel: 'Our services',
		eyebrow: 'Building the Future',
		subtitle: 'We design and build custom software to turn ambitious ideas into digital products that work.',
		primaryCta: 'Tell us about your project',
		bookTitle: 'Let’s talk about your project',
		bookDetail: 'Available',
	},
};

type Translation = (typeof translations)[Language];

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
		<div className="service-ticker" aria-label={`${text.servicesAriaLabel}: ${text.services.join(', ')}`}>
			<div className="ticker-track" aria-hidden="true">
				{Array.from({ length: 2 }, (_, groupIndex) => (
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

export default function Landing() {
	const [language, setLanguage] = useState<Language>('es');
	const text = translations[language];

	useEffect(() => {
		const context = gsap.context(() => {
			const media = gsap.matchMedia();

			media.add('(prefers-reduced-motion: no-preference)', () => {
				const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
				heroTimeline
					.from('.hero-eyebrow', { autoAlpha: 0, y: 18, duration: 0.65 })
					.from('.service-ticker', { autoAlpha: 0, y: 14, duration: 0.5 }, '-=0.35')
					.from('.hero-title', { autoAlpha: 0, y: 30, duration: 0.85 }, '-=0.25')
					.from('.hero-subtitle', { autoAlpha: 0, y: 18, duration: 0.55 }, '-=0.45')
					.from('.cta-row', { autoAlpha: 0, y: 16, duration: 0.55 }, '-=0.3');

				['#about', '#servicio', '#partners', '#clientes', '#contact'].forEach((selector) => {
					const section = document.querySelector(selector);
					const content = section?.firstElementChild?.children;
					if (!section || !content?.length) return;

					gsap.from(content, {
						autoAlpha: 0,
						y: 28,
						duration: 0.8,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: section,
							start: 'top 82%',
							once: true,
						},
					});
				});
			});

			return () => media.revert();
		});

		return () => context.revert();
	}, []);

	useEffect(() => {
		const currentLanguage = document.documentElement.lang === 'en' ? 'en' : 'es';
		setLanguage(currentLanguage);

		const syncLanguage = (event: Event) => {
			const nextLanguage = (event as CustomEvent<Language>).detail;
			if (nextLanguage === 'es' || nextLanguage === 'en') setLanguage(nextLanguage);
		};

		window.addEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
		return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, syncLanguage);
	}, []);

	return (
		<div className="landing-page" id="top">
			<main>
				<section className="hero">
					<CurvedLines />
					<div className="hero-content">
						<p className="hero-eyebrow">
							<ChartBarTrendUp aria-hidden="true" size={14} weight="Filled" color="currentColor" />
							<span>{text.eyebrow}</span>
						</p>
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
							<a className="primary-cta" href="#contact">{text.primaryCta}</a>
							<a className="book-cta" href={`mailto:hello@alwayzz.studio?subject=${encodeURIComponent(language === 'es' ? 'Hablemos de tu proyecto' : 'Let’s talk about your project')}`}>
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
			</main>
		</div>
	);
}
