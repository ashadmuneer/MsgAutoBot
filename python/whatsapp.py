import time
import urllib.parse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def send_message(driver, mobile_number, message):
    try:
       
        phone_number = ''.join(filter(str.isdigit, mobile_number))

        encoded_message = urllib.parse.quote(message)

        url = f'https://web.whatsapp.com/send?phone={phone_number}&text={encoded_message}'
        driver.get(url)

        time.sleep(5)

        input_field = driver.find_element(By.CSS_SELECTOR, 'div[contenteditable="true"]')
        input_field.send_keys(message)
        time.sleep(1)

        send_button = driver.find_element(By.CSS_SELECTOR, 'span[data-icon="send"]')
        send_button.click() 
        print(f'Message sent to {mobile_number}')
    except Exception as e:
        print(f'Failed to send message to {mobile_number}: {str(e)}')

def send_whatsapp_messages():
    phone_numbers = ["91xxxx", "91xxx","91xxxxx"]  
    message = "Hello, this is a test message!"  

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    driver.get("https://web.whatsapp.com")
    print("Please scan the QR code to log in to WhatsApp Web.")

    time.sleep(15) 

    for phone_number in phone_numbers:
        send_message(driver, phone_number, message)
        time.sleep(5) 

    print("All messages sent! Closing browser.")
    driver.quit()

send_whatsapp_messages()
