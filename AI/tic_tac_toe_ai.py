# TASK 2: TIC-TAC-TOE AI GAME

# Constants for players
HUMAN = 'X'
AI = 'O'
EMPTY = ' '

def print_board(board):
    """Prints the Tic-Tac-Toe board."""
    print("\n-------------")
    for row in board:
        print("|", end=" ")
        for cell in row:
            print(cell, end=" | ")
        print("\n-------------")

def check_win(board, player):
    """
    Checks if the given player has won the game.
    Returns True if the player wins, False otherwise.
    """
    # Check rows
    for row in board:
        if all(cell == player for cell in row):
            return True
    # Check columns
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True
    # Check diagonals
    if (board[0][0] == player and board[1][1] == player and board[2][2] == player) or \
       (board[0][2] == player and board[1][1] == player and board[2][0] == player):
        return True
    return False

def is_board_full(board):
    """Checks if the board is full (a tie)."""
    for row in board:
        for cell in row:
            if cell == EMPTY:
                return False
    return True

def minimax(board, depth, is_maximizing):
    """
    Minimax algorithm to determine the best move.

    Args:
        board (list of list): The current state of the Tic-Tac-Toe board.
        depth (int): The current depth in the game tree.
        is_maximizing (bool): True if it's the maximizing player's turn (AI),
                              False if it's the minimizing player's turn (Human).

    Returns:
        int: The score of the current board state from the AI's perspective.
    """
    if check_win(board, AI):
        return 10 - depth # AI wins, higher score for quicker win
    if check_win(board, HUMAN):
        return depth - 10 # Human wins, lower score for quicker loss
    if is_board_full(board):
        return 0 # It's a tie

    if is_maximizing:
        best_score = -float('inf')
        for r in range(3):
            for c in range(3):
                if board[r][c] == EMPTY:
                    board[r][c] = AI
                    score = minimax(board, depth + 1, False)
                    board[r][c] = EMPTY # Undo the move
                    best_score = max(best_score, score)
        return best_score
    else:
        best_score = float('inf')
        for r in range(3):
            for c in range(3):
                if board[r][c] == EMPTY:
                    board[r][c] = HUMAN
                    score = minimax(board, depth + 1, True)
                    board[r][c] = EMPTY # Undo the move
                    best_score = min(best_score, score)
        return best_score

def find_best_move(board):
    """
    Finds the best move for the AI using the Minimax algorithm.
    Returns a tuple (row, col) representing the best move.
    """
    best_score = -float('inf')
    best_move = (-1, -1)

    for r in range(3):
        for c in range(3):
            if board[r][c] == EMPTY:
                board[r][c] = AI
                score = minimax(board, 0, False) # Start minimax for the human's turn
                board[r][c] = EMPTY # Undo the move
                if score > best_score:
                    best_score = score
                    best_move = (r, c)
    return best_move

def main():
    """Main function to run the Tic-Tac-Toe AI game."""
    board = [[EMPTY, EMPTY, EMPTY],
             [EMPTY, EMPTY, EMPTY],
             [EMPTY, EMPTY, EMPTY]]

    print("--- Tic-Tac-Toe AI Game ---")
    print("You are 'X', the AI is 'O'.")
    print_board(board)

    while True:
        # Human's turn
        while True:
            try:
                row = int(input("Enter row (0, 1, or 2) for your move: "))
                col = int(input("Enter column (0, 1, or 2) for your move: "))
                if 0 <= row <= 2 and 0 <= col <= 2 and board[row][col] == EMPTY:
                    board[row][col] = HUMAN
                    break
                else:
                    print("Invalid move. That cell is already taken or out of bounds. Try again.")
            except ValueError:
                print("Invalid input. Please enter numbers for row and column.")
        print_board(board)

        if check_win(board, HUMAN):
            print("Congratulations! You win!")
            break
        if is_board_full(board):
            print("It's a tie!")
            break

        # AI's turn
        print("AI is making a move...")
        ai_row, ai_col = find_best_move(board)
        board[ai_row][ai_col] = AI
        print_board(board)

        if check_win(board, AI):
            print("AI wins! Better luck next time.")
            break
        if is_board_full(board):
            print("It's a tie!")
            break

    print("\n--- Game Over ---")

if __name__ == "__main__":
    main()
