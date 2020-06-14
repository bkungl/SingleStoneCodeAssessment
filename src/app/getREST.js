function test() {
    alert("load");
}

function orderContent(request) {

}

/*for completions sake, make this future proof by making sure the data is within the certain date or else fire error...*/
function getMostRecentVC(content) {
    var index = 0;
    var date = content.versionContent[0].date;
    //console.log(content.versionContent);
    for (i = 0; i < content.versionContent.length; i++) {
        //console.log(content.versionContent[i].title);
        if (content.versionContent[i].date > date) {
            date = content.versionContent[i].date;
            index = i;
        }
    }

    //console.log(content.versionContent[index].title);
    return index;
}

//url is https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge
//get data:
function getData() {


    const holdCards = document.getElementById('holdCards');
    //holdCards;

    //holdCards.setAttribute('class', 'holdCards');

    /*
    const contentCard = document.getElementById('card');
    contentCard.setAttribute('class', ' content');
    contentCard.setAttribute('class', 'fourth ');
*/
    //  app.appendChild(contentCard);



    var request = new XMLHttpRequest();
    var data;
    request.open('GET', 'https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge', true);
    request.onload = function () {
        //access data
        data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            data.sort(function (a, b) {
                return a.stepNumber.localeCompare(b.stepNumber);
            });
            //console.log(data);
            data.forEach(step => {

                index = getMostRecentVC(step);
                //TODO now use step.versionContent[index]
                const card = document.createElement('div');
                //card.setAttribute('class', 'contentCard');
                card.setAttribute('class', 'contentCard fourth');

                const divHead = document.createElement('div');
                divHead.setAttribute('class', 'cardHead');

                //console.log(step.versionContent[index]);
                const h1 = document.createElement('h1');

                h1.textContent = "0" + step.stepNumber;

                const hr = document.createElement('hr');

                divHead.appendChild(h1);


                const divTitle = document.createElement('div');
                divTitle.setAttribute('class', 'cardTitle');

                const h3 = document.createElement('h3');
                h3.textContent = step.versionContent[index].title;

                divTitle.appendChild(h3);

                const divBody = document.createElement('div');
                divBody.setAttribute('class', 'cardBody');

                const p = document.createElement('p');
                p.textContent = step.versionContent[index].body;

                divBody.appendChild(p);



                card.appendChild(divHead);
                card.appendChild(hr);
                card.appendChild(divTitle);
                card.appendChild(divBody);

                //console.log(holdCards);

                //console.log(card);

                holdCards.appendChild(card);

            })
        } else {
            console.log('error w/ GET');
        }


    }

    request.send();
    return holdCards;

}
