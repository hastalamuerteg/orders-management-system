const totalItems = document.querySelector(".total-items");
const depositedItems = document.querySelector(".deposited-items");
const lateItems = document.querySelector(".late-items");
const colectedItems = document.querySelector(".colected-items");
const showCustomersList = document.querySelector(".list__customers");

const changePassword = document.querySelector(".change__password");
const modalContainer = document.querySelector(".modal__container");
const closeModal = document.querySelector(".btn-close");

const fetchDataFromUrl = async (url) => {
  const processingPromisedData = await fetch(url);
  return processingPromisedData;
};

const renderCustomersTable = async () => {
  const ordersSummary = await (await fetchDataFromUrl("./orders.json")).json();
  ordersSummary.forEach(
    ({ locker, cliente, pedido, telefone, data, status }) => {
      const html = `
    <tr>
    <th scope="row">${locker}</th>
    <td>${cliente}</td>
    <td>${pedido}</td>
    <td>${telefone}</td>
    <td>${data}</td>
    <td>${status}</td>
    </tr>
    `;
      showCustomersList.insertAdjacentHTML("beforeend", html);
    }
  );
};

renderCustomersTable();

const updateDashboard = async () => {
  const customers = await (await fetchDataFromUrl("./orders.json")).json();
  totalItems.innerHTML = customers.length;
  let countDepositedItems = 0;
  let countLateItems = 0;
  let countColectedItems = 0;

  customers.forEach((item) => {
    switch (item.status) {
      case "Depositado":
        countDepositedItems++;
        depositedItems.innerHTML = countDepositedItems;
        break;
      case "Atrasado":
        countLateItems++;
        lateItems.innerHTML = countLateItems;
        break;
      case "Retirado":
        countColectedItems++;
        colectedItems.innerHTML = countColectedItems;
        break;
    }
  });
};

updateDashboard();

const modal = () => {
  changePassword.addEventListener("click", function () {
    modalContainer.classList.remove("inactive");
    closeModal.addEventListener("click", function () {
      modalContainer.classList.add("inactive");
    });
  });
};

modal();
