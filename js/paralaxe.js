// IIFE
(function(){

	// Variable
	const paralaxes = document.querySelectorAll('.paralaxe');

	// Top initiaux
	const topSectionParalaxe = [];
	const topParalaxes = [];
	window.addEventListener('DOMContentLoaded', () => {
		// Reset scroll
		setTimeout(() => {
			window.scrollTo(0,0);
		},20);
		// Top section & vents listener
		setTimeout(() => {
			paralaxes.forEach((paralaxe) => {
				topSectionParalaxe.push(paralaxe.parentElement.getBoundingClientRect().top);
				topParalaxes.push(paralaxe.getBoundingClientRect().top)
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
				const sectionParent = paralaxe.parentElement;
				const hauteurParent = sectionParent.getBoundingClientRect().height;
				const topParent = topSectionParalaxe[index];
				const endParent = topParent + hauteurParent;
				const hauteurParalaxe = paralaxe.getBoundingClientRect().height;
				const topParalaxe = topParalaxes[index];
				const initTop = topParalaxe - topParent;
				// Nous sommes dans la zone de la section
				if (scrollY >= topParent && scrollY <= endParent){
					const distanceParcouru = scrollY - topParent;
					const pourcentageDeSectionParcouru = (distanceParcouru * 100)/(hauteurParent);
					const proportionParalaxeParent = (hauteurParalaxe * 100)/hauteurParent;
					/* le bloc paralaxe ne dépasse pas de la section parent tant que 100% de la section 
					- la taille en % du paralax - la section parcouru en % est >= 0 */
					if ((100 - proportionParalaxeParent - pourcentageDeSectionParcouru) >= 0){
						/* Le déplacement en px corresponds à la hauteur de la section parent - la valeur restante
						en px du scroll parcouru dans cette section */
						const deplacementEnPx = hauteurParent - (hauteurParent * (100 - pourcentageDeSectionParcouru))/100;
						const reste = hauteurParent - hauteurParalaxe - deplacementEnPx;
						// reste, pour avoir une marge en bas ,-)
						if (reste > 125){
							paralaxe.style.top = initTop + deplacementEnPx + 'px';
						}
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