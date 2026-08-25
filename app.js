const KEY="mars_ai_game_v2_state";

const defaultState={
  coins:1250,
  gems:85,
  xp:420,
  level:4,
  streak:3,
  referrals:2,
  missionsDone:1,
  claimedDaily:false,

  owned:{
    characters:["Raven"],
    cars:["Apex GT"]
  },

  equipped:{
    character:"Raven",
    car:"Apex GT"
  },

  rank:"Bronze I"
};

let state=
  JSON.parse(localStorage.getItem(KEY)||"null")
  || structuredClone(defaultState);

const save=()=>localStorage.setItem(
  KEY,
  JSON.stringify(state)
);

const screen=document.getElementById("screen");

const games={

  competitive:{
    icon:"🪖",
    title:"Iron Front: Reckoning",
    desc:"Competitive AI combat with tactical squads and multiple battle modes.",

    modes:[
      ["br","Battle Royale","50 combatants • You + 3 AI teammates"],
      ["cs","Clash Squad","4v4 • round-based tactical combat"],
      ["lw","Lone Wolf","1v1 or 2v2 • fast close combat"],
      ["tdm","Team Deathmatch","4v4 • first team to the target"],
      ["dom","Domination","4v4 • capture and hold objectives"],
      ["snd","Search & Destroy","4v4 • attack and defend"],
      ["survival","Survival","Squad vs increasingly difficult AI waves"],
      ["gun","Gun Game","Progress through a weapon ladder"],
      ["sniper","Sniper Arena","1v1 or 2v2 precision combat"]
    ]
  },

  racing:{
    icon:"🏎️",
    title:"Velocity Rush",
    desc:"Race AI drivers, build your garage and chase records.",

    modes:[
      ["normal","Normal Race","8 total • You + 7 AI"],
      ["police","Police Chase","Escape the pursuing AI police"],
      ["street","Street Race","Point-to-point city competition"],
      ["time","Time Trial","Beat the target time"],
      ["elim","Elimination","Last-place racer is removed each stage"],
      ["drift","Drift Challenge","Score points with controlled drifting"]
    ]
  },

  runner:{
    icon:"🏃",
    title:"Neon Run",
    desc:"Fast obstacle action with records, upgrades and AI challenges.",

    modes:[
      ["endless","Endless Run","Survive as long as possible"],
      ["time","Time Run","Finish before the clock expires"],
      ["obstacle","Obstacle Rush","Clear increasingly difficult obstacles"],
      ["coin","Coin Rush","Collect while surviving hazards"],
      ["boss","Boss Run","Survive special challenge sections"]
    ]
  },

  fighter:{
    icon:"🥊",
    title:"Warborn Arena",
    desc:"Close-combat battles, tournaments and boss encounters.",

    modes:[
      ["story","Story Fight","Progress through AI opponents"],
      ["tournament","Tournament","Fight through a bracket"],
      ["duel","1v1 Arena","One fighter versus one AI"],
      ["survival","Survival","Defeat successive opponents"],
      ["boss","Boss Fight","Face a powerful AI opponent"],
      ["training","Training","Learn attacks and combos"]
    ]
  },

  moto:{
    icon:"🏍️",
    title:"Moto Rush",
    desc:"High-speed motorcycle competition.",

    modes:[
      ["race","Normal Race","You + AI riders"],
      ["traffic","Traffic Rush","Ride through dense traffic"],
      ["police","Police Escape","Outrun AI police"],
      ["time","Time Trial","Beat the clock"],
      ["stunt","Stunt Run","Score through risky stunts"]
    ]
  },

  hunt:{
    icon:"🏹",
    title:"Survival Hunt",
    desc:"Explore, survive and complete AI-driven field missions.",

    modes:[
      ["wilderness","Wilderness Survival","Manage threats and resources"],
      ["hunt","Hunt","Track AI targets"],
      ["resource","Resource Run","Gather and reach extraction"],
      ["night","Night Survival","Survive the night"],
      ["rescue","Rescue Mission","Locate and protect targets"]
    ]
  },

  football:{
    icon:"⚽",
    title:"Street Football",
    desc:"Small-sided football against AI teams.",

    modes:[
      ["1v1","1v1","Quick street duel"],
      ["2v2","2v2","You + AI teammate vs AI duo"],
      ["3v3","3v3","Small-sided team match"],
      ["penalty","Penalty Shootout","Pressure finishing"],
      ["skill","Skill Challenge","Timed technical challenge"]
    ]
  },

  hoops:{
    icon:"🏀",
    title:"Street Hoops",
    desc:"Fast basketball challenges against AI.",

    modes:[
      ["1v1","1v1","One-on-one"],
      ["2v2","2v2","Team play"],
      ["3v3","3v3","Half-court competition"],
      ["shootout","Shootout","Timed shooting"],
      ["time","Time Challenge","Score before time runs out"]
    ]
  },

  tactical:{
    icon:"🎯",
    title:"Tactical Strike",
    desc:"Objective-based tactical missions powered by AI.",

    modes:[
      ["mission","Tactical Mission","Complete the objective"],
      ["defense","Defense","Hold the position"],
      ["escort","Escort","Protect the target"],
      ["elimination","Elimination","Clear hostile AI"],
      ["survival","Survival","Hold out under pressure"]
    ]
  },

  archery:{
    icon:"🏹",
    title:"Archery Arena",
    desc:"Precision shooting and competitive AI challenges.",

    modes:[
      ["target","Target Practice","Accuracy training"],
      ["time","Time Challenge","Score before time expires"],
      ["duel","AI Duel","Precision versus AI"],
      ["range","Long Range","Distance accuracy"],
      ["tournament","Tournament","Progress through rounds"]
    ]
  }

};

