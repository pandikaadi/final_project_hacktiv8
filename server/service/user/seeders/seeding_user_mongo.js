const { connect ,getMongoConnection } = require('../config/mongoConnection')

const users = [
	{
		"id" : 1,
		"username" : "pelanggan",
		"email" : "pelanggan@gmail.com",
		"password" : "$2a$10$Z.3OnSnPReTCQR7J.G050O2zfsI1rd2a5sRpHPw0.KgVTnxPvTgGi",
		"phoneNumber" : "0821987633",
		"createdAt" : "2022-02-12T11:11:23.526Z",
		"updatedAt" : "2022-02-12T11:11:23.526Z",
		"role" : "Customer",
		"lat" : "-6.70924",
		"long" : "106.88189"
	},
	{
		"id" : 2,
		"username" : "kingjames",
		"email" : "lebron.james@gmail.com",
		"password" : "$2a$10$6VZQn7X2SMFOWo1XKP7kGehNJ32hZJscA65chUo7YFnx3Bh7vpKxS",
		"phoneNumber" : "08762242",
		"createdAt" : "2022-02-12T11:36:00.960Z",
		"updatedAt" : "2022-02-12T11:36:00.960Z",
		"role" : "Customer",
		"lat" : "-6.70924",
		"long" : "106.88189"
	},
	{
		"id" : 3,
		"username" : "testmailer",
		"email" : "sanrego124@gmail.com",
		"password" : "$2a$10$H9BEjFuK3BzJH4UQ91gwnuoeBK.4V6fT\/oiIF0R7z9rlv.K.2BfS6",
		"phoneNumber" : "08219232332",
		"createdAt" : "2022-02-14T04:50:13.575Z",
		"updatedAt" : "2022-02-14T04:50:13.575Z",
		"role" : "Customer",
		"lat" : null,
		"long" : null
	}

]

connect()
  .then(async()=>{
    const db = getMongoConnection()
    const userCollection = db.collection("users")
    const result = await userCollection.insertMany(users)
    console.log(result);
  })
  .catch(err=>{
    console.log(err);
  })