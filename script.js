//СОЗДАНИЕ ЕЛЕМЕНТОВ//
for(let i = 0; i < 100; i++) {
    const containerItem = document.createElement('div');
    containerItem.className = 'conteiner-item';
    //ФОТО//
    const shopPhotoContainer = document.createElement('div');
    shopPhotoContainer.className = 'shop-photo-conteiner';
    const img = document.createElement('img');
    img.src = '';
    shopPhotoContainer.appendChild(img);
    //ПРЕДМЕТ И ИГРА//
    const textItemBlock = document.createElement('div');
    textItemBlock.className = 'text-item-block';
    const textInnerDiv = document.createElement('div');
    const buyItem = document.createElement('p');
    buyItem.className = 'buy-item';
    const gameName = document.createElement('p');
    gameName.className = 'game-name';
    textInnerDiv.appendChild(buyItem);
    textInnerDiv.appendChild(gameName);
    textItemBlock.appendChild(textInnerDiv);
    //КОЛЛИЧЕСТВО ПРЕЛДМЕТОВ//
    const countItemBlock = document.createElement('div');
    countItemBlock.className = 'count-item-block';
    const countP = document.createElement('p');
    countItemBlock.appendChild(countP);
    //ЦЕНА ПРЕДМЕТА//
    const priceItemBlock = document.createElement('div');
    priceItemBlock.className = 'price-item-block';
    const fromText = document.createElement('p');
    fromText.className = 'from-text';
    const priceText = document.createElement('p');
    priceText.className = 'price-text';
    priceItemBlock.appendChild(fromText);
    priceItemBlock.appendChild(priceText);

    containerItem.appendChild(shopPhotoContainer);
    containerItem.appendChild(textItemBlock);
    containerItem.appendChild(countItemBlock);
    containerItem.appendChild(priceItemBlock);

    const outerDiv = document.createElement('div');
    outerDiv.appendChild(containerItem);


    document.body.appendChild(outerDiv);
}

fetch('https://cors-anywhere.herokuapp.com/https://steamcommunity.com/market/search/render?count=100&query=appid:730&start=0&norender=1')
  .then(response => response.json())
  .then(data => {
    data.results.forEach((item, index) => {
      console.log(`${index + 1}: ${item.name}`);
      console.log(`Цена: ${item.sell_price_text}`);
      console.log(`Количество: ${item.sell_listings}`);
      console.log('<<<---------------------------------->>>');
    });
})