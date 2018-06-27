module.exports = (sequelize, type) => {
    return sequelize.define('BookingDetails', {
        BookDetailsID: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },       
        RoomID: type.INTEGER,
        BookingID: type.INTEGER,
        RoomPricePerDay: type.DOUBLE,
        InitialDate: type.DATE,
        Finaldate: type.DATE,
        Type: type.STRING,
        Days: type.INTEGER,
        Nights: type.INTEGER,
        Total: type.DOUBLE
    })
}

    