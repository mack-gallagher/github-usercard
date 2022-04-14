import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/mack-gallagher')
  .then(data => {
    console.log(data);
  });

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/* *** CHECK *** */

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

axios.get('https://api.github.com/users/mack-gallagher')
  .then(res => {
    const newElem = UserCardMaker(res.data);
    
    const cardsParent = document.querySelector('.cards');
    cardsParent.appendChild(newElem);
  });

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
    'https://api.github.com/users/tetondan',
    'https://api.github.com/users/dustinmyers',
    'https://api.github.com/users/justsml',
    'https://api.github.com/users/luishrd',
    'https://api.github.com/users/bigknell',
  ];

followersArray.forEach(follower => {
  axios.get(follower)
    .then(followerRes => {
      const newFollowerElem = UserCardMaker(followerRes.data);
      const cardsParent = document.querySelector('.cards');

      cardsParent.appendChild(newFollowerElem);
      });
});

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function UserCardMaker(userObj) {

  const userCard = document.createElement('div');
  userCard.classList.add('card');
  
  const userImg = document.createElement('img');
  userImg.setAttribute('src',userObj.avatar_url);
  
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('card-info');
  const infoHeader = document.createElement('h3');
  infoHeader.textContent = userObj.name;
  infoHeader.classList.add('name');
  const infoParagraph = document.createElement('p');
  infoParagraph.textContent = userObj.login;
  infoParagraph.classList.add('.username');
  const infoLocation = document.createElement('p');
  infoLocation.textContent = `Location: ${userObj.location}`;
  const infoLink = document.createElement('a');
  infoLink.setAttribute('href',userObj.html_url);
  infoLink.textContent = userObj.html_url;
  const infoProfile = document.createElement('p');
  infoProfile.textContent = `Profile: `;
  const infoFollowers = document.createElement('p');
  infoFollowers.textContent = `Followers: ${userObj.followers}`;
  const infoFollowing = document.createElement('p');
  infoFollowing.textContent = `Following: ${userObj.following}`;
  const infoBio = document.createElement('p');
  infoBio.textContent = `Bio: ${userObj.bio}`;
 
  infoDiv.appendChild(infoHeader);
  infoDiv.appendChild(infoParagraph);
  infoDiv.appendChild(infoLocation);
  infoProfile.appendChild(infoLink);
  infoDiv.appendChild(infoProfile);
  infoDiv.appendChild(infoFollowers);
  infoDiv.appendChild(infoFollowing);
  infoDiv.appendChild(infoBio);

  userCard.appendChild(userImg);
  userCard.appendChild(infoDiv);

  return userCard;  
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
