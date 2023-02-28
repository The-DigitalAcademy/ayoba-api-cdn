var Ayoba = getAyoba()

if (Ayoba == null || Ayoba == 'unknown') {
    //Browser test Environment
    Ayoba = new AyobaStub();
} else {
    //Ayoba Environment
}

/**
 * returns user's phone number
 * @param {(res:string) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} country code
 */
function getUserPhoneNumber(successCb = null, errorCb = null) {
    let phoneNumber = '';
    try {
        phoneNumber = Ayoba.getMsisdn();
        if (typeof successCb == 'function') successCb(phoneNumber)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err);
    }
    return phoneNumber;
}


/**
 * returns user's country code
 * @param {(res:string) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} country code
 */
function getUserCountryCode(successCb = null, errorCb = null) {
    let countryCode = ''
    try {
        countryCode = Ayoba.getCountry();
        if (typeof successCb == 'function') successCb(countryCode)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err)
    }
    return countryCode
}

/**
 * returns user's ayoba registered contacts as JSON object
 * @param {(res) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} JSON object: [ {name:string, phoneNumber: string}, . . . ]
 */
function getUserAyobaContacts(successCb = null, errorCb = null) {
    let ayobaContacts = ''
    try {
        ayobaContacts = Ayoba.getAllContacts();
        if (typeof successCb == 'function') successCb(ayobaContacts)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err);
    }
    return ayobaContacts
}

/**
 * returns all user's contacts as JSON object
 * @param {(res) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} JSON object: [ {name:string, phoneNumber: string}, . . . ]
 */
function getAllUserContacts(successCb = null, errorCb = null) {
    let allContacts = ''
    try {
        allContacts = Ayoba.getAllContacts();
        if (typeof successCb == 'function') successCb(allContacts)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err);
    }
    return allContacts
}

/**
 * get user's language code
 * @param {(res:string) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} user language code
 */
function getUserLanguageCode(successCb = null, errorCb = null) {
    let lang = ''
    try {
        lang = Ayoba.getLanguage();
        if (typeof successCb == 'function') successCb(lang)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err);
    }
    return lang
}

/**
 * closes application
 */
function closeApp() {
    try {
        Ayoba.finish()
    } catch (err) {
        console.error(err);
    }
}


var handlePaymentStatusChange = (payload) => {}

/**
 * initiate payment process.
 * @param {{method:string, amount:Number, currency: string, description: string }} payload object containing payment details
 * @param {(payload: {transactionId:string, status: string, error:any}) => {}} successCb callback function for handling success response 
 * @param {(err) => {}} errorCb callback function for handling error response
 */
function startPayment(payload, successCb, errorCb) {
    if (typeof successCb == 'function') {
        handlePaymentStatusChange = successCb
    }

    try {
        const {method, amount, currency, description} = payload
        Ayoba.startPayment(method, amount, currency, description);
    } catch (err) {
        if (typeof errorCb == 'function') return errorCb(err)
        else console.error(err);
    }
}
/**
 * Ayoba Hook Function
 * @param {string} transactionId 
 * @param {string} status 
 * @param {*} error 
 * @returns {(payload) => {}}
 */
function onPaymentStatusChanged(transactionId, status, error) {
    return handlePaymentStatusChange({transactionId, status, error})
}

// GET FILE
try {
    const getFileInputs = document.querySelectorAll('[data-ayoba-api="getFile"]');
    for (let i = 0; i < getFileInputs.length; i++) {
        const inputEle = getFileInputs[i];
        inputEle.onclick = () => {
            responseCode = Ayoba.getFile();
            return responseCode;
        };
    }
} catch (err) {
    console.log('err', err)
}

// TAKE PHOTO
try {
    const takePictureInputs = document.querySelectorAll('[data-ayoba-api="takePicture"]');
    for (let i = 0; i < takePictureInputs.length; i++) {
        const inputEle = takePictureInputs[i];
        inputEle.onclick = () => {
            Ayoba.takePicture();
        };
    }
} catch (err) {
    console.log('err', err);
}

// START CONVERSATION
try {
    const startConversationInputs = document.querySelectorAll('[data-ayoba-api="startConversation"]');
    for (let i = 0; i < startConversationInputs.length; i++) {
        const inputEle = startConversationInputs[i];
        inputEle.onclick = () => {
            Ayoba.startConversation(inputEle.value);
        };
    }
} catch (err) {
    console.log('err', err);
}

try {
    const submitInputs = document.querySelector('[data-ayoba-api="submit"]');
    submitInputs.onclick = () => {
        submit()
    }
} catch (err) {
    console.log('err', err);
}


// ============================================================= FUNCTIONS ============================================================================

function onNicknameChanged(nickname) {
    const nameInputs = document.querySelectorAll('[data-ayoba-api="name"]');
    for (let i = 0; i < nameInputs.length; i++) {
        const inputEle = nameInputs[i];
        inputEle.value = nickname;
        inputEle.classList.remove("is-invalid");
        inputEle.classList.add("is-valid")
    }
}

function onPresenceChanged(presence) {
    const presenceInputs = document.querySelectorAll('[data-ayoba-api="presence"]');
    for (let i = 0; i < presenceInputs.length; i++) {
        const inputEle = presenceInputs[i];
        inputEle.value = presence;
        inputEle.classList.remove("is-invalid");
        inputEle.classList.add("is-valid")
    }
}

function onAvatarChanged(avatar) {
    const avatarInputs = document.querySelectorAll('[data-ayoba-api="presence"]');
    for (let i = 0; i < avatarInputs.length; i++) {
        const avatarImg = avatarInputs[i];
        avatarImg.src = avatarImg.tagName.toLowerCase() == 'img' ? avatar : '';
    }
}

function onLocationChanged(lat, lon) {
    const locationInputs = document.querySelectorAll('[data-ayoba-api="location"]');
    for (let i = 0; i < locationInputs.length; i++) {
        const inputEle = locationInputs[i];
        inputEle.value = `lat: ${lat}, lon: ${lon}`;
        inputEle.classList.remove("is-invalid");
        inputEle.classList.add("is-valid")
    }
}

function onPictureRetrievedResponse(responseCode, picturePath) {
    var responseCode = responseCode
    var picturePath = picturePath

    console.log('picture path:', picturePath);
}

function sendGenericEvent(event) {
    Ayoba.sendGenericEvent(event);
}

function submit() {
    var photo = document.querySelector('[data-ayoba-api="files"]').files[0]
    let formData = new FormData();

    formData.append("files", photo);

    fetch('https://devstrapi.thedigitalacademy.co.za/api/upload', { method: "POST", body: formData }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

}
/**
* Determine the mobile operating system and returns the
* proper javascript interface
*/
function getAyoba() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return null;
    }

    if (/android/i.test(userAgent)) {
        return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return null; // todo
    }

    return "unknown";
}

