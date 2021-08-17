function viewProfile() {
  console.log(window.localStorage["jwt-token"]);
  console.log(window.localStorage["user-id"]);
  fetch(
    `https://lee-buka29.herokuapp.com/view-profile/${window.localStorage["user-id"]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage["jwt-token"],
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      users = data.data;
      console.log(users);
      users.forEach((user) => {
        console.log(user);
        document.querySelector(
          ".profile-container"
        ).innerHTML += `<div class="profile">
                            <h3 class="name">${user[1]} ${user[2]}</h3>
                            <p class="user_id">${user[0]}</p>
                            <p class="email">${user[3]}</p>
                            <p class="username">${user[4]}</p>
                            <p class="password">${user[5]}</p>
                            <div class="profile-buttons">
                              <button class="edit">Edit Profile</button>
                              <button class="delete">Delete Profile</button>
                            </div>
                          </div>`;
      });
    });
}

viewProfile();

function deleteProfile() {
  fetch(`https://lee-buka29.herokuapp.com/delete-profile`);
}
