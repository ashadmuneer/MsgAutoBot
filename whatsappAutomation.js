const { chromium } = require('playwright'); 
const xlsx = require('xlsx'); 
const path = require('path'); 

// Function to send WhatsApp message and image
async function sendMessage(page, mobileNumber, name, message, imagePath) {
    try {
        const phoneNumber = String(mobileNumber).replace(/\D/g, '');

        // Format the message to include the name
        const formattedMessage = `Hi ${name}, ${message}`;

        // Open WhatsApp chat for the given phone number
        const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(formattedMessage)}`;
        await page.goto(url);

        await page.waitForSelector('div[contenteditable="true"]', { timeout: 60000 });

        // Type the message into the input field
        await page.type('div[contenteditable="true"]', formattedMessage);

        await page.waitForTimeout(1000);

        if (imagePath) {
            const fileInput = await page.$('input[type="file"]'); 
            if (fileInput) {
                // Get the absolute path of the image
                const imageFullPath = path.resolve(imagePath);

                // Upload the image by setting the file input's value
                await fileInput.setInputFiles(imageFullPath);
                console.log(`Image uploaded: ${imagePath}`);
                
                await page.waitForTimeout(1000); 
            }
        }

        await page.waitForTimeout(1000);

        // Click the send button
        await page.click('span[data-icon="send"]');
        console.log(`Message sent to ${name} (${mobileNumber})`);
    } catch (e) {
        console.log(`Failed to send message to ${mobileNumber}: ${e.message}`);
    }
}

// Function to read data from Excel sheet
function readExcelData(filePath) {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    
    // Get the first sheet
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the sheet to JSON format
    const data = xlsx.utils.sheet_to_json(sheet);

    return data; 
}

async function sendWhatsappMessages() {
    const filePath = 'C:/Users/ashad/OneDrive/Desktop/webdev/javascript projects/whatsapp automation/contacts.xlsx';  

    const contacts = readExcelData(filePath);

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com');

    console.log("Please scan the QR code to log in to WhatsApp Web.");
    
    await page.waitForSelector('div[contenteditable="true"]', { timeout: 0 });

    for (let contact of contacts) {
        const phoneNumber = contact['Mobile Number']; 
        const message = contact['Message'] || "This is a test message!"; 
        const name = contact['Name'] || 'Friend';  
        const imagePath = contact['Image Path']; 

        await sendMessage(page, phoneNumber, name, message, imagePath);
        await page.waitForTimeout(5000);  // Wait 5 seconds between messages to avoid throttling
    }

    console.log("All messages sent! Closing browser.");
    await browser.close();
}

sendWhatsappMessages();
