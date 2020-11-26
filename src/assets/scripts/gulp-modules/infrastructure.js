//Markers filter handler
var navMarkers = document.querySelectorAll('.markers-wrapper__item');
var activeCategories = new Set();
navMarkers.forEach(navItem => {
    navItem.addEventListener('click', function(evt) {
        navItem.classList.toggle('active');
        if (navItem.classList.contains('active')) {
            activeCategories.add(navItem.dataset.category);
        } else {
            activeCategories.delete(navItem.dataset.category);
        }
        filterMarkers(activeCategories);
    });
});


// Google map start
function func() {
    var script = document.createElement('script');
    //    const key = 'AIzaSyBeZ7W_mpcc25BT0seg7opc8JCzonurxEc';
    // let key = 'AIzaSyC4EBsCfQfnwCFGD_o8iLWwH97tmNCU-6E';
    let key = '';
    if (window.location.href.match(/localhost/)) key = '';
    // const key = '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    document.getElementsByTagName('head')[0].appendChild(script);

}
setTimeout(func, 1000);



function initMap() {
    var gmarkers1 = [];
    filterMarkers = function(category) {

        if (category.__proto__[Symbol.toStringTag] === 'Set') {
            for (i = 0; i < gmarkers1.length; i++) {
                marker = gmarkers1[i];
                var markerMain = gmarkers1.find(item => item.category === 'main');
                if (category.has(marker.category)) {
                    marker.setMap(map);
                    markerMain.setMap(map);
                } else {
                    marker.setMap(null);
                    markerMain.setMap(map);
                }
            }
        } else {
            for (i = 0; i < gmarkers1.length; i++) {
                marker = gmarkers1[i];
                var markerMain = gmarkers1.find(item => item.category === 'main');
                if (marker.category == category || category == 'all') {
                    marker.setMap(map);
                    markerMain.setMap(map);
                } else {
                    marker.setMap(null);
                    markerMain.setMap(map);
                }
            }

        }

    };

    var variousCenters = {
        home: {
            lat: 50.449980,
            lng: 30.410106,
        },
        location: {
            lat: 50.449980,
            lng: 30.410106,
        },
        infrastructure: {
            lat: 50.449980,
            lng: 30.410106,
        },
        contacts: {
            lat: 50.449980,
            lng: 30.410106,
        }
    };
    var center = {
        // lat: 50.445007,
        // lng: 30.610436
        lat: 50.438111,
        lng: 30.608244
    };


    if (window.location.pathname.match(/home/)) {
        center = variousCenters.home;
    } else if (window.location.pathname.match(/location/)) {
        center = variousCenters.location;
    } else if (window.location.pathname.match(/contacts/)) {
        center = variousCenters.contacts;
    } else if (window.location.pathname.match(/infrastructure/)) {
        center = variousCenters.infrastructure;
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: center,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        language: 'en',
        styles: [{
            "featureType": "all",
            "stylers": [{
                "saturation": 0
            }, {
                "hue": "#e7ecf0"
            }]
        }, {
            "featureType": "road",
            "stylers": [{
                "saturation": -70
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "saturation": -60
            }]
        }],

    });



    var polygonCoords = [
        new google.maps.LatLng(50.55601, 30.27695),
        new google.maps.LatLng(50.55743, 30.27686),
        new google.maps.LatLng(50.55764, 30.27883),
        new google.maps.LatLng(50.5567, 30.27858),
        new google.maps.LatLng(50.55633, 30.27846),
        new google.maps.LatLng(50.55527, 30.27739),
        new google.maps.LatLng(50.55601, 30.27695),

    ];

    // Настройки для полигона
    var polygon = new google.maps.Polygon({
        path: polygonCoords, // Координаты
        strokeColor: '#F8B400',
        strokeOpacity: 1,
        strokeWeight: 1.5,
        fillColor: '#F8B400',
        fillOpacity: 1
    });
    //Добавляем на карту
    // polygon.setMap(map);

    var markers_spritesheet;

    if (document.location.pathname === '/') {
        markers_spritesheet = 'img/main_page_map_markers_spritesheet.png';
    } else {
        markers_spritesheet = '../img/main_page_map_markers_spritesheet.png';
    }

    var baseFolder = 'assets/images/';
    var defaultMarkerSize = new google.maps.Size(38, 38),
        buildLogoSize = new google.maps.Size(143, 48);
    var markersAdresses = {
        main: `data:image/svg+xml,%3Csvg width='143' height='50' viewBox='0 0 143 50' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='0.507446' width='143' height='41.6418' fill='%23221F20'/%3E%3Cpath d='M71.5 49.0895L65.0048 41.6535L77.9952 41.6535L71.5 49.0895Z' fill='%23221F20'/%3E%3Cpath d='M29.0151 24.4808H31.8067V17.7101H30.7916V10.9393H28V17.7101H29.0151V24.4808Z' fill='white'/%3E%3Cpath d='M91.8262 24.4807V17.7099H90.8111V10.9392H88.0195V17.7099H89.0347V24.4807H91.8262Z' fill='white'/%3E%3Cpath d='M70.6695 17.7099L67.6818 10.9392H66.5283L63.529 17.7099H64.5442L61.5449 24.4807H64.5442L65.3055 22.7194H70.8887L71.65 24.4807H74.6493L71.6616 17.7099H70.6695ZM66.286 20.4434L67.3704 17.7099H66.3552L67.0935 15.8686L67.8318 17.7099H68.8469L69.9312 20.4434H66.286Z' fill='white'/%3E%3Cpath d='M86.2429 24.4807V21.976H80.2559V17.7099H79.2408V10.9392H76.4492V17.7099H77.4643V24.4807H86.2429Z' fill='white'/%3E%3Cpath d='M103.096 17.71H102.081C101.597 17.3669 100.997 17.0467 100.282 16.7379L98.7244 16.0859C98.113 15.8229 97.6977 15.5827 97.467 15.3768C97.2363 15.171 97.1209 14.9079 97.1209 14.5762C97.1209 14.1759 97.2824 13.8671 97.5939 13.6498C97.9169 13.4211 98.3206 13.3182 98.8167 13.3182C99.8548 13.3182 100.72 13.8214 101.424 14.8279L103.327 13.4211C102.889 12.6548 102.277 12.0486 101.504 11.614C100.732 11.168 99.8318 10.9507 98.8167 10.9507C97.5016 10.9507 96.4173 11.2938 95.5636 11.9686C94.71 12.6434 94.2832 13.5469 94.2832 14.6563C94.2832 15.8686 94.9407 16.8865 96.2558 17.7215H97.2709C97.6631 17.9731 98.113 18.2018 98.609 18.4191L100.074 19.0482C100.766 19.357 101.228 19.6086 101.458 19.8144C101.689 20.0203 101.816 20.3062 101.816 20.6722C101.816 21.1183 101.643 21.4728 101.297 21.7359C100.951 21.9989 100.478 22.1247 99.8664 22.1247C98.5975 22.1247 97.4785 21.4957 96.5096 20.2262L94.5831 21.6101C95.1253 22.5136 95.852 23.2113 96.7633 23.7259C97.6862 24.2406 98.7128 24.5037 99.8548 24.5037C101.251 24.5037 102.393 24.1491 103.292 23.4286C104.192 22.708 104.642 21.7588 104.642 20.5922C104.642 19.7229 104.377 18.991 103.835 18.4077C103.662 18.1446 103.408 17.9273 103.096 17.71Z' fill='white'/%3E%3Cpath d='M52.1085 18.888H56.8034V17.7099H55.7883V16.5319H51.0934V13.4439H57.7378V10.9392H48.3018V17.7099H49.3169V24.4807H58.7529V21.976H52.1085V18.888Z' fill='white'/%3E%3Cpath d='M45.4992 17.6642C45.5223 15.6741 44.8417 14.0615 43.4343 12.792C42.027 11.5225 40.239 10.9049 38.0588 10.9392H33.583V17.7099H34.5981V24.4807H39.0739C41.2311 24.5036 43.0075 23.8746 44.4379 22.5707C45.8453 21.2783 46.5489 19.6657 46.5259 17.7099H45.5107V17.6642H45.4992ZM42.3846 20.798C41.5425 21.5871 40.4351 21.976 39.0508 21.976H37.3897V17.7099H36.3746V13.4439H38.0357C39.443 13.4439 40.562 13.8213 41.3925 14.5762C42.2231 15.331 42.6384 16.3604 42.6384 17.6756C42.6384 17.6871 42.6384 17.6985 42.6384 17.7214H43.6535C43.6304 18.9909 43.2152 20.0202 42.3846 20.798Z' fill='white'/%3E%3Cpath d='M118 13.4439V10.9392H106.453V13.4439H110.825V17.7099H111.84V24.4807H114.632V17.7099H113.617V13.4439H118Z' fill='white'/%3E%3Cpath d='M30.6408 29.3987C31.0676 29.3987 31.4136 29.5702 31.679 29.9248L31.9097 29.7418C31.5982 29.3186 31.1714 29.1013 30.6408 29.1013C30.1909 29.0899 29.8102 29.25 29.4872 29.5702C29.1642 29.8905 29.0027 30.2793 29.0142 30.7139C29.0027 31.16 29.1642 31.5374 29.4872 31.8691C29.8102 32.1893 30.1909 32.3494 30.6408 32.338C31.1714 32.338 31.5982 32.1207 31.9212 31.6975L31.6905 31.5145C31.4136 31.8577 31.0676 32.0406 30.6523 32.0406C30.2947 32.0406 29.9832 31.9148 29.741 31.6518C29.4987 31.4002 29.3718 31.0799 29.3718 30.7139C29.3718 30.348 29.4987 30.0391 29.741 29.7761C29.9717 29.5245 30.2716 29.3987 30.6408 29.3987Z' fill='white'/%3E%3Cpath d='M36.49 27.4315H36.167V32.2694H36.49V27.4315Z' fill='white'/%3E%3Cpath d='M43.1223 31.1144C43.1223 31.3889 43.0416 31.6176 42.8686 31.7892C42.6955 31.9607 42.4764 32.0408 42.2226 32.0408C41.9573 32.0408 41.7381 31.9607 41.5651 31.7892C41.392 31.6176 41.3113 31.3889 41.3113 31.1144V29.1701H40.9883V31.103C40.9883 31.4689 41.1036 31.7777 41.3343 32.0065C41.5651 32.2352 41.865 32.3496 42.2226 32.3496C42.5686 32.3496 42.8686 32.2352 43.0993 32.0065C43.33 31.7777 43.4453 31.4804 43.4453 31.103V29.1701H43.1223V31.1144Z' fill='white'/%3E%3Cpath d='M49.5372 29.0899C49.2719 29.0899 49.0181 29.1471 48.7874 29.2729C48.5567 29.3987 48.3837 29.5588 48.2683 29.7647V27.4315H47.9453V32.2694H48.2568V31.6404C48.3721 31.8462 48.5452 32.0178 48.7759 32.1436C49.0066 32.2694 49.2604 32.3266 49.5372 32.3266C49.9756 32.3266 50.3447 32.1665 50.6446 31.8577C50.9446 31.5489 51.0945 31.16 51.0945 30.714C51.0945 30.2565 50.9446 29.8676 50.6446 29.5588C50.3447 29.25 49.9756 29.0899 49.5372 29.0899ZM50.4024 31.6632C50.1601 31.9149 49.8602 32.0407 49.5026 32.0407C49.1565 32.0407 48.8566 31.9263 48.6259 31.6976C48.3837 31.4688 48.2683 31.1486 48.2683 30.7254C48.2683 30.3022 48.3837 29.9705 48.6259 29.7418C48.8682 29.5131 49.1565 29.3987 49.5026 29.3987C49.8602 29.3987 50.1601 29.5245 50.4024 29.7761C50.6446 30.0277 50.76 30.3365 50.76 30.714C50.76 31.0914 50.6331 31.4002 50.4024 31.6632Z' fill='white'/%3E%3Cpath d='M61.211 29.1355C60.7496 29.1355 60.4035 29.3185 60.1728 29.6845V29.1584H59.8613V32.2807H60.1843V30.4508C60.1843 30.1534 60.2881 29.9018 60.5073 29.7188C60.715 29.5358 60.9687 29.4443 61.2571 29.4443H61.4186V29.1584C61.4071 29.1584 61.384 29.1584 61.3379 29.147C61.2802 29.147 61.2341 29.1355 61.211 29.1355Z' fill='white'/%3E%3Cpath d='M66.737 29.09C66.2987 29.0786 65.9295 29.2387 65.6065 29.5589C65.2951 29.8792 65.1336 30.268 65.1451 30.7141C65.1336 31.1601 65.2951 31.5376 65.6181 31.8578C65.9411 32.178 66.3217 32.3382 66.7716 32.3267C67.2792 32.3267 67.706 32.1323 68.0405 31.7434L67.8329 31.5261C67.556 31.8578 67.21 32.0179 66.7831 32.0179C66.4255 32.0179 66.1256 31.9036 65.8834 31.6634C65.6411 31.4232 65.5027 31.1258 65.4912 30.7713H68.1213C68.1443 30.7027 68.1443 30.5997 68.1443 30.4625C68.1443 30.0507 68.0059 29.7191 67.7406 29.456C67.4637 29.2273 67.1292 29.09 66.737 29.09ZM65.5027 30.4968C65.5488 30.1765 65.6873 29.9135 65.918 29.7076C66.1487 29.5018 66.414 29.3874 66.737 29.3874C67.0485 29.3874 67.3138 29.4903 67.5214 29.6962C67.7291 29.9021 67.8329 30.1651 67.8213 30.4968H65.5027Z' fill='white'/%3E%3Cpath d='M79.0447 29.1585H78.7217V32.2809H79.0447V29.1585Z' fill='white'/%3E%3Cpath d='M86.1737 29.7647C86.0468 29.5588 85.8737 29.3987 85.6546 29.2729C85.4239 29.1471 85.1816 29.0899 84.9048 29.0899C84.4549 29.0899 84.0857 29.25 83.7858 29.5588C83.4859 29.8676 83.3359 30.2565 83.3359 30.714C83.3359 31.1715 83.4859 31.5489 83.7858 31.8577C84.0857 32.1665 84.4549 32.3266 84.8932 32.3266C85.1701 32.3266 85.4239 32.2694 85.6546 32.1436C85.8853 32.0178 86.0583 31.8462 86.1737 31.6289V32.258H86.4851V27.4201H86.1737V29.7647ZM85.8045 31.6976C85.5623 31.9263 85.2739 32.0407 84.9278 32.0407C84.5702 32.0407 84.2703 31.9149 84.0281 31.6633C83.7858 31.4116 83.6705 31.0914 83.6705 30.7254C83.6705 30.348 83.7858 30.0392 84.0281 29.7876C84.2703 29.536 84.5702 29.4101 84.9278 29.4101C85.2739 29.4101 85.5738 29.5245 85.8045 29.7533C86.0468 29.982 86.1621 30.3137 86.1621 30.7368C86.1737 31.1486 86.0468 31.4688 85.8045 31.6976Z' fill='white'/%3E%3Cpath d='M92.3679 29.09C91.9295 29.0786 91.5604 29.2387 91.2374 29.5589C90.9259 29.8792 90.7644 30.268 90.776 30.7141C90.7644 31.1601 90.9259 31.5376 91.2489 31.8578C91.5719 32.178 91.9526 32.3382 92.4025 32.3267C92.91 32.3267 93.3368 32.1323 93.6714 31.7434L93.4637 31.5261C93.1869 31.8578 92.8408 32.0179 92.414 32.0179C92.0564 32.0179 91.7565 31.9036 91.5142 31.6634C91.272 31.4232 91.1336 31.1258 91.122 30.7713H93.7521C93.7637 30.7027 93.7752 30.5997 93.7752 30.4625C93.7752 30.0507 93.6368 29.7191 93.3715 29.456C93.1061 29.2273 92.7716 29.09 92.3679 29.09ZM91.1336 30.4968C91.1797 30.1765 91.3181 29.9135 91.5488 29.7076C91.7796 29.5018 92.0449 29.3874 92.3679 29.3874C92.6793 29.3874 92.9446 29.4903 93.1523 29.6962C93.3599 29.9021 93.4637 30.1651 93.4522 30.4968H91.1336Z' fill='white'/%3E%3Cpath d='M99.3815 29.0897C98.9431 29.0897 98.6086 29.2498 98.3779 29.5701V29.1469H98.0664V32.2692H98.3894V30.3249C98.3894 30.0504 98.4817 29.8331 98.6547 29.6616C98.8278 29.49 99.0585 29.3985 99.3353 29.3985C99.6006 29.3985 99.8198 29.49 99.9813 29.6616C100.143 29.8331 100.224 30.0619 100.224 30.3364V32.2807H100.547V30.3135C100.547 29.9475 100.443 29.6501 100.235 29.4328C100.027 29.2041 99.7391 29.0897 99.3815 29.0897Z' fill='white'/%3E%3Cpath d='M106.418 29.3987C106.845 29.3987 107.191 29.5702 107.456 29.9248L107.687 29.7418C107.376 29.3186 106.949 29.1013 106.418 29.1013C105.968 29.0899 105.588 29.25 105.265 29.5702C104.942 29.8905 104.78 30.2793 104.792 30.7139C104.78 31.16 104.942 31.5374 105.265 31.8691C105.588 32.1893 105.968 32.3494 106.418 32.338C106.949 32.338 107.376 32.1207 107.699 31.6975L107.468 31.5145C107.191 31.8577 106.845 32.0406 106.43 32.0406C106.072 32.0406 105.761 31.9148 105.518 31.6518C105.276 31.4002 105.149 31.0799 105.149 30.7139C105.149 30.348 105.276 30.0391 105.518 29.7761C105.738 29.5245 106.049 29.3987 106.418 29.3987Z' fill='white'/%3E%3Cpath d='M113.224 29.09C112.786 29.0786 112.417 29.2387 112.094 29.5589C111.782 29.8792 111.621 30.268 111.632 30.7141C111.621 31.1601 111.782 31.5376 112.105 31.8578C112.428 32.178 112.809 32.3382 113.259 32.3267C113.766 32.3267 114.193 32.1323 114.528 31.7434L114.32 31.5261C114.043 31.8578 113.697 32.0179 113.27 32.0179C112.913 32.0179 112.613 31.9036 112.371 31.6634C112.128 31.4232 111.99 31.1258 111.978 30.7713H114.609C114.62 30.7027 114.632 30.5997 114.632 30.4625C114.632 30.0507 114.493 29.7191 114.228 29.456C113.951 29.2273 113.617 29.09 113.224 29.09ZM111.99 30.4968C112.036 30.1765 112.175 29.9135 112.405 29.7076C112.636 29.5018 112.901 29.3874 113.224 29.3874C113.536 29.3874 113.801 29.4903 114.009 29.6962C114.216 29.9021 114.32 30.1651 114.309 30.4968H111.99Z' fill='white'/%3E%3Cpath d='M73.8881 30.7138H73.4959C73.4151 30.668 73.3229 30.6223 73.219 30.5765L72.9306 30.4507C72.6999 30.3592 72.55 30.2677 72.4692 30.1877C72.3885 30.1076 72.3423 30.0047 72.3423 29.8789C72.3423 29.7302 72.4 29.6044 72.5269 29.5129C72.6423 29.4214 72.8038 29.3871 72.9883 29.3871C73.2882 29.3871 73.5651 29.5243 73.8073 29.7874L74.0265 29.5815C73.7727 29.2498 73.4267 29.0897 73.0114 29.0897C72.723 29.0897 72.4923 29.1583 72.2962 29.307C72.1001 29.4557 72.0078 29.6501 72.0078 29.9018C72.0078 30.0962 72.0655 30.2563 72.1924 30.3707C72.3077 30.485 72.4923 30.5994 72.7345 30.7024H73.1267C73.1383 30.7138 73.1614 30.7138 73.1729 30.7252L73.4613 30.851C73.7151 30.9654 73.8765 31.0569 73.9573 31.1255C74.038 31.1941 74.0957 31.32 74.1073 31.4801C74.1073 31.6516 74.038 31.7889 73.9112 31.8804C73.7843 31.9719 73.6112 32.0291 73.4036 32.0291C73.046 32.0291 72.7115 31.8461 72.4231 31.4686L72.1924 31.6859C72.4923 32.1206 72.8845 32.3379 73.3921 32.3379C73.6804 32.3379 73.9342 32.2578 74.1303 32.1091C74.338 31.9604 74.4418 31.7431 74.4418 31.4686C74.4418 31.2628 74.3726 31.0912 74.2457 30.954C74.1534 30.8853 74.038 30.7938 73.8881 30.7138Z' fill='white'/%3E%3C/svg%3E%0A`,
        sale: `data:image/svg+xml,%3Csvg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='38' height='38' fill='%23EB8271'/%3E%3Cpath d='M17.156 22.726C16.1667 23.706 14.9627 24.196 13.544 24.196C12.1253 24.196 10.9213 23.706 9.932 22.726C8.952 21.7367 8.462 20.528 8.462 19.1C8.462 17.672 8.952 16.468 9.932 15.488C10.9213 14.4987 12.1253 14.004 13.544 14.004C14.9627 14.004 16.1667 14.4987 17.156 15.488C18.1453 16.468 18.64 17.672 18.64 19.1C18.64 20.528 18.1453 21.7367 17.156 22.726ZM11.29 21.41C11.8967 22.0073 12.648 22.306 13.544 22.306C14.44 22.306 15.1913 22.0073 15.798 21.41C16.4047 20.8033 16.708 20.0333 16.708 19.1C16.708 18.1667 16.4047 17.3967 15.798 16.79C15.1913 16.1833 14.44 15.88 13.544 15.88C12.648 15.88 11.8967 16.1833 11.29 16.79C10.6833 17.3967 10.38 18.1667 10.38 19.1C10.38 20.0333 10.6833 20.8033 11.29 21.41ZM28.7199 14.2V24H26.7879V16.048H23.3299V24H21.3979V14.2H28.7199Z' fill='white'/%3E%3C/svg%3E%0A`,
        build: `${baseFolder}infrastructure/build-m.svg`,
        gym: `${baseFolder}infrastructure/gym-m.svg`,
        letter: `${baseFolder}infrastructure/letter-m.svg`,
        mall: `${baseFolder}infrastructure/mall-m.svg`,
        marketplace: `${baseFolder}infrastructure/marketplace-m.svg`,
        park: `${baseFolder}infrastructure/park-m.svg`,
        pharmacy: `${baseFolder}infrastructure/pharmacy-m.svg`,
        shops: `${baseFolder}infrastructure/shops-m.svg`,
        stadium: `${baseFolder}infrastructure/stadium-m.svg`,
        supermarket: `${baseFolder}infrastructure/supermarket-m.svg`,
        train: `${baseFolder}infrastructure/trai-mn.svg`



    }

    var markersData = [];
    /** Маркеры для карты 28,01,2020 */
    /* beautify preserve:start */
    var markersData = [
        {
            content: `<img style="background:white" src="${markersAdresses.main}">`,
            position: { lat: 50.449980, lng:30.410106,},
            type: 'main',
            icon: { url: markersAdresses.main,scaledSize: buildLogoSize,}
        },
        {
            content: `Sport`,
            position: { lat: 50.448980, lng:30.415106, },
            type: 'gym',
            icon: { url: markersAdresses.gym,scaledSize: defaultMarkerSize,}
        },
        {
            content: `Park`,
            position: { lat: 50.447980, lng:30.415106, },
            type: 'park',
            icon: { url: markersAdresses.park,scaledSize: defaultMarkerSize,}
        },
        {
            content: `Відділ продажу`,
            position: { lat: 50.449980, lng:30.415106, },
            type: 'sale',
            icon: { url: markersAdresses.sale,scaledSize: defaultMarkerSize,}
        },

    ]
