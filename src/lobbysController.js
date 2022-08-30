const getLobby = function(id) {
    lobby = lobbysList.get(id)
    if (lobby === undefined) {
        return undefined
    }
    else {
        return JSON.stringify(lobbysList.get(id))
    }
}

const createLobby = function() {
    let lobby = {
        id: Math.random().toString(36).slice(2).substring(0,6),
        difficulty: "easy",
        state: "waiting",
        language: "en"
    }
    lobbysList.set(lobby.id, lobby)
    return JSON.stringify(lobby)
}

module.exports ={
    getLobby,createLobby
}