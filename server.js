const express = require('express');
const app = express();
const port = 3000;
const usersDatabase = {}; 

app.use(express.json());


app.post('/username', (req, res) => {
  const { name, mobile } = req.body;

  if (!name || !mobile) {
    return res.status(400).json({ error: 'Name and mobile are required' });
  }


  const namePart = name.slice(0, 4);
  const mobilePart = mobile.slice(-4);
  let username = `${namePart}${mobilePart}`;


  if (usersDatabase[username]) {

    let i = 0;
    while (usersDatabase[username]) {
      username = `${namePart}${name[3].repeat(i)}${mobilePart}`;
      i++;
    }
  }

  usersDatabase[username] = true;

  res.json({ username });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
