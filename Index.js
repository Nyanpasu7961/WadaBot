const {Client, Attachment, RichEmbed} = require('discord.js')
const client = new Client()

var Maindict = {
    items: [],
    procItems: [],
    stuckPeople: [],
}

var IEPeopledict = {
    
}

var onTrue = 0;

const questions = [
    "What's your IGN?",
    "What's your account level?",
    "What lap in raids did you get last time?",
    "What was your aid count?",
    "What time zone do you reside in?"
];

const applying = [

]

const applicationForm = [

]

//*NOTE: All "console.log() functions are for debugging."

client.on('ready', () => {
    client.user.setPresence({ game: { name: 'with you. ;D' }})
    console.log("Connected as " + client.user.tag)
    var startChannels = client.channels.get("586192097699168277")
    x => x.displayName.toLowerCase() === Maindict.items[index][i+6].toLowerCase()
    if (onTrue == 0){
        startChannels.send("```md\n# Testing is now in session.\n```")
    }
    else{
        startChannels.send("```css\nRaidBot is online.\n```")
    }
    //For save feature because i'm getting annoyed at when the RaidBot restarts, it resets the list
    /*var createList = fs.readFile('./RaidBot_listData.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
    })
    for (i = 0; i < createList.length; i++){
        argConfig = []
        argConfig.push(createList[i].prefix, createList[i].name, createList[i].raidBoss, createList[i].HP, createList[i].lapNumber, createList[i].suffix)
    }
    generalSorting()*/
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

//when guild member is added to port, then DM the member this message.
client.on('guildMemberAdd', member =>{
    var startChannels = client.channels.get("586192097699168277")
    startChannels.send(member + " has joined the server!")
    member.send("```css\nThis is an automated message from our server bot, RaidBot.```\n"+
    "Welcome to the Wadatsumi Alchemia Port, " + member + "!\n"+ 
    "We are a semi-competitive port always looking for new members to help us be on top!\n"+
    "Feel free to look around our port and get along with our members.\n"+
    "```md\n# Applications\n```"+
    "Ask on the general-chat channel or DM @Taeleaf if you want to apply to the port.\n"+
    "Information needed (Apply in #member-applications using !%apply):\n"+
    "   - Your IGN\n"+
    "   - Account Level\n"+
    "   - Raid Statistics (i.e. what lap you got to last time and aid count)\n"+
    "   - Your friend mercenaries in the #introductions channel.\n"+
    "   - Timezone (i.e. AEST, UTC, etc.)\n"+
    "Alright, that's pretty much all we need from you. We hope to see you active in our Discord channel and raids in the future!")
})

client.on('disconnect', () =>{
    var startChannels = client.channels.get("586192097699168277")
    startChannels.send("RaidBot is offline.")
})

function getDate(){
    var m = new Date(); //TIME AND DATE UTC
    var dateString =
        m.getUTCFullYear() + "/" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);
    return dateString
}    

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
    
    } else if (primaryCommand == "%apply"){
        applicationCommand(receivedMessage)
    
    } else {
        receivedMessage.channel.send("I don't understand the command.")
    }
}

//list of commands
function helpCommand(arguments, receivedMessage) {
    CommandList = "Here are the commands:\n"+
    "`!add [username] [raidboss name] [hp] [lap]` - Add anyone's titan on the raid list. Adding 'mine' as [username] puts your username as the owner of the raid boss.\n"+
    "`!remove [username]` - Remove anyone's titan on the raid list. This will ping the owner of the titan and people who are stuck on the titan. Adding 'mine' as [username] puts your username as the owner of the raid boss.\n"+
    "`!list` - Gives the raid list.\n"+
    "`!stuck [owner of raidboss] [username]` - Puts you on the stuck list of a raidboss.\n"+
    "`!update [username] [hp]` - Update anyone's titan on the raid list.\n"+
    "`!removeall` - Removes everything from the raid list.\n"+
    "`!clearchat [number]` - Clear messages by raidbot in #raids-targets.\n"+
    "`!%apply` - Apply for a position in our port! Just answer some questions. (Only works in "+ client.channels.get("628459213974405121") + ")\n" +
    "NOTE: EACH SPACE REPRESENTS A NEW ARGUMENT."
    receivedMessage.channel.send(CommandList)
}

