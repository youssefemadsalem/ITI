/***********************
 * 1.
 ***********************/
use ('lab1');

db.people.aggregate([
  {
    $match: {
      $or: [{ age: 40 }, { company: "Aivee" }],
    },
  },
]);

/***********************
 * 2.
 ***********************/
use ('lab1');
db.people.aggregate([
  { $match: { age: { $gte: 25, $lte: 38 } } },
  { $limit: 5 },
]);

/***********************
 * 3.
 ***********************/
use ('lab1');
db.people.aggregate([
  { $match: { salary: { $gt: 20000 } } },
  { $sort: { age: 1 } },
  { $limit: 1 },
]);

/***********************
 * 4. Third oldest person from Russia
 ***********************/
use ('lab1');
db.people.aggregate([
  { $match: { country: "Russia" } },
  { $sort: { age: -1 } },
  { $skip: 2 },
  { $limit: 1 },
]);

/***********************
 * 5. Count of different countries
 ***********************/
use ('lab1');
db.people.aggregate([
  { $group: { _id: "$country" } },
  { $count: "countriesCount" },
]);

/***********************
 * 6. Sum of all salaries
 ***********************/
use ('lab1');
db.people.aggregate([
  {
    $group: {
      _id: null,
      totalSalary: { $sum: "$salary" },
    },
  },
]);

/***********************
 * 7. Sum of salaries for highest 3 paid
 ***********************/
use ('lab1');
db.people.aggregate([
  { $sort: { salary: -1 } },
  { $limit: 3 },
  {
    $group: {
      _id: null,
      sumTop3Salaries: { $sum: "$salary" },
    },
  },
]);

/***********************
 * 8. Avg salary per company (desc)
 ***********************/
use ('lab1');
db.people.aggregate([
  {
    $group: {
      _id: "$company",
      avgSalary: { $avg: "$salary" },
    },
  },
  { $sort: { avgSalary: -1 } },
]);

/***********************
 * 9. Full name for people living in Germany
 ***********************/
use ('lab1');
db.people.aggregate([
  { $match: { country: "Germany" } },
  {
    $project: {
      _id: 0,
      fullName: { $concat: ["$first_name", " ", "$last_name"] },
    },
  },
]);

/***********************
 * 10. Group by age and count
 ***********************/
use ('lab1');
db.people.aggregate([
  {
    $group: {
      _id: "$age",
      count: { $sum: 1 },
    },
  },
]);

/***********************
 * 11. Emails of people younger than 30
 ***********************/
use ('lab1');
db.people.aggregate([
  { $match: { age: { $lt: 30 } } },
  { $project: { _id: 0, email: 1 } },
]);

/***********************
 * 12. Create new collection with transformed fields
 ***********************/
use ('lab1');
db.people.aggregate([
  {
    $project: {
      _id: 0,
      fullname: { $concat: ["$first_name", " ", "$last_name"] },
      age: 1,
      country: 1,
      salary: { $multiply: ["$salary", 3] },
    },
  },
  { $out: "people_transformed" },
]);

/***********************
 * 13. Get all indexes on people collection
 ***********************/
use ('lab1');
db.people.getIndexes();

/***********************
 * 14. Find by email and explain
 ***********************/
use ('lab1');
db.people.find({ email: "test@email.com" }).explain("executionStats");

/***********************
 * 15. Create single-field index on email
 ***********************/
use ('lab1');
db.people.createIndex({ email: 1 }, { unique: true });

db.people.find({ email: "test@email.com" }).explain("executionStats");

/***********************
 * 16. Create compound index (email + age)
 ***********************/
use ('lab1');
db.people.createIndex({ email: 1, age: 1 });

/***********************
 * 17. List indexes & hide unnecessary one
 ***********************/
use ('lab1');
db.people.getIndexes();

db.people.hideIndex("email_1_age_1");

/***********************
 * 18. Delete all indexes except _id
 ***********************/
use ('lab1');
db.people.dropIndexes();

/***********************
 * BONUS: Number of cities per country
 ***********************/
use ('lab1');
db.people.aggregate([
  {
    $group: {
      _id: { country: "$country", city: "$city" },
    },
  },
  {
    $group: {
      _id: "$_id.country",
      citiesCount: { $sum: 1 },
    },
  },
]);
