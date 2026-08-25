const KEY="mars_ai_game_step1_state";
const defaultState={coins:1250,gems:85,xp:420,level:4,streak:3,referrals:2,missions:1,owned:{fighter:1,car:1,runner:1},claimed:{}};
let state=JSON.parse(localStorage.getItem(KEY)||"null")||structuredClone(defaultState);
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const screen=document.getElementById("screen");

const data={
 fighter:{icon:"🥊",title:"AI Fighter",text:"Train, fight AI opponents and build your fighter."},
 racing:{icon:"🏎️",title:"AI Racing",text:"Race AI drivers, upgrade your car and chase records."},
 runner:{icon:"🏃",title:"Endless Runner",text:"Run farther, avoid obstacles and beat your high score."}
};

function nav(route){history.pushState({route},"","#"+route);render(route)}
function go(route){nav(route)}
function back(){history.back()}
window.addEventListener("popstate",()=>render(location.hash.slice(1)||"home"));

function layout(title,body){
 return `<div class="back"><button class="button secondary" data-action="back">← Back</button></div><h2>${title}</h2>${body}`;
}
function gameCard(k){
 const d=data[k];
 return `<div class="card"><div style="font-size:28px">${d.icon}</div><h3>${d.title}</h3><p>${d.text}</p><button class="button" data-game="${k}">Open</button></div>`;
}

function render(route){
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.route===route||route==="game"&&b.dataset.route==="games"));
 let html="";
 if(route==="home") html=home();
 else if(route==="games") html=games();
 else if(route==="missions") html=missions();
 else if(route==="leaderboard") html=leaderboard();
 else if(route==="profile") html=profile();
 else if(route==="shop") html=shop();
 else if(route==="boxes") html=boxes();
 else if(route==="referral") html=referral();
 else if(route==="game") html=gameScreen(sessionStorage.getItem("mars_game")||"fighter");
 else html=home();
 screen.innerHTML=html;
}

