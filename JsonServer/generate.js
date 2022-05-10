module.exports = function(){
    var faker = require("faker");
    var _ = require("lodash");
    return {
        posts: _.times(10, function(n){
            return {
                id: n,
                title: faker.name.findName(),
                author: faker.name.findName(),

                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                birthDate: faker.date.past(),
                address: faker.address.streetAddress(),
                emailAddresses: [
                    faker.internet.email(),
                    faker.internet.email(),
                ],
                phoneNumbers: [
                    faker.phone.phoneNumber(),
                    faker.phone.phoneNumber(),
                ],
                avatar: faker.internet.avatar()
            }
        })
    }
}