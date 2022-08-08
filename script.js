let numtiles = 16;
let numAttempts = 3;
let numMatches = 8;
let TILE_COLOR = "#1c1b18";
let tiles = []
let COLORS = ["#f57d7d", "#f57d7d", "#f5b97d", "#f5b97d", "#fcfc77", "#fcfc77", "#7bfc77", "#7bfc77", "#779ffc",
"#779ffc", "#a177fc", "#a177fc", "#e877fc", "#e877fc", "#fc77d6", "#fc77d6"]
let END = false;

function load_tiles() {
    for(let i = 0; i < numtiles; ++i) {
        let tileObject = {};
        tileObject.tile = $("#" + i)
        tileObject.tile.css("background", TILE_COLOR)
        tileObject.matched = false;
        tiles.push(tileObject)
    }
    
    let tileAssignment = [6,11,3,2,15,7,0,8,5,12,10,1,9,13,14,4]
    for(let i = 0; i < tileAssignment.length; ++i) {
        tiles[tileAssignment[i]].color = COLORS[i]
    }

    for(let i = 0; i < tiles.length; ++i) {
        tiles[i].tile.click(function(){
            if(!tiles[i].matched) {
                click_tile(tiles[i])
                if(!CLICKED) {
                    CLICKED = tiles[i]
                } else {
                    match_tiles(tileObject1, tileObject2)
                }
            }
        })
    }
    return tiles
}

function click_tile(tileObject) {
        tileObject.tile.css("background-color", tileObject.color);
}

function click_tile_off(tileObject) {
    tileObject.tile.css("background-color", TILE_COLOR);
}

function match_tiles(tileObject1, tileObject2) {
    CLICKED = null;
    if(tileObject1.color != tileObject2.color) {
        numAttempts--;
        click_tile_off(tileObject1);
        click_tile_off(tileObject2);
        return false;        
    }
    
    tileObject1.matched = true;
    tileObject2.matched = true;
    numMatches--;
    return true;
}

let attemptsText = $("#attempts")
let container = $(".container")
let endText = $("#end")

let tiles = load_tiles()
tiles = tiles
console.log(tiles)

while(matchesLeft > 0 || attempts > 0) {
    
}


main()