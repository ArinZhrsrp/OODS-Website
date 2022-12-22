// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx

// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkSellerName(){
    var sellerName = document.getElementById("sellerName").value;
    var flag = false;
    if(sellerName === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userSellerNameError").style.display = "block";
    }else{
        document.getElementById("userSellerNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUsername(){
    var username = document.getElementById("username").value;
    var flag = false;
    if(username === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("usernameError").style.display = "block";
    }else{
        document.getElementById("usernameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userEmailError").style.display = "block";
    }else{
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userPasswordError").style.display = "block";
    }else{
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}

// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var sellerName = document.getElementById("sellerName").value;
    var username = document.getElementById("username").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var shopName = document.getElementById("shopName").value;
    var officeNumber = document.getElementById("officeNumber").value;
    var hours = document.getElementById("hours").value;
    var add1 = document.getElementById("add1").value;
    var add2 = document.getElementById("add2").value;
    var city = document.getElementById("city").value;
    var postcode = document.getElementById("postcode").value;
    var state = document.getElementById("state").value;
    
    var userSellerNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserSellerNameValid = sellerName.match(userSellerNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if(checkUserSellerNameValid == null){
        return checkSellerName();
    }else if(username === ""){
        return checkUsername();
    }else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
    }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                sellerName: sellerName,
                username: username,
                userEmail: userEmail,
                userPassword: userPassword,
                shopName: shopName,
                officeNumber: officeNumber,
                hours: hours,
                add1: add1,
                add2: add2,
                city: city,
                postcode: postcode,
                state: state,
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                    window.location.replace("../index.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }

}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIEmailError").style.display = "block";
    }else{
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userSIPasswordError").style.display = "block";
    }else{
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successfull',
                title: 'Succesfully signed in', 
            }).then((value) => {
                setTimeout(function(){
                    window.location.replace("./pages/profile.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
    //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{

            document.getElementById("sellerName").innerHTML = dataSnapShot.val().sellerName;
            document.getElementById("username").innerHTML = dataSnapShot.val().username;

            document.getElementById("userEmail").innerHTML = dataSnapShot.val().userEmail;
            document.getElementById("userEmail").style.display = "none";
            document.getElementById("userPassword").innerHTML = dataSnapShot.val().userPassword;
            document.getElementById("userPassword").style.display = "none";

            document.getElementById("shopName").innerHTML = dataSnapShot.val().shopName;
            document.getElementById("shopName").style.display = "none";
            document.getElementById("officeNumber").innerHTML = dataSnapShot.val().officeNumber;
            document.getElementById("officeNumber").style.display = "none";
            document.getElementById("hours").innerHTML = dataSnapShot.val().hours;
            document.getElementById("hours").style.display = "none";
            document.getElementById("add1").innerHTML = dataSnapShot.val().add1;
            document.getElementById("add1").style.display = "none";
            document.getElementById("add2").innerHTML = dataSnapShot.val().add2;
            document.getElementById("add2").style.display = "none";
            document.getElementById("city").innerHTML = dataSnapShot.val().city;
            document.getElementById("city").style.display = "none";
            document.getElementById("postcode").innerHTML = dataSnapShot.val().postcode;
            document.getElementById("postcode").style.display = "none";
            document.getElementById("state").innerHTML = dataSnapShot.val().state;
            document.getElementById("state").style.display = "none";

            
        })
    } else {
    //   No user is signed in.
    }
});




// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
function showEditProfileForm(){
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"

    var sellerName = document.getElementById("sellerName").innerHTML;
    var username = document.getElementById("username").innerHTML;
    var userEmail = document.getElementById("userEmail").innerHTML;
    var userPassword = document.getElementById("userPassword").innerHTML;
    var shopName = document.getElementById("shopName").innerHTML;
    var officeNumber = document.getElementById("officeNumber").innerHTML;
    var hours = document.getElementById("hours").innerHTML;
    var add1 = document.getElementById("add1").innerHTML;
    var add2 = document.getElementById("add2").innerHTML;
    var city = document.getElementById("city").innerHTML;
    var postcode = document.getElementById("postcode").innerHTML;
    var state = document.getElementById("state").innerHTML;
    
    
    //document.getElementById("sellerName").value = sellerName; 
    /*document.getElementById("username").value = username;
    document.getElementById("userEmail").value = userEmail; 
    document.getElementById("userPassword").value = userPassword;
    document.getElementById("shopName").value = shopName; 
    document.getElementById("officeNumber").value = officeNumber;
    document.getElementById("hours").value = hours; 
    document.getElementById("add1").value = add1;
    document.getElementById("add2").value = add2; 
    document.getElementById("city").value = city;
    document.getElementById("postcode").value = postcode; 
    document.getElementById("state").value = state;  */




    var sellerName2 = document.getElementById("sellerName2").innerHTML;
    document.getElementById("sellerName2").value = sellerName;
    var username2 = document.getElementById("username2").innerHTML;
    document.getElementById("username2").value = username;
    var userEmail2 = document.getElementById("userEmail2").innerHTML;
    document.getElementById("userEmail2").value = userEmail;
    var userPassword2 = document.getElementById("userPassword2").innerHTML;
    document.getElementById("userPassword2").value = userPassword;

    var shopName2 = document.getElementById("shopName2").innerHTML;
    document.getElementById("shopName2").value = shopName;
    var officeNumber2 = document.getElementById("officeNumber2").innerHTML;
    document.getElementById("officeNumber2").value = officeNumber;
    var hours2 = document.getElementById("hours2").innerHTML;
    document.getElementById("hours2").value = hours;
    var add12 = document.getElementById("add12").innerHTML;
    document.getElementById("add12").value = add1;

    var add22 = document.getElementById("add22").innerHTML;
    document.getElementById("add22").value = add2;
    var city2 = document.getElementById("city2").innerHTML;
    document.getElementById("city2").value = city;
    var postcode2 = document.getElementById("postcode2").innerHTML;
    document.getElementById("postcode2").value = postcode;
    var state2 = document.getElementById("state2").innerHTML;
    document.getElementById("state2").value = state;
}

// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm(){
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}







// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile(){
    let sellerName2 = document.getElementById("sellerName2").value 
    let username2 = document.getElementById("username2").value
    let userEmail2 = document.getElementById("userEmail2").value 
    let userPassword2 = document.getElementById("userPassword2").value
    let shopName2 = document.getElementById("shopName2").value
    let officeNumber2 = document.getElementById("officeNumber2").value
    let hours2 = document.getElementById("hours2").value
    let add12 = document.getElementById("add12").value
    let add22 = document.getElementById("add22").value
    let city2 = document.getElementById("city2").value
    let postcode2 = document.getElementById("postcode2").value
    let state2 = document.getElementById("state2").value 

    var userSellerNameFormate = /^([A-Za-z.\s_-])/; 
    var checkUserSellerNameValid = sellerName2.match(userSellerNameFormate);

    if(checkUserSellerNameValid == null){
        return checkSellerName();
    }else if(username === ""){
        return checkUsername();
    }else{
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            sellerName: sellerName2,
            username: username2,
            userEmail: userEmail2,
            userPassword: userPassword2,
            shopName: shopName2,
            officeNumber: officeNumber2,
            hours: hours2,
            add1: add12,
            add2: add22,
            city: city2,
            postcode: postcode2,
            state: state2,
        }
        firebaseRef.child(uid).set(userData);
        swal({
            type: 'Successfull',
            title: 'Update successfull',
            text: 'Profile updated.', 
        }).then((value) => {
            setTimeout(function(){
                document.getElementById("profileSection").style.display = "block";

                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }
}
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}