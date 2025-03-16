import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, name });

    // authenticate user
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // role: user.role,
    });

    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};

export const login = async (req, res) => {
    try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			// const { accessToken, refreshToken } = generateTokens(user._id);
			// await storeRefreshToken(user._id, refreshToken);
			// setCookies(res, accessToken, refreshToken);

			res.json({
				// _id: user._id,
				name: user.name,
				email: user.email,
				// role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
 
};

export const logout = async (req, res) => {
  res.send("logout up route called");
};
