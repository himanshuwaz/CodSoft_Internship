# TASK 1: CHATBOT WITH RULE-BASED RESPONSES

def get_response(user_input):
    """
    Generates a response based on predefined rules and keywords in the user's input.
    """
    user_input = user_input.lower() # Convert input to lowercase for case-insensitive matching

    # Rule 1: Greetings
    if "hello" in user_input or "hi" in user_input or "hey" in user_input:
        return "Hello there! How can I help you today?"

    # Rule 2: Asking about the bot's name/identity
    if "your name" in user_input or "who are you" in user_input:
        return "I am a simple rule-based chatbot designed to assist you."

    # Rule 3: Asking about weather (example of simple pattern)
    if "weather" in user_input:
        return "I don't have access to real-time weather information, but I hope it's nice where you are!"

    # Rule 4: Asking about feelings (example of simple pattern)
    if "how are you" in user_input or "are you ok" in user_input:
        return "I'm just a program, so I don't have feelings, but I'm functioning perfectly!"

    # Rule 5: Saying goodbye
    if "bye" in user_input or "goodbye" in user_input:
        return "Goodbye! Have a great day!"

    # Rule 6: Asking about purpose
    if "what can you do" in user_input or "help me" in user_input:
        return "I can answer simple questions based on my rules. Try asking me about my name or the weather!"

    # Default response if no rule matches
    return "I'm not sure how to respond to that. Can you rephrase your question?"

def main():
    """Main function to run the Chatbot application."""
    print("--- Simple Rule-Based Chatbot ---")
    print("Type 'exit' to end the conversation.")
    print("Chatbot: Hello! How can I help you?")

    while True:
        user_input = input("You: ").strip()

        if user_input.lower() == 'exit':
            print("Chatbot: Goodbye! Thanks for chatting.")
            break
        else:
            response = get_response(user_input)
            print(f"Chatbot: {response}")

if __name__ == "__main__":
    main()
