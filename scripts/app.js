const poolOverview = document.getElementById('pool-overview');

fetch("../uren.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        showPools(data);
    })
    .catch(err => {
        console.log(err);
    });

function showPools(pools) {
    let now = new Date();
    let today = now.getDay();

    // Loop through all pools
    for (let i = 0; i < pools.length; i++) {
        // Get current pool
        let pool = pools[i];

        // Create div to hold pool data
        let poolDiv = document.createElement('div');
        poolDiv.className = "pool";

        // Get the name of the pool
        let poolName = document.createElement('h2');
        poolName.className = 'pool-name';
        poolName.textContent = pool.name;

        // Create ul
        let poolUl = document.createElement('ul');
        poolUl.className = 'pool-list';

        // Get opening hours
        let poolOpeningHour1 = document.createElement('li');
        let poolOpeningHour2 = document.createElement('li');
        let poolOpeningHour3 = document.createElement('li');
        let poolOpeningHour4 = document.createElement('li');

        poolOpeningHour1.innerHTML = `${pool.openingHours[today].open1} - ${pool.openingHours[today].close1}`;
        if (pool.openingHours[today].open2) {
            poolOpeningHour2.innerHTML = `${pool.openingHours[today].open2} - ${pool.openingHours[today].close2}`;
        }
        if (pool.openingHours[today].open3) {
            poolOpeningHour3.innerHTML = `${pool.openingHours[today].open3} - ${pool.openingHours[today].close3}`;
        }
        if (pool.openingHours[today].open4) {
            poolOpeningHour4.innerHTML = `${pool.openingHours[today].open4} - ${pool.openingHours[today].close4}`;
        }

        // Set background colour depending on the openinghours
        isOpen(pool.openingHours[today].open1, pool.openingHours[today].close1) ?
            poolDiv.classList.add('green') :
            poolDiv.classList.add('red');

        if (pool.openingHours[today].open2) {
            isOpen(pool.openingHours[today].open2, pool.openingHours[today].close2) ?
                poolDiv.classList.add('green') :
                poolDiv.classList.add('red');
        }

        if (pool.openingHours[today].open3) {
            isOpen(pool.openingHours[today].open3, pool.openingHours[today].close3) ?
                poolDiv.classList.add('green') :
                poolDiv.classList.add('red');
        }

        if (pool.openingHours[today].open4) {
            isOpen(pool.openingHours[today].open4, pool.openingHours[today].close4) ?
                poolDiv.classList.add('green') :
                poolDiv.classList.add('red');
        }

        // Show all items on screen
        poolDiv.appendChild(poolName);
        poolUl.appendChild(poolOpeningHour1);
        if (pool.openingHours[today].open2) poolUl.appendChild(poolOpeningHour2);
        if (pool.openingHours[today].open3) poolUl.appendChild(poolOpeningHour3);
        if (pool.openingHours[today].open4) poolUl.appendChild(poolOpeningHour4);
        poolDiv.appendChild(poolUl);
        poolOverview.appendChild(poolDiv);
    }
}

function isOpen(timeOpen, timeClose) {
    let numTimeOpen = timeOpen.split(':');
    let numTimeClose = timeClose.split(':');

    let currentTime = new Date();
    let startTime = new Date();
    startTime.setHours(parseInt(numTimeOpen[0]), parseInt(numTimeOpen[1]), 0);
    let endTime = new Date();
    endTime.setHours(parseInt(numTimeClose[0]), parseInt(numTimeClose[1]), 0);

    return currentTime >= startTime && currentTime < endTime;
}