function home(){
 return `<section class="hero"><h1>Welcome to Mars AI</h1><p class="muted">Your game hub is ready. This is Step 1: the frontend foundation.</p>
 <div class="stats"><div class="stat"><b>🪙 ${state.coins}</b><span>Coins</span></div><div class="stat"><b>💎 ${state.gems}</b><span>Gems</span></div><div class="stat"><b>⭐ ${state.xp}</b><span>XP</span></div></div>
 <div class="two-col"><button class="button" data-route="games">🎮 Play</button><button class="button secondary" data-route="missions">🎯 Missions</button></div></section>
 <div class="section-title"><h2>Games</h2></div><div class="grid">${gameCard("fighter")}${gameCard("racing")}${gameCard("runner")}</div>
 <div class="section-title"><h2>More</h2></div><div class="grid"><div class="card"><h3>🛒 Shop</h3><p>Items and upgrades.</p><button class="button" data-route="shop">Open</button></div><div class="card"><h3>🎁 Boxes</h3><p>Reward boxes.</p><button class="button" data-route="boxes">Open</button></div><div class="card"><h3>👥 Referral</h3><p>Referral progress.</p><button class="button" data-route="referral">Open</button></div></div>`;
}
function games(){return layout("🎮 Games",`<div class="notice">Choose a game. These are Step 1 demo screens; real game logic and server validation come later.</div><div class="grid">${gameCard("fighter")}${gameCard("racing")}${gameCard("runner")}</div>`)}
function gameScreen(k){
 const d=data[k]||data.fighter;
 return layout(`${d.icon} ${d.title}`,`<div class="hero"><h1>Game ready</h1><p class="muted">${d.text}</p><p class="muted">Your Level: ${state.level} · XP: ${state.xp}</p><button class="button" data-demo-reward>Play demo round</button></div><div class="notice">This button only demonstrates the Step 1 UI. It does not award real rewards yet.</div>`);
}
function missions(){return layout("🎯 Missions",`<div class="list"><div class="row"><div><b>Play a game</b><div class="muted">Complete one demo round</div></div><span class="pill">${state.missions? "1/1":"0/1"}</span></div><div class="row"><div><b>Keep your streak</b><div class="muted">Build consecutive wins</div></div><span class="pill">${state.streak} days</span></div></div>`)}
function leaderboard(){return layout("🏆 Weekly Leaderboard",`<div class="notice">Step 1 demo leaderboard. Real weekly scoring and automatic rewards will be backend features.</div><div class="list">${["You","Player 2","Player 3","Player 4","Player 5"].map((n,i)=>`<div class="row"><b>#${i+1} ${n}</b><span>${Math.max(100,state.xp-i*55)} pts</span></div>`).join("")}</div>`)}
function profile(){return layout("👤 Profile",`<div class="hero"><h1>Game ID: DEMO-001</h1><p class="muted">Telegram account linking will be added after hosting.</p><div class="stats"><div class="stat"><b>${state.level}</b><span>Level</span></div><div class="stat"><b>${state.streak}</b><span>Streak</span></div><div class="stat"><b>${state.referrals}</b><span>Referrals</span></div></div></div><div class="grid"><div class="card"><h3>🥊 Fighter</h3><p>${state.owned.fighter} owned</p></div><div class="card"><h3>🏎️ Car</h3><p>${state.owned.car} owned</p></div><div class="card"><h3>🏃 Runner</h3><p>${state.owned.runner} owned</p></div></div>`)}
function shop(){return layout("🛒 Shop",`<div class="grid"><div class="card"><h3>⚔️ Fighter Upgrade</h3><p>Demo price: 100 coins</p><button class="button" data-buy="fighter">Buy</button></div><div class="card"><h3>🏎️ Car Upgrade</h3><p>Demo price: 100 coins</p><button class="button" data-buy="car">Buy</button></div></div>`)}
function boxes(){return layout("🎁 Boxes",`<div class="grid"><div class="card"><h3>Basic Box</h3><p>Demo reward box</p><button class="button" data-box="basic">Open</button></div><div class="card"><h3>Premium Box</h3><p>Demo reward box</p><button class="button" data-box="premium">Open</button></div><div class="card"><h3>Legendary Box</h3><p>Demo reward box</p><button class="button" data-box="legendary">Open</button></div></div>`)}
function referral(){return layout("👥 Referral",`<div class="hero"><h1>${state.referrals} referrals</h1><p class="muted">The real Telegram referral link and server-side anti-abuse checks will be connected later.</p><button class="button secondary" data-copy>Copy demo referral</button></div>`)}
document.addEventListener("click",e=>{
 const r=e.target.closest("[data-route]")?.dataset.route;if(r){go(r);return}
 const a=e.target.closest("[data-action]")?.dataset.action;if(a==="home"){go("home");return}if(a==="profile"){go("profile");return}if(a==="back"){back();return}
 const g=e.target.closest("[data-game]")?.dataset.game;if(g){sessionStorage.setItem("mars_game",g);go("game");return}
 const buy=e.target.closest("[data-buy]")?.dataset.buy;if(buy){if(state.coins>=100){state.coins-=100;state.owned[buy]=(state.owned[buy]||0)+1;save();render("shop");alert("Demo purchase completed.");}else alert("Not enough coins.");return}
 const box=e.target.closest("[data-box]")?.dataset.box;if(box){const reward=box==="legendary"?250:box==="premium"?100:50;state.coins+=reward;save();render("boxes");alert(`Demo box opened: +${reward} coins`);return}
 if(e.target.closest("[data-demo-reward]")){state.xp+=25;state.missions=0;save();render("game");alert("Demo round complete: +25 XP");return}
 if(e.target.closest("[data-copy]")){navigator.clipboard?.writeText("https://YOUR-GAME-URL.example");alert("Demo referral copied.");}
});
render(location.hash.slice(1)||"home");
