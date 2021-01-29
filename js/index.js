const Modal = {
  get toogle() {
    document.querySelector(".modal-overlay").classList.toggle("active");
  },
};

const transactions = [
  {
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },

  {
    description: "Criação de Website",
    amount: 500000,
    date: "25/01/2021",
  },

  {
    description: "Aluguel",
    amount: -150000,
    date: "29/01/2021",
  },
];

const Transaction = {
  all: transactions,

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

    Transaction.all.forEach(({ amount }) => {
      if (amount > 0) {
        income += amount;
      }
    });

    return income;
  },

  get expenses() {
    let expense = 0;

    Transaction.all.forEach(({ amount }) => {
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

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `

            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover transação"></td>
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
    console.log(value.replace(".", ","));
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
    Utils.formatAmount(amount);
  },

  submit(event) {
    event.preventDefault();

    try {
      //this.validateFields();
      this.formatData();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },

  reload() {
    DOM.clearTransactions();
    this.init();
  },
};

App.init();
