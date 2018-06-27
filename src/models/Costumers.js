module.exports = (sequelize, type) => {
    return sequelize.define('Costumer', {
        CostumerID: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },
        CostumerFullName: type.STRING,
        CostumerCountry: type.STRING,
        CostumerCedula: type.STRING,
        CostumerPhoneNumber: type.STRING,
    })
}

    