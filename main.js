//service worker

if('serviceWorker' in navigator){
    console.log('Puedes usar los serviceWorker de navegador');


    navigator.serviceWorker.register('./SW.js')
                           .then(res => console.log('serviceWorker cargo correctamente', res))
                           .catch(err => console.log('serviceWorker no se a podido registrar',err))
}else{
    console.log('No puedes usar los serviceWorker del navegador');
}
//scroll suavizado

$(document).ready(function(){
    $("#menu a").click(function (e){
        
    e.preventDefault();

    $("html, body").animate({

        scrollTop: $($(this).attr('href')).offset().top
    });

    return false;

})

});