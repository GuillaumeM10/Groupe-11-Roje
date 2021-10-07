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
//gris et gris couleur
var griss2 = 0;



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
	  
}
var griss = 0;
function gris(){

	prefilter2();

		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				//if(){
					griss = (tr[x][y] + tg[x][y] + tb[x][y])/3;
					tr[x][y] = griss;
					tg[x][y] = griss;
					tb[x][y] = griss;
				//}
			}
		}
	
	postfilter2();
	  
}

function grisCouleur(){

	prefilter2();

	//assignement de la valeur de l'input sur la variable 
	var couleur = document.getElementById('couleur').value;
	//affichage de la valeur de la luminosite sur l'html
	document.getElementById('valeurCouleur').innerHTML = couleur;

	var couleurNb = couleur;

		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				griss2 = (tr[x][y] + tg[x][y] + tb[x][y])/3;
				if(tb[x][y] >= couleurNb){
					tr[x][y] = griss2;
					tg[x][y] = griss2;
					tb[x][y] = tb[x][y]

				}else{
					tr[x][y] = griss2;
					tg[x][y] = griss2;
					tb[x][y] = griss2;
				}
			}
		}
	
	postfilter2();
	  
}



// fonction rechargement de l'image
reload.addEventListener('click', () => {
	img.src = "img/Le-roi-rouge.jpg";
	for(var i=0; i < 10; i++){
		console.log(i*3);
	}
})
//fonction chargement du filtre
load.addEventListener('click', () => {
	grisCouleur();
	//luminosite();
	console.log(lumi.value);
})


