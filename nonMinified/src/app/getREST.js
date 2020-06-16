/*
    This file is the "vanilla" JS implementation instead of using Typescript (this file is called in the TS file for the component holding How it Works)
    Methods:
        - getMostRecentVC: get the most recent effective date
        - getData: Controller function that makes request to REST api and creates HTML elements to inject to body.component.html
            - contains a built in sort function to sort the steps by number
*/



//this method gets the most recent effective date
/*for completions sake, make this future proof by making sure the data is within the certain date or else fire error...*/
function getMostRecentVC(content) {
    var index = 0;
    var date = content.versionContent[0].date;
    for (i = 0; i < content.versionContent.length; i++) {
        if (content.versionContent[i].date > date) {
            date = content.versionContent[i].date;
            index = i;
        }
    }
    return index;
}

//url is https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge
//get data:
function getData() {
    const holdCards = document.getElementById('holdCards');

    var request = new XMLHttpRequest();
    var data;
    request.open('GET', 'https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge', true);
    request.onload = function () {
        //access data
        data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            //simple compare
            data.sort(function (a, b) {
                return a.stepNumber.localeCompare(b.stepNumber);
            });
            data.forEach(step => {

                //get most recent index from data
                index = getMostRecentVC(step);

                //avoid copying data by just inserting HTML w/ attributes
                const card = document.createElement('div');
                card.setAttribute('class', 'contentCard');

                const divHead = document.createElement('div');
                divHead.setAttribute('class', 'cardHead');

                const h1 = document.createElement('h1');

                h1.textContent = "0" + step.stepNumber;

                const hr = document.createElement('hr');

                divHead.appendChild(h1);

                const divTitle = document.createElement('div');
                divTitle.setAttribute('class', 'cardTitle');

                const headp = document.createElement('p');
                headp.textContent = step.versionContent[index].title;

                divTitle.appendChild(headp);

                const divBody = document.createElement('div');
                divBody.setAttribute('class', 'cardBody');

                const p = document.createElement('p');
                p.textContent = step.versionContent[index].body;

                //final appends
                divBody.appendChild(p);
                card.appendChild(divHead);
                card.appendChild(hr);
                card.appendChild(divTitle);
                card.appendChild(divBody);
                holdCards.appendChild(card);

            })
        } else {
            console.log('error w/ GET');
        }


    }

    request.send();
    return holdCards;

}
