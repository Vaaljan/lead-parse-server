import * as Parse from 'parse/node';

const getLeads = (req, res) => {
    const query = new Parse.Query('Leads');
    console.log("Starting Leads Query");
    query.find({}).then((result) => {
        console.log("Leads retreived")
        res.send(result)
    })
        .catch((error) => {
            console.log("error", error)
            res.status(500).json(error);
        });
}

const getLeadById = (req, res) => {
    const query = new Parse.Query('Leads');
    console.log("Finding Lead by ID : " + req.params.id);
    query.get(req.params.id).then((result) => {
        console.log("Lead found")
        res.json()
        res.send(result)
    })
        .catch((error) => {
            console.log("error", error)
            res.status(500).json(error);
        });
}


const createLead = (req, res) => {

    console.log("Creating Lead", req.body);
    let obj = new Parse.Object('Leads');
    obj.set(req.body);
    obj.save().then((data) => {
        console.log("Lead Created Success")
        res.send(data.toJSON())
    })
        .catch((error) => {
            console.log("error", error)
            res.status(500).json(error);
        })

};

export { getLeads, getLeadById, createLead };