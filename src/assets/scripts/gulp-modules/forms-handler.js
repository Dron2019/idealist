/* beautify preserve:start */
@@include('../libs/Inputmask/dist/jquery.inputmask.min.js')
/* beautify preserve:end */

/* eslint-disable no-undef */
/*Form handler */
let submitList = document.querySelectorAll('.submit-js');
const SEND_URL = '/wp-admin/admin-ajax.php';
const WP_ACTION = {
    keyname: 'action',
    keyValue: 'app',
};

let _counter = 0;

const loadIcon = `
<svg class="load-indication" style="position:absolute; bottom:20px; right:20px; /*transform:translate(-100%,-100%);*/" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="20px" height="20px" viewBox="0 0 128 128" xml:space="preserve"><path fill="#000000" fill-opacity="1" id="ball1" class="cls-1" d="M67.712,108.82a10.121,10.121,0,1,1-1.26,14.258A10.121,10.121,0,0,1,67.712,108.82Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;4 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path><path fill="#000000" fill-opacity="1" id="ball2" class="cls-1" d="M51.864,106.715a10.125,10.125,0,1,1-8.031,11.855A10.125,10.125,0,0,1,51.864,106.715Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;10 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path><path fill="#000000" fill-opacity="1" id="ball3" class="cls-1" d="M33.649,97.646a10.121,10.121,0,1,1-11.872,8A10.121,10.121,0,0,1,33.649,97.646Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;20 64 64;40 64 64;65 64 64;85 64 64;100 64 64;120 64 64;140 64 64;160 64 64;185 64 64;215 64 64;255 64 64;300 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path></svg>
`;
submitList.forEach(el => {
    var inputs = el.closest('form').querySelectorAll('input');
    inputs.forEach(counterHandler)
    el.addEventListener('click', function(evt) {
        evt.preventDefault();
        let status = checkRequiredFields(el.closest('form'));
        if (typeof status === 'object') {
            send(status, SEND_URL, el.closest('form'));
        }
    });
});

function counterHandler(input) {
    input.addEventListener('keypress', () => {
        _counter += 1;
    });
}

function checkRequiredFields(form) {
    const inputs = form.querySelectorAll('input[type=text],input[type=hidden],input[type=password],textarea');
    const checkboxes = ['checkbox'];
    let sendObject = {};
    const invalidClassName = 'unfilled';
    // sendObject.form_name = form.dataset.name || '';
    sendObject.metka = window.location.href || '';
    inputs.forEach(input => {
        let inputGroup = input.closest('.input-group');
        if (
            input.dataset.required === 'true' &&
            input.value.length === 0
        ) {
            inputGroup.classList.add(invalidClassName)
            putInvalidMessage(inputGroup);
        } else if (!checkFieldWithPatter(input)) {
            inputGroup.classList.add(invalidClassName);
        } else if (
            input.dataset.required === 'true' &&
            checkboxes.includes(input.type) &&
            !input.checked
        ) {

            inputGroup.classList.add(invalidClassName);

        } else if (input.type === "password" && !validPassRepeat(form)) {

            inputGroup.classList.add(invalidClassName);

        } else {

            offInvalidMessage(inputGroup);
            inputGroup.classList.remove(invalidClassName);

        }
        if (checkboxes.includes(input.type)) {
            if (input.checked) sendObject[input.name] = input.value;
        } else {
            sendObject[input.name] = input.value;
        }
    });
    /**Чекбоксы */
    const checkboxesInputs = form.querySelectorAll('input[type=checkbox]');
    checkboxesInputs.forEach(box => {
            // let checkboxGroup = box.closest('.input-group');
            box.checked ?
                sendObject[box.name] = box.value :
                null;
        })
        /**Радио */
    const radios = form.querySelectorAll('input[type=radio]');
    radios.forEach(el => {
        let radioGroup = el.closest('.input-group');

        if (el.dataset.required === 'true' && handleRadios(radioGroup)) {
            radioGroup.classList.remove(invalidClassName);
            offInvalidMessage(radioGroup);

            if (el.checked) {
                sendObject[el.name] = el.value;
            }
        } else if (el.dataset.required === 'true') {
            putInvalidMessage(radioGroup);
            radioGroup.classList.add(invalidClassName);
        } else if (!el.dataset.required === 'true' && el.checked) {
            sendObject[el.name] = el.value;
        }
    });


    if (form.querySelector(`.${invalidClassName}`) === null) {
        return sendObject;
    } else {
        return false;
    }
}

function handleRadios(radioGroup) {
    for (var i = 0; i < radioGroup.querySelectorAll('input[type=radio]').length; i++) {
        if (radioGroup.querySelectorAll('input[type=radio]')[i].checked) {
            return true;
        }
    }
    return false;
}
/**Можно добавить дата аттрибут pattern для проверки по регулярному выражению */
function checkFieldWithPatter(input) {
    if (input.pattern === undefined || input.pattern === null || input.pattern === false) {
        return true;
    }
    if (new RegExp(input.dataset.pattern, 'g').test(input.value)) {
        return true;
    } else {
        return false;
    }

}

