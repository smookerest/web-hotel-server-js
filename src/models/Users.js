module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        EmployerID: type.INTEGER,
        UserName: type.STRING,
        UserPassword: type.STRING,
        UserEmail: type.STRING
    })
}

