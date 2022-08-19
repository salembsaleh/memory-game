let numTiles = 16;
let numAttempts = 3;
let numMatches = 8;
let TILE_COLOR = "#1c1b18";
let tiles = []
let end = false;
let clicked = null;
let clickable = true;

// Constants
// CHALLENGE: Randomly generate the colors!
let COLORS = ["#f57d7d", "#f57d7d", "#f5b97d", "#f5b97d", "#fcfc77", "#fcfc77", "#7bfc77", "#7bfc77", "#779ffc",
"#779ffc", "#a177fc", "#a177fc", "#e877fc", "#e877fc", "#fc77d6", "#fc77d6"]

function load_tiles() {
    for(let i = 0; i < numTiles; ++i) {
        // Create object to store jQuery element, boolean to track if matched, and color
        let tileObject = {};
        tileObject.tile = $("#" + i)
        tileObject.tile.css("background", TILE_COLOR)
        tileObject.matched = false;
        tiles.push(tileObject)
    }
    
    // CHALLENGE: Make it randomly assigned!
    // Assign colors to tiles
    let tileAssignment = [6,11,3,2,15,7,0,8,5,12,10,1,9,13,14,4]
    for(let i = 0; i < tileAssignment.length; ++i) {
        tiles[tileAssignment[i]].color = COLORS[i]
    }

    for(let i = 0; i < tiles.length; ++i) {
        // Event listener: If tile is clicked, do the following
        tiles[i].tile.click(function(){

            // If game isn't over, the tiles are clickable, and the game isn't over
            if(!tiles[i].matched && clickable && !end) {

                click_tile(tiles[i], "on") // Turn tile to "on" status
                
                // If nothing is currently clicked, track it
                if(!clicked) {
                    clicked = tiles[i]
                }
                
                // Otherwise, check if tiles match, check if game is over
                else {
                    clickable = false; // Stop from clicking anything during transition time
                    
                    setTimeout(function(){
                        match_tiles(tiles[i], clicked);
                        clickable = true;
                        checkEnd()
                    }, TRANSITION_TIME+300); // Wait a moment before matching to show both colors to player
                }

            }
        })
    }

    return tiles;
}

function click_tile(tileObject, type) {
        // Color depending on "on" or "off" status
        if(type === "on") {
            type = tileObject.color;
        } else {
            type = TILE_COLOR;
        }
        
        // No clicks during color transition time
        clickable = false;
        tileObject.tile.css("background-color", type);
        setTimeout(function(){
            clickable = true;
        }, TRANSITION_TIME);
}

function match_tiles(tileObject1, tileObject2) {

    clicked = null; // Since both tiles clicked, turn off

    // If the colors don't match, decrease attempts and change both colors back to tile color
    if(tileObject1.color != tileObject2.color) {
        numAttempts--;
        
        click_tile(tileObject1, "off");
        click_tile(tileObject2, "off");

        attemptsText.text(numAttempts)
        return false;        
    }
    
    // Otherwise, set matched boolean on both tiles to true
    tileObject1.matched = true;
    tileObject2.matched = true;
    matchesLeft--;
    return true;
}

function checkEnd() {
    // If no matches left
    if(matchesLeft === 0) {
        end = true;
        endText.text("You won!")
    }

    // If no attempts left
    else if(numAttempts === 0) {
        end = true;
        endText.text("You lost!")
    }
}

// Inital setup; load tiles and setup number of attempts shown to user
load_tiles()
attemptsText.text(numAttempts)