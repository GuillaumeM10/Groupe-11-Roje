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
// Variables boutons chargement du filtre et rechargement de l'image
const reload2 = document.getElementById('reload2')
const img2 = document.getElementById('photo3')
const load2 = document.getElementById('load2')

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

function filtretest(){

	// CHARGEMENT DES TABLEAUX DE PIXELS
	prefilter3();

	var trmoy, tgmoy, tbmoy;
	// TRAITEMENT / APPLICATION D'UN FILTRE
	// mise en rouge de la moitier gauche
	for (var y = 2; y < height - 2; y++) { 
		for (var x = 2; x < width - 2; x++) {
			trmoy = (tr[x - 2][y - 2] + tr[x - 1][y - 2] + tr[x][y - 2] + tr[x + 1][y - 2] + tr[x + 2][y - 2] +
				     tr[x - 2][y - 1] + tr[x - 1][y - 1] + tr[x][y - 1] + tr[x + 1][y - 1] + tr[x + 2][y - 1] +
					 tr[x - 2][y    ] + tr[x - 1][y    ] + tr[x][y    ] + tr[x + 1][y    ] + tr[x + 2][y    ] +
					 tr[x - 2][y + 1] + tr[x - 1][y + 1] + tr[x][y + 1] + tr[x + 1][y + 1] + tr[x + 2][y + 1] +
					 tr[x - 2][y + 2] + tr[x - 1][y + 2] + tr[x][y + 2] + tr[x + 1][y + 2] + tr[x + 2][y + 2]) / 25 ;
			tgmoy = (tg[x - 2][y - 2] + tg[x - 1][y - 2] + tg[x][y - 2] + tg[x + 1][y - 2] + tg[x + 2][y - 2] +
				     tg[x - 2][y - 1] + tg[x - 1][y - 1] + tg[x][y - 1] + tg[x + 1][y - 1] + tg[x + 2][y - 1] +
				     tg[x - 2][y    ] + tg[x - 1][y    ] + tg[x][y    ] + tg[x + 1][y    ] + tg[x + 2][y    ] +
				     tg[x - 2][y + 1] + tg[x - 1][y + 1] + tg[x][y + 1] + tg[x + 1][y + 1] + tg[x + 2][y + 1] +
				     tg[x - 2][y + 2] + tg[x - 1][y + 2] + tg[x][y + 2] + tg[x + 1][y + 2] + tg[x + 2][y + 2]) / 25 ;
			tbmoy = (tb[x - 2][y - 2] + tb[x - 1][y - 2] + tb[x][y - 2] + tb[x + 1][y - 2] + tb[x + 2][y - 2] +
				     tb[x - 2][y - 1] + tb[x - 1][y - 1] + tb[x][y - 1] + tb[x + 1][y - 1] + tb[x + 2][y - 1] +
				     tb[x - 2][y    ] + tb[x - 1][y    ] + tb[x][y    ] + tb[x + 1][y    ] + tb[x + 2][y    ] +
				     tb[x - 2][y + 1] + tb[x - 1][y + 1] + tb[x][y + 1] + tb[x + 1][y + 1] + tb[x + 2][y + 1] +
				     tb[x - 2][y + 2] + tb[x - 1][y + 2] + tb[x][y + 2] + tb[x + 1][y + 2] + tb[x + 2][y + 2]) / 25 ;
			
			tr[x][y] = trmoy;
			tg[x][y] = tgmoy;
			tb[x][y] = tbmoy;
			// ta[x][y] = ta[x][y];
		}
	}

	// MISE À JOUR DE L'IMAGE
	postfilter3();
			
}
	

	// fonction rechargement de l'image
	reload2.addEventListener('click', () => {
		img2.src = "img/Untiltled.jpg";
		console.log(img2);
	})
	//fonction chargement du filtre
	load2.addEventListener('click', () => {
		filtretest();
	})