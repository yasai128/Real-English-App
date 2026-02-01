import React, { useState } from 'react';
import { ChevronRight, Check, X, RotateCcw, Award, ExternalLink } from 'lucide-react';

// ============================================
// 📌 アフィリエイトリンク設定(ここだけ編集!)
// ============================================
const AFFILIATE_LINKS = {
  // オンライン英会話(カフェ、仕事シーン用)
  onlineEnglish: "#",  // ← A8のDMM英会話やネイティブキャンプのリンクを貼る
  
  // シェアハウス(シェアハウスシーン用)
  shareHouse: "#",     // ← Crosshouseやオークハウスのリンクを貼る
  
  // 英語学習サービス(買い物、交通シーン用)
  englishLearning: "#", // ← 英語学習アプリや参考書のリンクを貼る
  
  // TomsJapanguideのnote
  noteLink: "https://note.com/lima128"
};
// ============================================

const RealEnglishApp = () => {
  const [selectedScene, setSelectedScene] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const scenes = [
    { id: 'cafe', name: 'カフェ・レストラン', icon: '☕', color: 'bg-amber-500' },
    { id: 'sharehouse', name: 'シェアハウス', icon: '🏠', color: 'bg-blue-500' },
    { id: 'shopping', name: 'スーパー・買い物', icon: '🛒', color: 'bg-green-500' },
    { id: 'work', name: 'バイト・職場', icon: '💼', color: 'bg-purple-500' },
    { id: 'transport', name: '交通・移動', icon: '🚇', color: 'bg-red-500' }
  ];

  const questions = {
    cafe: [
      {
        situation: "カフェでコーヒーを注文したい",
        question: "ネイティブが実際に使う表現は?",
        options: [
          { text: "Can I get a coffee?", correct: true },
          { text: "May I have a coffee, please?", correct: false },
          { text: "I would like to order a coffee.", correct: false }
        ],
        explanation: "ネイティブは 'Can I get...' が圧倒的に多い。'May I...'は丁寧すぎて逆に不自然。オーストラリアでは 'Can I grab a coffee?' もよく使う。"
      },
      {
        situation: "会計時、$15.50です",
        question: "店員が実際に言う表現は?",
        options: [
          { text: "That'll be fifteen fifty.", correct: true },
          { text: "It is fifteen dollars and fifty cents.", correct: false },
          { text: "The total is $15.50.", correct: false }
        ],
        explanation: "'That'll be...' が最も自然。数字は 'fifteen fifty' のように読む。セントまで正確に言わない。"
      },
      {
        situation: "$20出して、$15.50の会計",
        question: "お釣りを渡す時の表現は?",
        options: [
          { text: "Here's four fifty.", correct: true },
          { text: "Your change is four dollars and fifty cents.", correct: false },
          { text: "I will give you back $4.50.", correct: false }
        ],
        explanation: "'Here's...' + 金額が最もナチュラル。'four fifty' のように簡潔に。ドルやセントを省略する。"
      },
      {
        situation: "断りたい時",
        question: "友達の誘いを断る自然な表現は?",
        options: [
          { text: "I'm good, thanks.", correct: true },
          { text: "No, I don't need it.", correct: false },
          { text: "I must decline.", correct: false }
        ],
        explanation: "'I'm good' は断りの万能フレーズ。カジュアルで失礼じゃない。'No thanks' より柔らかい印象。"
      },
      {
        situation: "レストランでテイクアウト",
        question: "持ち帰りを伝える表現は?",
        options: [
          { text: "To go, please.", correct: true },
          { text: "I want takeaway.", correct: false },
          { text: "For taking out.", correct: false }
        ],
        explanation: "アメリカでは 'To go'、オーストラリアでは 'Takeaway' が一般的。'For here or to go?' と聞かれることも多い。"
      },
      {
        situation: "メニューのおすすめを聞きたい",
        question: "自然な聞き方は?",
        options: [
          { text: "What do you recommend?", correct: true },
          { text: "What is your recommendation?", correct: false },
          { text: "Please tell me good menu.", correct: false }
        ],
        explanation: "'What do you recommend?' がシンプルで自然。'What's good here?' もよく使う。"
      },
      {
        situation: "水がほしい",
        question: "店員に頼む表現は?",
        options: [
          { text: "Can I get some water?", correct: true },
          { text: "I want water, please.", correct: false },
          { text: "May I have water?", correct: false }
        ],
        explanation: "'Can I get...' が定番。オーストラリアでは水は無料が多いので気軽に頼める。"
      },
      {
        situation: "$8.75の会計、$10出した",
        question: "お釣りの言い方は?",
        options: [
          { text: "One twenty-five back.", correct: true },
          { text: "Your change is $1.25.", correct: false },
          { text: "I return one dollar twenty-five cents.", correct: false }
        ],
        explanation: "'数字 + back' が簡潔。'One twenty-five' のように読む。"
      },
      {
        situation: "料理の味はどう?と聞かれた",
        question: "美味しいと伝える自然な表現は?",
        options: [
          { text: "It's really good!", correct: true },
          { text: "The taste is delicious.", correct: false },
          { text: "This is very tasty.", correct: false }
        ],
        explanation: "'It's good!' / 'It's great!' が最も自然。'Delicious' も使うが少しフォーマル。"
      },
      {
        situation: "コーヒーのおかわりがほしい",
        question: "自然な頼み方は?",
        options: [
          { text: "Can I get a refill?", correct: true },
          { text: "One more coffee, please.", correct: false },
          { text: "I want another cup.", correct: false }
        ],
        explanation: "'refill' = おかわり。アメリカのカフェでは無料refillが多い。"
      },
      {
        situation: "予約したい",
        question: "電話での自然な表現は?",
        options: [
          { text: "I'd like to make a reservation.", correct: true },
          { text: "I want to reserve a table.", correct: false },
          { text: "Can you book for me?", correct: false }
        ],
        explanation: "'I'd like to make a reservation' が定番。人数と時間も一緒に伝える。"
      },
      {
        situation: "別々会計にしたい",
        question: "自然な伝え方は?",
        options: [
          { text: "Can we get separate checks?", correct: true },
          { text: "Please divide the bill.", correct: false },
          { text: "We want individual payment.", correct: false }
        ],
        explanation: "'Separate checks' が定番。オーストラリアでは 'split the bill' とも言う。"
      },
      {
        situation: "辛さを調整してほしい",
        question: "自然な頼み方は?",
        options: [
          { text: "Not too spicy, please.", correct: true },
          { text: "Please make it less hot.", correct: false },
          { text: "Reduce the spice level.", correct: false }
        ],
        explanation: "'Not too spicy' がシンプル。'Mild, please' も使える。"
      },
      {
        situation: "$23.40の会計、$30出した",
        question: "お釣りの正しい言い方は?",
        options: [
          { text: "Six sixty.", correct: true },
          { text: "Six dollars and sixty cents.", correct: false },
          { text: "$6.60 change.", correct: false }
        ],
        explanation: "お釣りは$6.60。'Six sixty' のように簡潔に読む。"
      },
      {
        situation: "アレルギーがある",
        question: "伝える自然な表現は?",
        options: [
          { text: "I'm allergic to nuts.", correct: true },
          { text: "I have nut allergy.", correct: false },
          { text: "Nuts are NG for me.", correct: false }
        ],
        explanation: "'I'm allergic to...' が定番表現。重要な情報なのではっきり伝える。"
      },
      {
        situation: "トイレの場所を聞く",
        question: "自然な聞き方は?",
        options: [
          { text: "Where's the restroom?", correct: true },
          { text: "Where is the toilet?", correct: false },
          { text: "Can you show me WC?", correct: false }
        ],
        explanation: "アメリカでは 'restroom' / 'bathroom'。'toilet' は直接的すぎる。オーストラリアでは 'toilet' でもOK。"
      },
      {
        situation: "チップを置く",
        question: "店員に伝える表現は?",
        options: [
          { text: "Keep the change.", correct: true },
          { text: "This is tip for you.", correct: false },
          { text: "Don't return money.", correct: false }
        ],
        explanation: "'Keep the change' = お釣りは取っておいて(チップとして)。オーストラリアはチップ文化ないので不要。"
      },
      {
        situation: "$50で、$47.85の会計",
        question: "お釣りを渡す時は?",
        options: [
          { text: "Two fifteen.", correct: true },
          { text: "Two dollars fifteen cents back.", correct: false },
          { text: "$2.15 change.", correct: false }
        ],
        explanation: "お釣りは$2.15。'Two fifteen' のように短く言う。"
      },
      {
        situation: "待ち時間を聞く",
        question: "自然な聞き方は?",
        options: [
          { text: "How long's the wait?", correct: true },
          { text: "What is the waiting time?", correct: false },
          { text: "How many minutes to wait?", correct: false }
        ],
        explanation: "'How long's the wait?' が定番。混んでる時によく使う表現。"
      },
      {
        situation: "食べきれない、持ち帰りたい",
        question: "自然な頼み方は?",
        options: [
          { text: "Can I get a box?", correct: true },
          { text: "Please give me takeout container.", correct: false },
          { text: "I want to bring this home.", correct: false }
        ],
        explanation: "'Can I get a box?' / 'Can I get this to go?' が定番。アメリカでは 'doggy bag' とも。"
      }
    ],
    sharehouse: [
      {
        situation: "入居日を確認したい",
        question: "自然な聞き方は?",
        options: [
          { text: "When can I move in?", correct: true },
          { text: "What is the move-in date?", correct: false },
          { text: "Please tell me the date I can enter.", correct: false }
        ],
        explanation: "'When can I...' がシンプルで自然。'move in' は引っ越しの定番表現。"
      },
      {
        situation: "Wi-Fiの調子が悪い",
        question: "ルームメイトに伝える表現は?",
        options: [
          { text: "The Wi-Fi's acting up.", correct: true },
          { text: "The Wi-Fi is broken.", correct: false },
          { text: "The Wi-Fi has a problem.", correct: false }
        ],
        explanation: "'acting up' = 調子が悪い、の口語表現。完全に壊れてなくても使える便利なフレーズ。"
      },
      {
        situation: "掃除当番を確認",
        question: "誰の番か聞く表現は?",
        options: [
          { text: "Whose turn is it?", correct: true },
          { text: "Who is responsible for cleaning?", correct: false },
          { text: "Who should clean today?", correct: false }
        ],
        explanation: "'Whose turn?' は当番制の定番フレーズ。シンプルで覚えやすい。"
      },
      {
        situation: "共有スペースが散らかっている",
        question: "優しく注意する表現は?",
        options: [
          { text: "Could you clean up after yourself?", correct: true },
          { text: "You must clean this area.", correct: false },
          { text: "Please organize your things.", correct: false }
        ],
        explanation: "'clean up after yourself' = 自分の後片付けをする。直接的すぎず、丁寧な言い方。"
      },
      {
        situation: "シャワーの時間を聞きたい",
        question: "自然な聞き方は?",
        options: [
          { text: "How long do you need?", correct: true },
          { text: "What time will you finish showering?", correct: false },
          { text: "Please tell me your shower duration.", correct: false }
        ],
        explanation: "'How long do you need?' は時間を聞く万能表現。シャワー以外でも使える。"
      },
      {
        situation: "家賃はいつ払う?",
        question: "自然な聞き方は?",
        options: [
          { text: "When's rent due?", correct: true },
          { text: "What is the rent payment date?", correct: false },
          { text: "When should I pay rent?", correct: false }
        ],
        explanation: "'When's rent due?' = 家賃の支払日は?の定番表現。'due' = 期限。"
      },
      {
        situation: "洗濯機を使いたい",
        question: "ルームメイトに確認する表現は?",
        options: [
          { text: "Are you using the washer?", correct: true },
          { text: "Is the washing machine available?", correct: false },
          { text: "Can I use laundry now?", correct: false }
        ],
        explanation: "'washer' = 洗濯機(口語)。'Are you using it?' が最もカジュアルで自然。"
      },
      {
        situation: "騒音がうるさい",
        question: "優しく伝える表現は?",
        options: [
          { text: "Could you keep it down a bit?", correct: true },
          { text: "Please be quiet.", correct: false },
          { text: "You are too noisy.", correct: false }
        ],
        explanation: "'keep it down' = 音を下げる。'a bit' をつけると柔らかい表現に。"
      },
      {
        situation: "冷蔵庫のスペースを使いたい",
        question: "確認する表現は?",
        options: [
          { text: "Is this shelf free?", correct: true },
          { text: "Can I use this refrigerator space?", correct: false },
          { text: "Is this area available for me?", correct: false }
        ],
        explanation: "'Is this free?' / 'Is this taken?' が自然な確認方法。"
      },
      {
        situation: "ゴミの日を聞く",
        question: "自然な聞き方は?",
        options: [
          { text: "When's bin day?", correct: true },
          { text: "What day is garbage collection?", correct: false },
          { text: "When should I throw trash?", correct: false }
        ],
        explanation: "オーストラリアでは 'bin day' = ゴミの日。'bin' = ゴミ箱。"
      },
      {
        situation: "暖房をつけたい",
        question: "ルームメイトに確認する表現は?",
        options: [
          { text: "Mind if I turn the heat on?", correct: true },
          { text: "Can I use the heater?", correct: false },
          { text: "Is it okay to start heating?", correct: false }
        ],
        explanation: "'Mind if I...' = 〜してもいい?のカジュアルな確認表現。"
      },
      {
        situation: "鍵を忘れた",
        question: "ルームメイトに連絡する表現は?",
        options: [
          { text: "I locked myself out.", correct: true },
          { text: "I forgot my key.", correct: false },
          { text: "I cannot enter the house.", correct: false }
        ],
        explanation: "'locked myself out' = 鍵を中に置いたまま締め出された。よくある表現。"
      },
      {
        situation: "パーティーしていい?",
        question: "ルームメイトに確認する表現は?",
        options: [
          { text: "Is it cool if I have some friends over?", correct: true },
          { text: "Can I do a party?", correct: false },
          { text: "May I invite people?", correct: false }
        ],
        explanation: "'Is it cool if...' = 〜していい?のカジュアル表現。'have friends over' = 友達を家に呼ぶ。"
      },
      {
        situation: "退去を伝える",
        question: "大家さんに伝える表現は?",
        options: [
          { text: "I'm giving my notice.", correct: true },
          { text: "I will move out soon.", correct: false },
          { text: "I want to leave this house.", correct: false }
        ],
        explanation: "'give notice' = 退去通知をする。正式な手続きの表現。"
      },
      {
        situation: "光熱費を割り勘したい",
        question: "自然な提案は?",
        options: [
          { text: "Let's split the bills.", correct: true },
          { text: "We should divide utility costs.", correct: false },
          { text: "Please pay half of electricity.", correct: false }
        ],
        explanation: "'split the bills' = 割り勘する。'bills' = 光熱費などの請求書。"
      },
      {
        situation: "エアコンが効きすぎ",
        question: "調整をお願いする表現は?",
        options: [
          { text: "It's a bit cold. Mind turning it down?", correct: true },
          { text: "Please decrease air conditioner.", correct: false },
          { text: "The AC is too strong.", correct: false }
        ],
        explanation: "'turn it down' = 下げる。'Mind...?' で丁寧にお願い。"
      },
      {
        situation: "郵便物が届いた",
        question: "ルームメイトに伝える表現は?",
        options: [
          { text: "You got a package.", correct: true },
          { text: "Your mail has arrived.", correct: false },
          { text: "There is post for you.", correct: false }
        ],
        explanation: "'You got...' = 〜が届いたよ。'package' = 小包。カジュアルな伝え方。"
      },
      {
        situation: "火災報知器が鳴ってる",
        question: "緊急時の表現は?",
        options: [
          { text: "The smoke alarm's going off!", correct: true },
          { text: "The fire detector is ringing.", correct: false },
          { text: "Fire alarm is sounding.", correct: false }
        ],
        explanation: "'going off' = (アラームが)鳴る。緊急時によく使う表現。"
      },
      {
        situation: "部屋の電球が切れた",
        question: "大家さんに伝える表現は?",
        options: [
          { text: "The light bulb's burnt out.", correct: true },
          { text: "The bulb is broken.", correct: false },
          { text: "Light doesn't work.", correct: false }
        ],
        explanation: "'burnt out' = 切れた(電球など)。'The bulb needs replacing' とも言う。"
      },
      {
        situation: "夜中に帰宅するので音に気をつける",
        question: "ルームメイトへの事前連絡は?",
        options: [
          { text: "I'll be home late. I'll try to be quiet.", correct: true },
          { text: "I will return at midnight carefully.", correct: false },
          { text: "Please don't wake up when I come back.", correct: false }
        ],
        explanation: "'I'll be home late' = 遅く帰る。'I'll try to be quiet' = 静かにするね。気遣いの表現。"
      }
    ],
    shopping: [
      {
        situation: "3個で$10のセール",
        question: "店員が言う表現は?",
        options: [
          { text: "Three for ten bucks.", correct: true },
          { text: "If you buy three, it's ten dollars.", correct: false },
          { text: "The price is $10 for 3 items.", correct: false }
        ],
        explanation: "'bucks' = ドルの口語表現。'Three for ten' のように簡潔に。オーストラリアも同じ。"
      },
      {
        situation: "$37.80の買い物、$50出した",
        question: "お釣りはいくら?正しい言い方は?",
        options: [
          { text: "Twelve twenty", correct: true },
          { text: "Twelve dollars and twenty cents", correct: false },
          { text: "$12.20", correct: false }
        ],
        explanation: "お釣りは$12.20。ネイティブは 'twelve twenty' のように読む。細かく言わない。"
      },
      {
        situation: "レジ袋は必要ですか?",
        question: "店員が使う表現は?",
        options: [
          { text: "Need a bag?", correct: true },
          { text: "Do you want a plastic bag?", correct: false },
          { text: "Would you like a shopping bag?", correct: false }
        ],
        explanation: "'Need a bag?' が最もシンプル。オーストラリアではレジ袋有料なので 'Bag?' だけのことも。"
      },
      {
        situation: "カードで払いたい",
        question: "自然な伝え方は?",
        options: [
          { text: "Can I pay by card?", correct: true },
          { text: "I will use my credit card.", correct: false },
          { text: "Is card payment available?", correct: false }
        ],
        explanation: "'Can I pay by card?' がシンプル。最近は 'Tap?' (タッチ決済OK?) だけ聞かれることも。"
      },
      {
        situation: "一つ買うと一つ無料",
        question: "セールの表記は?",
        options: [
          { text: "Buy one get one free", correct: true },
          { text: "If you buy one, one is free.", correct: false },
          { text: "One plus one sale", correct: false }
        ],
        explanation: "'BOGO (Buy One Get One)' は定番セール表記。'Buy one get one free' または 'BOGO' と表示される。"
      },
      {
        situation: "商品の場所を聞く",
        question: "自然な聞き方は?",
        options: [
          { text: "Where can I find milk?", correct: true },
          { text: "Where is the milk section?", correct: false },
          { text: "Please tell me milk location.", correct: false }
        ],
        explanation: "'Where can I find...' が定番の聞き方。シンプルで自然。"
      },
      {
        situation: "$19.95の買い物、$20出した",
        question: "お釣りの言い方は?",
        options: [
          { text: "Five cents back.", correct: true },
          { text: "Your change is five cents.", correct: false },
          { text: "I return 5 cents.", correct: false }
        ],
        explanation: "わずかなお釣りでも 'Five cents back' のように簡潔に。"
      },
      {
        situation: "賞味期限を確認したい",
        question: "店員に聞く表現は?",
        options: [
          { text: "When does this expire?", correct: true },
          { text: "What is the expiration date?", correct: false },
          { text: "Until when is this good?", correct: false }
        ],
        explanation: "'When does this expire?' / 'Is this still good?' が自然な聞き方。"
      },
      {
        situation: "値引きシールが貼ってある",
        question: "店員が説明する表現は?",
        options: [
          { text: "This is marked down.", correct: true },
          { text: "This has discount sticker.", correct: false },
          { text: "The price is reduced.", correct: false }
        ],
        explanation: "'marked down' = 値引きされた。'on sale' / 'discounted' も使う。"
      },
      {
        situation: "$8.50の買い物、$10出した",
        question: "お釣りは?",
        options: [
          { text: "One fifty.", correct: true },
          { text: "One dollar and fifty cents.", correct: false },
          { text: "$1.50 change.", correct: false }
        ],
        explanation: "お釣りは$1.50。'One fifty' と簡潔に。"
      },
      {
        situation: "ポイントカードはある?",
        question: "レジで聞かれる表現は?",
        options: [
          { text: "Do you have a rewards card?", correct: true },
          { text: "Do you have points card?", correct: false },
          { text: "Are you member?", correct: false }
        ],
        explanation: "'rewards card' / 'loyalty card' が一般的。オーストラリアでは 'flybuys' など。"
      },
      {
        situation: "試着したい",
        question: "自然な頼み方は?",
        options: [
          { text: "Can I try this on?", correct: true },
          { text: "May I use fitting room?", correct: false },
          { text: "I want to check size.", correct: false }
        ],
        explanation: "'Can I try this on?' が定番表現。'try on' = 試着する。"
      },
      {
        situation: "$45.60の買い物、$50出した",
        question: "お釣りの正しい言い方は?",
        options: [
          { text: "Four forty.", correct: true },
          { text: "Four dollars and forty cents.", correct: false },
          { text: "$4.40 back.", correct: false }
        ],
        explanation: "お釣りは$4.40。'Four forty' のように読む。"
      },
      {
        situation: "これより安いのある?",
        question: "自然な聞き方は?",
        options: [
          { text: "Do you have anything cheaper?", correct: true },
          { text: "Is there lower price item?", correct: false },
          { text: "Can I get discount version?", correct: false }
        ],
        explanation: "'Do you have anything cheaper?' がシンプルで自然な質問。"
      },
      {
        situation: "返品したい",
        question: "自然な伝え方は?",
        options: [
          { text: "I'd like to return this.", correct: true },
          { text: "I want to give this back.", correct: false },
          { text: "Please take this item back.", correct: false }
        ],
        explanation: "'I'd like to return this' が丁寧で自然。レシート必要なことが多い。"
      },
      {
        situation: "$27.25の買い物、$30出した",
        question: "お釣りは?",
        options: [
          { text: "Two seventy-five.", correct: true },
          { text: "Two dollars seventy-five cents.", correct: false },
          { text: "$2.75 change.", correct: false }
        ],
        explanation: "お釣りは$2.75。'Two seventy-five' と読む。"
      },
      {
        situation: "サイズ違いはある?",
        question: "自然な聞き方は?",
        options: [
          { text: "Do you have this in a medium?", correct: true },
          { text: "Is there different size?", correct: false },
          { text: "Can I get M size?", correct: false }
        ],
        explanation: "'Do you have this in a (size)?' が定番の聞き方。色違いも同じパターン。"
      },
      {
        situation: "営業時間を聞く",
        question: "自然な聞き方は?",
        options: [
          { text: "What time do you close?", correct: true },
          { text: "What are your business hours?", correct: false },
          { text: "Until when are you open?", correct: false }
        ],
        explanation: "'What time do you close?' / 'What time do you open?' がシンプルで自然。"
      },
      {
        situation: "$62.30の買い物、$70出した",
        question: "お釣りの言い方は?",
        options: [
          { text: "Seven seventy.", correct: true },
          { text: "Seven dollars and seventy cents.", correct: false },
          { text: "$7.70 change.", correct: false }
        ],
        explanation: "お釣りは$7.70。'Seven seventy' と簡潔に。"
      },
      {
        situation: "これ在庫ある?",
        question: "店員に聞く表現は?",
        options: [
          { text: "Do you have more of these?", correct: true },
          { text: "Is this in stock?", correct: false },
          { text: "Can you check inventory?", correct: false }
        ],
        explanation: "'Do you have more of these?' / 'Do you have this in stock?' が自然な聞き方。"
      }
    ],
    work: [
      {
        situation: "平日なら働けます",
        question: "面接での自然な表現は?",
        options: [
          { text: "I'm available weekdays.", correct: true },
          { text: "I can work on weekdays.", correct: false },
          { text: "Weekdays are possible for me.", correct: false }
        ],
        explanation: "'I'm available...' が働ける時間を伝える定番表現。シンプルで自然。"
      },
      {
        situation: "シフトを代わってほしい",
        question: "同僚に頼む表現は?",
        options: [
          { text: "Can you cover my shift?", correct: true },
          { text: "Can you work instead of me?", correct: false },
          { text: "Please take my shift.", correct: false }
        ],
        explanation: "'cover' = 代わりに入る。'Can you cover me?' だけでも通じる。職場の定番フレーズ。"
      },
      {
        situation: "遅刻しそう",
        question: "職場に連絡する表現は?",
        options: [
          { text: "I'll be running late.", correct: true },
          { text: "I will arrive late.", correct: false },
          { text: "I am going to be delayed.", correct: false }
        ],
        explanation: "'running late' = 遅れそう、の口語表現。'I'm running a bit late' とも言う。"
      },
      {
        situation: "休憩取ってもいい?",
        question: "上司に聞く表現は?",
        options: [
          { text: "Can I take my break?", correct: true },
          { text: "May I have a rest time?", correct: false },
          { text: "Is it okay to rest now?", correct: false }
        ],
        explanation: "'take a break' = 休憩を取る。'break' は名詞で休憩時間の意味。"
      },
      {
        situation: "今日は忙しかった",
        question: "同僚との会話で使う表現は?",
        options: [
          { text: "Today was crazy.", correct: true },
          { text: "Today was very busy.", correct: false },
          { text: "We had many customers today.", correct: false }
        ],
        explanation: "'crazy' = めちゃくちゃ忙しい、の口語表現。'crazy busy' とも言う。カジュアルな職場で頻出。"
      },
      {
        situation: "病欠を連絡",
        question: "自然な伝え方は?",
        options: [
          { text: "I'm not feeling well. I need to call in sick.", correct: true },
          { text: "I am sick so I cannot come.", correct: false },
          { text: "I have illness today.", correct: false }
        ],
        explanation: "'call in sick' = 病欠を連絡する、の定番表現。事前に連絡することが重要。"
      },
      {
        situation: "残業できる?",
        question: "上司が聞く表現は?",
        options: [
          { text: "Can you stay late?", correct: true },
          { text: "Can you do overtime?", correct: false },
          { text: "Are you able to work extra?", correct: false }
        ],
        explanation: "'stay late' = 遅くまで残る。'work overtime' も使うが 'stay late' がより自然。"
      },
      {
        situation: "電話対応を頼まれた",
        question: "電話に出る時の表現は?",
        options: [
          { text: "Thank you for calling. How can I help you?", correct: true },
          { text: "Hello, this is the company.", correct: false },
          { text: "Good morning, what do you want?", correct: false }
        ],
        explanation: "'Thank you for calling' + 'How can I help you?' が丁寧でプロフェッショナル。"
      },
      {
        situation: "仕事が終わった",
        question: "上司に報告する表現は?",
        options: [
          { text: "I'm all done.", correct: true },
          { text: "I finished my work.", correct: false },
          { text: "The task is completed.", correct: false }
        ],
        explanation: "'I'm all done' / 'I'm finished' がカジュアルで自然。"
      },
      {
        situation: "クレーム対応",
        question: "謝罪する自然な表現は?",
        options: [
          { text: "I'm sorry about that. Let me fix it for you.", correct: true },
          { text: "I apologize for the inconvenience.", correct: false },
          { text: "Sorry, it is our mistake.", correct: false }
        ],
        explanation: "'I'm sorry about that' + 解決策を提示。シンプルで誠実な対応。"
      },
      {
        situation: "シフト希望を出す",
        question: "自然な伝え方は?",
        options: [
          { text: "I'd prefer mornings if possible.", correct: true },
          { text: "I want morning shift.", correct: false },
          { text: "Can you give me morning time?", correct: false }
        ],
        explanation: "'I'd prefer...' が丁寧な希望の伝え方。'if possible' で柔軟性を示す。"
      },
      {
        situation: "仕事のやり方を教えてほしい",
        question: "自然な頼み方は?",
        options: [
          { text: "Can you show me how to do this?", correct: true },
          { text: "Please teach me the method.", correct: false },
          { text: "I want to learn this work.", correct: false }
        ],
        explanation: "'Can you show me how to...' が定番の頼み方。実演してもらいたい時に。"
      },
      {
        situation: "上がっていい?",
        question: "シフト終わりに確認する表現は?",
        options: [
          { text: "Can I clock out?", correct: true },
          { text: "Can I finish work now?", correct: false },
          { text: "Is it time to leave?", correct: false }
        ],
        explanation: "'clock out' = 退勤する。タイムカードを打つ意味から。'head out' も使う。"
      },
      {
        situation: "ミスを報告",
        question: "上司に伝える表現は?",
        options: [
          { text: "I made a mistake. Sorry about that.", correct: true },
          { text: "I did error in my work.", correct: false },
          { text: "There is my fault.", correct: false }
        ],
        explanation: "'I made a mistake' + 謝罪。正直に報告することが重要。"
      },
      {
        situation: "新しいスタッフが入った",
        question: "自己紹介する表現は?",
        options: [
          { text: "I'm Sarah. Let me know if you need anything.", correct: true },
          { text: "My name is Sarah. Please ask me questions.", correct: false },
          { text: "I am Sarah and I work here.", correct: false }
        ],
        explanation: "'I'm (name)' + 'Let me know if...' が親しみやすい自己紹介。"
      },
      {
        situation: "給料日を確認",
        question: "自然な聞き方は?",
        options: [
          { text: "When do we get paid?", correct: true },
          { text: "What is the payday?", correct: false },
          { text: "When is salary day?", correct: false }
        ],
        explanation: "'When do we get paid?' がカジュアルで自然な聞き方。"
      },
      {
        situation: "ユニフォームはどこ?",
        question: "初日に聞く表現は?",
        options: [
          { text: "Where do I get my uniform?", correct: true },
          { text: "Where is the uniform room?", correct: false },
          { text: "Please tell me uniform location.", correct: false }
        ],
        explanation: "'Where do I get...' が自然な聞き方。受け取り場所を尋ねる定番表現。"
      },
      {
        situation: "休暇を取りたい",
        question: "上司に申請する表現は?",
        options: [
          { text: "I'd like to take next week off.", correct: true },
          { text: "I want vacation next week.", correct: false },
          { text: "Can I have holiday next week?", correct: false }
        ],
        explanation: "'take (time) off' = 休みを取る。'I'd like to request time off' も丁寧。"
      },
      {
        situation: "レジが合わない",
        question: "上司に報告する表現は?",
        options: [
          { text: "The register's short five dollars.", correct: true },
          { text: "The cash register has shortage.", correct: false },
          { text: "Money is not matching.", correct: false }
        ],
        explanation: "'the register's short (amount)' = レジが〜ドル足りない。よくある職場表現。"
      },
      {
        situation: "早退したい",
        question: "上司に頼む表現は?",
        options: [
          { text: "Is it okay if I leave early today?", correct: true },
          { text: "Can I go home before time?", correct: false },
          { text: "I want early finish today.", correct: false }
        ],
        explanation: "'leave early' = 早退する。'Is it okay if...' で丁寧に許可を求める。"
      }
    ],
    transport: [
      {
        situation: "電車に乗る",
        question: "自然な表現は?",
        options: [
          { text: "I'm gonna catch the train.", correct: true },
          { text: "I will take the train.", correct: false },
          { text: "I am going to ride the train.", correct: false }
        ],
        explanation: "'catch the train' = 電車に乗る、の口語表現。'gonna' = 'going to' の短縮形でより自然。"
      },
      {
        situation: "ここから2駅",
        question: "距離を伝える表現は?",
        options: [
          { text: "Two stops from here.", correct: true },
          { text: "It's two stations away.", correct: false },
          { text: "The distance is two stations.", correct: false }
        ],
        explanation: "'stops' = 駅(乗り降りする場所)。'from here' で「ここから」。シンプルで分かりやすい。"
      },
      {
        situation: "この電車は〜行き?",
        question: "確認する表現は?",
        options: [
          { text: "This goes to Central?", correct: true },
          { text: "Does this train go to Central Station?", correct: false },
          { text: "Is this the Central-bound train?", correct: false }
        ],
        explanation: "'This goes to...?' が最もシンプル。語尾を上げれば疑問文に。'bound' は使わない。"
      },
      {
        situation: "降ります",
        question: "混んでる電車で言う表現は?",
        options: [
          { text: "Excuse me, coming through.", correct: true },
          { text: "I need to get off here.", correct: false },
          { text: "Please let me pass.", correct: false }
        ],
        explanation: "'Coming through' = 通りますよ、の定番フレーズ。'Excuse me' を前につけるとより丁寧。"
      },
      {
        situation: "改札の場所を聞く",
        question: "駅員に聞く表現は?",
        options: [
          { text: "Where's the exit?", correct: true },
          { text: "Where is the ticket gate?", correct: false },
          { text: "How do I get out?", correct: false }
        ],
        explanation: "'exit' = 出口。改札は 'ticket gate' より 'exit' や 'way out' が自然。オーストラリアでは改札ないことも。"
      },
      {
        situation: "乗り換えが必要?",
        question: "自然な聞き方は?",
        options: [
          { text: "Do I need to change trains?", correct: true },
          { text: "Should I transfer?", correct: false },
          { text: "Is there connection required?", correct: false }
        ],
        explanation: "'change trains' = 乗り換える。シンプルで分かりやすい表現。"
      },
      {
        situation: "運賃を聞く",
        question: "自然な聞き方は?",
        options: [
          { text: "How much is it to the airport?", correct: true },
          { text: "What is the fare to airport?", correct: false },
          { text: "Please tell me ticket price.", correct: false }
        ],
        explanation: "'How much is it to (destination)?' が定番の聞き方。"
      },
      {
        situation: "バスの時刻表を見たい",
        question: "自然な聞き方は?",
        options: [
          { text: "When's the next bus?", correct: true },
          { text: "What is the bus schedule?", correct: false },
          { text: "Please show me timetable.", correct: false }
        ],
        explanation: "'When's the next bus?' が最もシンプル。すぐ知りたい情報を直接聞く。"
      },
      {
        situation: "この席空いてる?",
        question: "確認する表現は?",
        options: [
          { text: "Is this seat taken?", correct: true },
          { text: "Is someone sitting here?", correct: false },
          { text: "Can I use this seat?", correct: false }
        ],
        explanation: "'Is this seat taken?' = この席誰か座ってる?の定番表現。"
      },
      {
        situation: "タクシーを呼びたい",
        question: "自然な伝え方は?",
        options: [
          { text: "Can you call me a taxi?", correct: true },
          { text: "Please arrange taxi for me.", correct: false },
          { text: "I need taxi service.", correct: false }
        ],
        explanation: "'Can you call me a taxi?' がホテルなどでの定番の頼み方。"
      },
      {
        situation: "遅延してる",
        question: "駅のアナウンス表現は?",
        options: [
          { text: "The train is running late.", correct: true },
          { text: "The train has delay.", correct: false },
          { text: "Train is behind schedule.", correct: false }
        ],
        explanation: "'running late' = 遅れている。'delayed' も使うが 'running late' がより口語的。"
      },
      {
        situation: "どこで降りればいい?",
        question: "運転手に聞く表現は?",
        options: [
          { text: "Where should I get off?", correct: true },
          { text: "At which stop do I descend?", correct: false },
          { text: "Please tell me my station.", correct: false }
        ],
        explanation: "'Where should I get off?' がシンプルで自然。'get off' = 降りる。"
      },
      {
        situation: "タクシーの運転手に目的地を伝える",
        question: "自然な伝え方は?",
        options: [
          { text: "Can you take me to the airport?", correct: true },
          { text: "Please go to airport.", correct: false },
          { text: "I want to reach airport.", correct: false }
        ],
        explanation: "'Can you take me to (destination)?' が丁寧で自然な伝え方。"
      },
      {
        situation: "ここで止めて",
        question: "タクシーで使う表現は?",
        options: [
          { text: "You can drop me here.", correct: true },
          { text: "Please stop at this place.", correct: false },
          { text: "I will get off here.", correct: false }
        ],
        explanation: "'drop me (off)' = 降ろす。タクシーやUberで頻出の表現。"
      },
      {
        situation: "道に迷った",
        question: "自然な伝え方は?",
        options: [
          { text: "I'm lost. Can you help me?", correct: true },
          { text: "I cannot find my way.", correct: false },
          { text: "I am in wrong place.", correct: false }
        ],
        explanation: "'I'm lost' = 道に迷った、のシンプルな表現。助けを求める時に。"
      },
      {
        situation: "地下鉄の路線図がほしい",
        question: "自然な聞き方は?",
        options: [
          { text: "Do you have a map?", correct: true },
          { text: "Can I get subway line map?", correct: false },
          { text: "Where is route map?", correct: false }
        ],
        explanation: "'Do you have a map?' がシンプル。駅では 'map' で地下鉄マップを指すことが多い。"
      },
      {
        situation: "Opalカードをタップし忘れた",
        question: "駅員に伝える表現は?",
        options: [
          { text: "I forgot to tap on.", correct: true },
          { text: "I didn't touch my card.", correct: false },
          { text: "I missed card reading.", correct: false }
        ],
        explanation: "'tap on/off' = カードをタッチする。オーストラリアのOpalカードで使う表現。"
      },
      {
        situation: "次はどこの駅?",
        question: "確認する表現は?",
        options: [
          { text: "What's the next stop?", correct: true },
          { text: "Which station is coming?", correct: false },
          { text: "Where is next station?", correct: false }
        ],
        explanation: "'What's the next stop?' が最もシンプルで自然な聞き方。"
      },
      {
        situation: "終点はどこ?",
        question: "確認する表現は?",
        options: [
          { text: "Where does this line end?", correct: true },
          { text: "What is the final station?", correct: false },
          { text: "Where is terminus?", correct: false }
        ],
        explanation: "'Where does this line end?' / 'What's the last stop?' が自然な聞き方。"
      },
      {
        situation: "ラッシュアワーを避けたい",
        question: "同僚に相談する表現は?",
        options: [
          { text: "I try to avoid peak hour.", correct: true },
          { text: "I don't like rush time.", correct: false },
          { text: "I want to skip busy time.", correct: false }
        ],
        explanation: "'peak hour' / 'rush hour' = ラッシュアワー。オーストラリアでは 'peak hour' が一般的。"
      }
    ]
  };

  // アフィリエイトリンクのコンポーネント
  const AffiliateSection = ({ scene }) => {
    const affiliateData = {
      cafe: {
        title: "もっと英会話を実践したい方へ",
        description: "カフェでの英会話をもっと練習したいなら",
        linkText: "オンライン英会話で実践練習",
        url: AFFILIATE_LINKS.onlineEnglish
      },
      sharehouse: {
        title: "シェアハウス探しなら",
        description: "実際にシェアハウスに住んでみませんか?",
        linkText: "おすすめシェアハウスを探す",
        url: AFFILIATE_LINKS.shareHouse
      },
      shopping: {
        title: "海外生活の準備",
        description: "ワーホリ・留学前の英語学習に",
        linkText: "おすすめ英語学習サービス",
        url: AFFILIATE_LINKS.englishLearning
      },
      work: {
        title: "海外で働く準備",
        description: "ワーホリで使える英語をもっと学ぶなら",
        linkText: "実践的な英会話レッスン",
        url: AFFILIATE_LINKS.onlineEnglish
      },
      transport: {
        title: "海外生活をもっと知る",
        description: "TomsJapanguideで海外生活情報をチェック",
        linkText: "詳しい記事を読む",
        url: AFFILIATE_LINKS.noteLink
      }
    };

    const data = affiliateData[scene] || affiliateData.cafe;

    return (
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <ExternalLink size={18} className="text-blue-600" />
          {data.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{data.description}</p>
        <a 
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {data.linkText} →
        </a>
      </div>
    );
  };

  const handleSceneSelect = (sceneId) => {
    setSelectedScene(sceneId);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions([]);
  };

  const handleAnswerSelect = (optionIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(optionIndex);
    const isCorrect = questions[selectedScene][currentQuestion].options[optionIndex].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      correct: isCorrect
    }]);
  };

  const handleNext = () => {
    if (currentQuestion < questions[selectedScene].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setSelectedScene(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions([]);
  };

  if (!selectedScene) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Real English</h1>
            <p className="text-gray-600">ネイティブが本当に使う英語学習アプリ</p>
            <p className="text-sm text-gray-500 mt-2">by TomsJapanguide</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">💡 このアプリの特徴</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>教科書では教えない、<strong>ネイティブが実際に使う表現</strong>だけを厳選</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>シドニー在住経験を活かした<strong>リアルなシチュエーション</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>お釣りの計算など、<strong>実践的な数字の使い方</strong>も学べる</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {scenes.map(scene => (
              <button
                key={scene.id}
                onClick={() => handleSceneSelect(scene.id)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl mb-2">{scene.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800">{scene.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">20問</p>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions[selectedScene].length) * 100);
    const sceneName = scenes.find(s => s.id === selectedScene).name;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">結果発表!</h2>
            <p className="text-gray-600 mb-6">{sceneName}</p>
            
            <div className="mb-8">
              <div className="text-6xl font-bold text-indigo-600 mb-2">
                {score}/{questions[selectedScene].length}
              </div>
              <div className="text-2xl text-gray-600">
                正解率 {percentage}%
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {percentage === 100 && (
                <p className="text-lg text-green-600 font-semibold">🎉 完璧です!ネイティブレベル!</p>
              )}
              {percentage >= 80 && percentage < 100 && (
                <p className="text-lg text-blue-600 font-semibold">👏 素晴らしい!もう少しで完璧!</p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-lg text-yellow-600 font-semibold">💪 Good! 復習して完璧を目指そう!</p>
              )}
              {percentage < 60 && (
                <p className="text-lg text-orange-600 font-semibold">📚 もう一度チャレンジ!実践で使えるようになろう!</p>
              )}
            </div>

            {/* アフィリエイトセクション - 結果画面に配置 */}
            <AffiliateSection scene={selectedScene} />

            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => handleSceneSelect(selectedScene)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={20} />
                もう一度
              </button>
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                メニューに戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[selectedScene][currentQuestion];
  const sceneName = scenes.find(s => s.id === selectedScene).name;
  const sceneColor = scenes.find(s => s.id === selectedScene).color;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={handleRestart}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            ← 戻る
          </button>
          <div className="text-gray-600">
            {currentQuestion + 1} / {questions[selectedScene].length}
          </div>
        </div>

        <div className={`${sceneColor} text-white rounded-t-lg p-4`}>
          <h2 className="text-xl font-semibold">{sceneName}</h2>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-6">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">シチュエーション:</div>
            <div className="text-lg font-medium text-gray-800 mb-4">
              {currentQ.situation}
            </div>
            <div className="text-xl font-semibold text-indigo-600">
              {currentQ.question}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === null
                    ? 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                    : selectedAnswer === index
                    ? option.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : option.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${
                    selectedAnswer !== null && option.correct
                      ? 'text-green-600'
                      : selectedAnswer === index && !option.correct
                      ? 'text-red-600'
                      : 'text-gray-400'
                  }`}>
                    {selectedAnswer !== null && option.correct && <Check size={24} />}
                    {selectedAnswer === index && !option.correct && <X size={24} />}
                    {selectedAnswer === null && <div className="w-6 h-6 rounded-full border-2 border-gray-300" />}
                  </div>
                  <span className="text-lg">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-900 mb-2">💡 解説</h3>
                <p className="text-gray-700">{currentQ.explanation}</p>
              </div>

              {/* 5問ごとにアフィリエイト表示 */}
              {(currentQuestion + 1) % 5 === 0 && (
                <AffiliateSection scene={selectedScene} />
              )}
            </>
          )}

          {selectedAnswer !== null && (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2 mt-6"
            >
              {currentQuestion < questions[selectedScene].length - 1 ? (
                <>次の問題へ <ChevronRight /></>
              ) : (
                <>結果を見る <Award size={20} /></>
              )}
            </button>
          )}
        </div>

        <div className="mt-4 flex gap-1">
          {questions[selectedScene].map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded ${
                index < currentQuestion
                  ? answeredQuestions[index]?.correct
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : index === currentQuestion
                  ? 'bg-indigo-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealEnglishApp;