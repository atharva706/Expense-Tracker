let desc = document.querySelector("#description")
let amt = document.querySelector("#amount")
let opt = document.querySelector("#opt")
let btn = document.querySelector("#btn")

let ul = document.querySelector("ul")
let te = document.querySelector(".expense")


// let total = 0;
let total = Number(localStorage.getItem("ExpenseTotal")) || 0;

//let expenses = [];
let expenses = JSON.parse(localStorage.getItem("Expense")) || [];

expenses.forEach((expense) => {

    let li = document.createElement("li");

    li.textContent = `${expense.Description}---- ${expense.category} ---- ${expense.amount} ₹`;

    let newBtn = document.createElement("button");

    newBtn.textContent = "delete";

    li.appendChild(newBtn);
    ul.appendChild(li);


    newBtn.addEventListener("click", () => {

       total = Math.max(0, total - expense.amount);

        // CHANGED/ADDED
        expenses = expenses.filter((item) => item !== expense);

        // CHANGED/ADDED
        localStorage.setItem("Expense", JSON.stringify(expenses));

        // CHANGED/ADDED
        localStorage.setItem("ExpenseTotal", total);

        li.remove();

        te.textContent = `The total expense is ${total}`;
    });
});





btn.addEventListener("click", () => {


      if (desc.value.trim() === "") {
        alert("Please enter a description");
        return;
    }

    if (amt.value === "" || Number(amt.value) <= 0) {
        alert("Please enter a valid amount");
        return;
    }


    let li = document.createElement("li")

    li.textContent = `${desc.value}---- ${opt.value} ---- ${amt.value} ₹`

    li.style.color = '#e2e8f0'

    ul.appendChild(li);

    total += Number(amt.value);


    let exp = {
        "Description": desc.value,
        "amount": Number(amt.value),
        "category": opt.value
    }

    expenses.push(exp)

    localStorage.setItem("Expense", JSON.stringify(expenses))
    localStorage.setItem("ExpenseTotal", total)


    let newBtn = document.createElement("button")
    newBtn.textContent = "delete"
    newBtn.style.backgroundColor = '#70FFD2';
    newBtn.style.color = '#0f172a';
    newBtn.style.border = 'none';
    newBtn.style.padding = '8px 14px';
    newBtn.style.borderRadius = '8px';
    newBtn.style.fontWeight = '600';
    newBtn.style.cursor = 'pointer';
    newBtn.style.marginLeft = 'auto';
    newBtn.style.transition = 'all 0.3s ease';

    li.appendChild(newBtn);

    let currVal = Number(amt.value)

    newBtn.addEventListener("click", () => {

        //total = total - currVal;
        total = Math.max(0, total - currVal);

        // ADDED
        expenses = expenses.filter((item) => item !== exp);

        localStorage.setItem("ExpenseTotal", total);

        // ADDED
        localStorage.setItem("Expense", JSON.stringify(expenses));

        li.remove()

        te.textContent = `The total expense is ${total}`;
    })


    te.textContent = `The total expense is ${total}`;

    desc.value = ""
    amt.value = ""

})



te.textContent = `The total expense is ${total}`;

console.log(expenses)