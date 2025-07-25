// TASK 4: WINDOW NOTIFICATION USING JAVA CODE (Desktop Application)

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File; // For checking icon file existence

/**
 * A simple Java Swing application to display a custom window notification.
 * This simulates a desktop notification pop-up.
 */
public class NotificationApp {

    /**
     * Displays a custom notification window.
     *
     * @param title The title of the notification.
     * @param message The main message content of the notification.
     * @param iconPath Optional path to an image file for the notification icon. Can be null.
     * @param durationMillis The duration in milliseconds after which the notification will auto-dismiss.
     * Set to 0 or negative for no auto-dismissal (user must close).
     */
    public static void showNotification(String title, String message, String iconPath, int durationMillis) {
        // Ensure GUI updates are done on the Event Dispatch Thread
        SwingUtilities.invokeLater(() -> {
            try {
                // Create the JFrame for the notification window
                JFrame frame = new JFrame();
                frame.setTitle(title);
                frame.setUndecorated(true); // Remove window decorations (title bar, borders)
                frame.setAlwaysOnTop(true); // Keep notification on top of other windows
                frame.setResizable(false);
                frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Close only this window

                // Set layout for the frame content pane
                frame.setLayout(new BorderLayout(10, 10)); // Add some padding

                // --- Panel for content (icon, message) ---
                JPanel contentPanel = new JPanel();
                contentPanel.setLayout(new BorderLayout(10, 0)); // Layout for icon and message
                contentPanel.setBackground(new Color(45, 55, 72)); // Dark background
                contentPanel.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15)); // Inner padding

                // Notification Icon (Optional)
                if (iconPath != null && !iconPath.isEmpty()) {
                    File iconFile = new File(iconPath);
                    if (iconFile.exists() && !iconFile.isDirectory()) {
                        ImageIcon icon = new ImageIcon(iconPath);
                        // Scale icon if too large
                        Image image = icon.getImage();
                        Image scaledImage = image.getScaledInstance(48, 48, Image.SCALE_SMOOTH); // Scale to 48x48
                        JLabel iconLabel = new JLabel(new ImageIcon(scaledImage));
                        contentPanel.add(iconLabel, BorderLayout.WEST);
                    } else {
                        System.err.println("Warning: Icon file not found or is a directory: " + iconPath);
                    }
                }

                // Message Label
                JTextArea messageArea = new JTextArea(message);
                messageArea.setWrapStyleWord(true);
                messageArea.setLineWrap(true);
                messageArea.setEditable(false);
                messageArea.setFocusable(false);
                messageArea.setBackground(new Color(45, 55, 72)); // Match panel background
                messageArea.setForeground(Color.WHITE); // White text
                messageArea.setFont(new Font("Inter", Font.PLAIN, 16)); // Customize font
                // Use a JScrollPane for the message area to handle long messages, but hide scrollbars
                JScrollPane scrollPane = new JScrollPane(messageArea);
                scrollPane.setBorder(BorderFactory.createEmptyBorder()); // No border for scroll pane
                scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_NEVER);
                scrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
                contentPanel.add(scrollPane, BorderLayout.CENTER);


                // --- Close Button ---
                JButton closeButton = new JButton("Dismiss");
                closeButton.setFont(new Font("Inter", Font.BOLD, 14));
                closeButton.setBackground(new Color(79, 70, 229)); // Indigo 600
                closeButton.setForeground(Color.WHITE);
                closeButton.setFocusPainted(false);
                closeButton.setBorder(BorderFactory.createEmptyBorder(8, 15, 8, 15));
                closeButton.setCursor(new Cursor(Cursor.HAND_CURSOR));
                closeButton.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        frame.dispose(); // Close the notification window
                    }
                });
                JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
                buttonPanel.setBackground(new Color(45, 55, 72)); // Match background
                buttonPanel.add(closeButton);

                // Add panels to the frame
                frame.add(contentPanel, BorderLayout.CENTER);
                frame.add(buttonPanel, BorderLayout.SOUTH);

                // Add a border to the whole frame
                frame.getRootPane().setBorder(BorderFactory.createLineBorder(new Color(79, 70, 229), 3)); // Indigo border

                frame.pack(); // Size the frame to fit its components
                frame.setMinimumSize(new Dimension(300, 100)); // Minimum size
                frame.setSize(Math.max(350, frame.getWidth()), Math.max(150, frame.getHeight())); // Ensure minimum size

                // Position the notification (e.g., bottom right corner)
                GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
                GraphicsDevice defaultScreen = ge.getDefaultScreenDevice();
                Rectangle rect = defaultScreen.getDefaultConfiguration().getBounds();
                int x = (int) rect.getMaxX() - frame.getWidth() - 20; // 20px from right
                int y = (int) rect.getMaxY() - frame.getHeight() - 20; // 20px from bottom
                frame.setLocation(x, y);

                frame.setVisible(true);

                // Auto-dismiss after duration (if specified)
                if (durationMillis > 0) {
                    Timer timer = new Timer(durationMillis, new ActionListener() {
                        @Override
                        public void actionPerformed(ActionEvent e) {
                            frame.dispose(); // Close the notification
                        }
                    });
                    timer.setRepeats(false); // Only fire once
                    timer.start();
                }

            } catch (Exception e) {
                System.err.println("Error displaying notification: " + e.getMessage());
                e.printStackTrace();
                // Fallback to console message if GUI fails
                System.out.println("Notification (fallback): " + title + " - " + message);
            }
        });
    }

    public static void main(String[] args) {
        System.out.println("Starting Notification Application...");

        // Example 1: Simple notification with auto-dismiss
        showNotification(
            "New Message",
            "You have a new unread message from John Doe. Click to view details.",
            null, // No custom icon
            5000 // Dismiss after 5 seconds
        );

        // Example 2: Notification with a custom icon and no auto-dismiss (requires user to close)
        // Make sure 'icon.png' exists in the same directory as your .java file,
        // or provide a full path to an image file.
        // For demonstration, you can use a placeholder image URL if running in a browser environment
        // or ensure you have a local image file.
        // Example: If you have a file named 'bell_icon.png' in your project directory
        // showNotification(
        //     "Reminder!",
        //     "Don't forget to submit your report by 5 PM today.",
        //     "bell_icon.png", // Path to your icon file
        //     0 // No auto-dismiss
        // );

        // Example 3: Longer message notification
        showNotification(
            "System Update",
            "A critical system update is available. Please restart your computer to apply the changes and ensure optimal performance and security. This update includes bug fixes and performance enhancements.",
            null,
            10000 // Dismiss after 10 seconds
        );

        // Example of an error scenario (invalid icon path)
        showNotification(
            "Error Alert",
            "Failed to connect to the server. Please check your internet connection.",
            "non_existent_icon.jpg", // This will trigger the warning
            7000
        );
    }
}
