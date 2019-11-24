const express = require("express");
const app = express();
const fs = require('fs');


app.use(express.static('public'));
app.get('/', function (req, res){
  res.header("Access-Control-Allow-Origin", "*");
  const params = req.query;
  let dexnum = params.dexnum;
  let data = {};
		//find all the folders in the folder, read the title from info.txt
		//also include folder name
		let folders = fs.readdirSync("pkmn");
		let pokes = [];
		for(let i = 0; i < folders.length; i++){
			pokes[i] = {};
			let info = fs.readFileSync("pkmn/" + folders[i] + "/info.txt", 'utf8');
			let lines = info.toString().split("\n");
			let title = lines[0];
      let rockpaper = lines[1];
			pokes[i]["title"] = title;
      pokes[i]["rockpaper"] = rockpaper;
			pokes[i]["folder"] = folders[i];
		}
		data = pokes;

  let to_send = JSON.stringify(data);
  res.send(to_send);
})
app.listen(3000);
