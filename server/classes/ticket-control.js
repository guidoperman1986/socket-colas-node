const fs = require('fs')

class TicketControl {
    constructor(){
        
        this.ultimo = 0;
        this.hoy = new Date().getDate()
        this.tickets = [];//almacena los tickets pendientes de atencion
        this.ultimos4 = []

        let data = require('../data/data.json')

        if (data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
        }else{
            this.reiniciarConteo();
        }
    }

    siguiente(){

        this.ultimo += 1;

        //almaceno el nuevo ticket en la cola de los pendientes
        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket)

        this.grabarArchivo();


        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket(){
        return this.ultimo;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0){
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift()

        let atenderTicket = new Ticket(numeroTicket,escritorio);
        this.ultimos4.unshift(atenderTicket)

        if (this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1)//borra el ultimo
        }

        /* console.log('Ultimos 4');
        console.log(this.ultimos4); */
        this.grabarArchivo();

        return atenderTicket;
    }

    getTodosLosPendientes(){
        return this.tickets.filter(ticket=>ticket.pendiente == true)
    }

    grabarArchivo(){

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets:this.tickets,
            ultimos4:this.ultimos4
        }
    
        let jsonDataString = JSON.stringify(jsonData);
    
        fs.writeFileSync('./server/data/data.json',jsonDataString)
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = []
        this.grabarArchivo();
    }
}

class Ticket{
    constructor(numero,escritorio){
        this.numero=numero;
        this.escritorio=escritorio;
    }
}

module.exports = {
    TicketControl
}