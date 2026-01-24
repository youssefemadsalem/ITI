// 1
use lab1 ;

// 2
show dbs ;

// 3
db.createCollection("people");

// 4
db.people.insertOne({name: "Ali", age: 22});

// 5 from MongoDB Compass


// 6
db.people.insertMany([{name: "Shady", age: 25}, {name: "Nader", age: 50}, {name: "Nabil", age: 80}]);

// 7
show collections;

// 8
db.people.find();

// 9
db.people.find({country: "France"});

// 10
db.people.find({country: "France", age: {$gt: 40}}).count();

// 11
db.people.updateMany({salary: {$exists: false}}, {$set: {salary: 2500}});

// 12
db.people.updateMany({company: "Oodoo"}, {$inc: {salary: 1200}});

// 13
db.people.find().sort({salary: -1}).limit(3);

// 14
db.people.find({country: "Brazil"}).sort({age: -1}).limit(1);

// 15
db.people.find().sort({salary: -1});

// 16
db.people.find({},{country: 1, address: 1, _id: 0}).limit(30);

// 17
db.people.find({country: "China", $and: [
    {age: {$gt: 16}},
    {age: {$lt: 35}}
]});

// 18
db.people.find({}, {first_name: 1, last_name: 1, _id: 0});

// 19
db.people.find({fruits: {$all: [
    "apple",
    "kiwi"
]}});
db.people.find({
  $and: [
    { fruits: { $elemMatch: { $eq: "apple" } } },
    { fruits: { $elemMatch: { $eq: "kiwi" } } }
  ]
});

// 20
db.people.find({$or: [
    {fruits: {$nin: ["banana"]}},
    {fruits: {$nin: ["apricot"]}}
]});

// 21
db.people.find({country: {$in: [
    "China",
    "France",
    "Tanzania",
    "Poland"
]}});

// 22
db.people.find({country: {$nin: [
    "Russia",
    "Indonesia"
]}});

// 23
db.people.find({$or: [
    {country: "Russia", age: 32},
    {country: "Germany", age: 51}
]});

// 24
db.people.distinct("address.city").sort();

// 25
db.people.find({"address.city": "Auch"}, {first_name: 1, last_name: 1, job: 1, _id: 0});

// 26
db.people.find({job: "Graphic Designer"}).sort({salary: -1}).limit(1);

// 27
db.people.findOne({first_name: "Rosalia", last_name: "Frostdicke"});

// 28
db.people.find({fruits: {$size: 4}});

// 29
db.people.updateOne({first_name: "Grannie", last_name: "Glader", company: "Jayo"}, {$set: {email: "gglader@jayo.edu"}});

// 30
db.people.updateOne({first_name: "Agnola", last_name: "Janaud"}, {$set: {"fruits[2]": "apple"}});

// 31
db.people.updateMany({country: "Vietnam"}, {$inc: {age: -5}});

// 32
db.people.updateMany({}, {$set: {laptop: {
    cpu: "Intel core i5",
    ram: "8GB ram",
    gpu: "Nvidia geforce gtx 1650",
    disk: "512GB SSD"
}}});

// 33
db.people.updateMany({company: "Zava", country: "Indonesia"}, {$set: {company: ""}});

// 34
db.people.replaceOne({email: "sbucke6@mozilla.com"}, {name: "Omar", age: 24});

// 35
db.people.updateMany({company: "Skajo"}, {$mul: {salary: 0.9}});

// 36
db.people.updateOne({"address.city": "Yauca"}, {$set: {"address.city": "Berlin"}});

// 37
db.people.updateOne({first_name: "Murray", last_name: "Jannings"}, {$push: {fruits: "kiwi"}});

// 38
db.people.updateOne({first_name: "Geraldine", last_name: "Spittal"}, {$pull: {fruits: "papaya"}});

// 39
db.people.deleteMany({country: "China", age: {$gt: 40}, job: "Marketing Manager"});

// 40
db.people.find({country: "China", age: {$lte: 40}}).count();

// 41
db.people.find().sort({salary: -1}).skip(1).limit(1);

// 42
db.people.find().sort().skip(2).limit(1);

// 43
use newDatabase ;
db.createCollection("newCollection");

// 44
db.newCollection.renameCollection("newCollectionV2");
db.newCollectionV2.drop();

// 45
db.dropDatabase()