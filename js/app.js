const listEl = document.querySelector(".ul-list");

const getUpdateUI = function (dataArr) {
  dataArr.forEach(user => {
    const liEl = document.createElement("li");

    liEl.classList.add("user-card");

    liEl.innerHTML = `
      <h2>${user.name} (${user.username})</h2>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Phone:</b> ${user.phone}</p>
      <p><b>Website:</b> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      <p><b>Address:</b> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
      <p><b>Company:</b> ${user.company.name}</p>
    `;

    liEl.addEventListener("click", () => {
      const lat = user.address.geo.lat;
      const lng = user.address.geo.lng;
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(mapUrl, "_blank");
    });

    listEl.appendChild(liEl);
  });
};

const getApi = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Ma'lumot topilmadi");
    }

    const data = await response.json();
    getUpdateUI(data);
  } catch (error) {
    console.log(error.message);
  }
};

getApi();
