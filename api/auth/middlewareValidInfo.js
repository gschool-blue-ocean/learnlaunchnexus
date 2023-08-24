export default (req, res, next) => {
	const { email, name, password } = req.body;
	// regex for testing for valid user email
	const validEmail = (userEmail) => {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
	};
	// creates our middleware to check for valid credetials.
	switch (req.path) {
		case "/register":
			if (![email, name, password].every(Boolean)) {
				return res.json("Missing Credentials");
			} else if (!validEmail(email)) {
				return res.json("Invalid Email");
			}
			break;

		case "/login":
			if (![email, password].every(Boolean)) {
				return res.json("Missing Credentials");
			} else if (!validEmail(email)) {
				return res.json("Invalid Email");
			}
			break;
	}
	next();
};
