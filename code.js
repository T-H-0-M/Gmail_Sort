/*-----------------------------Global Variables-----------------------------*/
const MAX_THREADS = 50;
var count = 0;

/*-----------------------------Main Method-----------------------------*/

function main() {
  //Load all emails to be tagged
  emailToTag = [];

  //Load all emails to be deleted
  emailToDelete = [];

  var currentEmail = null;
  var currentTag = null;
  for (i = 0; i < emailToTag.length; i = i + 2) {
    if (addTag(emailToTag[i], emailToTag[i + 1])) {
      i--;
      Logger.log(
        "Tag: " + emailToTag[i + 1] + " being added to email: " + emailToTag[i]
      );
    }
    if (count == 250) {
      return Logger.log("Processing Limit Reached");
    }
  }
  for (i = 0; i < emailToDelete.length; i++) {
    if (deleteEmails(emailToDelete[i])) {
      Logger.log("Email being moved to trash: " + emailToDelete[i]);
    }
    if (count == 250) {
      return Logger.log("Processing Limit Reached");
    }
  }
  return Logger.log("Processing Complete");
}

/*-----------------------------Thread Retrieval Methods-----------------------------*/

// Retreives up to 100 emails matching the sender email parsed
function getThreadsViaEmail(email) {
  var threads = [];
  threads = GmailApp.search("from:" + email, 0, MAX_THREADS);
  count = count + threads.length;
  return threads;
}

// Retreives up to 100 emails matching the parsed header (Unused)
function getThreadsViaHeader(header) {
  var threads = [];
  threads = GmailApp.search("subject:" + header, 0, MAX_THREADS);
  return threads;
}

/*-----------------------------Thread Modification Methods-----------------------------*/

// Adds the parsed tag to the parsed email and moves it to archive
function addTag(email, tag) {
  var threads = getThreadsViaEmail(email);
  var label = GmailApp.getUserLabelByName(tag);
  if (threads.length == 0) {
    return false;
  }
  if (threads.length == 1) {
    label.addToThread(threads[0]);
  } else if (threads.length > 1) {
    label.addToThreads(threads);
  }
  for (i = 0; i < threads.length; i++) {
    threads[i].moveToArchive();
  }
  return true;
}

//Deletes emails with the matching email
function deleteEmails(email) {
  var threads = getThreadsViaEmail(email); //TODO remove
  if (threads.length == 0) {
    return false;
  }
  Logger.log("Beginning deletion"); //TODO remove
  for (i = 0; i < threads.length; i++) {
    GmailApp.moveThreadToTrash(threads[i]);
  }
  return true;
}
