const {Client, Attachment, RichEmbed} = require('discord.js')
const client = new Client()

var Maindict = {
    items: [],
    identification: [],
    procItems: [],
    stuckPeople: [],
}

var IEPeopledict = {
    
}

//*NOTE: All "console.log() functions are for debugging."

client.on('ready', () => {
    client.user.setPresence({ game: { name: 'with you. ;D' }})
    console.log("Connected as " + client.user.tag)
    var startChannels = client.channels.get("586192097699168277")
    x => x.displayName.toLowerCase() === Maindict.items[index][i+6].toLowerCase()
    startChannels.send("RaidBot is now online.").then(d_msg =>{d_msg.delete(3600000)})
})

bot_secret_token = "PUT TOKEN HERE"

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

/*function getDate(){
    var m = new Date(); //TIME AND DATE UTC
    var dateString =
        m.getUTCFullYear() + "/" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);
}*/      

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1)// All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    //list of commands
    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    
    } else if (primaryCommand == "add") {
        addCommand(arguments, receivedMessage)
    } else if (primaryCommand == "retweet"){
        retweet(receivedMessage)
    } else if (primaryCommand == "clearchat") {
        clearCommand(arguments, receivedMessage)
    
    } else if (primaryCommand == "list") {
        listCommand(arguments, receivedMessage)
    
    } else if (primaryCommand == "stuck") {
        stuckCommand(arguments, receivedMessage)
    
    } else if (primaryCommand == "remove") {
        removeCommand(arguments, receivedMessage)
    
    } else if (primaryCommand == "update") {
        updateCommand(arguments, receivedMessage)
    
    } else if (primaryCommand == "removeall") {
        removeallCommand(arguments, receivedMessage)
    
    } else if (primaryCommand == "ping"){
        mentionPing(arguments, receivedMessage)
    
    } else {
        receivedMessage.channel.send("I don't understand the command.")
    }
}

//list of commands
function helpCommand(arguments, receivedMessage) {
    CommandList = "Here are the commands:\n"+
    "`!add [username] [raidboss name] [hp] [lap]` - Add anyone's titan on the raid list. Adding 'mine' as [username] puts your username as the owner of the raid boss.\n"+
    "`!remove [username]` - Remove anyone's titan on the raid list. This will ping the owner of the titan and people who are stuck on the titan.\n"+
    "`!list` - Gives the raid list.\n"+
    "`!stuck [owner of raidboss] [username]` - Puts you on the stuck list of a raidboss.\n"+
    "`!update [username] [raidboss name] [hp] [lap]` - Update anyone's titan on the raid list.\n"+
    "`!removeall` - Removes everything from the raid list.\n"+
    "NOTE: EACH SPACE REPRESENTS A NEW ARGUMENT."
    receivedMessage.channel.send(CommandList)
}



function addCommand(arguments, receivedMessage) {
    //too many arguments
    if (arguments.length > 5) {
        receivedMessage.channel.send("Woah there buddy, too many values there.")
        return
    }
    //too little arguments
    if (arguments.length < 3) {
        receivedMessage.channel.send("Not enough values. IGN / BOSS NAME / HP LEFT /LAP [OPTIONAL] / FLAG")
        return
    }
    //putting usernames in list
    split = []
    for (i = 0; i < Maindict.items.length; i++) {
        console.log(Maindict.items[i])
        console.log(Maindict.items[i][1])
        split.push(Maindict.items[i][1].toLowerCase())
        console.log(split)
    }
    //change name to discord ign
    if (arguments[0] == "mine"){
        argConfig = []
        console.log(receivedMessage.member.displayName)
        //let argument[0] be the message sender's username
        arguments[0] = receivedMessage.member.displayName
    }
    //if adding username already in list, send message.
    if (split.includes(arguments[0].toLowerCase())){
        receivedMessage.channel.send("You already have a titan up. Use `!remove` [username] to remove it from the list.")
        return
    }
    if (!isNaN(arguments[2])){
        argConfig = []
        //check any other names in username list for argument[0]
        if (IEPeopledict.hasOwnProperty(arguments[0])){
            
        }
        if (arguments[4] == "red"){
            argConfig.push("```coffeescript\n", '"#{'+arguments[0], arguments[1], arguments[2], arguments[3]+'}"', "\n```")
            console.log("Arguments: "+argConfig)
            Maindict.items.push(argConfig)
            console.log("Maindict: "+Maindict)
            generalSorting(arguments)
        }
        else{
            argConfig.push("```ml\n", arguments[0], arguments[1],  arguments[2], arguments[3], "\n```")
            Maindict.items.push(argConfig)
            generalSorting(arguments)
        }
    }
    else if (arguments[2].slice(-1)=="k"){
        argConfig = []
        if (arguments[4] == "red"){
            argConfig.push("```coffeescript\n", '"#{'+arguments[0], arguments[1], arguments[2], arguments[3]+'}"', "\n```")
            console.log("Arguments: "+argConfig)
            Maindict.items.push(argConfig)
            console.log("Maindict: "+Maindict)
            generalSorting(arguments)
        }
        else{
            argConfig.push("```ml\n", arguments[0], arguments[1],  arguments[2], arguments[3], "\n```")
            Maindict.items.push(argConfig)
            console.log(Maindict.items)
            generalSorting(arguments)
        }
    }
    else{
        receivedMessage.channel.send("Set it this way -> IGN / BOSS NAME / HP LEFT /LAP [OPTIONAL]")
    }
}

