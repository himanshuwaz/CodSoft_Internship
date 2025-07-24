# TASK 4: Rock-Paper-Scissors Game

import random

def get_user_choice():
    """
    Prompts the user to choose rock, paper, or scissors and validates the input.
    Returns the user's valid choice.
    """
    while True:
        user_choice = input("Choose (rock, paper, or scissors): ").strip().lower()
        if user_choice in ['rock', 'paper', 'scissors']:
            return user_choice
        else:
            print("Invalid choice. Please choose 'rock', 'paper', or 'scissors'.")

def get_computer_choice():
    """
    Generates a random choice (rock, paper, or scissors) for the computer.
    Returns the computer's choice.
    """
    choices = ['rock', 'paper', 'scissors']
    return random.choice(choices)

def determine_winner(user_choice, computer_choice):
    """
    Determines the winner of the Rock-Paper-Scissors game.

    Args:
        user_choice (str): The user's choice.
        computer_choice (str): The computer's choice.

    Returns:
        str: "You win!", "Computer wins!", or "It's a tie!".
    """
    if user_choice == computer_choice:
        return "It's a tie!"
    elif (user_choice == 'rock' and computer_choice == 'scissors') or \
         (user_choice == 'scissors' and computer_choice == 'paper') or \
         (user_choice == 'paper' and computer_choice == 'rock'):
        return "You win!"
    else:
        return "Computer wins!"

def main():
    """Main function to run the Rock-Paper-Scissors game."""
    user_score = 0
    computer_score = 0

    print("--- Rock-Paper-Scissors Game ---")
    print("Welcome! Let's play.")

    while True:
        print(f"\nScore: You {user_score} - {computer_score} Computer")
        user_choice = get_user_choice()
        computer_choice = get_computer_choice()

        print(f"You chose: {user_choice}")
        print(f"Computer chose: {computer_choice}")

        result = determine_winner(user_choice, computer_choice)
        print(result)

        if result == "You win!":
            user_score += 1
        elif result == "Computer wins!":
            computer_score += 1

        play_again = input("Do you want to play again? (yes/no): ").strip().lower()
        if play_again != 'yes':
            print("\nThanks for playing!")
            print(f"Final Score: You {user_score} - {computer_score} Computer")
            break

if __name__ == "__main__":
    main()
