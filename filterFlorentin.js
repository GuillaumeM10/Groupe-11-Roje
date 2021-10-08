// CONCEPTION
// en fr -> en JS
// simplifier le pb
// factorser le code (utilisation de boucle)

// DEBUGAGE ;)
// bug de syntaxe : utiliser le inspecteur  pour la localiser 
// bug de fonctionnement : utiliser les console.log pour la localiser (voir les différences entre le resultat obtenu et celui attendu

"use strict";
// function imgLoad(){
// 	var URL = window.webkitURL || window.URL;
// 	document.getElementById("photo").src = URL.createObjectURL(document.getElementById("file_input").files[0]);
// 	console.log(file_input);
// }

var tr, tg, tb, ta;
var width, height; 
var photo, canvas;
var pix, imgd, context;
// Variables boutons chargement du filtre et rechargement de l'image
const reload1 = document.getElementById('reload1')
const img1 = document.getElementById('photo1');;
const load1 = document.getElementById('load1')
const load5 = document.getElementById('load5')

function prefilter(){
	
	photo = document.getElementById('photo1');
	canvas = document.getElementById('mycanvas');
	context = canvas.getContext('2d');


	var x = 0;
	var y = 0;
		
	// redimensionne le canevas aux dimensions de l'image
	width = photo.width;
	height = photo.height;
	canvas.width = width;
	canvas.height = height;

	// recopie l'image dans le canevas
	context.drawImage(photo, 0, 0, width, height);
	
	// extrait le tableau de pixels du canevas
	imgd = context.getImageData(0, 0, photo.width, photo.height);
	pix = imgd.data;


	// PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
	// 1 tab 1D -> 4 tab 2D (r,g,b,a) 
	// déclaration de 4 tableaux à 2 dim (de taille width * height)
	tr = new Array(width).fill().map(() => Array(height));
	tg = new Array(width).fill().map(() => Array(height));
	tb = new Array(width).fill().map(() => Array(height));
	ta = new Array(width).fill().map(() => Array(height));
	


	// copie des valeurs
	for (var y = 0; y < height; y++) { 
		for (var x = 0; x < width; x++) {
			tr[x][y] = pix[x*4+y*(width*4)+0];
			tg[x][y] = pix[x*4+y*(width*4)+1];
			tb[x][y] = pix[x*4+y*(width*4)+2];
			ta[x][y] = pix[x*4+y*(width*4)+3];
		}
	}
}

function postfilter(){
	// RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
	// 4 tab 2D (r,g,b,a) -> 1 tab 1D POUR METTRE A JOUR L'IMAGE
	for (var y = 0; y < height; y++) { 
		for (var x = 0; x < width; x++) {
			pix[x*4+y*(width*4)+0] = tr[x][y];
			pix[x*4+y*(width*4)+1] = tg[x][y];
			pix[x*4+y*(width*4)+2] = tb[x][y];
			pix[x*4+y*(width*4)+3] = ta[x][y];
		}
	}

	// Draw the ImageData at the given (x,y) coordinates.
	context.putImageData(imgd, 0, 0);
	
	var data = canvas.toDataURL('image/png');
	photo.setAttribute('src', data);
}	

function couleurRandom(){

	// CHARGEMENT DES TABLEAUX DE PIXELS
	prefilter();

	// TRAITEMENT / APPLICATION D'UN FILTRE
	// mise en rouge de la moitier gauche

	//Couleur de référence (rr rg rb) + tolérance (t)
	var rr=210, rg=80, rb=70, t=80;

	// Couleur de substitution
	//var sr=50, sg=120, sb=230;
	var randomR = Math.floor(Math.random() * 255);
	var	randomB = Math.floor(Math.random() * 255);
	var randomG = Math.floor(Math.random() * 255);

	for (var y = 0; y < height; y++) { 
		for (var x = 0; x < width; x++) {

			
				// Si la composante rouge de mon pixel est supérieure à ma 
				//composante rouge de référence moins la tolérance et inférieure à ma composante rouge plus la tolérance 
				// alors je remplace la couleur de ce pixel par 
				// la composante rouge de subsitution ( sinon je ne fait rien).

				if( rr-t<tr[x][y] && tr[x][y]<rr+t && 
					rb-t<tb[x][y] && tb[x][y]<rb+t && 
					rg-t<tg[x][y] && tg[x][y]<rg+t ){
				
					tr[x][y] = randomR;
					tb[x][y] = randomB;
					tg[x][y] = randomG;

					// tr[x][y] = sr;
					// tb[x][y] = sb;
					// tg[x][y] = sg;
				}

			// if (  190<tr[x][y] && tr[x][y]<230
			// 	&& 50<tb[x][y] && tb[x][y]<90 
			// 	&& 70<tg[x][y] && tg[x][y]<100)
			// {	 
			// 		tr[x][y] = 29 ;//+ tr[x][y];
			// 		tb[x][y] = 153 ;//+ tb[x][y];
			// 		tg[x][y] = 29 ;//+ tg[x][y];
			// 	// ta[x][y] = ta[x][y];
			}
		}
		// MISE À JOUR DE L'IMAGE
	postfilter();
	}

	function filtrenb(){

        // CHARGEMENT DES TABLEAUX DE PIXELS
        prefilter();

        for (var y = 0; y < height; y ++) { 
            for (var x = 0; x < width; x ++) {

                // Je réduis l'intensité de ma couleur rouge par trois et je récupère uniquement 1% de ma couleur verte.
                // Afin d'appliquer l'effet sur la majorité de rouge de mon image.
                // Si ma variable nb est supérieure à 200 alors, je remplace mes couleurs par la couleur blanche sinon
                // je la remplace par la couleur noir.

                var nb = (tr[x][y]/3 + (tg[x][y] * 0.01) + tb[x][y]);
                if (nb > 200) {
                    nb = 255;}
                    else { nb = 0;
                    }
                    tr[x][y] = nb;
                    tb[x][y] = nb;
                    tg[x][y] = nb;
                }
                           
            }
			postfilter();
        }

	

	// fonction rechargement de l'image
reload1.addEventListener('click', () => {
	img1.src = "img/Soup.jpg";
	console.log(img1);
})
//fonction chargement du filtre
load1.addEventListener('click', () => {
	filtrenb();
})
load5.addEventListener('click', () => {
	couleurRandom();
})