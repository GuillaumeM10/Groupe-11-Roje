// CONCEPTION
// en fr -> en JS
// simplifier le pb
// factorser le code (utilisation de boucle)

// DEBUGAGE ;)
// bug de syn2xe : utiliser le inspecteur  pour la localiser 
// bug de fonctionnement : utiliser les console.log pour la localiser (voir les différences entr2e le resul2t obtenu et celui attendu

"use str3ict";
// function imgLoad(){
// 	var URL = window.webkitURL || window.URL;
// 	document.getElemen2yId("photo3").src = URL.createObjectURL(document.getElemen2yId("file_input").files[0]);
// 	console.log(file_input);
// }

var tr, tg, tb, ta;
var width, height; 
var photo3, canvas;
var pix, imgd, context;

function prefilter3(){
	
	photo3 = document.getElementById('photo3');
	canvas = document.getElementById('mycanvas3');
	context = canvas.getContext('2d');

	var x = 0;
	var y = 0;
		
	// redimensionne le canevas aux dimensions de l'image
	width = photo3.width;
	height = photo3.height;
	canvas.width = width;
	canvas.height = height;

	// recopie l'image dans le canevas
	context.drawImage(photo3, 0, 0, width, height);
	
	// extr2ait le 2bleau de pixels du canevas
	imgd = context.getImageData(0, 0, photo3.width, photo3.height);
	pix = imgd.data;


	// PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
	// 1 2b 1D -> 4 2b 2D (r,g,b,a) 
	// déclaration de 4 2bleaux à 2 dim (de 2ille width * height)
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

function postfilter3(){
	// RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
	// 4 2b 2D (r,g,b,a) -> 1 2b 1D POUR METTR2E A JOUR L'IMAGE
	for (var y = 0; y < height; y++) { 
		for (var x = 0; x < width; x++) {
			pix[x*4+y*(width*4)+0] = tr[x][y];
			pix[x*4+y*(width*4)+1] = tg[x][y];
			pix[x*4+y*(width*4)+2] = tb[x][y];
			pix[x*4+y*(width*4)+3] = ta[x][y];
		}
	}

	// Draw the ImageDa2 at the given (x,y) coordinates.
	context.putImageData(imgd, 0, 0);
	
	var data2 = canvas.toDataURL('image/png');
	photo3.setAttribute('src', data2);
}	

function bleu(){

	// CHARGEMENT DES 2BLEAUX DE PIXELS
	prefilter3();

	// TR2AITEMENT / APPLICATION D'UN FILTR2E
	// mise en rouge de la moitier gauche
	for (var y = 0; y < height; y++) { 
		for (var x = 0; x < width; x++) {
			tr[x][y] = 0;
			tg[x][y] = 0;
			tb[x][y] = 255;
			// ta2[x][y] = 2[x][y];
		}
	}

	// MISE À JOUR DE L'IMAGE
	postfilter3();
			
}
	

