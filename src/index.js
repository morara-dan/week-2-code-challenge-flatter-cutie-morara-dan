// Your code here
document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.getElementById('character-bar');
    const nameElement = document.getElementById('name');
    const imageElement = document.getElementById('image');
    const voteCountElement = document.getElementById('vote-count');
    const votesForm = document.getElementById('votes-form');
    const reset = document.getElementById('reset-btn')
    
    let currentCharacter;
    
    // Fetch all characters from the server
    fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(characters => {
        displayCharacters(characters);
      })
    
    // Display character names in the character bar
    function displayCharacters(characters) {
      characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        span.dataset.id = character.id;
        span.style.cursor = 'pointer';
        
        // When a character is clicked, display their details
        span.addEventListener('click', () => {
          fetchCharacterDetails(character.id);
        });
        
        characterBar.appendChild(span);
      });
    }
    
    // Fetch and display character details
    function fetchCharacterDetails(id) {
      fetch(`http://localhost:3000/characters/${id}`)
        .then(response => response.json())
        .then(character => {
          currentCharacter = character;
          displayCharacterDetails(character);
        })
        
    }
    
    // Display character details in the detailed-info section
    function displayCharacterDetails(character) {
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      imageElement.alt = character.name;
      voteCountElement.textContent = character.votes;
    }
    
    // Add votes 
    votesForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      if (currentCharacter) {
        const votesInput = document.getElementById('votes');
        const addVotes = parseInt(votesInput.value, 10) || 0;
        
        currentCharacter.votes += addVotes;
        voteCountElement.textContent = currentCharacter.votes;
        
        // Reset the form
        votesInput.value = '';
      }
    });

    const resetButton = document.getElementById('reset-btn');
    resetButton.addEventListener('click', () => {
        if (currentCharacter) {
            currentCharacter.votes = 0;
            voteCountElement.textContent = currentCharacter.votes;
        }
});
  });