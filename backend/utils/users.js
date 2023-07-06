const { getDatabase, ref, get } = require('firebase/database');
const { app } = require('../config/database');

const database = getDatabase(app);
const usersRef = ref(database, 'user');

get(usersRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const users = snapshot.val();
            // Using Object.keys() to get the keys of the users object
            const userIds = Object.keys(users);

            // Loop through the user IDs and access the corresponding user objects
            userIds.forEach((userId) => {
                const user = users[userId];
                console.log('User ID:', userId);
                console.log('User:', user);
                console.log('Username:', user.username);
                console.log('Room:', user.room);
                console.log('---');
            });
        } else {
            console.log('No data available');
        }
    })
    .catch((error) => {
        console.error(`Error: ${error}`);
    });
