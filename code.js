function main() {
  addTag('StudentLiving@newcastle.edu.au', 'StudentLiving')
}

// Retreives up to 100 emails matching the sender email parsed
function getThreadsViaEmail(email){
    var threads = [];
        threads = GmailApp.search('from:' + email, 0, 100);
    return threads;
}

// Retreives up to 100 emails matching the parsed header
function getThreadsViaHeader(header){
    var threads = [];
        threads = GmailApp.search('subject:' + header, 0, 100);
    return threads;
}

// Adds the parsed tag to the parsed email and moves it to archive
function addTag(email, tag){
    var threads = getThreadsViaEmail(email);
    var label = GmailApp.getUserLabelByName(tag);
    if(threads.length == 1){
        label.addToThread(threads[0]);
    }
    else if(threads.length > 1){
        label.addToThreads(threads);
    }
    for(i = 0; i < threads.length; i++){
        threads[i].moveToArchive();
    }
}

//Deletes emails with the matching header
function deleteEmails(header){
    var threads = getThreadsViaHeader(header);
    Logger.log("Beginning deletion")        //TODO remove
    for(i = 0; i < threads.length; i++){
        GmailApp.moveThreadToTrash(threads[i]);
    }
}
