const express = require('express')
const app = express()

const { User, Room, BookDetail, Costumer, Booking, Sequelize } = require('../src/sequelize')

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

app.get('/login',(req, res) => {
    console.log('Probando 1... 2... 3...')
})


//Login Request
app.post('/login', (req, res) => {
    const body = req.body
    User.findOne({
        where: {
            UserName: body.username
        }
    }).then(user => {
        if (!user) {
            res.send({error:'Error en reconocer tu usuario'})
        }
        
        const isValidPassword = body.password == user.UserPassword
        if (!isValidPassword) {
            res.send({error: 'Error en reconocer tu constraña'})
        } else {
            res.send({user: user.toJSON()})
            console.log(user.toJSON())
        }
    })
    console.log('Recibiendo data')
})

//Rooms Request
app.post('/rooms', (req, res) => {
    try {
        const body = req.body
        Room.create(body).then(room => {
            res.send(room.toJSON())
            console.log(room.toJSON())
        })
    } catch (err) {
        res.send({error: err})
    }
})

app.get('/rooms', (req, res) => {
    try {
        Room.findAll().then(room => {
            res.send(room)
            console.log(console.log(room))
        })
    } catch (err) {

    }
})

app.get('/api/validateroom', (req, res) => {
    const Op = Sequelize.Op
    const checkin = req.query.checkin
    const checkout = req.query.checkout
    const id = req.query.id
    console.log(req.query.id, req.query.checkin)
    try {
        BookDetail.findOne({
            where: {
                RoomID: id,
                InitialDate: {
                    [Op.lte]: checkin
                },
                Finaldate: {
                    [Op.gte]: checkout
                }
            }
       }).then(book => {
           if(book != null){
               res.send(
                   {
                       err: "La habitacion estará ocupada",
                       roomState: "Ocupada",
                    }
                )
                return false
           }
           else {
            res.send(
                {
                    err: "La habitacion estara libre",
                    roomState: "Disponible"
                }
            )

            return true
           }
       }).catch(function(err) {
           res.send({error: err})
           console.log(err)
       })
    } catch(er) {
        res.send({err: er})
    }
})

app.get('/rooms:id', (req, res) => {
    var room = req.params.id
    BookDetail.findAll({
        where: {

        }
    })

    try {
        Room.findOne({where: {
            RoomID: room
        }}).then(room => {
            res.send(room)
            console.log(console.log(room))
        })
    } catch(err) {
        res.send({error: err})
    }
})

app.post('/costumers', (req, res) => {
    try {
        const body = req.body
        Costumer.create(body).then(costumer => {
            res.send(costumer.toJSON())
            console.log(costumer.toJSON())
        })
    } catch (error) {
        res.send({error: error})
    }
})

app.get('/costumers', (req, res) => {
    try {
        Costumer.findAll().then(costumer => {
            res.send(costumer)
            console.log(console.log(costumer))
        })
    } catch (err) {
        res.send({error: err})
    }
})

app.get('/costumers:cedula', (req, res) => {
    try {
        const cedula = req.params.cedula
        Costumer.findOne({
            where: {
                CostumerCedula: cedula
            }
        }).then(costumer => {
            res.send(costumer)
            console.log(console.log(costumer))
        })
    } catch (err) {
        res.send({error: err})
    }
})

//Bookings Request
app.post('/booking', (req, res) => {
    try {
        const body = req.body
        Booking.create(body).then(book => {
            res.send(book.toJSON())
            console.log(book.toJSON())
        })
    } catch (error) {
        res.send({error: error})
    }
})

app.post('/bookingdetails', (req, res) => {
    try {
        const body = req.body
        BookDetail.create(body).then(book => {
            res.send(book.toJSON())
            console.log(book.toJSON())
        })
    } catch (error) {
        res.send({error: error})
    }
})


app.get('/api/availablerooms', (req, res) => {
    const Op = Sequelize.Op
    let avaibleroomsID = [] 
    try {
        BookDetail.findAll({
            where: {
                InitialDate: {
                    [Op.gte]: '06-13-2017'
                },
                Finaldate: {
                    [Op.lte]: '06-03-2017'
                }
            }
        }).then(books => {
            for (book of books){
                avaibleroomsID.push(book.RoomID)
            }
            console.log(avaibleroomsID)
            Room.findAll({
                where:{
                    RoomID: {
                        [Op.notIn]: avaibleroomsID
                    }
                }
            }).then(rooms => {
                res.send(rooms)
                console.log(console.log(rooms))
            })
            

        })
    } catch (err) {
        res.send({error: err})
    }
})

//Users Requests
app.get('/users', (req, res) => {
    try {
        User.findAll().then(user => {
            res.send(user)
            console.log(console.log(user))
        })
    } catch (err) {
        res.send({error: err})
    }
})

app.post('/users', (req, res) => {
    try {
        const body = req.body
        User.create(body).then(user => {
            res.send(user.toJSON())
            console.log(user.toJSON())
        })
    } catch (error) {
        res.send({error: error})
    }
})

app.listen(8081, () => {
    console.log('Servidor funcionando en el puerto 8081')
})