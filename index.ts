import express from "express";
// import parseServer from "parse-server";
var ParseServer = require('parse-server').ParseServer;
import path from "path";
import Leads from "./src/routes/leads";
import { environment } from "./env/environment";
import bodyParser from "body-parser";
import cors from 'cors';
import Stages from "./src/routes/stages";

const app = express();
const port = process.env.PORT || 1337;

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
var api = new ParseServer({
  databaseURI: process.env.DATABASE_URI || environment.databseUrl,
  appId:process.env.APP_ID || environment.appId,
  masterKey:process.env.MASTER_KEY || environment.masterkey,
  serverURL:environment.serverUrl || 'http://localhost:1337/parse',
});

app.use('/parse', api);

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/leads',Leads.getLeads);
app.get('/lead/:id',Leads.getLeadById);
app.post('/lead',Leads.createLead);
app.get('/stages/:columns',Stages.fetchStages);

app.listen(port,()=>{
    console.log(`Lead server running on ${port}`);
})

