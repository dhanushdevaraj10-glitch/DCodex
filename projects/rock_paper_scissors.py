import random

user_wins=0
computer_wins=0

options=["rock", "paper", "scissors"]

while True:
    user_name=input("What is your name? ")
    password=input("What is your password? ")

    if user_name=="Dhanush" and password=="1234":
        print("Welcome ", user_name, "!")
        print("You are now logged in.")
        break
    else:
        print("Incorrect username or password.")
        print("Please try again.")
        continue

while True:
    user_input=input("Type Rock/Paper/Scissors or Q to quit: ").lower()
    if user_input=="q":
        break

    if user_input not in options:
        print("Please type a valid option.")
        continue


    random_number=random.randint(0,2)
    computer_pick=options[random_number]
    print("Computer picked ", computer_pick)

    if user_input=="rock" and computer_pick=="scissors":
        print("You win!")
        user_wins+=1
    elif user_input=="paper" and computer_pick=="rock":
        print("You win!")
        user_wins+=1
    elif user_input=="scissors" and computer_pick=="paper":
        print("You win!")
        user_wins+=1
    else:
        print("You lose!")
        computer_wins+=1

print("You won ", user_wins, " times.")
print("The computer won ", computer_wins, " times.")

print("Goodbye!")
