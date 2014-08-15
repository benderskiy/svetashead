Accounts.config({
    forbidClientAccountCreation: true
});

if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        username: "admin",
        password: "pass goes here"
    });
}

////

if (PortfolioCategory.find().count() === 0) {

    PortfolioCategory.insert({
        url: 'graphic-design',
        title: 'graphic design',
        order: 0
    });

    PortfolioCategory.insert({
        url: 'handmade',
        title: 'handmade',
        order: 1
    });

    PortfolioCategory.insert({
        url: 'package',
        title: 'package',
        order: 2
    });

}