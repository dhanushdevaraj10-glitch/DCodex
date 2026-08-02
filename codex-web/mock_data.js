export const projectsData = {
    "rock_paper_scissors": {
        title: "Rock-Paper-Scissors Game",
        desc: "Login system + play against computer.",
        code: `import random

user_wins = 0
computer_wins = 0
options = ["rock", "paper", "scissors"]

print("Welcome to Rock Paper Scissors!")
print("Hint: the secret user is Dhanush and password is 1234")

# Note: Interactive input inside browsers can be tricky.
# This script is modified slightly for web compatibility.
# For standard behavior, run it in a local terminal.

for attempt in range(1):
    user_name = input("What is your name? ")
    password = input("What is your password? ")

    if user_name == "Dhanush" and password == "1234":
        print("Welcome", user_name, "!")
        print("You are now logged in.")
    else:
        print("Incorrect username or password.")

while True:
    user_input = input("Type Rock/Paper/Scissors or Q to quit: ").lower()
    if user_input == "q":
        break

    if user_input not in options:
        print("Please type a valid option.")
        continue

    random_number = random.randint(0, 2)
    computer_pick = options[random_number]
    print("Computer picked", computer_pick)

    if user_input == "rock" and computer_pick == "scissors":
        print("You win!")
        user_wins += 1
    elif user_input == "paper" and computer_pick == "rock":
        print("You win!")
        user_wins += 1
    elif user_input == "scissors" and computer_pick == "paper":
        print("You win!")
        user_wins += 1
    else:
        print("You lose!")
        computer_wins += 1

print("You won", user_wins, "times.")
print("The computer won", computer_wins, "times.")
print("Goodbye!")`
    },
    "quiz_game": {
        title: "Quiz Game",
        desc: "CPU/GPU/RAM/PSU knowledge test.",
        code: `print("Welcome to my computer quiz game!")

playing = input("Do you want to play? (yes/no) ")
if playing.lower() != "yes":
    print("Maybe next time!")
else:
    print("Okay! Let's play :")    

    score = 0
    answer = input("What does CPU stand for? ")
    if answer.lower() == "central processing unit":
        print("Correct!")
        score += 1
    else:
        print("Incorrect!")

    answer = input("What does GPU stand for? ")
    if answer.lower() == "graphics processing unit":
        print("Correct!")
        score += 1
    else:
        print("Incorrect!")

    answer = input("What does RAM stand for? ")
    if answer.lower() == "random access memory":
        print("Correct!")
        score += 1
    else:
        print("Incorrect!")

    answer = input("What does PSU stand for? ")
    if answer.lower() == "power supply unit":
        print("Correct!")
        score += 1      
    else:
        print("Incorrect!")  

    print("You got " + str(score) + " questions correct!")
    print("You got " + str((score/4)*100) + "%.")`
    },
    "number_guesser": {
        title: "Number Guesser",
        desc: "Guess the random number with hints.",
        code: `import random

top_of_range = input("Type a number for the top of range: ")

if top_of_range.isdigit():
    top_of_range = int(top_of_range)
    if top_of_range <= 0:
        print("Please type a number larger than 0 next time.")
else:
    print("Please type a number next time.")
    top_of_range = 10

random_number = random.randint(0, top_of_range)
guesses = 0

print(f"Guess the number between 0 and {top_of_range}!")
for i in range(5):  # Limiting attempts for web environment
    guesses += 1
    user_guess = input("Make a guess: ")

    if user_guess.isdigit():
        user_guess = int(user_guess)
    else:
        print("Please type a number next time.")
        continue

    if user_guess == random_number:
        print("You got it! 👍")
        break
    else:
        print("You got it wrong! 👎")

print("It took you", guesses, "guesses.")`
    },
    "adventure": {
        title: "Choose Your Own Adventure",
        desc: "Text-based adventure with choices.",
        code: `name = input("Enter your name: ")
print("Welcome", name, "to the adventure game!")

answer = input("You are on a dirt road, it has come to an end and you can go left or right. Which way would you like to go? ").lower()
if answer == "left":
    answer = input("You come to a river, you can walk around it or swim across? Type walk to walk around and swim to swim across: ").lower()
    if answer == "swim":
        print("You swam across and were eaten by an alligator. Game over!")
    elif answer == "walk":
        print("You walked for many miles, ran out of water and you lost the game!")
    else:
        print("Not a valid option. You lose!")
elif answer == "right":
    answer = input("You come to a bridge, it looks wobbly, do you want to cross it or head back (cross/back)? ").lower()
    if answer == "cross":
        print("You crossed the bridge and fell into a river and were eaten by an alligator. Game over!")
    elif answer == "back":
        print("You go back and lose the game!")
    else:
        print("Not a valid option. You lose!")    
else:
    print("Not a valid option. You lose!")`
    },
    "dice_roll": {
        title: "Dice Roll Game",
        desc: "Multiplayer dice rolling challenge.",
        code: `import random

def roll_dice():
    return random.randint(1, 6)

players_input = input("How many players are there? (1-4) ")
if players_input.isdigit():
    players = int(players_input)
    if not (1 <= players <= 4):
        print("Invalid. Defaulting to 2 players.")
        players = 2
else:
    print("Invalid. Defaulting to 2 players.")
    players = 2

max_score = 50
players_scores = [0 for _ in range(players)]

# Limiting turns for web demo
for turn in range(3):
    print(f"\\n--- Turn {turn+1} ---")
    for i in range(players):
        print(f"Player {i + 1}'s turn just started.")
        current_turn_score = 0

        while True:    
            should_roll = input("Do you want to roll the dice? (y/n) ").lower()
            if should_roll != "y":
                break
            value = roll_dice()
            if value == 1:
                print("You rolled a 1! Your score resets to 0.")
                current_turn_score = 0
                break
            else:
                current_turn_score += value
                print(f"Your current score is {current_turn_score}.")
                
        players_scores[i] += current_turn_score
        print(f"Your total score is {players_scores[i]}")

winner = players_scores.index(max(players_scores)) + 1
print(f"\\nPlayer {winner} wins with {max(players_scores)} points!")`
    }
};

export const leaderboardData = [
    { rank: 1, name: "Alice", points: 1500 },
    { rank: 2, name: "Bob", points: 1250 },
    { rank: 3, name: "Charlie", points: 900 },
    { rank: 4, name: "Dhanush", points: 850 },
    { rank: 5, name: "Eve", points: 400 }
];
