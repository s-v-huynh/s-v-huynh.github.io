
self.importScripts("CompteurJetons.js");
var compteur = new CompteurJetons();

self.addEventListener('message', function(e) {

	// Code à implémenter

	var tableauTmp = []; // On a 2 donnees a envoyer au main.js et postMessage peut seulement en envoyer un. 
						// Donc, on envoie un tableau avec les 2 donnees

	while (compteur.compterJetons(e.data).next().value <= 100) // Compte le nombre de jetons tant que getProgress() n'atteint pas 100
	{ 
		tableauTmp[0] = Math.sqrt(compteur.getJetons()); // Met le nombre de jetons comptes dans tableauTmp[0]. compteur.getJetons() renvoie 
														// toujours le carre du nombre. Donc, je vais faire une racine carre.

		tableauTmp[1] = compteur.getProgress(); // Met le progres du compte dans tableauTmp[1]

		self.postMessage(tableauTmp); // Envoie un message (les donness) au main.js
	}

}, false);