function removeCommand(arguments, receivedMessage) {
    if (arguments.length < 1) {
        receivedMessage.channel.send("Not enough values. Use IGN after command")
        return
    }
    //create list
    split = []
    //append all usernames into list
    for (i = 0; i < Maindict.items.length; i++) {
        console.log(Maindict.items[i])
        console.log(Maindict.items[i][1])
        split.push(Maindict.items[i][1].toLowerCase())
        console.log(split)
    }
    //change name to discord ign
    if (arguments[0] == "mine"){
        argConfig = []
        console.log(receivedMessage.member.displayName)
        //let argument[0] be the message sender's username
        arguments[0] = receivedMessage.member.displayName
    }
    MessageName = arguments[0].toLowerCase()
    //find username from arguments[0] (non case-sensitive)
    var index = Math.ceil(split.indexOf(MessageName))
    //if username not on list, return message
    if (index == -1){
        receivedMessage.channel.send("The titan is not on the list.")
    }
    else{
        console.log(index)
        receivedMessage.channel.send("Removed " + MessageName + "'s raid target.")
        mentionPing(arguments, receivedMessage)
        if (Maindict.items[index].length > 6){
            stuckPing(receivedMessage, index)
        }
        Maindict.items.splice(index, 1)
        generalSorting(arguments)
    }    
}

//remove all raids from list
function removeallCommand(arguments, receivedMessage){
    Maindict.items = []
    receivedMessage.channel.send("Removed everything from list.")
}

//updating the list (!remove and !add combined)
function updateCommand(arguments, receivedMessage){
    if (arguments.length < 3) {
        receivedMessage.channel.send("Set it this way -> IGN / BOSS NAME / HP LEFT / LAP [OPTIONAL] / FLAG[RED ONLY]")
        return
    }
    else{
        //List of arguments
        argConfig = []
        //list usernames in current raid
        split = []
        for (i = 0; i < Maindict.items.length; i++) {
            console.log(Maindict.items[i])
            console.log(Maindict.items[i][1])
            split.push(Maindict.items[i][1].toLowerCase())
            console.log(split)
        }
        //case change, for non-case sensitive.
        MessageName = arguments[0].toLowerCase()
        //find argument[0] in username list "split".
        var index = Math.ceil(split.indexOf(MessageName))
        //if argument[0] not in list, then send message.
        if (index == -1){
            receivedMessage.channel.send("The titan is not on the list.")
        }
        else{
            console.log(index)
            //remove username from list
            Maindict.items.splice(index, 1)
            //check if important
            if (arguments[4] == "red"){ // add command NEED TO FIX
                argConfig.push("```coffeescript\n", '"#{'+arguments[0], arguments[1], arguments[2], arguments[3]+'}"', "\n```")
                console.log("Arguments: "+argConfig)
                Maindict.items.push(argConfig)
                console.log("Maindict.items: "+Maindict.items)
                generalSorting(arguments)
            }
            else{
                argConfig.push("```ml\n", arguments[0], arguments[1],  arguments[2], arguments[3], "\n```")
                Maindict.items.push(argConfig)
                generalSorting(arguments)
        }    

    }
}
    
}

