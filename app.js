const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementUAH = document.querySelector('[data-value="UAH"]');
const elementPLN = document.querySelector('[data-value="PLN"]');

const input = document.getElementById('input');
const result = document.getElementById('result')
const select1 = document.getElementById('select_1')
const select2 = document.getElementById('select_2')

getCurrencies();
setInterval(getCurrencies, 10000);

async function getCurrencies() {
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
	const data = await response.json();
	const result = await data;

	rates.USD = result.Valute.USD;
	rates.EUR = result.Valute.EUR;
	rates.UAH = result.Valute.UAH;
	rates.PLN = result.Valute.PLN;
	rates.RUB = result.Valute.RUB;

	elementUSD.textContent = rates.USD.Value.toFixed(2);
	elementEUR.textContent = rates.EUR.Value.toFixed(2);
	elementUAH.textContent = rates.UAH.Value.toFixed(2);
	elementPLN.textContent = rates.PLN.Value.toFixed(2);
}

function conValue() {
	if (select1.value == select2.value) {
		result.value = input.value;
	} if (select2.value == 'RUB') {
		result.value = (parseFloat(input.value) * rates[select1.value].Value).toFixed(2);
	} if (select1.value == 'RUB') {
		result.value = (parseFloat(input.value) / rates[select2.value].Value).toFixed(2);
	} else {
		result.value = (parseFloat(input.value) * rates[select1.value].Value / rates[select2.value].Value).toFixed(2);
	}
};

input.oninput = function change() {
	conValue();
};

select1.oninput = function change() {
	conValue();
};

select2.oninput = function change() {
	conValue();
};





// function conValue() {
// 	if (select1.oninput) {
// 		result.value = (parseFloat(input.value) * rates[select1.value].Value).toFixed(2);
// 	}
// }


