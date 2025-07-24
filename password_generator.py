# TASK 3: PASSWORD GENERATOR APPLICATION

import random
import string

def generate_password(length, include_lowercase=True, include_uppercase=True,
                      include_digits=True, include_symbols=True):
    """
    Generates a random password based on specified length and complexity criteria.

    Args:
        length (int): The desired length of the password.
        include_lowercase (bool): Whether to include lowercase letters.
        include_uppercase (bool): Whether to include uppercase letters.
        include_digits (bool): Whether to include digits.
        include_symbols (bool): Whether to include special symbols.

    Returns:
        str: The generated password, or an error message if no character types are selected.
    """
    characters = ""
    if include_lowercase:
        characters += string.ascii_lowercase
    if include_uppercase:
        characters += string.ascii_uppercase
    if include_digits:
        characters += string.digits
    if include_symbols:
        characters += string.punctuation

    if not characters:
        return "Error: Please select at least one character type (lowercase, uppercase, digits, or symbols)."

    password = ''.join(random.choice(characters) for i in range(length))
    return password

def main():
    """Main function to run the Password Generator application."""
    print("--- Password Generator ---")

    while True:
        try:
            length = int(input("Enter the desired password length (e.g., 8, 12, 16): "))
            if length <= 0:
                print("Password length must be a positive number.")
                continue
        except ValueError:
            print("Invalid input. Please enter a valid number for length.")
            continue

        print("\nChoose character types to include (type 'yes' or 'no'):")
        include_lowercase = input("Include lowercase letters? (yes/no): ").strip().lower() == 'yes'
        include_uppercase = input("Include uppercase letters? (yes/no): ").strip().lower() == 'yes'
        include_digits = input("Include digits? (yes/no): ").strip().lower() == 'yes'
        include_symbols = input("Include symbols (e.g., !, @, #)? (yes/no): ").strip().lower() == 'yes'

        password = generate_password(length, include_lowercase, include_uppercase,
                                     include_digits, include_symbols)

        print(f"\nGenerated Password: {password}")

        play_again = input("\nGenerate another password? (yes/no): ").strip().lower()
        if play_again != 'yes':
            print("Exiting Password Generator. Goodbye!")
            break

if __name__ == "__main__":
    main()