/* beautify preserve:end */
    var infowindow = new google.maps.InfoWindow({
        content: '',
        maxWidth: 200
    });
    var activeInfoBubble;



    /**Вывод карты со всеми маркерами на странице Инфраструктуры и С одним маркером на остальных страницах */
    markersData.forEach(function(marker) {
        var markerSettings = {};
        var category = marker.type;
        // console.log(marker.icon);

        var mapMarker = new google.maps.Marker({
            map: map,
            category: category,
            icon: marker.icon,
            position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
        });
        google.maps.event.addListener(mapMarker, 'click', function() {
            infowindow.setContent(marker.content);
            infowindow.open(map, mapMarker);
            console.log(mapMarker);
            map.panTo(this.getPosition());
        });
        mapMarker.name = marker.type;
        // console.log(gmarkers1);
        gmarkers1.push(mapMarker);
        // console.log(category);
        // console.log(gmarkers1);
    });
    /**********************************/
    /*
     * mobile pageHande start
     */
    const WIDTH = window.screen.width;

    if (WIDTH > 0) {

        function displayFilterIcons(type, opened) {
            gmarkers1.forEach(marker => {
                if (marker.category === type && opened) {
                    marker.setVisible(true);
                } else if (marker.category === type && !opened) {
                    marker.setVisible(false);
                }
            })
        }

    }
    /*
     * mobile pageHande end
     */
    /**********************************/

};
// Google map end