//clear the chat based on argument[0]
async function clearCommand(arguments, receivedMessage){  
    if (isNaN(arguments[0])){
        receivedMessage.channel.send("Umm...I need a number. \nUse `!clearchat [number] [channel].` (Will only clear 100 posts max)")
        return
    }
    else {
        //channel ID here pls
        var generalChannel = client.channels.get("588861416719515652") // replace with known channel IP DO IT 
        let fetched;
        //fetch messages from channel, limit 100
        fetched = await generalChannel.fetchMessages({limit: arguments[0]});
        //delete fetched msg
        generalChannel.bulkDelete(fetched);
        //delete your own msg
        receivedMessage.delete()
        }
    }

//makes extra list for people stuck in a raid
function stuckCommand(arguments, receivedMessage){
    //put usernames from raidlist into this list
    split = []
    for (i = 0; i < Maindict.items.length; i++) {
        split.push(Maindict.items[i][1].toLowerCase())
        }
    
    MessageName = arguments[0].toLowerCase()
    //get index of argument[0] from list
    var index = Math.ceil(split.indexOf(MessageName))


    // Only for when people want to restrict to one titan.
    /*stuckMen = []
    for (i = 0; i < Maindict.items.length; i++) {
        for (n = 0; n < Maindict.items[i].length - 6; n++){
            if (Maindict.items[i][n+6].includes("```Stuck: ")){
                stuckMen.push(Maindict.items[i][n+6].replace("```Stuck: ", ""))
            }
            else{
                stuckMen.push(Maindict.items[i][n]+6)
            }
        }
    }
    console.log(stuckMen)
    if (stuckMen.includes(arguments[0].toLowerCase())){
        receivedMessage.channel.send("You're already stuck somewhere...far far away... Use !remstuck")
        return
    }*/

    //check if someone is stuck on that raid boss already.
    //if so, only append username
    if(Maindict.items[index].length > 6){
        Maindict.items[index].push(arguments[1])
        generalSorting(arguments) 
    }
    //if not, append stuck prefix and username
    else{
        Maindict.items[index].push("```Stuck: "+arguments[1])
        generalSorting(arguments) 
    }
}

