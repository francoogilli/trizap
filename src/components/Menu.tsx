import { useEffect, useState } from 'react';
import ChevronUp from 'reicon-react/icons/ChevronUp';

export interface MenuItem {
	href: string;
	label: string;
}

interface MenuProps {
	items: MenuItem[];
	menuLabel: string;
	openLabel: string;
	closeLabel: string;
	drawerDescription: string;
}

export default function Menu({ items, menuLabel, openLabel, closeLabel, drawerDescription }: MenuProps) {
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
			<button
				className={`menu-button ${isOpen ? 'is-open' : ''}`}
				type="button"
				aria-expanded={isOpen}
				aria-controls="navigation-drawer"
				aria-label={isOpen ? closeLabel : openLabel}
				onClick={() => setIsOpen((value) => !value)}
			>
				<span>{menuLabel}</span>
				<ChevronUp aria-hidden="true" size={16} weight="Outline" color="currentColor" />
			</button>

			<div id="navigation-drawer" className={`menu-drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
				<nav className="drawer-navigation" aria-label={menuLabel}>
					{items.map((item) => (
						<a href={item.href} onClick={() => setIsOpen(false)} key={item.label}>
							{item.label}
						</a>
					))}
				</nav>
				<footer className="drawer-footer">
					<span>{drawerDescription}</span>
					<span>© {new Date().getFullYear()} Trizap</span>
				</footer>
			</div>
		</>
	);
}