const gameOrder=[
  "competitive",
  "racing",
  "runner",
  "fighter",
  "moto",
  "hunt",
  "football",
  "hoops",
  "tactical",
  "archery"
];

function nav(route,extra=""){

  history.pushState(
    {route},
    "",
    "#"+route+(extra?"/"+extra:"")
  );

  render(route,extra);
}

function back(){
  history.back();
}

window.addEventListener("popstate",()=>{

  const p=
    location.hash
    .slice(1)
    .split("/");

  render(
    p[0]||"home",
    p[1]||""
  );

});

function money(){

  return `
    <div class="currency">

      <div class="money">
        🪙
        <b>${state.coins.toLocaleString()}</b>
        <span>Coins</span>
      </div>

      <div class="money">
        💎
        <b>${state.gems.toLocaleString()}</b>
        <span>Gems</span>
      </div>

    </div>
  `;
}

function gameCard(k){

  const g=games[k];

  return `
    <div class="card game-card">

      <div>

        <div class="game-icon">
          ${g.icon}
        </div>

        <h3>
          ${g.title}
        </h3>

        <p>
          ${g.desc}
        </p>

      </div>

      <button
        class="button"
        data-game="${k}">
        Open Lobby
      </button>

    </div>
  `;
}

function layout(title,body){

  return `
    <div class="back">

      <button
        class="button secondary"
        data-action="back">
        ← Back
      </button>

    </div>

    <h2>${title}</h2>

    ${body}
  `;
}

function home(){

  return `

    <section class="hero">

      <p class="muted">
        WELCOME BACK
      </p>

      <h1>
        Ready to play?
      </h1>

      <p class="muted">
        Your Mars AI game hub.
      </p>

      ${money()}

      <div class="two-col">

        <button
          class="button"
          data-route="games">
          🎮 PLAY
        </button>

        <button
          class="button secondary"
          data-route="earn">
          🪙 EARN
        </button>

      </div>

    </section>

    <section class="featured">

      <div class="tag">
        FEATURED GAME
      </div>

      <h2>
        🪖 IRON FRONT: RECKONING
      </h2>

      <p>
        Competitive AI combat.
        Train, choose your mode
        and enter the fight.
      </p>

      <button
        class="button"
        data-game="competitive">
        Enter Combat Lobby
      </button>

    </section>

    <div class="section-title">
      <h2>Quick Access</h2>
    </div>

    <div class="grid">

      <div class="card">

        <h3>🎯 Missions</h3>

        <p>
          Complete objectives
          and earn rewards.
        </p>

        <button
          class="button"
          data-route="missions">
          Open
        </button>

      </div>

      <div class="card">

        <h3>🎁 Rewards</h3>

        <p>
          Daily and event rewards.
        </p>

        <button
          class="button"
          data-route="rewards">
          Open
        </button>

      </div>

      <div class="card">

        <h3>🛒 Store</h3>

        <p>
          Spend Coins and Gems.
        </p>

        <button
          class="button"
          data-route="shop">
          Open
        </button>

      </div>

      <div class="card">

        <h3>🏆 Rank</h3>

        <p>
          ${state.rank}
          •
          Level ${state.level}
        </p>

        <button
          class="button"
          data-route="leaderboard">
          Open
        </button>

      </div>

    </div>
  `;
}

function gamesPage(){

  return layout(
    "🎮 Game Hub",

    `

      <div class="notice">

        Choose a game to enter its
        dedicated lobby.

        Each game has its own modes,
        progression and equipment.

      </div>

      <div class="grid">

        ${gameOrder.map(gameCard).join("")}

      </div>

    `
  );
}

function gameLobby(k){

  const g=games[k];

  let extra="";

  if(k==="racing"){

    extra=`

      <div class="section-title">
        <h2>Garage</h2>
      </div>

      <div class="card">

        <h3>
          🚗 ${state.equipped.car}
        </h3>

        <p>

          ${state.owned.cars.length}
          car(s) owned.

          Buy and equip cars
          from your garage.

        </p>

        <button
          class="button"
          data-route="garage">
          Open Garage
        </button>

      </div>

    `;
  }

  if(k==="competitive"){

    extra=`

      <div class="section-title">
        <h2>Combat Hub</h2>
      </div>

      <div class="grid">

        <div class="card">

          <h3>🪖 Character</h3>

          <p>
            ${state.equipped.character}
            equipped
          </p>

        </div>

        <div class="card">

          <h3>🔫 Loadout</h3>

          <p>
            Weapons, armor,
            Gloo Wall and equipment.
          </p>

        </div>

        <div class="card">

          <h3>🏋️ Training Ground</h3>

          <p>
            Learn movement, aim,
            shooting, healing and
            controls before a real match.
          </p>

          <button
            class="button"
            data-mode="training">
            Train
          </button>

        </div>

        <div class="card">

          <h3>🎛️ Controls</h3>

          <p>
            Choose Standard,
            Advanced or Custom
            touch controls.
          </p>

          <button
            class="button secondary"
            data-route="controls">
            Configure
          </button>

        </div>

      </div>

    `;
  }

  return layout(

    `${g.icon} ${g.title}`,

    `

      <div class="hero">

        <h1>
          Game Lobby
        </h1>

        <p class="muted">
          ${g.desc}
        </p>

        ${money()}

      </div>

      ${extra}

      <div class="section-title">
        <h2>Modes</h2>
      </div>

      <div class="grid">

        ${g.modes.map(m=>`

          <div class="card mode-card">

            <h3>
              ${m[1]}
            </h3>

            <small>
              ${m[2]}
            </small>

            <button
              class="button"
              data-mode="${m[0]}"
              data-game-mode="${k}">
              Play
            </button>

          </div>

        `).join("")}

      </div>

    `
  );
}

