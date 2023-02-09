

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