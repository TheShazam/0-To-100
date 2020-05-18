/*
GAME RULES:

- The game consists of 2 players who play after each other.
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score.
- However, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his the GLOBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// Declare the required variables for this program
var scores, roundScore, activePlayer, dice, gamePlaying;

// Call the init() function to begin the game
init();

var lastDice;

// Using addEventListener, when "ROLL DICE" is clicked it will call the annoymous function
// Essentially a callback function because addEventListener is calling the annoymous function
document.querySelector('.btn-roll').addEventListener('click', function() 
{
    if (gamePlaying) 
    {
      // 1. Random number
      var dice1 = Math.floor(Math.random() * 6) + 1;
      var dice2 = Math.floor(Math.random() * 6) + 1;

      // 2. Display the result
      // We create a variable called diceDOM assigned to the dice
      // We then display it using css styles
      // The final step is to select which .png dice to use
      document.getElementById('dice-1').style.display = 'block';
      document.getElementById('dice-2').style.display = 'block';
      document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
      document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

      // 3. Update the round score IF the rolled number was NOT a 1
      if (dice1 !== 1 && dice2 !== 1) 
      {
        // Add to the score
        roundScore += dice1 + dice2;

        // Let's us select stuff exactly the way we do in CSS, selects things easily from our page
        // Selects current-0 from index.html and sets it to our dice number to display on our roundScore
        // The + activePlayer will allow it to show current score for the current active player
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
      } 
      else 
      {
        // Calls our function nextPlayer() for the next player to go
        nextPlayer();
      }
    }
});

// The 'Hold' button
document.querySelector('.btn-hold').addEventListener('click', function() 
{
    if (gamePlaying) 
    {
      // Add CURRENT score to GLOBAL score
      scores[activePlayer] += roundScore;

      // Update the user interface
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var input = document.querySelector('.final-score').value;
      var winningScore;

      // Undefined, 0, null or "" are COERCED to false
      // Anything else is COERCED to true
      if (input) 
      {
        winningScore = input;
      } 
      else 
      {
        winningScore = 100;
      }

      // Check if the player won the game
      if (scores[activePlayer] >= winningScore) 
      {
        // Indicates the winner of the game
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

        // Hides the dice in the middle
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';

        // The active class for the activePlayer will use classList to add the winner class to this active player
        // Also removes the active player class fro mthis panel
        document.querySelector('.player-' + activePlayer + "-panel").classList.add('winner');
        document.querySelector('.player-' + activePlayer + "-panel").classList.remove('active');
        gamePlaying = false;
      } 
      else 
      {
        // Calls our function nextPlayer() for the next player to go
        nextPlayer();
      }
    }
});

// Next player goes
function nextPlayer() 
{
    // Ternary operator more simple than an if/else statement, SAME LOGIC
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; // Sets roundScore to 0 when going to the other player

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // The active class will get removed for the first player or the active class will get moved to the next player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hides the dices in the middle
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

// Begins the game
function init() 
{
    // Initialize our variables
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // Hides the dice in the middle at the beginning of the game
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // Begins the game with everything set to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Resets the winner of the game for the new game session
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}