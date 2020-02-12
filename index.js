// Build the game deck

var suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();

function createDeck()
{
  deck = new Array();
  for (var i = 0; i < values.length; i++)
  {
    for (var x = 0; x < suits.length; x++)
    {
      var weight = parseInt(values[i]);
      if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
        weight = 10;
      if (values[i] == "A")
        weight = 11;
      var card = { Value: values[i], Suit: suits[x], Weight: weight };
      deck.push(card);
      }
  }

}

// Shuffle

function shuffle() 
{
  // for 1000 turns
  // switch the values of two random cards
  for (var i = 0; i < 1000; i++)
  {
    var location1 = Math.floor((Math.random() * deck.length));
    var location2 = Math.floor((Math.random() * deck.length));
    var tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

// Create the players
// Below is just the logic portion
var players = new Array();
function createPlayers(num)
{
  players = new Array();
  for (var i = 1; i <= num; i++)
  {
    var hand = new Array();
    var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
    players.push(player);
  }
}

// Below is the UI portion

function createPlayersUI()

{
  document.getElementById('players').innerHTML = '';
  for (var i = 0; i < players.length; i++)
  {
    var div_player = document.getElementById('div');
    var div_playerid = document.getElementById('div');
    var div_hand = document.getElementById('div');
    var div_points = document.getElementById('div');

    div_points.className = 'points';
    div_points.id = 'points_' + i;
    div_player.id = 'player_' + i;
    div_player.className = 'player';
    div_hand.id = 'hand_' + i;

    div_playerid.innerHTML = players[i].ID;
    div_player.appendChild(div_playerid);
    div_player.appendChild(div_hand);
    div_player.appendChild(div_points);
    document.getElementById('players').appendChild(div_player);
  }
}

// Start the game

function startblackjack()
{
  document.getElementById('btnStart').value = 'Restart';
  document.getElementById("status").style.display = "none";
  // deal 2 cards to every player object
  currentPlayer = 0;
  createDeck();
  shuffle();
  createPlayers(2);
  createPlayersUI();
  dealHands();
  document.getElementById('player_' + currentPlayer).classList.add('action');
}

// Deal the hand

function dealHands()
{
    // alternate handing cards to each player
  // 2 cards each

  for (var i = 0; i < 2; i++)
  {
    for (var x = 0; x < players.length; x++)
    {
      var card = deck.pop();
      players[x].Hand.push(card);
      renderCard(card, x);
      updatePoints();
    }
  }
  updateDeck();
}

// Render the cards

function renderCard(card, player)
{
  var hand = document.getElementById('hand_' + player);
  hand.appendChild(getCardUI(card));
}

function getCardUI(card)
{
  var el = document.getElementById('div');
  el.className = 'card';
  el.innerHTML = card.Suit = ' ' + card.Value;
  return el;
}

//HIT ME!

var currentPlayer = 0;
function hitMe()
{
    // pop a card from the deck to the current player
  // check if current player new points are over 21
  var card = deck.pop();
  players[currentPlayer].Hand.push(card);
  renderCard(card, currentPlayer);
  updatePoints();
  check();
}

function check()
{
  if (players[currentPlayer].Points > 21)
  {
    document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
  }
}

