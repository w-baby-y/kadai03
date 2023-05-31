let cards = [
  // SSR 1%
  { type: "SSR", name: "Nyan Cat", image: "img/ssr001.gif" },
  { type: "SSR", name: "なでなで", image: "img/ssr002.gif" },

  // SR 3%
  ...Array(6).fill({ type: "SR", name: "さくらみこ", image: "img/sr.avif" }),

  // R
  ...Array(10).fill({ type: "R", name: "ソルトベイ", image: "img/001.gif" }),
  ...Array(10).fill({ type: "R", name: "Troll Face", image: "img/002.webp" }),
  ...Array(10).fill({ type: "R", name: "Doge", image: "img/003.webp" }),
  ...Array(10).fill({
    type: "R",
    name: "5000兆円欲しい",
    image: "img/004.jpg",
  }),
  ...Array(10).fill({
    type: "R",
    name: "スプーのえかきうた",
    image: "img/005.jpg",
  }),
  ...Array(10).fill({
    type: "R",
    name: "千円札でタバコ一個…妙だな…",
    image: "img/006.jpg",
  }),
  ...Array(10).fill({ type: "R", name: "尻振り猫と鳥", image: "img/007.gif" }),
  ...Array(10).fill({ type: "R", name: "パルクール", image: "img/008.gif" }),
  ...Array(10).fill({ type: "R", name: "宇宙猫", image: "img/009.jpg" }),
  ...Array(10).fill({
    type: "R",
    name: "尻振り猫とオニール",
    image: "img/010.gif",
  }),
  ...Array(10).fill({
    type: "R",
    name: "ソリイヌ",
    image: "img/011.gif",
  }),
  ...Array(10).fill({
    type: "R",
    name: "中継に映る美女",
    image: "img/012.gif",
  }),
  ...Array(10).fill({
    type: "R",
    name: "バイバイグマ",
    image: "img/013.gif",
  }),
  ...Array(10).fill({
    type: "R",
    name: "奇跡のゴール",
    image: "img/014.gif",
  }),
  ...Array(10).fill({
    type: "R",
    name: "ヒーローインタビュー",
    image: "img/015.gif",
  }),
  ...Array(10).fill({
    type: "R",
    name: "因果応報",
    image: "img/016.gif",
  }),
  ...Array(10).fill({
    type: "R",
    name: "旅立ち",
    image: "img/017.gif",
  }),
  ...Array(11).fill({
    type: "R",
    name: "怠惰の極み",
    image: "img/018.gif",
  }),
  ...Array(11).fill({
    type: "R",
    name: "ボッシュート",
    image: "img/019.gif",
  }),
];
// localStorage内のキー「cardCollection」の文字列(JSON)を配列に変換。|| []は未定義なら空の配列にする
let collection = JSON.parse(localStorage.getItem("cardCollection")) || [];

//グローバル変数を初期化
let ssrGet = 0;
let srGet = 0;
let rGet = 0;
let ssrProb = 0;
let srProb = 0;
let rProb = 0;
let API_KEY = "";

//obniz用のコード
// https://docs.obniz.com/ja/guides/obniz-starter-kit/iot-by-html-and-javascript/detect-button-on-browser
var obniz = new Obniz("OBNIZ_ID_HERE"); //自分のobnizのIDを指定
obniz.onconnect = async function () {
  //obnizが繋がったら...
  var button = obniz.wired("Keyestudio_Button", { signal: 0, vcc: 1, gnd: 2 }); //ボタンのライブラリを指定
  button.onchange = function (pressed) {
    if (pressed == true) {
      gacha();
    }
    console.log("pressed:" + pressed);
  };
};

//APIKEYの入力を求めるようにした。APIKEYが未定義ならプロンプトを表示しローカルストレージに保存。保存済みなら変数に格納
if (localStorage.getItem("APIKEY") == null) {
  do {
    API_KEY = prompt("APIKEYの入力");
  } while (API_KEY === null || API_KEY.trim().length === 0);
  localStorage.setItem("APIKEY", API_KEY);
} else {
  API_KEY = localStorage.getItem("APIKEY");
}
// if (localStorage.getItem("APIKEY") == null) {
//   API_KEY = prompt("APIKEYの入力");
//   localStorage.setItem("APIKEY", API_KEY);
// } else {
//   API_KEY = localStorage.getItem("APIKEY");
// }
console.log(API_KEY, "APIKEY");
// 画面更新時に空データだとtableに何も表示されなくなるので追加。と思ったけどうまく動かない。init()を修正
// localStorage.setItem("ssr", ssrGet);
// localStorage.setItem("sr", srGet);
// localStorage.setItem("r", rGet);

//画面更新時にローカルストレージにデータが残っていればライブラリ及び試行回数表示
displayAdd();
init();

// カードを選ぶ
function drawCard() {
  let index = Math.floor(Math.random() * cards.length);
  return cards[index];
}

//コレクションに取得したカードを追加
function displayAdd() {
  console.log("display");
  //   毎回全要素を生成しているので一度消さないと行けない
  $("#collection").empty();
  for (let card of collection) {
    collect = `
    <div class="card ${card.type}">
        <h5>${card.type} ミーム</h5>
        <div class="imgContainer">
        <img src="${card.image}" alt="${card.type} カード">
        </div>
        <h5>${card.name}</h5>
    </div>
    `;
    $("#collection").append(collect);
  }
}

