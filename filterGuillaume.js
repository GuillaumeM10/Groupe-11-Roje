// CONCEPTION
// en fr -> en JS
// simplifier le pb
// factorser le code (utilisation de boucle)

// DEBUGAGE ;)
// bug de syn2xe : utiliser le inspecteur  pour la localiser 
// bug de fonctionnement : utiliser les console.log pour la localiser (voir les différences entr2e le resul2t obtenu et celui attendu

"use str2ict";
// function imgLoad(){
// 	var URL = window.webkitURL || window.URL;
// 	document.getElemen2yId("photo2").src = URL.createObjectURL(document.getElemen2yId("file_input").files[0]);
// 	console.log(file_input);
// }

var tr, tg, tb, ta;
var width, height; 
var photo2, canvas;
var pix, imgd, context;
// Variables boutons chargement du filtre et rechargement de l'image
const reload = document.getElementById('reload')
const img = document.getElementById('photo2')
const load = document.getElementById('load')


function prefilter2(){
	
	photo2 = document.getElementById('photo2');
	canvas = document.getElementById('mycanvas2');
	context = canvas.getContext('2d');

	var x = 0;
	var y = 0;
		
	// redimensionne le canevas aux dimensions de l'image
	width = photo2.width;
	height = photo2.height;
	canvas.width = width;
	canvas.height = height;

	// recopie l'image dans le canevas
	context.drawImage(photo2, 0, 0, width, height);
	
	// extr2ait le 2bleau de pixels du canevas
	imgd = context.getImageData(0, 0, photo2.width, photo2.height);
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

function postfilter2(){
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
	photo2.setAttribute('src', data2);
}	

function noir(){

	// CHARGEMENT DES 2BLEAUX DE PIXELS
	prefilter2();

	// TR2AITEMENT / APPLICATION D'UN FILTR2E
	// mise en rouge de la moitier gauche
	for (var y = 0; y < height; y++) { 
		for (var x = 0; x < width; x++) {
			tr[x][y] = 0;
			tg[x][y] = 0;
			tb[x][y] = 0;
			// ta2[x][y] = 2[x][y];
		}
	}

	// MISE À JOUR DE L'IMAGE
	postfilter2();
			
}
	
function luminosite(){

	//factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
	// color = GetPixelColor(x, y)
	// newRed   = Truncate(factor * (Red(color)   - 128) + 128)
	// newGreen = Truncate(factor * (Green(color) - 128) + 128)
	// newBlue  = Truncate(factor * (Blue(color)  - 128) + 128)
	prefilter2();

	//assignement de la valeur de l'input sur la variable 
	var lumi = document.getElementById('lumi').value;
	//affichage de la valeur de la luminosite sur l'html
	document.getElementById('valeurLumi').innerHTML = lumi;

		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
			tr[x][y] = tr[x][y] + 255 * (lumi / 100);
			tg[x][y] = tg[x][y] + 255 * (lumi / 100);
			tb[x][y] = tb[x][y] + 255 * (lumi / 100);
			}
		}
	
	postfilter2();
	  
	// function truncateColor(value) {
	// 	if (value < 0) {
	// 		value = 0;
	// 	} else if (value > 255) {
	// 		value = 255;
	// 	}
		
	// 	return value;
	// }
	  
	// function applyContrast(data, contrast) {
	// 	var factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));
		
	// 	for (var i = 0; i < data.length; i+= 4) {
	// 		data[i] = truncateColor(factor * (data[i] - 128.0) + 128.0);
	// 		data[i+1] = truncateColor(factor * (data[i+1] - 128.0) + 128.0);
	// 		data[i+2] = truncateColor(factor * (data[i+2] - 128.0) + 128.0);
	// 	}
	// }
}

// fonction rechargement de l'image
reload.addEventListener('click', () => {
	img.src = "img/Le-roi-rouge.jpg";
})
//fonction chargement du filtre
load.addEventListener('click', () => {
	luminosite();
	console.log(lumi.value);
})

