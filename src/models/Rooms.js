module.exports = (sequelize, type) => {
    return sequelize.define('Room', {
        RoomID: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        RoomNumber: type.INTEGER,
        RoomFloor: type.INTEGER,
        RoomType: type.STRING,
        RoomPricePerDay: type.DOUBLE,
        RoomDescription: type.STRING,
    })
}

    