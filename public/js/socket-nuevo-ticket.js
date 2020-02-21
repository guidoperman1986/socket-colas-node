//front end

var socket = io();

var label = $('#lblNuevoTicket')
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');


socket.on('connect', function(){
    console.log("Conectado al servidor");
})

socket.on('disconnect',function(){
    console.log('Desconectado del servidor');
})

socket.on('estado-actual', function(resp){
    label.text(resp.actual)
})

/* socket.on('actualizar-colas',function(ticketsPendientes){
    lblTicket1.text(ticketsPendientes[0].numero)
    lblTicket2.text(ticketsPendientes[1].numero)
    lblTicket3.text(ticketsPendientes[2].numero)
    console.log(ticketsPendientes);
})
 */
$('button').on('click', function(){

    socket.emit('siguiente-ticket',null,function(siguienteTicket){
        label.text(siguienteTicket)
    });
    
    //para pedir que se actualize el array de tickets pendientes
    socket.emit('actualizar-colas')    

    socket.on('siguiente-ticket',function(){
        console.log('front-end respondiendo con la data del server');
    })
})