function modePreview(k,m){

  const g=games[k];

  const mode=
    g.modes.find(x=>x[0]===m)
    ||
    [m,m,""];

  return layout(

    `${g.icon} ${mode[1]}`,

    `

      <div class="hero">

        <p class="pill">
          ${g.title}
        </p>

        <h1>
          ${mode[1]}
        </h1>

        <p class="muted">
          ${mode[2]}
        </p>

        <div class="stat-grid">

          <div class="stat">

            <b>
              ${
                k==="competitive" &&
                m==="br"
                ? "50"
                : "AI"
              }
            </b>

            <span>
              Participants
            </span>

          </div>

          <div class="stat">

            <b>
              200
            </b>

            <span>
              Base HP*
            </span>

          </div>

          <div class="stat">

            <b>
              🧱
            </b>

            <span>
              Gloo Wall
            </span>

          </div>

        </div>

        <button
          class="button"
          data-start="${k}/${m}">
          START MATCH
        </button>

      </div>

      <div class="notice">

        This is the new playable-foundation
        stage.

        The actual match engine will be built
        mode-by-mode; this screen does not pretend
        the finished combat engine already exists.

      </div>

    `
  );
}

function missions(){

  return layout(

    "🎯 Missions",

    `

      <div class="list">

        <div class="row">

          <div>

            <b>
              Play a game
            </b>

            <div class="muted">
              Complete a match
              or training activity
            </div>

          </div>

          <span class="pill">
            ${state.missionsDone}/1
          </span>

        </div>

        <div class="row">

          <div>

            <b>
              Keep your streak
            </b>

            <div class="muted">
              Current streak
            </div>

          </div>

          <span class="pill">
            ${state.streak} days
          </span>

        </div>

      </div>

    `
  );
}

function rewards(){

  return layout(

    "🎁 Rewards",

    `

      <div class="hero">

        <h1>
          Daily Reward
        </h1>

        <p class="muted">

          ${
            state.claimedDaily
            ? "Already claimed today."
            : "Claim your daily reward."
          }

        </p>

        <button
          class="button"
          data-daily
          ${state.claimedDaily?"disabled":""}>

          ${
            state.claimedDaily
            ? "Claimed"
            : "Claim +100 Coins"
          }

        </button>

      </div>

    `
  );
}

function earn(){

  return layout(

    "🪙 Earn Coins",

    `

      <div class="hero">

        <h1>
          Coin Center
        </h1>

        <p class="muted">

          Permanent account Coins are
          earned here and through game
          activities.

          They are separate from temporary
          Clash Squad Credits.

        </p>

        ${money()}

      </div>

      <div class="grid">

        <div class="card">

          <h3>
            🎯 Daily Missions
          </h3>

          <p>
            Complete objectives
            to earn Coins.
          </p>

        </div>

        <div class="card">

          <h3>
            🔥 Streaks
          </h3>

          <p>
            Maintain activity streaks
            for bonuses.
          </p>

        </div>

        <div class="card">

          <h3>
            🏆 Milestones
          </h3>

          <p>
            Progress milestones
            award Coins.
          </p>

        </div>

        <div class="card">

          <h3>
            🎪 Events
          </h3>

          <p>
            Limited-time Coin
            opportunities.
          </p>

        </div>

      </div>

    `
  );
}

function leaderboard(){

  return layout(

    "🏆 Rank",

    `

      <div class="hero">

        <h1>
          ${state.rank}
        </h1>

        <p class="muted">

          Level ${state.level}
          •
          ${state.xp} XP

        </p>

      </div>

      <div class="list">

        ${
          [
            "You",
            "AI Vanguard",
            "AI Sentinel",
            "AI Phantom",
            "AI Titan"
          ]

          .map((n,i)=>`

            <div class="row">

              <b>
                #${i+1} ${n}
              </b>

              <span>
                ${Math.max(
                  100,
                  state.xp-i*55
                )}
                pts
              </span>

            </div>

          `)
          .join("")
        }

      </div>

    `
  );
}

