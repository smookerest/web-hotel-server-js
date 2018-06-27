module.exports = (sequelize, type) => {
    return sequelize.define('Booking', {
        BookingID: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        BookingTotal: type.DOUBLE,
        CustomerID: type.INTEGER,
    })
}

    