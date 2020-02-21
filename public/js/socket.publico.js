var socket = io();

socket.on('estado-actual',function(data){
    actualizarHTML(data)
    
    
    
})

function actualizarHTML(data){
    
    for (let i=0;i<data.ultimos4.length;i++){
        $(`#lblTicket${i+1}`).text('Ticket '+ data.ultimos4[i].numero)
        $(`#lblEscritorio${i+1}`).text('Escritorio '+ data.ultimos4[i].escritorio)
    }

}

socket.on('cambio-estado',function(data){
    var audio = new Audio('audio/new-ticket.mp3')

    audio.play()
    actualizarHTML(data)
})