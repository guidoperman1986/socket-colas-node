var socket = io();

var searchParams = new URLSearchParams(window.location.search)
var label = $('small')
var escritorio1 = $('#lblEscritorio1')

if (!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio')
$('h1').text('Escritorio '+escritorio)

$('button').on('click',function(){
    socket.emit('atender-ticket',{escritorio}, function(resp){

        if (resp === 'No hay tickets'){
            alert('No hay mas tickets')
            return;
        }

        label.text('Ticket '+ resp.numero)

        //escritorio1.text('Hola')
    })

    socket.emit('cambio-estado');
})

