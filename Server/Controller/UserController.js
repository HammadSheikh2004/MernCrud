const userModel = require("../Models/UserModel");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/UserImages")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const userImage = multer({ storage: storage });


let getUser = (req, res) => {
    userModel.find().sort({ _id: "desc" }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log("Error" + err);
    })
};

let insertUser = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File upload failed or no file uploaded!" });
    }
    console.log(req.file)
    // if (!req.files || req.files.length === 0) {
    //     return res.status(400).json({ message: "File upload failed or no file uploaded!" });
    // }
    // const imageFiles = req.files.map(file => file.filename);
    let data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    }
    console.log(data)
    let dataSave = new userModel(data);
    dataSave.save().then((saveddata) => {
        res.status(201).json({ message: 'Data Successfully Inserted!', saveddata });
    }).catch((err) => {
        res.status(401).json({ status: false, message: 'Data Not Inserted!' });
    });
};

let getUserById = ((req, res) => {
    const { id } = req.params;
    userModel.findById(id).then((data) => {
        res.status(200).json({ ...data })
    }).catch((err) => {
        console.log(err)
    });
});

let updateUserData = ((req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    userModel.findByIdAndUpdate(id, updateData, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ errMessage: "User not found!" });
            }
            res.status(200).json({ message: "Data Updated Successfully!", data });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ errMessage: "Error in API!" });
        });
});

const deleteUserData = (req, res) => {
    let { deleteId } = req.params;
    console.log(deleteId);

    userModel.findByIdAndDelete(deleteId)
        .then((data) => {
            if (data) {
                res.status(200).json({ message: "Data Deleted Successfully!", ...data });
            } else {
                res.status(404).json({ message: "Data not found!" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Server Error", error: err.message });
        });
};



module.exports = { getUser, insertUser, getUserById, updateUserData, deleteUserData, userImage };
