import random

def roll_dice():
    min_value = 1
    max_value = 6
    return random.randint(min_value, max_value)

while True:
    players_input = input("How many players are there?(1-4) ")
    if players_input.isdigit():
        players = int(players_input)
        if 1 <= players <= 4:                                             # Check if the number of players is between 1 and 4
            break
        else:
            print("Please enter a number between 1 and 4.")
    else:
        print("Please enter a valid number.")

max_score = 50
players_scores = [0 for _ in range(players)]   # Initialize scores for each player

while max(players_scores) < max_score:

    for i in range(players):
        print(f"Player {i + 1}'s turn just started.)")
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
                print(f" Your current score is {current_turn_score}.")
        players_scores[i] += current_turn_score  # Add the current turn's score to the player's total score
        print("Your total score is ", players_scores[i])
