🔹 1. String Constraints
name: {
  type: String,
  required: true,             // must not be empty
  minlength: 3,               // minimum length
  maxlength: 50,              // maximum length
  trim: true,                 // removes leading/trailing spaces
  lowercase: true,            // always stored as lowercase
  uppercase: true,            // always stored as uppercase
  enum: ["guest", "admin", "user"], // fixed set of allowed values
  match: [/^[A-Za-z ]+$/, "Only letters allowed"], // regex validation
  enum: ["male", "female", "other"], // fixed set of values
  default: "Guest"            // default value
}



🔹 2. Number Constraints
age: {
  type: Number,
  required: true,
  min: 18,                    // must be at least 18
  max: 60,                    // must be at most 60
  enum: [18, 20, 22, 24, 26, 28, 30] // allowed values (optional)
  default: 18,
  validate(value) {           // custom validation
    if (value % 2 !== 0) throw new Error("Age must be even");
  }
}



🔹 3. Boolean Constraints
isActive: {
  type: Boolean,
  default: true,              // default value
  required: true
}


🔹 4. Date Constraints
createdAt: {
  type: Date,
  default: Date.now           // automatically set current timestamp
},
dob: {
  type: Date,
  required: true,
  min: "1900-01-01",          // earliest allowed date
  max: Date.now               // must not be in future
}

🔹 5. Array Constraints
tags: {
  type: [String],             // array of strings
  default: []                 // default empty array
},
scores: {
  type: [Number],
  validate: {
    validator: arr => arr.length <= 5,
    message: "Max 5 scores allowed"
  }
}



🔹 6. ObjectId (Relationships)
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",                // reference another collection
  required: true
}



🔹 7. Mixed / Map
meta: {
  type: mongoose.Schema.Types.Mixed, // can hold anything
  default: {}
},
settings: {
  type: Map,
  of: String                     // key-value pairs
}



🔹 8. Schema-level Options

When defining schema, you can also set options:

const schema = new mongoose.Schema({...}, {
  timestamps: true,      // adds createdAt & updatedAt
  versionKey: false,     // remove __v field
  strict: true           // only allow defined fields
});
