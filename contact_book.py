# TASK 5: CONTACT BOOK APPLICATION

def display_menu():
    """Displays the main menu options for the Contact Book."""
    print("\n--- Contact Book Menu ---")
    print("1. View Contact List")
    print("2. Add New Contact")
    print("3. Search Contact")
    print("4. Update Contact")
    print("5. Delete Contact")
    print("6. Exit")
    print("-------------------------")

def view_contacts(contacts):
    """
    Displays all contacts in the contact book.
    Shows name and phone number for each contact.
    """
    if not contacts:
        print("\nYour contact book is empty!")
        return

    print("\n--- Your Contacts ---")
    for i, contact in enumerate(contacts):
        print(f"{i + 1}. Name: {contact['name']}, Phone: {contact['phone']}")
    print("---------------------")

def add_contact(contacts):
    """
    Prompts the user for contact details and adds a new contact to the list.
    Ensures that name and phone number are not empty.
    """
    print("\n--- Add New Contact ---")
    name = input("Enter contact name: ").strip()
    phone = input("Enter phone number: ").strip()
    email = input("Enter email address (optional): ").strip()
    address = input("Enter address (optional): ").strip()

    if not name or not phone:
        print("Name and phone number are required. Contact not added.")
        return

    # Check for duplicate phone number
    for contact in contacts:
        if contact['phone'] == phone:
            print("A contact with this phone number already exists. Please use a unique phone number.")
            return

    contacts.append({
        "name": name,
        "phone": phone,
        "email": email if email else "N/A",
        "address": address if address else "N/A"
    })
    print(f"Contact '{name}' added successfully.")

def search_contact(contacts):
    """
    Searches for contacts by name or phone number and displays their full details.
    """
    if not contacts:
        print("\nContact book is empty. Nothing to search.")
        return

    search_term = input("Enter name or phone number to search: ").strip().lower()
    found_contacts = []

    for contact in contacts:
        if search_term in contact['name'].lower() or search_term in contact['phone']:
            found_contacts.append(contact)

    if found_contacts:
        print("\n--- Search Results ---")
        for contact in found_contacts:
            print(f"Name: {contact['name']}")
            print(f"  Phone: {contact['phone']}")
            print(f"  Email: {contact['email']}")
            print(f"  Address: {contact['address']}")
            print("----------------------")
    else:
        print(f"No contacts found matching '{search_term}'.")

def update_contact(contacts):
    """
    Prompts the user to select a contact by number and update its details.
    """
    view_contacts(contacts)
    if not contacts:
        return

    try:
        contact_num = int(input("Enter the number of the contact to update: "))
        if 1 <= contact_num <= len(contacts):
            contact_index = contact_num - 1
            contact = contacts[contact_index]

            print(f"\n--- Updating Contact: {contact['name']} ---")
            print("Leave field blank to keep current value.")

            new_name = input(f"Enter new name ({contact['name']}): ").strip()
            if new_name:
                contact['name'] = new_name

            new_phone = input(f"Enter new phone number ({contact['phone']}): ").strip()
            if new_phone:
                # Check for duplicate phone number, excluding the current contact's own number
                is_duplicate = False
                for i, c in enumerate(contacts):
                    if i != contact_index and c['phone'] == new_phone:
                        is_duplicate = True
                        break
                if is_duplicate:
                    print("This phone number is already used by another contact. Phone not updated.")
                else:
                    contact['phone'] = new_phone

            new_email = input(f"Enter new email ({contact['email']}): ").strip()
            if new_email:
                contact['email'] = new_email
            elif new_email == "": # User explicitly cleared it
                contact['email'] = "N/A"

            new_address = input(f"Enter new address ({contact['address']}): ").strip()
            if new_address:
                contact['address'] = new_address
            elif new_address == "": # User explicitly cleared it
                contact['address'] = "N/A"

            print(f"Contact '{contact['name']}' updated successfully.")
        else:
            print("Invalid contact number. Please enter a valid number from the list.")
    except ValueError:
        print("Invalid input. Please enter a number.")

def delete_contact(contacts):
    """
    Prompts the user to select a contact by number and deletes it from the list.
    """
    view_contacts(contacts)
    if not contacts:
        return

    try:
        contact_num = int(input("Enter the number of the contact to delete: "))
        if 1 <= contact_num <= len(contacts):
            contact_index = contact_num - 1
            removed_contact = contacts.pop(contact_index)
            print(f"Contact '{removed_contact['name']}' deleted.")
        else:
            print("Invalid contact number. Please enter a valid number from the list.")
    except ValueError:
        print("Invalid input. Please enter a number.")

def main():
    """Main function to run the Contact Book application."""
    contacts = [] # List to store contacts. Each contact is a dictionary.

    print("Welcome to your Contact Book Application!")

    while True:
        display_menu()
        choice = input("Enter your choice (1-6): ").strip()

        if choice == '1':
            view_contacts(contacts)
        elif choice == '2':
            add_contact(contacts)
        elif choice == '3':
            search_contact(contacts)
        elif choice == '4':
            update_contact(contacts)
        elif choice == '5':
            delete_contact(contacts)
        elif choice == '6':
            print("Exiting Contact Book. Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a number between 1 and 6.")

if __name__ == "__main__":
    main()