function gacha() {
  //   console.log("test");
  let card = drawCard();
  collection.unshift(card);
  //cardCollectionというキーでcollectionの配列をJSONに変換。
  localStorage.setItem("cardCollection", JSON.stringify(collection));
  //   console.log(card);
  let choice = `
        <div class="${card.type}">
        <h2>${card.type} ミーム</h2>
        <div class="cardImgContainer">
        <img  src="${card.image}" alt="${card.type} カード">
        </div>
        <h2>${card.name}</h2>
        </div>
    `;
  // $("#choice-card").html(choice);

  // 一旦HTMLを更新してから、アニメーションをリセットします
  $("#choice-card").html(choice);
  // 既存の'rotate'クラスを削除
  $("#choice-card").removeClass("rotate");
  // 短い遅延後に'rotate'クラスを再追加
  setTimeout(function () {
    $("#choice-card").addClass("rotate");
  }, 1);

  //コレクションの更新
  displayAdd();
  // 各レアカードの取得回数を保存
  if (card.type == "SSR") {
    ssrGet++;
    localStorage.setItem("ssr", ssrGet); //画面更新時にデータがなくならないように保存
  } else if (card.type == "SR") {
    srGet++;
    localStorage.setItem("sr", srGet);
  } else {
    rGet++;
    localStorage.setItem("r", rGet);
  }
  //各レアカードの確率計算
  ssrProb = Math.round((ssrGet / collection.length) * 100);
  console.log(ssrProb, "SSRの確率");
  $("#SSR").text(ssrProb + "%");
  $("#SSRNum").text(ssrGet);

  srProb = Math.round((srGet / collection.length) * 100);
  console.log(srProb, "SRの確率");
  $("#SR").text(srProb + "%");
  $("#SRNum").text(srGet);

  rProb = Math.round((rGet / collection.length) * 100);
  console.log(rProb, "Rの確率");
  $("#R").text(rProb + "%");
  $("#RNum").text(rGet);
}

//https://1-notes.com/javascript-openai-api-sample-code/
//ChatGPT APIの利用
async function sendPrompt(prompt = "") {
  // let API_KEY = ""; //アップロードしない。今回はローカルストレージに保存したが本来はサーバーサイドに保管が必須

  // promptがない場合
  if (!prompt) return;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      // model: "text-curie-001", // 動作テスト用（料金的に）
      prompt: prompt,
      max_tokens: 150, // 出力される文章量の最大値（トークン数） max:4096
      temperature: 1, // 単語のランダム性 min:0.1 max:2.0
      top_p: 1, // 単語のランダム性 min:-2.0 max:2.0
      frequency_penalty: 0.0, // 単語の再利用 min:-2.0 max:2.0
      presence_penalty: 0.6, // 単語の再利用 min:-2.0 max:2.0
      stop: [" Human:", " AI:"], // 途中で生成を停止する単語
    }),
  });

  const data = await response.json();
  console.log(data.choices[0].text.trim());
  return data.choices[0].text.trim();
  // const data2 = data.choices[0].text.trim();
  // return data2;
}

//復帰処理
function init() {
  // ローカルストレージに保存しているガチャの結果があれば復帰。
  //ローカルストレージ各値が未定義だった際に表示がバグるのでifで条件分け
  // console.log(localStorage.getItem("ssr"));
  if (localStorage.getItem("ssr") == null) {
    ssrGet = 0;
  } else {
    ssrGet = localStorage.getItem("ssr");
  }
  if (localStorage.getItem("sr") == null) {
    srGet = 0;
  } else {
    srGet = localStorage.getItem("sr");
  }
  if (localStorage.getItem("r") == null) {
    rGet = 0;
  } else {
    rGet = localStorage.getItem("r");
  }
  // ssrGet = localStorage.getItem("ssr");
  // srGet = localStorage.getItem("sr");
  // rGet = localStorage.getItem("r");
  //結果一覧を計算
  ssrProb = Math.round((ssrGet / collection.length) * 100);
  srProb = Math.round((srGet / collection.length) * 100);
  rProb = Math.round((rGet / collection.length) * 100);
  $("#SSR").text(ssrProb + "%");
  $("#SR").text(srProb + "%");
  $("#R").text(rProb + "%");
  $("#SSRNum").text(ssrGet);
  $("#SRNum").text(srGet);
  $("#RNum").text(rGet);
}

// 単発ガチャ実行
$("#btn").on("click", function () {
  gacha();
});

//clear クリックイベント
$("#clear").on("click", function () {
  collection = [];
  // 全部消しちゃうとAPIKEYも消えるので変更
  // localStorage.clear();
  localStorage.removeItem("ssr");
  localStorage.removeItem("sr");
  localStorage.removeItem("r");
  localStorage.removeItem("cardCollection");
  $("#collection").empty();
  $("#aiText").empty();
  ssrGet = 0;
  srGet = 0;
  rGet = 0;
  ssrProb = 0;
  srProb = 0;
  rProb = 0;
  $("#SSR").text(ssrProb + "%");
  $("#SR").text(srProb + "%");
  $("#R").text(rProb + "%");
  $("#SSRNum").text(ssrGet);
  $("#SRNum").text(srGet);
  $("#RNum").text(rGet);
});

//AIに相談ボタンを押下したとき実行
$("#AI").on("click", function () {
  const c =
    "1回300円のガチャを" +
    collection.length +
    "回し、SSRが" +
    ssrGet +
    "回当たりました。これ以上回したほうがいいですか？最大150文字で回答してください。";

  console.log(c, "AIに入力する言葉");

  sendPrompt(c).then(function (aiText) {
    $("#aiText").html('<img src="img/icon.png" alt="AI"><br>');
    $("#aiText").append("ChatGPTの回答：" + aiText);
    // console.log(aiText);
  });
});

$("#apiClear").on("click", function () {
  localStorage.removeItem("APIKEY");
});

//https://filmora.wondershare.jp/video-editing-tips/famous-internet-meme.html
//https://note.com/studyfan/n/na0caf80db096
//https://filmora.wondershare.jp/meme-maker/
// https://gifmagazine.net/matome/2389
