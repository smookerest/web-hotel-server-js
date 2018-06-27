module.exports = (sequelize, type) => {
    return sequelize.define('Permission', {
        PermissionID: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        UserID: type.INTEGER,
        PermissionDashboard: type.BOOLEAN,
        PermissionBooking: type.BOOLEAN,
        PermissionUsers: type.BOOLEAN
    })
}

    