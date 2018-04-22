const form = document.getElementById('vote-form');

// Form Submit Event
form.addEventListener('submit', e => {
  //check Local Storage to see if `hasVoted` key already stored
  if(window.localStorage.getItem('ktlgasweirtyuiokjhyj7iu')) {
    $('#hasVotedAlreadyErrorMsg').removeClass('hidden');
    e.preventDefault();
  } else {
    // set Local Storage to show the user has voted already
    window.localStorage.setItem('ktlgasweirtyuiokjhyj7iu', true)

    const choice = document.querySelector('input[name=os]:checked').value;
    const data = { os: choice };

    fetch('http://localhost:3000/poll', {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
      e.preventDefault();
  }
});

fetch('http://localhost:3000/poll')
  .then(res => res.json())
  .then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

    // Refresh the Total Votes every 2 seconds
    setInterval(() => {
      fetch('http://localhost:3000/poll')
        .then(res => res.json())
        .then(data => document.querySelector('#chartTitle').textContent = `Total Votes: ${data.votes.length}`)
        .catch(err => console.log(err));
    }, 2000);

    // Count vote points - acc/current
    const voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );

    // Set initial Data Points
    if (Object.keys(voteCounts).length === 0 && voteCounts.constructor === Object) {
      voteCounts.Jojo = 0;
      voteCounts.Awori = 0;
      voteCounts.Bugingo = 0;
      voteCounts.Other = 0;
    }

    let dataPoints = [
      { label: 'Jojo', y: voteCounts.Jojo },
      { label: 'Awori', y: voteCounts.Awori },
      { label: 'Bugingo', y: voteCounts.Bugingo },
      { label: 'Yorum', y: voteCounts.Other }
    ];

    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        data: [
          {
            type: 'column',
            dataPoints: dataPoints
          }
        ]
      });
      chart.render();

      // Enable pusher logging 
      Pusher.logToConsole = true;

      var pusher = new Pusher('0e348b4557b8fbf0643f', {
      cluster: 'ap2',
      encrypted: true
    });

    

      var channel = pusher.subscribe('os-poll');
      channel.bind('os-vote', function(data) {
        dataPoints = dataPoints.map(x => {
          if (x.label == data.os) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });
    }
  });
