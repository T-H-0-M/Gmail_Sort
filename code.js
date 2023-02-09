function main() {
    deleteEmails('New sign in detected')
}

// Retreives up to 250 emails matching the sender email parsed
function getThreads(email){
    var max_threads = 250;
    var complete = false;
    var threads = [];
    while(!complete){
        threads = GmailApp.search('from:' + email, threads.length, threads.length + 50);
        if(threads.length == max_threads){
            complete = true;
        }
    }
    return threads;
}

// Retreives up to 250 emails matching the parsed header
function getThreads(header){
    var max_threads = 250;
    var complete = false;
    var threads = [];
    while(!complete){
        threads = GmailApp.search('subject:' + header, threads.length, threads.length + 50);
        if(threads.length == max_threads){
            complete = true;
        }
    }
    return threads;
}

// Adds the parsed tag to the parsed email and moves it to archive
function addTag(email, tag){
    var threads = getThreads(email);
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
    var threads = getThreads(header);
    for(i = 0; i < threads.length; i++){
        GmailApp.moveThreadToTrash(threads[i]);
    }
}
