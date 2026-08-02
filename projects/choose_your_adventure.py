name=input("Enter your name :")
print("Welcome ", name, " to the adventure game!")

answer=input("You are on a dirt road, it has come to an end and you can go left or right. Which way would you like to go? ").lower()
if answer=="left":
    answer=input("You come to a river, you can walk around it or swim across? Type walk to walk around and swim to swim across: ").lower()
    if answer=="swim":
        print("You swam across and were eaten by an alligator. Game over!")
    elif answer=="walk":
        print("You walked for many miles, ran out of water and you lost the game!")
    else:
        print("Not a valid option. You lose!")


elif answer=="right":
    answer=input("You come to a bridge, it looks wobbly, do you want to cross it or head back (cross/back)? ").lower()
    if answer=="cross":
        print("You crossed the bridge and fell into a river and were eaten by an alligator. Game over!")
    elif answer=="back":
        print("You go back and lose the game!")
    else:
        print("Not a valid option. You lose!")    
else:
    print("Not a valid option. You lose!")