function send(object, url, form, callback = function() {}) {
    let data = new FormData();
    // let Data1 = new FormData(form);
    form.querySelector('button[type="submit"]').setAttribute('disabled', '');
    for (const key in object) {
        if (key === 'tel') {
            data.append(key, object[key].replace(/-|\(|\)|\s/g, ''));
        } else {
            data.append(key, object[key]);
        }
    }
    data.append(WP_ACTION.keyname, WP_ACTION.keyValue);
    data.append('count', _counter);
    loadIndication(form, loadIcon, 'on');


    fetch(url, {
        method: 'POST',
        body: data,
    }).catch(res => {
        console.log(res);
        sendMessageStatus(form, 'Помилка відправки');
        loadIndication(form, loadIcon, 'off');
        //console.log(data);
    }).then(res => {
        return res.text();
    }).then(res => {
        loadIndication(form, loadIcon, 'off');
        if (res.match(/11|done/)) {
            callback();
            sendMessageStatus(form, 'Ваше повідомлення відправлено');
            resetForm(form);
            setTimeout(pageRedirect, 1000);
        } else {
            sendMessageStatus(form, 'Помилка відправки');
        }
        setTimeout(() => {
            form.querySelector('button[type=submit]').removeAttribute('disabled');
        }, 2000);
    })
}


function loadIndication(form, icon, switchStatus) {
    if (form.querySelector('.load-indication') === undefined || form.querySelector('.load-indication') === null) {
        // console.log('ЕСТЬ');
        form.insertAdjacentHTML('beforeEnd', icon);
    }
    switchStatus === 'on' ?
        form.querySelector('.load-indication').style.opacity = `1` :
        form.querySelector('.load-indication').style.opacity = `0`;

}

function resetForm(form) {
    form.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
    })
}

function putInvalidMessage(inputGroup) {
    let div = document.createElement('div');
    div.innerHTML = inputGroup.querySelector('input').dataset.error_mes || '';

    if (inputGroup.querySelector('.invalid-message') === null) {
        div.classList.add('invalid-message');
        inputGroup.append(div);
    }
}

function offInvalidMessage(inputGroup) {
    if (inputGroup.querySelector('.invalid-message') !== null) {
        inputGroup.querySelector('.invalid-message').remove();
    }

}

function sendMessageStatus(form, status) {
    let element = document.createElement('span');
    element.style.cssText = `
            animation: fadeIn 1s 1 ease-in-out ; 
            color:#222222; 
            position:absolute; 
            padding:10px 20px; 
            white-space:nowrap;
            background:var(--white);
            left:50%;
            top:25%;
            font-size:24px; 
            transform:translateX(-50%) translateY(-50%) `;
    element.innerHTML = status;
    element.classList.add('send-message');
    form.append(element);
    setTimeout(() => {
        form.querySelector('.send-message').style.animation = 'fadeOut 1s 1 ease-in';
        form.querySelector('.send-message').addEventListener('animationend', function() {
            form.querySelector('.send-message').remove();
            // form.querySelector('.send-message').style.opacity = `0`;
        });
    }, 2000);


}

/**Для пароля необходимо ввести 
 * input name (pass)
 * input name (pass-repeat)
 */
function validPassRepeat(form) {
    return form.querySelector('input[name=pass]').value === form.querySelector('input[name=pass-repeat]').value;
}

function pageRedirect() {
    window.location.href = 'message';
}
/** Маска телефонного номера */
$.mask.definitions['#'] = '[0-9]';
$.mask.definitions['9'] = '';
$('input[name=tel]').mask("+(38) 0## ###-##-##", {
    placeholder: "_"
});


// function putCallbackFormInPopup(selector) {
//     return document.querySelector(selector);

// }
/*Form handler END */



document.querySelectorAll('.input-group').forEach(icon => {
    icon.addEventListener('click', function() {
        icon.querySelector('input').focus();
    });
});




/**вызов стандартной формы в всплывайке */
const formRemovalDelay = 500;
let $commonForm = document.querySelector('.common-form-js');
// js-form-call
$('.js-form-call').magnificPopup({
    removalDelay: formRemovalDelay,
    items: [{
        type: 'inline',
        src: $('.invisible-block .common-form-js')
    }],
    callbacks: {
        beforeOpen: function() {
            gsap.fromTo($commonForm, { y: -500 }, { y: 0 })
        },
        beforeClose: function() {
            let $commonForm = document.querySelector('.common-form-js')
            gsap.fromTo($commonForm, { y: 0 }, { y: -1000 })
        },
    }
});

document.querySelector('.mfp-close-img').addEventListener('click', function(evt) {
    $.magnificPopup.close();
});
$.datetimepicker.setLocale('en');
$('input[name=time-input]').datetimepicker({});





$(function() {
    $('input[name=e-mail]').inputmask({
        mask: "*{1,20}@*{1,20}.*{1,20}",
        clearMaskOnLostFocus: false,
        greedy: false,
        tabThrough: true,
        definitions: {
            '*': {
                validator: ".",
            }
        }
    });

});


function qs(selector) {
    var elem = document.querySelector(selector);
    if (elem === null) {
        console.warn(`Elem  - "${selector}" is not defined`)
        return elem;
    } else {
        return elem;
    }
}

function qsA(selector) {
    return document.querySelectorAll(selector);
}