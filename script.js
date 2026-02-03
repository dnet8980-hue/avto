// Текущий язык (по умолчанию казахский)
let currentLang = 'kk';

function setLang(lang) {
  currentLang = lang; // Запоминаем выбранный язык
  
  // 1. Находим ВСЕ элементы, у которых есть атрибут data-kk
  const allElements = document.querySelectorAll('[data-kk]');

  allElements.forEach(element => {
    // Получаем перевод из атрибута (data-kk или data-ru)
    const text = element.getAttribute('data-' + lang);
    
    if (text) {
      // Проверяем тип элемента:
      // Если это поле ввода (input или textarea), меняем placeholder
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } 
      // Иначе меняем текст внутри тега
      else {
        element.innerText = text;
      }
    }
  });

  // (Опционально) Сохраняем выбор языка в памяти браузера, 
  // чтобы при обновлении страницы язык не сбрасывался
  localStorage.setItem('siteLanguage', lang);
}

// При загрузке страницы проверяем, какой язык был выбран ранее
window.onload = function() {
    const savedLang = localStorage.getItem('siteLanguage');
    if (savedLang) {
        setLang(savedLang);
    }
    // Здесь вызываем renderReviews(), если он у тебя был
    if(typeof renderReviews === 'function') renderReviews(); 
};

const langData = {
  kk: {
    h1: "Машина сату",
    buy: "Сатып алу",
    sell: "Машина сату",
    reviews: "Клиенттердің пікірлері",
    banks: "Банктер",
    calc: "Кредит калькулятор",
    price: "Бағасы ₸",
    months: "Ай саны",
    calcBtn: "Есептеу",
    cars: "Машиналар",
    home: "Басты бет",
    name: "Аты-жөніңіз",
    phone: "Телефон",
    send: "WhatsApp жіберу",
    close: "Жабу",
    add: "Қосу"
  },
  ru: {
    h1: "Продажа авто",
    buy: "Купить",
    sell: "Продать авто",
    reviews: "Отзывы клиентов",
    banks: "Банки",
    calc: "Кредитный калькулятор",
    price: "Цена ₸",
    months: "Срок (мес)",
    calcBtn: "Рассчитать",
    cars: "Автомобили",
    home: "Главная",
    name: "Ваше имя",
    phone: "Телефон",
    send: "Отправить в WhatsApp",
    close: "Закрыть",
    add: "Добавить"
  }
};

function setLang(l){
  document.querySelectorAll("[data-t]").forEach(e=>{
    let k = e.dataset.t;
    if(langData[l][k]){
      if(e.placeholder !== undefined){
        e.placeholder = langData[l][k];
      } else {
        e.innerHTML = langData[l][k];
      }
    }
  });
}
function creditCalc() {
  const price = parseFloat(document.getElementById('price').value);
  const months = parseInt(document.getElementById('months').value);

  if(isNaN(price) || isNaN(months) || price <=0 || months <=0){
    alert("Бағаны және ай санын дұрыс енгізіңіз");
    return;
  }

  const percent = 0.18; // мысалы, 18% жылдық
  const monthlyRate = percent / 12; // айлық пайыз
  const monthlyPayment = price * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;

  document.getElementById('creditResult').innerText = 
    `Ай сайынғы төлем: ${Math.round(monthlyPayment).toLocaleString()} ₸\n` +
    `Жалпы төлем: ${Math.round(totalPayment).toLocaleString()} ₸ (${months} ай)`;
}
function setLang(lang){
  // Барлық элементтерді таңдау
  const elements = document.querySelectorAll('[data-kk][data-ru]');
  elements.forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  // Динамикалық қосылған car батырмаларын ауыстыру
  document.querySelectorAll('.car button').forEach(btn => {
    btn.textContent = btn.getAttribute(`data-${lang}`);
  });

  // Динамикалық карзинадағы батырмаларды ауыстыру
  document.querySelectorAll('#cart .card button').forEach(btn => {
    btn.textContent = btn.getAttribute(`data-${lang}`);
  });
}
// LocalStorage-тан машиналарды алу
let myCars = JSON.parse(localStorage.getItem('myCars') || '[]');

// Машина қосу
function addCar(title, price, img){
  myCars.push({title, price, img});
  localStorage.setItem('myCars', JSON.stringify(myCars));
  renderMyCars();
}
cars.forEach(car => {
  const card = document.createElement('div');
  card.className = 'car-card';
  card.innerHTML = `
    <div class="car-img" style="background-image: url('${car.img}')"></div>
    <div class="car-info">
      <h3>${car.title}</h3>
      <p class="price">${car.price.toLocaleString()} ₸</p>
      <p>${car.chars}</p>
      
      <div class="bank-links">
        <a href="kaspi://klient/main" class="bank-btn kaspi">Kaspi-ге өту</a>
        
        <a href="halykbank://main" class="bank-btn halyk">Halyk-қа өту</a>
      </div>

      <a href="https://wa.me/77761874008?text=Сәлеметсізбе! ${car.title} бойынша хабарласып тұрмын." class="wa-btn">WhatsApp-қа жазу</a>
    </div>
  `;
  carGrid.appendChild(card);
});