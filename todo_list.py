# TASK 1: TO-DO LIST APPLICATION

def display_menu():
    """Displays the main menu options for the To-Do List."""
    print("\n--- To-Do List Menu ---")
    print("1. View Tasks")
    print("2. Add Task")
    print("3. Mark Task as Completed")
    print("4. Delete Task")
    print("5. Exit")
    print("-----------------------")

def view_tasks(tasks):
    """
    Displays all tasks in the to-do list.
    Each task is shown with its index, description, and status.
    """
    if not tasks:
        print("\nYour to-do list is empty!")
        return

    print("\n--- Your Tasks ---")
    for i, task in enumerate(tasks):
        status = "✓" if task['completed'] else " "
        print(f"{i + 1}. [{status}] {task['description']}")
    print("------------------")

def add_task(tasks):
    """
    Prompts the user for a task description and adds it to the list.
    New tasks are initially marked as not completed.
    """
    description = input("Enter the task description: ").strip()
    if description:
        tasks.append({"description": description, "completed": False})
        print(f"Task '{description}' added.")
    else:
        print("Task description cannot be empty. Please try again.")

def mark_task_completed(tasks):
    """
    Prompts the user for a task number and marks the corresponding task as completed.
    Handles invalid input and already completed tasks.
    """
    view_tasks(tasks) # Show tasks to help user choose
    if not tasks:
        return

    try:
        task_num = int(input("Enter the number of the task to mark as completed: "))
        if 1 <= task_num <= len(tasks):
            task_index = task_num - 1
            if tasks[task_index]['completed']:
                print(f"Task '{tasks[task_index]['description']}' is already completed.")
            else:
                tasks[task_index]['completed'] = True
                print(f"Task '{tasks[task_index]['description']}' marked as completed.")
        else:
            print("Invalid task number. Please enter a valid number from the list.")
    except ValueError:
        print("Invalid input. Please enter a number.")

def delete_task(tasks):
    """
    Prompts the user for a task number and deletes the corresponding task from the list.
    Handles invalid input.
    """
    view_tasks(tasks) # Show tasks to help user choose
    if not tasks:
        return

    try:
        task_num = int(input("Enter the number of the task to delete: "))
        if 1 <= task_num <= len(tasks):
            task_index = task_num - 1
            removed_task = tasks.pop(task_index)
            print(f"Task '{removed_task['description']}' deleted.")
        else:
            print("Invalid task number. Please enter a valid number from the list.")
    except ValueError:
        print("Invalid input. Please enter a number.")

def main():
    """Main function to run the To-Do List application."""
    tasks = [] # List to store tasks. Each task is a dictionary: {"description": "...", "completed": False}

    print("Welcome to your To-Do List Application!")

    while True:
        display_menu()
        choice = input("Enter your choice (1-5): ").strip()

        if choice == '1':
            view_tasks(tasks)
        elif choice == '2':
            add_task(tasks)
        elif choice == '3':
            mark_task_completed(tasks)
        elif choice == '4':
            delete_task(tasks)
        elif choice == '5':
            print("Exiting To-Do List. Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a number between 1 and 5.")

if __name__ == "__main__":
    main()
