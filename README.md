
# MSG Automation Script

This project automates sending  messages via Web using Playwright. You can send text messages, as well as messages with image attachments, to a list of contacts specified in an Excel file.

## Requirements

- Node.js (v14.x or later)
- Playwright
- xlsx (for reading Excel files)
- Path module (to resolve file paths)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashadmuneer/MsgAutoBot.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure you have the following installed:
   - Playwright (for browser automation)
   - xlsx (for reading and parsing the Excel file)

## Excel File Format

The Excel file must be structured as follows:

| Mobile Number | Message              | Name  | Image Path                                   |
|---------------|----------------------|-------|----------------------------------------------|
| 91xxxxxxxxxx    | Hello, How are you?   | Alice | C:/Users/ashad/Downloads/letter-a.png        |
| 91xxxxxxxxxx   | Good morning!         | Bob   | C:/Users/ashad/Downloads/sample-image.png    |

- **Mobile Number**: The phone number of the recipient (with country code, without any spaces or special characters). Example: `+11234567890`.
- **Message**: The text message you want to send. This can be left blank or contain any message.
- **Name**: The name of the recipient. If left blank, the script defaults to 'Friend'.
- **Image Path**: The full file path to the image you want to send as an attachment. If you don't want to send an image, leave this field blank.

## How to Use

1. Make sure the `contacts.xlsx` file is formatted correctly (refer to the Excel format section above).
2. Update the script's `filePath` variable with the absolute path to your Excel file.
3. Ensure the image paths in your Excel file are correct, and the images are accessible from your machine.
4. Run the script with the following command:
   ```bash
   node sendMessages.js
   ```

5. The script will open WhatsApp Web, and you will need to scan the QR code for login. Once logged in, the script will send the messages and images to the contacts specified in the Excel file.

## Notes

- Make sure that Playwright has access to your browser.
- The script pauses for 5 seconds between each message to avoid throttling or detection.
- The QR code must be scanned manually in the browser window that opens.
