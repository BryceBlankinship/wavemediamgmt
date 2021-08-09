function signIn(){

    /**
     * 
     * Figure out how to send HTTP request to SQL or if better send data to running Java server
     * That can process the information in an encrypted manner
     * If PHP is required god help
     * 
     * 
     */
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    alert(username + password);

    // Stop form from submitting normally
    event.preventDefault();

    // We want to customize what we post, therefore we format our data
    var data = "login="+ username +"&passwordHash=" + CryptoJS.MD5(password);

    // For debugging purposes... see your console:
    // Prints out for example: login=myLoginName&passwordHash=a011a78a0c8d9e4f0038a5032d7668ab
    console.log(data);

    // The actual from POST method
    $.ajax({
        type: $form.attr('method'),
        url:  $form.attr('action'),
        data: data,
        success: function (data) {
            console.log("Hey, we got reply form java side, with following data: ");
            console.log(data);

            // redirecting example..
            if(data === "SUCCESS") {
                window.location.replace("http://stackoverflow.com");
            }
        }
    });
 
}


function signUp(){

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    alert(username + password);

    // Stop form from submitting normally
    event.preventDefault();

    // We want to customize what we post, therefore we format our data
    var data = "login="+ username +"&passwordHash=" + CryptoJS.MD5(password);

    // For debugging purposes... see your console:
    // Prints out for example: login=myLoginName&passwordHash=a011a78a0c8d9e4f0038a5032d7668ab
    console.log(data);

    // The actual from POST method
    $.ajax({
        type: $form.attr('method'),
        url:  $form.attr('action'),
        data: data,
        success: function (data) {
            console.log("Hey, we got reply form java side, with following data: ");
            console.log(data);

            // redirecting example..
            if(data === "SUCCESS") {
                window.location.replace("http://stackoverflow.com");
            }
        }
    });
 
}