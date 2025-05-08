import supabase from "../lib/supabase.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// import bcrypt from "bcrypt"; // this was added by alex from chatgpt i dont know what it is doing


const storeRefreshToken = async (userId, refreshToken) => {
  try {
    const { data, error } = await supabase
      .from('refresh_tokens')
      .insert([{ user_id: userId, refresh_token: refreshToken, created_at: new Date() }]);

    if (error) {
      console.error("Error in storeRefreshToken controller:", error.message);
      return;
    }
    console.log('Refresh token stored successfully:', data);
  } catch (error) {
    console.error("Unexpected error in storeRefreshToken controller:", error.message);
  }
};

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return {
    accessToken,
    refreshToken
  };
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// export const signup = async (req, res) => {
//   const { email, password, name } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const user = await User.create({ email, password, name });

//     const { accessToken, refreshToken } = generateTokens(user._id);
//     await storeRefreshToken(user._id, refreshToken);
//     setCookies(res, accessToken, refreshToken);

//     res.status(201).json({
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       },
//       message: "User created successfully"
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



export const signup = async (req, res) => {
  console.log("📩 Received Data:", req.body); // Log request body

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      console.log("❌ Missing fields:", { name, email, password });
      return res.status(400).json({ message: "All fields are required" });
  }

  try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      // const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      console.error("🔥 Signup Error:", error);
      res.status(500).json({ message: "Server error" });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ message: "Invalid user data received" });
  }

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: "User not found" });
      }

      // const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token (if using JWT)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Login successful", token, user });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
};
export const delUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in delUser controller", error.message);
    res.status(500).json({ message: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const { error } = await supabase
        .from('refresh_tokens')
        .delete()
        .eq('user_id', decoded.userId);

      if (error) {
        console.error("Error deleting refresh token:", error.message);
      }
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { data, error } = await supabase
      .from('refresh_tokens')
      .select('refresh_token')
      .eq('user_id', decoded.userId)
      .single();

    if (error || !data || data.refresh_token !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Error in refreshToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const stupid  = async (req, res) => {
  res.json({body: "Hello Fucking World"})
}