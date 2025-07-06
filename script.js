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



const GAMES = [
  { id: 730, name: 'CS2' },
  { id: 570, name: 'Dota 2' },
  { id: 440, name: 'TF2' }
];

async function fetchItems(appId, count) {
  const proxy = 'https://corsproxy.io/?';
  const steamUrl = `https://steamcommunity.com/market/search/render?count=${count}&appid=${appId}&norender=1`;
  
  try {
    const response = await fetch(proxy + encodeURIComponent(steamUrl));
    const text = await response.text();
    const data = JSON.parse(text);
    return (data.results || []).map(item => ({ ...item, appid: appId }));
  } catch (error) {
    return [];
  }
}

async function getLatestItems() {
  let allItems = [];
  let attempts = 0;
  
  while (allItems.length < 100 && attempts < 5) {
    attempts++;
    
    for (const game of GAMES) {
      const items = await fetchItems(game.id, 20);
      allItems = [...allItems, ...items];
    }
  }
  
  if (allItems.length === 0) {
    console.log('Не удалось получить предметы');
    return;
  }
  
  allItems.slice(0, 100).forEach((item, i) => {
    const game = GAMES.find(g => g.id === item.appid)?.name || 'Unknown';
    console.log(
      `${i+1}. ${item.name}\n` +
      `Игра: ${game} | Цена: ${item.sell_price_text}\n` +
      `Фото: https://steamcommunity.com/economy/image/${item.asset_description?.icon_url || ''}\n`
    );
  });
}

getLatestItems().catch(e => console.log('Ошибка:', e));