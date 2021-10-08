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
const load3 = document.getElementById('load3')
const load4 = document.getElementById('load4')
//popUp
const info1 = document.querySelector('.info1')
const info2 = document.querySelector('.info2')
const info3 = document.querySelector('.info3')

const cross1 = document.querySelector('.cross1')
const cross2 = document.querySelector('.cross2')
const cross3 = document.querySelector('.cross3')

const popUp1 = document.querySelector('.popUp1');
const popUp2 = document.querySelector('.popUp2');
const popUp3 = document.querySelector('.popUp3');
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

function pixelisation(){

	prefilter2();

		for (var y = 0; y < height - 3; y = y + 4) {
			for (var x = 0; x < width - 3; x = x + 4) {
				var r, g, b;
				
				r = (tr[x][y] + tr[x+1][y] + tr[x+2][y] + tr[x+3][y] + tr[x][y+1] + tr[x+1][y+1] + tr[x+2][y+1] + tr[x+3][y+1] + tr[x][y+2] + tr[x+1][y+2] + tr[x+2][y+2] + tr[x+3][y+2] + tr[x][y+3] + tr[x+1][y+3] + tr[x+2][y+3] + tr[x+3][y+3])/16;
				g = (tg[x][y] + tg[x+1][y] + tg[x+2][y] + tg[x+3][y] + tg[x][y+1] + tg[x+1][y+1] + tg[x+2][y+1] + tg[x+3][y+1] + tg[x][y+2] + tg[x+1][y+2] + tg[x+2][y+2] + tg[x+3][y+2] + tg[x][y+3] + tg[x+1][y+3] + tg[x+2][y+3] + tg[x+3][y+3])/16;
				b = (tb[x][y] + tb[x+1][y] + tb[x+2][y] + tb[x+3][y] + tb[x][y+1] + tb[x+1][y+1] + tb[x+2][y+1] + tb[x+3][y+1] + tb[x][y+2] + tb[x+1][y+2] + tb[x+2][y+2] + tb[x+3][y+2] + tb[x][y+3] + tb[x+1][y+3] + tb[x+2][y+3] + tb[x+3][y+3])/16;

				// tr[x][y] = tr[x + 1][y];
				// tg[x][y] = tg[x][y + 1];
				// tb[x][y] = tb[x + 1][y + 1];
				tr[x][y] = r; tr[x+1][y] = r; tr[x+2][y] = r; tr[x+3][y] = r; tr[x][y+1] = r; tr[x+1][y+1] = r; tr[x+2][y+1] = r; tr[x+3][y+1] = r; tr[x][y+2] = r; tr[x+1][y+2] = r; tr[x+2][y+2] = r; tr[x+3][y+2] = r; tr[x][y+3] = r; tr[x+1][y+3] = r; tr[x+2][y+3] = r; tr[x+3][y+3] = r;
				tg[x][y] = g; tg[x+1][y] = g; tg[x+2][y] = g; tg[x+3][y] = g; tg[x][y+1] = g; tg[x+1][y+1] = g; tg[x+2][y+1] = g; tg[x+3][y+1] = g; tg[x][y+2] = g; tg[x+1][y+2] = g; tg[x+2][y+2] = g; tg[x+3][y+2] = g; tg[x][y+3] = g; tg[x+1][y+3] = g; tg[x+2][y+3] = g; tg[x+3][y+3] = g;
				tb[x][y] = b; tb[x+1][y] = b; tb[x+2][y] = b; tb[x+3][y] = b; tb[x][y+1] = b; tb[x+1][y+1] = b; tb[x+2][y+1] = b; tb[x+3][y+1] = b; tb[x][y+2] = b; tb[x+1][y+2] = b; tb[x+2][y+2] = b; tb[x+3][y+2] = b; tb[x][y+3] = b; tb[x+1][y+3] = b; tb[x+2][y+3] = b; tb[x+3][y+3] = b;
		}


	}
	postfilter2();
}



// fonction rechargement de l'image
reload.addEventListener('click', () => {
	img.src = "img/Le-roi-rouge.jpg";
})
//fonction chargement du filtre
load.addEventListener('click', () => {
	pixelisation();
	console.log('oui');
})
load3.addEventListener('click', () => {
	luminosite();
})
load4.addEventListener('click', () => {
	grisCouleur();
})
//fonction chargement du filtre
load.addEventListener('click', () => {
	pixelisation();
})
lumi.addEventListener('click', () => {
	luminosite();
})
couleur.addEventListener('click', () => {
	grisCouleur();
})
//info btn
info1.addEventListener('click', () => {
	popUp1.classList.add('popUpOn1')
})
cross1.addEventListener('click', () => {
	popUp1.classList.add('popUp1')
	popUp1.classList.remove('popUpOn1')
})

info2.addEventListener('click', () => {
	popUp2.classList.add('popUpOn2')
})
cross2.addEventListener('click', () => {
	popUp2.classList.add('popUp2')
	popUp2.classList.remove('popUpOn2')
})

info3.addEventListener('click', () => {
	popUp3.classList.add('popUpOn3')
})
cross3.addEventListener('click', () => {
	popUp3.classList.add('popUp3')
	popUp3.classList.remove('popUpOn3')
})