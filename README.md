# Gmail-Sort

## About
This is a script that will sort (or delete) 250 emails via Google Apps Script into predefined tags. It uses Google Apps Script, therefore can only sort Gmail inboxes.

## How to Use
This program is intended to be used via Google Apps script. To run:

1. Open a new Google Apps Script file
2. Add the Gmail service to the Apps Script
3. Copy and paste the code into your App Script file
4. Add all emails you wish to be tagged to the "emailsToTag" array in the following format ["example@email.com", "exampleTag"].
5. Add all emails you wish to delete to the "emailToDelete" array in the following format ["example@email.com"].
6. Run the program

## Limitations
The main limitation of this program is the 6 minute runtime limit via Google Apps Script, so this program is made to only process 250 emails per run to avoid hitting the 6 minute limit and timing out.