//lists the raid members and raid bosses
function listCommand(arguments, receivedMessage){
    if (Maindict.items.length < 1){
        receivedMessage.channel.send("No raid targets currently.")
    }
    else{
        var m = new Date(); //TIME AND DATE UTC
        var dateString =
        m.getUTCFullYear() + "/" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);

        //sort by lap
        if (arguments[0] == "lap"){
            Maindict.items.sort(function(a, b){return parseInt(a[4])-parseInt(b[4])}) //sort HP values
            MainMessage = "```css\n--------------------------------------------------------------------\n"
            + "Date: ["+ dateString + "(UTC)]\n"+
            "--------------------------------------------------------------------\n```\n"
    
            //Storing in another list because im lazy
            for (i in Maindict.items){
                Maindict.procItems[i] = Maindict.items[i][3]
            }
    
            //Turning HP to [number]k
            for (i in Maindict.items){
                if (!isNaN(Maindict.items[i][3])){
                    if(Maindict.items[i][3] > 1000){
                        Maindict.items[i][3] = Maindict.items[i][3]/1000 + "k"
                        }
                    }
                console.log(Maindict.items[i])
                MainMessage += Maindict.items[i].join(" | ").toUpperCase()
                }
            receivedMessage.channel.send(MainMessage)  
            //Turning it back to a number
            for (i in Maindict.items){
                Maindict.items[i][3] = Maindict.procItems[i]
                console.log(Maindict.items[i][3])
            }  
        }


        else {
            Maindict.items.sort(function(a, b){return parseInt(a[3])-parseInt(b[3])}) //sort HP values
            MainMessage = "```css\n--------------------------------------------------------------------\n"
            + "Date: ["+ dateString + "(UTC)]\n"+
            "--------------------------------------------------------------------\n```\n"
    
            //Storing in another list because im lazy
            for (i in Maindict.items){
                Maindict.procItems[i] = Maindict.items[i][3]
            }
    
            //Turning HP to [number]k
            for (i in Maindict.items){
                if (!isNaN(Maindict.items[i][3])){
                    if(Maindict.items[i][3] > 1000){
                        Maindict.items[i][3] = round(Maindict.items[i][3]/1000, 1) + "k"
                    }
                }
                console.log(Maindict.items[i])
                console.log(Maindict.items[i][6])
                MainMessage += Maindict.items[i].slice(0, 6).join(" | ").toUpperCase()
                console.log(Maindict.items[i][7])
                if (Maindict.items[i].length > 6){
                    MainMessage += Maindict.items[i].slice(6, ).join(", ").toUpperCase() + "```"
                }
            }
            console.log(MainMessage)
            receivedMessage.channel.send(MainMessage)  
            //Turning it back to a number
            
            for (i in Maindict.items){
                Maindict.items[i][3] = Maindict.procItems[i]
                console.log(Maindict.items[i][3])
            }
        }    
    }      
        
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function generalSorting(arguments){ 
    var m = new Date(); //TIME AND DATE UTC
    var dateString =
        m.getUTCFullYear() + "/" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);

    //Turning 'k' into HP
    for (i in Maindict.items){
        console.log(Maindict.items[i][3])
        if (isNaN(Maindict.items[i][3])){
            console.log(Maindict.items[i][3])
            Maindict.items[i][3] = Maindict.items[i][3].slice(0, -1)
            console.log(Maindict.items[i][3])
            Maindict.items[i][3] = round(Maindict.items[i][3]*1000, 1)
            console.log(Maindict.items[i][3])
        }
    }

    Maindict.items.sort(function(a, b){return parseInt(a[3])-parseInt(b[3])}) //sort HP values
    var generalChannel = client.channels.get("588861416719515652") // replace with known channel IP DO IT 588861416719515652
    MainMessage = "```css\n--------------------------------------------------------------------\n"
    + "Date: ["+ dateString + "]\n"+
    "--------------------------------------------------------------------\n```"
    
    if (Maindict.items.length == 0){
        return
    }

    for (i in Maindict.items) {
        Maindict.procItems[i]=Maindict.items[i][3]
        console.log(Maindict.items[i][3])
        }
    
    //Turning HP to [number]k
    for (i in Maindict.items){
        if (!isNaN(Maindict.items[i][3])){
            if(Maindict.items[i][3] > 1000){
                Maindict.items[i][3] = round(Maindict.items[i][3]/1000, 1) + "k"
            }
        }
        MainMessage += Maindict.items[i].slice(0, 6).join(" | ").toUpperCase()
        if (Maindict.items[i].length > 6){
            MainMessage += Maindict.items[i].slice(6, ).join(", ").toUpperCase() + "```"
        }
    }
    generalChannel.send(MainMessage+"\n").then(d_msg =>{d_msg.delete(3600000)})
    
    //Turning it back to a number
    for (i in Maindict.items){
        Maindict.items[i][3] = Maindict.procItems[i]
        console.log(Maindict.items[i][3])
        }
    }

function mentionPing(arguments, receivedMessage){
    MemberID = receivedMessage.guild.members.find(x => x.displayName.toLowerCase() === arguments[0].toLowerCase())
    if (!MemberID){
        console.log(receivedMessage.guild.members.find(x => x.user.username.toLowerCase() === arguments[0].toLowerCase()))
        MemberID = receivedMessage.guild.members.find(x => x.user.username.toLowerCase() === arguments[0].toLowerCase())
        if (!MemberID){
            receivedMessage.channel.send("The user could not be pinged because of additional characters or symbols not on the list.")
            return
        }
    }
    receivedMessage.channel.send("Hey, "+MemberID +"! Your titan is dead!")
}

function stuckPing(receivedMessage, index){
    stuckList = []
    Maindict.items[index][6] = Maindict.items[index][6].replace("```Stuck: ", "")
    console.log(Maindict.items[index][6])
    console.log(Maindict.items[index].length)
    for (i = 0; i < Maindict.items[index].length - 6; i++){
        console.log(Maindict.items[index][i])
        stuckMemberID = receivedMessage.guild.members.find(x => x.displayName.toLowerCase() === Maindict.items[index][i+6].toLowerCase())
        if (!stuckMemberID){
            console.log(receivedMessage.guild.members.find(x => x.user.username.toLowerCase() === Maindict.items[index][i+6].toLowerCase()))
            stuckMemberID = receivedMessage.guild.members.find(x => x.user.username.toLowerCase() === Maindict.items[index][i+6].toLowerCase())
            if (!stuckMemberID){
                receivedMessage.channel.send("The user could not be pinged because of additional characters or symbols not on the list.")
                continue
            }
        }
        stuckList.push(stuckMemberID)
    }
    receivedMessage.channel.send("Hey, " + stuckList.join(", ") +"! You're not stuck anymore!")
}

client.login(bot_secret_token)
