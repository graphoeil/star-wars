// IIFE
(function(){

	// Variable
	const paralaxes = document.querySelectorAll('.paralaxe');

	// Top initiaux
	const topSectionParalaxe = [];
	window.addEventListener('DOMContentLoaded', () => {
		// Reset scroll
		setTimeout(() => {
			window.scrollTo(0,0);
		},20);
		// Top section & vents listener
		setTimeout(() => {
			paralaxes.forEach((paralaxe) => {
				topSectionParalaxe.push(paralaxe.parentElement.getBoundingClientRect().top);
			});
			window.addEventListener('scroll', checkParalaxe);
			window.dispatchEvent(new Event('scroll'));
		},50);
	});

	// Check paralaxe
	function checkParalaxe(){
		let scrollY = window.scrollY;
		paralaxes.forEach((paralaxe, index) => {
			// Contenu ?
			if (paralaxe.classList.contains('contenu')){
				const topParent = topSectionParalaxe[index];
				const sectionParent = paralaxe.parentElement;
				const hauteurParent = sectionParent.getBoundingClientRect().height;
				if ((topParent - scrollY <= 200) && scrollY <= (topParent + hauteurParent - 100)){
					const distance = (topParent + hauteurParent) - scrollY;
					if ((distance/10 < 130) && (distance/10 > 60)){
						paralaxe.style.transform = `translateY(${ (130 - (distance/10)) }%)`;
					}
				}
				if (scrollY <= 20){ paralaxe.removeAttribute('style'); }
			} else {
				const inertie = paralaxe.dataset.inertie;
				const mouvement = -(scrollY / inertie);
				paralaxe.style.transform = `translate(-50%,${ -50 - mouvement }%)`;
			}
		});
	};

})();