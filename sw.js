//Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_AngelManuelTepetatePeña';

//ficheros a cachear en la aplicación
var urlsToCache = [
 	'./',
 	'styles.css',
 	'./img/bkb.webp',
	'./img/vyb.jpg',
 	'./img/scr.jpg',,
 	'./img/facebookr.jpeg',
 	'./img/whatsapp.jpeg',
 	'./img/twitter.jpeg',
	'./img/BCHP.10.png',
 	'./img/BCHP.9.png',
 	'./img/BCHP.8.png',
 	'./img/BCHP.7.png',
 	'./img/BCHP.6.png',
 	'./img/BCHP.5.png',
 	'./img/BCHP.4.png',
 	'./img/BCHP.3.png',
 	'./img/BCHP.2.png',
 	'./img/BCHP.1.png'
	];

//Evento install
// Instalación del service Worker y guarda en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            	.then(() => {
            		self.skipWaiting();
            	});
            	
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});


//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});