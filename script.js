
function addProduct() {
    const productName = document.getElementById("productName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const duration = document.getElementById("duration").value;

    const listItem = document.createElement("li");
    listItem.innerHTML = `Product: ${productName}, Start Date: ${startDate}, End Date: ${endDate}, Duration: ${duration} days`;
    
    const productList = document.getElementById("productList");
    productList.appendChild(listItem);
    
    // Подсветка товара в зависимости от срока
    const endDateObj = new Date(endDate);
    const today = new Date();
    const timeDifference = (endDateObj - today) / (1000 * 3600 * 24);
    
    if (timeDifference <= 1) {
        listItem.classList.add('red');
    } else if (timeDifference <= 3) {
        listItem.classList.add('yellow');
    }
}
