const Modal = {
  get toogle() {
    document.querySelector(".modal-overlay").classList.toggle("active");
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finance:transactions")) || [];
  },

  set(transaction) {
    localStorage.setItem(
      "dev.finance:transactions",
      JSON.stringify(transaction)
    );
  },
};

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    this.all.push(transaction);
    App.reload();
  },

  remove(index) {
    this.all.splice(index, 1);
    App.reload();
  },

  get income() {
    let income = 0;

    this.all.forEach(({ amount }) => {
      if (amount > 0) {
        income += amount;
      }
    });

    return income;
  },

  get expenses() {
    let expense = 0;

    this.all.forEach(({ amount }) => {
      if (amount < 0) {
        expense += amount;
      }
    });

    return expense;
  },

  get total() {
    return this.income + this.expenses;
  },
};

const DOM = {
  transactionContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    tr.dataset.index = index;

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `

            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação"></td>
    `;

    return html;
  },

  updateBalance() {
    document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.income
    );

    document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses
    );

    document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total
    );
  },

  clearTransactions() {
    this.transactionContainer.innerHTML = "";
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return `${signal}${value}`;
  },

  formatAmount(value) {
    value = Number(value) * 100;

    return Math.round(value);
  },

  formatDate(date) {
    return date.split("-").reverse().join("/");
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = this.getValues();

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatData() {
    let { description, amount, date } = this.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  saveTransaction(transaction) {
    Transaction.add(transaction);
  },

  clearFields() {
    this.description.value = "";
    this.amount.value = "";
    this.date.value = "";
  },

  closeModal() {
    Modal.toogle;
  },

  submit(event) {
    event.preventDefault();

    try {
      this.validateFields();

      const transaction = this.formatData();

      this.saveTransaction(transaction);
      this.clearFields();
      this.closeModal();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    DOM.updateBalance();

    Storage.set(Transaction.all);
  },

  reload() {
    DOM.clearTransactions();
    this.init();
  },
};

App.init();
