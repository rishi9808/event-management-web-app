const router = require("express").Router()
const User = require("../model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//register a user
router.post("/register", async (req, res) => {
  //hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    ...req.body,
    password: hashedPassword,
  })

  try {
    await user.save()
    res.send({ user })
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

//login the registered user
router.post("/login", async (req, res) => {
  //checking if email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({ error: "Email does not exists" })

  //checking if password is correct using bcrypt
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send({ error: "Invalid password" })

  const token = jwt.sign({ _id: user._id }, "yourSecretKey")
  res.send({ user, token: `Bearer ${token}` })
})

//verify the current user weather they are registered or not
router.get("/verifyToken", async (req, res) => {
  if (req.user) res.send({ user: req.user })
  else res.status(400).send({ error: "Could not verify token" })
})

//get the details of user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).populate(
      "participatedEvents adminOfClub"
    )

    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

//update the details of user
router.post("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    const { name, email, dateOfBirth, rollNo, branch, batch, mobileNo } =
      req.body

    user.name = name
    user.email = email
    user.dateOfBirth = dateOfBirth
    user.rollNo = rollNo
    user.branch = branch
    user.batch = batch
    user.mobileNo = mobileNo

    await user.save()
    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

module.exports = router
