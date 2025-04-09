import requests
import json
import os
from mailjet_rest import Client
from dotenv import load_dotenv, find_dotenv
import time
load_dotenv(find_dotenv(), override=True)

# Get absolute path to the current script directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
MAILJET_API_KEY = os.getenv("MJ_APIKEY_PUBLIC")
MAILJET_SECRET_KEY = os.getenv("MJ_APIKEY_PRIVATE")

# Folder to store previous results
HISTORY_DIR = os.path.join(SCRIPT_DIR, "case_status_history")
os.makedirs(HISTORY_DIR, exist_ok=True)

mailjet = Client(auth=(MAILJET_API_KEY, MAILJET_SECRET_KEY), version='v3.1')

def load_receipt_numbers_from_file(path):
    try:
        with open(path, "r") as f:
            return [line.strip().upper() for line in f if line.strip()]
    except Exception as e:
        print(f"❌ Error reading receipt file: {e}")
        return []

def get_access_token(client_id, client_secret):
    url = "https://api.uscis.gov/oauth/accesstoken"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret
    }

    response = requests.post(url, headers=headers, data=data)
    return response.json().get("access_token") if response.status_code == 200 else None

def check_case_status(receipt_number, access_token):
    url = f"https://api.uscis.gov/case-status/{receipt_number}"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

def load_previous_status(receipt_number):
    path = os.path.join(HISTORY_DIR, f"{receipt_number}.json")
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return None

def save_current_status(receipt_number, data):
    path = os.path.join(HISTORY_DIR, f"{receipt_number}.json")
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

def send_status_change_email(receipt_number, old_status, new_status, description):
    data = {
        'Messages': [
            {
                "From": {
                    "Email": os.getenv("EMAIL_FROM"),
                    "Name": os.getenv("EMAIL_FROM_NAME")
                },
                "To": [
                    {
                        "Email": os.getenv("EMAIL_TO"),
                        "Name": os.getenv("EMAIL_TO_NAME")
                    }
                ],
                "Subject": f"📬 USCIS Case Status Changed for {receipt_number}",
                "TextPart": f"Status changed from '{old_status}' to '{new_status}'.\n\nDetails:\n{description}"
            }
        ]
    }
    result = mailjet.send.create(data=data)
    if result.status_code == 200:
        print("📧 Notification email sent!")
    else:
        print("❌ Failed to send email:", result.status_code, result.text)

def main():
    receipt_file = os.getenv("RECEIPT_LIST", os.path.join(SCRIPT_DIR, "receipts.txt"))
    receipt_numbers = load_receipt_numbers_from_file(receipt_file)

    print("🔐 Getting access token...")
    token = get_access_token(CLIENT_ID, CLIENT_SECRET)
    if not token:
        print("🚫 Could not get access token. Exiting.")
        return

    for receipt_number in receipt_numbers:
        time.sleep(0.5)
        print(f"\n🔎 Checking status for {receipt_number}...")
        result = check_case_status(receipt_number, token)
        if not result or "case_status" not in result:
            print(f"⚠️ No case status found for {receipt_number}.")
            continue

        current_status = result["case_status"]["current_case_status_text_en"]
        current_desc = result["case_status"]["current_case_status_desc_en"]
        prev_data = load_previous_status(receipt_number)

        if prev_data:
            prev_status = prev_data["case_status"]["current_case_status_text_en"]
            if current_status != prev_status:
                print(f"🔔 Status changed: {prev_status} → {current_status}")
                send_status_change_email(receipt_number, prev_status, current_status, current_desc)
            else:
                print("✅ No change in status.")
        else:
            print("📥 No previous record. Saving current status.")

        save_current_status(receipt_number, result)

if __name__ == "__main__":
    main()