function profile(){

  return layout(

    "👤 Profile",

    `

      <div class="hero">

        <h1>
          Player Profile
        </h1>

        <p class="muted">

          Telegram account linking can
          replace the local demo identity
          when the backend is connected.

        </p>

        ${money()}

        <div class="stat-grid">

          <div class="stat">

            <b>
              ${state.level}
            </b>

            <span>
              Level
            </span>

          </div>

          <div class="stat">

            <b>
              ${state.streak}
            </b>

            <span>
              Streak
            </span>

          </div>

          <div class="stat">

            <b>
              ${state.referrals}
            </b>

            <span>
              Referrals
            </span>

          </div>

        </div>

      </div>

      <div class="grid">

        <div class="card">

          <h3>
            🪖 Character
          </h3>

          <p>
            ${state.equipped.character}
          </p>

        </div>

        <div class="card">

          <h3>
            🏎️ Car
          </h3>

          <p>
            ${state.equipped.car}
          </p>

        </div>

      </div>

    `
  );
}

function shop(){

  return layout(

    "🛒 Store",

    `

      <div class="notice">

        Permanent Coins and Gems are used
        for account purchases.

        Competitive match Credits
        are separate.

      </div>

      <div class="grid">

        <div class="card">

          <h3>
            🪖 Character
          </h3>

          <p>
            Premium character unlock.
          </p>

          <button
            class="button"
            data-buy="character">
            Buy • 500 Coins
          </button>

        </div>

        <div class="card">

          <h3>
            🏎️ Car
          </h3>

          <p>
            Garage vehicle.
          </p>

          <button
            class="button"
            data-buy="car">
            Buy • 800 Coins
          </button>

        </div>

        <div class="card">

          <h3>
            💎 Premium Item
          </h3>

          <p>
            Special cosmetic.
          </p>

          <button
            class="button"
            data-gem-buy>
            Buy • 50 Gems
          </button>

        </div>

      </div>

    `
  );
}

function garage(){

  return layout(

    "🏎️ Garage",

    `

      <div class="hero">

        <h1>
          ${state.equipped.car}
        </h1>

        <p class="muted">
          Equip any car you own.
        </p>

      </div>

      <div class="list">

        ${
          state.owned.cars.map(c=>`

            <div class="row">

              <b>
                🚗 ${c}
              </b>

              <button
                class="button secondary"
                data-equip-car="${c}">

                ${
                  state.equipped.car===c
                  ? "Equipped"
                  : "Equip"
                }

              </button>

            </div>

          `).join("")
        }

      </div>

      <button
        class="button"
        data-route="shop">
        Buy Cars
      </button>

    `
  );
}

function controls(){

  return layout(

    "🎛️ Controls",

    `

      <div class="notice">

        Three selectable mobile control
        schemes.

        Custom will later allow button
        placement and sizing.

      </div>

      <div class="grid">

        <div class="card">

          <h3>
            Standard
          </h3>

          <p>
            Simple movement +
            combat buttons.
          </p>

          <button
            class="button"
            data-control="standard">
            Select
          </button>

        </div>

        <div class="card">

          <h3>
            Advanced
          </h3>

          <p>
            More direct aim/fire control.
          </p>

          <button
            class="button"
            data-control="advanced">
            Select
          </button>

        </div>

        <div class="card">

          <h3>
            Custom
          </h3>

          <p>
            Move and resize HUD controls.
          </p>

          <button
            class="button"
            data-control="custom">
            Select
          </button>

        </div>

      </div>

    `
  );
}

