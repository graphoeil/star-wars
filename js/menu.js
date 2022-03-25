// IIFE
(function(){

	// Variables
	const innerHeader = document.querySelector('.innerHeader');
	const btnMenuMobile = document.querySelector('.btnMenuMobile');
	const barresMenuMobile = btnMenuMobile.querySelector('.barresMenuMobile');
	const nav = document.querySelector('nav');
	const liens = nav.querySelectorAll('a');
	const overlay = document.querySelector('.overlay');
	let menuOuvert = false;

	// Click bouton menu mobile
	btnMenuMobile.addEventListener('click', () => {
		if (menuOuvert){
			menuOuvert = false;
			barresMenuMobile.classList.remove('ouvert');
			overlay.classList.remove('visible');
			nav.classList.remove('visible');
		} else {
			menuOuvert = true;
			barresMenuMobile.classList.add('ouvert');
			overlay.classList.add('visible');
			nav.classList.add('visible');
		}
	});

	// Resize > 1024px
	const checkWidowWidth = () => {
		if (window.innerWidth >= 1024){
			menuOuvert = false;
			barresMenuMobile.classList.remove('ouvert');
			overlay.classList.remove('visible');
			nav.classList.remove('visible');
		}
	};
	window.addEventListener('resize', checkWidowWidth);
	window.dispatchEvent(new Event('resize'));

	// Scroll
	window.addEventListener('scroll', () => {
		let scrollY = window.scrollY;
		// Btn menu mobile
		if (scrollY >= 375){
			barresMenuMobile.classList.add('scroll');
		} else {
			barresMenuMobile.classList.remove('scroll');
		}
		// Menu ombre
		if (scrollY > 1){
			innerHeader.classList.add('ombre');
		} else {
			innerHeader.classList.remove('ombre');
		}
	});
	window.dispatchEvent(new Event('scroll'));

	// DEV uniquement, pour éviter le rafraîchissement ,-)
	liens.forEach((lien) => {
		lien.addEventListener('click', (e) => {
			e.preventDefault();
		});
	});

})();