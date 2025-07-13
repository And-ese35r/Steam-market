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

async function gettems() {
  try {
    let allItems = [];
    
    for (const game of GAMES) {
      const items = await fetchItems(game.id, 100).catch(() => []);
      if (items?.length) {
        allItems = [...allItems, ...items];
        if (allItems.length >= 100) break;
      }
    }
    
    return allItems.slice(0, 100);
  } catch (error) {
    return [];
  }
}

function createItemElement(item, container) {
  const game = GAMES.find(g => g.id === item.appid)?.name || 'Unknown';
  
  const itemLink = document.createElement('a');
  itemLink.href = `https://steamcommunity.com/market/listings/${item.appid}/${encodeURIComponent(item.name)}`;
  itemLink.target = '_blank';
  itemLink.style.textDecoration = 'none';
  itemLink.style.color = 'inherit';
  itemLink.style.display = 'block';

  const containerItem = document.createElement('div');
  containerItem.className = 'container-item';

  const shopPhotoContainer = document.createElement('div');
  shopPhotoContainer.className = 'shop-photo-container';
  const img = document.createElement('img');
  img.src = `https://steamcommunity.com/economy/image/${item.asset_description?.icon_url || ''}`;
  img.alt = item.name;
  shopPhotoContainer.appendChild(img);

  const textItemBlock = document.createElement('div');
  textItemBlock.className = 'text-item-block';
  const textInnerDiv = document.createElement('div');
  const buyItem = document.createElement('p');
  buyItem.className = 'buy-item';
  buyItem.textContent = item.name;
  const gameName = document.createElement('p');
  gameName.className = 'game-name';
  gameName.textContent = game;
  textInnerDiv.appendChild(buyItem);
  textInnerDiv.appendChild(gameName);
  textItemBlock.appendChild(textInnerDiv);

  const countItemBlock = document.createElement('div');
  countItemBlock.className = 'count-item-block';
  const countP = document.createElement('p');
  countP.textContent = `${item.sell_listings || 0} шт.`;
  countItemBlock.appendChild(countP);

  const priceItemBlock = document.createElement('div');
  priceItemBlock.className = 'price-item-block';
  const fromText = document.createElement('p');
  fromText.className = 'from-text';
  fromText.textContent = 'от';
  const priceText = document.createElement('p');
  priceText.className = 'price-text';
  priceText.textContent = item.sell_price_text || 'N/A';
  priceItemBlock.appendChild(fromText);
  priceItemBlock.appendChild(priceText);

  containerItem.appendChild(shopPhotoContainer);
  containerItem.appendChild(textItemBlock);
  containerItem.appendChild(countItemBlock);
  containerItem.appendChild(priceItemBlock);

  itemLink.appendChild(containerItem);
  container.appendChild(itemLink);
}

async function getItems() {
  const items = [];
  
  for (const game of GAMES) {
    const gameItems = await fetchItems(game.id, 100).catch(() => []);
    items.push(...gameItems);
    if (items.length >= 100) break;
  }
  
  return items.slice(0, 100);
}

async function showItems() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  const items = await getItems();
  
  if (!items.length) {
    container.textContent = 'Не удалось загрузить предметы';
    return;
  }

  items.forEach(item => createItemElement(item, container));
}

showItems()

loadItemsSequentially().catch(e => console.log('Ошибка:', e));

const footer = document.createElement('div');
footer.className = 'footer';

const logoContainer = document.createElement('div');
const logo = document.createElement('img');
logo.src = 'https://community.fastly.steamstatic.com/public/images/skin_1/footerLogo_valve.png?v=1';
logoContainer.appendChild(logo);

const reglament = document.createElement('div');
reglament.className = 'steam-reglament';

const text = document.createElement('p');
text.innerHTML = '© Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.<br>Some geospatial data on this website is provided by <a href="https://steamcommunity.com/linkfilter/?u=http%3A%2F%2Fwww.geonames.org">geonames.org.</a>';

const privacyLinks = document.createElement('div');
privacyLinks.className = 'privacy-links';

const links = [
    { text: 'Privacy Policy', url: 'http://store.steampowered.com/privacy_agreement/' },
    { text: 'Legal', url: 'https://store.steampowered.com/legal/' },
    { text: 'Steam Subscriber Agreement', url: 'http://store.steampowered.com/subscriber_agreement/' },
    { text: 'Cookies', url: 'http://store.steampowered.com/account/cookiepreferences/' }
];

links.forEach((link, index) => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.text;
    privacyLinks.appendChild(a);
    
    if (index < links.length - 1) {
        const separator = document.createElement('p');
        separator.textContent = '|';
        privacyLinks.appendChild(separator);
    }
});


reglament.appendChild(text);
reglament.appendChild(privacyLinks);
footer.appendChild(logoContainer);
footer.appendChild(reglament);

setTimeout(() => {
  document.body.appendChild(footer);
}, 10000)
