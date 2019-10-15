document.getElementById("players").addEventListener("click", function(event) {
    event.preventDefault();

    const url = "https://www.balldontlie.io/api/v1/teams";
    fetch(url) 
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);  
            var total = "";
            var index = 0;
            for(var t in json.data) {
                total += "<button " +"onClick=getGames(" + json.data[t].id + ")>"; 
                total += json.data[t].name + "</button>";
                index += 1;
                if(index % 5 === 0) {
                    total += "<p></p>";
                }
            }
            var display = document.getElementById("display");
            display.innerHTML = total;
        });
    
    
});

function getGames(teamID) {
    const url = "https://www.balldontlie.io/api/v1/games?seasons[]=2018&team_ids[]=" + teamID;
    fetch(url)
        .then(function(response) {
            return response.json();    
        }).then(function(json) {
            console.log(json);
            var total = "<h1>First 25 Games in 2018:</h2>";
            total += "<ol>";
            for(var t in json.data) {
                total += "<li>";
                total += "<h2>" + json.data[t].date.substring(0,10) + " Home vs Away</h2>";
                total += "<p>" + json.data[t].home_team.full_name +  " vs " + json.data[t].visitor_team.full_name + "</p>";
                total += "<p>" + json.data[t].home_team_score +  " to " + json.data[t].visitor_team_score + "<p>";
                total += "</li>";
                
                
            }
            total += "</ol>";
            var display = document.getElementById("display");
            display.innerHTML = total;
        });
}

