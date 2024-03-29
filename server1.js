const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "postgres",
	password: "Yessie97",
	database: "postgres"
};

const pool = new Pool(config);

app.post("/api", async (req, res) => {
	const workshop = req.body.workshop;
	const attendee = req.body.attendee;

	try {
		const template = "SELECT * FROM workshops WHERE workshop = $1 AND attendee = $2";
		const response = await pool.query(template, [
			workshop,
			attendee
		]);
	if (response.rowCount == 0) {
		const template = "INSERT INTO workshops(workshop, attendee) VALUES ($1, $2)";
		const response = await pool.query(template, [ workshop,attendee ]);
		res.json({attendee: attendee, workshop: workshop});
	} else {
		res.json({error: "attendee already enrolled"});
		}
	} catch (err) {
		console.error("Error running query " + err);
		res.json({error: "Error in post"});
		      }
			
	});


app.get("/api", async (req, res) => {
	try {
	  if (req.query.workshop) {
	
		const template = "SELECT * FROM workshop WHERE workshop = $1";
		const response = await pool.query(template, [req.query.workshop]);
	
		if (response.rowCount == 0) {
			res.json({ status: "not found", searchTerm: req.query.workshop });
		} else {
			const workshops = response.rows.map(function(item) {
			return item.workshop;
		});
			res.json({ status: "ok", attendees: workshops.rows[0] });


//			res.json({attendees: workshops.row[0] });
		}
	} else {
		console.log("In the else")
		const template = "SELECT distinct workshop FROM workshop";
		const response = await pool.query(template);
		res.json({attendees: response.rows[0] });
		console.log("end of else")}
	} catch (err) {
		console.error("Error running query " + err);
		res.json({ status: "error in get" });
	}
});
	app.listen(app.get("port"), () => {
        console.log("running")
});












