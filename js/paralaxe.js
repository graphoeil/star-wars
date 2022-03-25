// IIFE
(function(){

	// Variable
	const paralaxes = document.querySelectorAll('.paralaxe');

	// Top initiaux
	const topSectionParalaxe = [];
	window.addEventListener('DOMContentLoaded', () => {
		paralaxes.forEach((paralaxe) => {
			topSectionParalaxe.push(paralaxe.parentElement.getBoundingClientRect().top);
		});
		// Event listener
		window.addEventListener('scroll', checkParalaxe);
		window.dispatchEvent(new Event('scroll'));
	});

	// Check paralaxe
	function checkParalaxe(){
		let scrollY = window.scrollY;
		paralaxes.forEach((paralaxe, index) => {
			// Contenu ?
			if (paralaxe.classList.contains('contenu')){
				const inertie = paralaxe.dataset.inertie;
				const mouvement = (scrollY / inertie);
				const topParent = topSectionParalaxe[index];
				const sectionParent = paralaxe.parentElement;
				const topParalaxe = paralaxe.getBoundingClientRect().top;
				const hauteurParalaxe = paralaxe.getBoundingClientRect().height;
				const hauteurParent = sectionParent.getBoundingClientRect().height;
				if (scrollY >= topParent/3 && topParalaxe >= 0 - (hauteurParent - hauteurParalaxe)/2){
					paralaxe.style.top = `${ mouvement }px`;
				}
				if (scrollY <= 25){ paralaxe.removeAttribute('style'); }
			} else {
				const inertie = paralaxe.dataset.inertie;
				const mouvement = -(scrollY / inertie);
				paralaxe.style.transform = `translate(-50%,${ -50 - mouvement }%)`;
			}
		});
	};

})();