//command for a port member application (Only works in the #application-forms channel)
async function applicationCommand(receivedMessage){
    //So not more than one application is by the same author at the same time.
    if (applying.includes(receivedMessage.author.id)){
        receivedMessage.channel.send("No applying more than once at a time.")
        return;
    } 
    //check if in correct channel
    if (!(receivedMessage.channel === client.channels.get("628459213974405121"))){
        receivedMessage.channel.send("Please apply in the"+ client.channels.get("628459213974405121")+ " channel.")
        return;
    }
    try {
        //create a list of Q&A form
        applicationForm = []
        //log author's name
        console.log(`${receivedMessage.author.tag} began applying.`);
        //append to member's applying.
        applying.push(receivedMessage.author.id);
        //start message
        await receivedMessage.channel.send(":pencil: **Application started!** Type `#cancel` to exit.");
        //recurring questions
        for (let i = 0, cancel = false; i < questions.length && cancel === false; i++) {
            await receivedMessage.channel.send(questions[i]);
            //check for time out, limits msg to 1 per question
            await receivedMessage.channel.awaitMessages(m => m.author.id === receivedMessage.author.id, { max: 1, time: 3000000, errors: ["time"] })
                //when msg sent, then continue.
              .then(collected => {
                  //if msg sent was #cancel, then cancel the application
                if (collected.first().content.toLowerCase() === "#cancel") {
                  receivedMessage.channel.send(":x: **Application cancelled.**");
                  applying.splice(applying.indexOf(receivedMessage.author.id), 1);
                  cancel = true;

                  console.log(`${receivedMessage.author.tag} cancelled their application.`);
                }
                //Appends answers into a list.
                //Bolds the IGN
                if (i == 0){
                    applicationForm.push("```css\n" + questions[i] + ": " + collected.first().content +"\n```")
                }
                else{
                    applicationForm.push(questions[i] + ": " + collected.first().content)
                } 
                //If timed out, then cancel application.
              }).catch(() => {
                receivedMessage.channel.send(":hourglass: **Application timed out.** :LofiaUGH:");
                applying.splice(applying.indexOf(receivedMessage.author.id), 1);
                cancel = true;

               console.log(`${receivedMessage.author.tag} let their application time out.`);
              });
            }
        //Finishing message
        await receivedMessage.channel.send(":thumbsup: **You're all done!**\nRemember to post your merc list in the #member-introductions channel or your application becomes invalid.");
        //send to #member-applications channel for organisation
        client.channels.get("628461198278656040").send(applicationForm)
        //Log for application finished members
        console.log(`${receivedMessage.author.tag} finished applying.`);
    } 
    //Send error to console when error is caught.
    catch(err) {
        console.error(err);
    }
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

    //check for 'mine', if true then let arguments[0] be sender's nickname.
    if (arguments[0]=="mine"){
        arguments[0] = receivedMessage.member.displayName
    }
    
    //if adding username already in list, send message.
    if (split.includes(arguments[0].toLowerCase())){
        receivedMessage.channel.send("You already have a titan up. Use `!remove` [username] to remove it from the list.")
        return
    }

    if (!isNaN(arguments[2])){
        argConfig = []
        if (arguments[4] == "red"){
            argConfig.push("```coffeescript\n", '"#{'+arguments[0], arguments[1], arguments[2], arguments[3]+'}"', "\n```")
            console.log("Arguments: "+argConfig)
            Maindict.items.push(argConfig)
            console.log("Maindict: "+ Maindict)
            generalSorting()
        }
        else{
            argConfig.push("```ml\n", arguments[0], arguments[1],  arguments[2], arguments[3], "\n```")
            Maindict.items.push(argConfig)
            generalSorting()
        }
    }
    else if (arguments[2].slice(-1)=="k"){
        argConfig = []
        if (arguments[4] == "red"){
            argConfig.push("```coffeescript\n", '"#{'+arguments[0], arguments[1], arguments[2], arguments[3]+'}"', "\n```")
            console.log("Arguments: "+argConfig)
            Maindict.items.push(argConfig)
            console.log("Maindict: "+Maindict)
            generalSorting()
        }
        else{
            argConfig.push("```ml\n", arguments[0], arguments[1],  arguments[2], arguments[3], "\n```")
            Maindict.items.push(argConfig)
            console.log(Maindict.items)
            generalSorting()
        }
    }
    else if (arguments[2].slice(-1) == "m"){
        argConfig = []
        if (arguments[4] == "red"){
            argConfig.push("```coffeescript\n", '"#{'+arguments[0], arguments[1], arguments[2], arguments[3]+'}"', "\n```")
            console.log("Arguments: "+argConfig)
            Maindict.items.push(argConfig)
            console.log("Maindict: "+Maindict)
            generalSorting()
        }
        else{
            argConfig.push("```ml\n", arguments[0], arguments[1],  arguments[2], arguments[3], "\n```")
            Maindict.items.push(argConfig)
            console.log(Maindict.items)
            generalSorting()
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
    if (arguments[0] == "mine"){
        arguments[0] = receivedMessage.member.displayName
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
        generalSorting()
    }    
}

//remove all raids from list
function removeallCommand(arguments, receivedMessage){
    Maindict.items = []
    receivedMessage.channel.send("Removed everything from list.")
}

//updating the list
function updateCommand(arguments, receivedMessage){
    if (arguments.length < 2) {
        receivedMessage.channel.send("Set it this way -> IGN / HP LEFT")
        return
    }
    else{
        if (arguments[0] == "mine"){
            arguments[0] = receivedMessage.member.displayName
        }
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
        if (isNaN(arguments[1].slice(0, -1))){
            receivedMessage.channel.send("You did not state the HP after the IGN.")
            return
        }
        if (index == -1){
            receivedMessage.channel.send("The titan is not on the list.")
        }
        else{
            console.log(index)
            Maindict.items[index][3] = arguments[1] // let HP change to HP assigned by argument 3.
            generalSorting() //Sort by HP
        }    
    }
}

//clear the chat based on arguments[0]
async function clearCommand(arguments, receivedMessage){  
    if (isNaN(arguments[0])){
        receivedMessage.channel.send("Umm...I need a number. \nUse `!clearchat [number] [channel].` (Will only clear 100 posts max)")
        return
    }
    else {
        //channel ID here pls
        var generalChannel = client.channels.get("588861416719515652") // replace with known channel IP DO IT 
        //fetch messages from channel, limit 100
        let fetched
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
    //check if raid boss exists or not
    if (index == -1){
        receivedMessage.channel.send("Raid boss doesn't exist.")
    }
    //check if someone is stuck on that raid boss already.
    //if so, only append username
    if (Maindict.items[index].length > 6){
        Maindict.items[index].push(arguments[1])
        generalSorting() 
    }
    //if not, append stuck prefix and username
    else{
        Maindict.items[index].push("```Stuck: "+arguments[1])
        generalSorting() 
    }
}

//lists the raid members and raid bosses
function listCommand(arguments, receivedMessage){
    if (Maindict.items.length < 1){
        receivedMessage.channel.send("No raid targets currently.")
    }
    else{
        var messageDate = getDate()
        
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
        //sort by lap
        if (arguments[0] == "lap"){
            //Turning 'k' into HP
            Maindict.items.sort(function(a, b){return parseInt(a[4])-parseInt(b[4])}) //sort HP values
        }
        else {
            Maindict.items.sort(function(a, b){return parseInt(a[3])-parseInt(b[3])}) //sort HP values
        }
        var generalChannel = client.channels.get("586193653915975680") // replace with known channel IP DO IT 588861416719515652
         MainMessage = "```css\n--------------------------------------------------------------------\n"
        + "Date: ["+ messageDate + "]\n"+
        "--------------------------------------------------------------------\n```"
    
        if (Maindict.items.length < 1){
            generalChannel.send("```css\n--------------------------------------------------------------------\n"
            + "Date: ["+ messageDate + "]\n"+ ".No Raid Targets.\n"+
            "--------------------------------------------------------------------\n```")
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

        MainMessage = MainMessage + "\n"

        generalChannel.send(MainMessage+"\n").then(d_msg =>{d_msg.delete(3600000)})
        
        //Turning it back to a number
        for (i in Maindict.items){
            Maindict.items[i][3] = Maindict.procItems[i]
            console.log(Maindict.items[i][3])
            }
        }
    }

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function generalSorting(){ 
    var messageDate = getDate()

    //Turning 'k' into HP
    for (i in Maindict.items){
        console.log(Maindict.items[i][3])
        if (isNaN(Maindict.items[i][3])){
            if (Maindict.items[i][3].slice(-1) == "k"){
                console.log(Maindict.items[i][3])
                Maindict.items[i][3] = Maindict.items[i][3].slice(0, -1)
                console.log(Maindict.items[i][3])
                Maindict.items[i][3] = round(Maindict.items[i][3]*1000, 1)
                console.log(Maindict.items[i][3])
            }
            else if(Maindict.items[i][3].slice(-1) == "m"){
                console.log(Maindict.items[i][3])
                Maindict.items[i][3] = Maindict.items[i][3].slice(0, -1)
                console.log(Maindict.items[i][3])
                Maindict.items[i][3] = round(Maindict.items[i][3]*1000000, 1)
                console.log(Maindict.items[i][3])
            }
        }
        /*client.messages [meow[i]] = {
            Prefix: Maindict.items[i][0],
            name: Maindict.items[i][1],
            raidBoss: Maindict.items[i][2],
            HP: Maindict.items[i][3],
            lapNumber: Maindict.items[i][4],
            Suffix: Maindict.items[i][5],
        }
        fs.writeFile("./RaidBot_listData.json", JSON.stringify(client.messages, null, 4), err =>{
            if (err) {throw err}
        })*/
    }

    Maindict.items.sort(function(a, b){return parseInt(a[3])-parseInt(b[3])}) //sort HP values
    var generalChannel = client.channels.get("588861416719515652") // replace with known channel IP DO IT 588861416719515652
    MainMessage = "```css\n--------------------------------------------------------------------\n"
    + "Date: ["+ messageDate + "]\n"+
    "--------------------------------------------------------------------\n```"
    
    if (Maindict.items.length < 1){
        generalChannel.send("```css\n--------------------------------------------------------------------\n"
        + "Date: ["+ messageDate + "]\n"+ ".No Raid Targets."+
        "------------------------------------------------------------\n--------\n```")
        return
    }

    for (i in Maindict.items) {
        Maindict.procItems[i]=Maindict.items[i][3]
        console.log(Maindict.items[i][3])
        }
    
    //Turning HP to [number]k
    for (i in Maindict.items){
        if (!isNaN(Maindict.items[i][3])){
            if(Maindict.items[i][3] >= 1000000){
                Maindict.items[i][3] = round(Maindict.items[i][3]/1000000, 1) + "m"
            }
            else if(Maindict.items[i][3] >= 1000){
                Maindict.items[i][3] = round(Maindict.items[i][3]/1000, 1) + "k"
            }
        }
        MainMessage += Maindict.items[i].slice(0, 6).join(" | ").toUpperCase()
        if (Maindict.items[i].length > 6){
            MainMessage += Maindict.items[i].slice(6, ).join(", ").toUpperCase() + "```"
        }
    }

    MainMessage = MainMessage + "\n"

    generalChannel.send(MainMessage+"\n" + "\n").then(d_msg =>{d_msg.delete(3600000)})
    
    //Turning it back to a number
    for (i in Maindict.items){
        Maindict.items[i][3] = Maindict.procItems[i]
        console.log(Maindict.items[i][3])
        }
    }

function mentionPing(arguments, receivedMessage){
    MemberID = receivedMessage.guild.members.find(x => x.displayName.toLowerCase() === arguments[0].toLowerCase())
    if (!MemberID){
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
    for (i = 0; i < Maindict.items[index].length - 6; i++){
        stuckMemberID = receivedMessage.guild.members.find(x => x.displayName.toLowerCase() === Maindict.items[index][i+6].toLowerCase())
        if (!stuckMemberID){
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