function render(route,extra=""){

  document
    .querySelectorAll(".bottom-nav button")
    .forEach(b=>{

      b.classList.toggle(
        "active",
        b.dataset.route===route
      );

    });

  let html="";

  if(route==="home")
    html=home();

  else if(route==="games")
    html=gamesPage();

  else if(route==="lobby")
    html=gameLobby(extra);

  else if(route==="mode")
    html=modePreview(...extra.split(":"));

  else if(route==="missions")
    html=missions();

  else if(route==="rewards")
    html=rewards();

  else if(route==="earn")
    html=earn();

  else if(route==="leaderboard")
    html=leaderboard();

  else if(route==="profile")
    html=profile();

  else if(route==="shop")
    html=shop();

  else if(route==="garage")
    html=garage();

  else if(route==="controls")
    html=controls();

  else
    html=home();

  screen.innerHTML=html;

}

document.addEventListener("click",e=>{

  const route=
    e.target.closest("[data-route]")
    ?.dataset.route;

  if(route){

    nav(route);

    return;
  }

  if(
    e.target.closest("[data-action='home']")
  ){

    nav("home");

    return;
  }

  if(
    e.target.closest("[data-action='profile']")
  ){

    nav("profile");

    return;
  }

  if(
    e.target.closest("[data-action='back']")
  ){

    back();

    return;
  }

  const game=
    e.target.closest("[data-game]")
    ?.dataset.game;

  if(game){

    nav("lobby",game);

    return;
  }

  const gm=
    e.target.closest("[data-game-mode]");

  if(gm){

    nav(
      "mode",
      gm.dataset.gameMode+
      ":"+
      gm.closest("[data-mode]").dataset.mode
    );

    return;
  }

  const mode=
    e.target.closest("[data-mode]")
    ?.dataset.mode;

  if(mode){

    nav(
      "mode",
      "competitive:"+mode
    );

    return;
  }

  if(
    e.target.closest("[data-start]")
  ){

    alert(
      "Match engine foundation ready. "+
      "Next build: the actual playable mode."
    );

    return;
  }

  if(
    e.target.closest("[data-daily]") &&
    !state.claimedDaily
  ){

    state.coins+=100;

    state.claimedDaily=true;

    save();

    render("rewards");

    return;
  }

  const buy=
    e.target.closest("[data-buy]")
    ?.dataset.buy;

  if(
    buy==="character" &&
    state.coins>=500
  ){

    state.coins-=500;

    state.owned.characters.push("Nova");

    save();

    render("shop");

    alert("Character purchased.");

    return;
  }

  if(
    buy==="car" &&
    state.coins>=800
  ){

    state.coins-=800;

    state.owned.cars.push("Velocity X");

    save();

    render("shop");

    alert("Car purchased.");

    return;
  }

  if(
    e.target.closest("[data-gem-buy]") &&
    state.gems>=50
  ){

    state.gems-=50;

    save();

    render("shop");

    alert("Premium item purchased.");

    return;
  }

  const car=
    e.target.closest("[data-equip-car]")
    ?.dataset.equipCar;

  if(car){

    state.equipped.car=car;

    save();

    render("garage");

    return;
  }

  const control=
    e.target.closest("[data-control]")
    ?.dataset.control;

  if(control){

    localStorage.setItem(
      "mars_control_scheme",
      control
    );

    alert(
      control+
      " controls selected."
    );

    return;
  }

});

function startLoading(){

  let p=0;

  const bar=
    document.getElementById("loadingBar");

  const txt=
    document.getElementById("loadingText");

  const loading=
    document.getElementById("loading");

  const app=
    document.getElementById("app");

  const timer=setInterval(()=>{

    p=Math.min(
      100,
      p+
      Math.floor(Math.random()*9)+3
    );

    bar.style.width=p+"%";

    txt.textContent=
      "LOADING "+p+"%";

    if(p>=100){

      clearInterval(timer);

      setTimeout(()=>{

        if(loading)
          loading.remove();

        if(app)
          app.hidden=false;

        const parts=
          location.hash
          .slice(1)
          .split("/");

        render(
          parts[0]||"home",
          parts[1]||""
        );

      },250);

    }

  },70);

}

startLoading();
