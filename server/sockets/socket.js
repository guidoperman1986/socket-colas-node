const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {


    //mandar cual es el siguiente ticket
    client.on('siguiente-ticket',(data, callback)=>{
        
        let siguiente = ticketControl.siguiente();
        
        callback(siguiente)
    })

    client.on('actualizar-colas',()=>{
        let pendientes = ticketControl.getTodosLosPendientes();
        
        client.emit('actualizar-colas',pendientes)
        /* callback(pendientes) */
    })

    client.on('atender-ticket',(data,callback)=>{
        if (!data.escritorio){
            return callback({
                err:true,
                mensaje:'El escritorio es necesario'
            })

        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio)
        
        callback(atenderTicket)
        
        client.broadcast.emit('cambio-estado',{
            actual: `Ticket ${ticketControl.getUltimoTicket()}`,
            ultimos4:ticketControl.getUltimos4()

        })
    })

    client.emit('estado-actual',{
        actual: `Ticket ${ticketControl.getUltimoTicket()}`,
        ultimos4:ticketControl.getUltimos4()
    })
    
});