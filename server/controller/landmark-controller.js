const Landmark = require('../models/Landmark');
const Comment = require('../models/Landmark');
const createLandmark = (req, res) => {
    const body = req.body
    console.log(body + "body");

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide the coordinate of the landmark, check if lat or lng is missing',
        })
    }

    const landmark = new Landmark(body)
    console.log("landmark"+landmark);

    const comment = new Comment(req.body.comments);
    console.log("comment"+comment);

    if (!landmark) {
        return res.status(400).json({ success: false, error: "no landmark" })
    }
 
    landmark
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: landmark._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'landmark not created!',
            })
        })
}

const updateLandmark = async (req, res) => {
    const body = req.body
    // const lat = req.body.lat;
    // const lng = req.body.lng;
    // const newComment = req.body.comment;
    console.log(req.body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a lat to update',
        })
    }

    console.log(req.body.lng);

    Landmark.findOne({_id: req.body.id }, (err, landmark) => {
        console.log("findlandmarker" + err);
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }

        // const comment = new Comment(req.body.comments);
        // console.log("comment"+comment);
        // // console.log("landmar"+landmark);
        // const oldComments = landmark.comments;
        // console.log("old"+oldComments)
        // console.log("new"+JSON.stringify(req.body.comments, null, 2))
        // oldComments.push(req.body.comments)
        // console.log("req"+JSON.stringify(req.body, null, 2))
        // console.log("new"+JSON.stringify(req.body, null, 2))
        // console.log()
        // landmark.comments = oldComments.comments.push(body.comments);
        // movie.time = body.time
        // movie.rating = body.rating
        // landmark.comments = body.comments;

        landmark
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: landmark._id,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
            })
        })
}

const getCommentByLandmark = async (req, res) => {
        const body = req.body
        // const lat = req.body.lat;
        // const lng = req.body.lng;
        // const newComment = req.body.comment;
        console.log(req.body);
    
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a landmark to update',
            })
        }
        Landmark.findOne({_id: req.body.id }, (err, landmark) => {
            console.log("findlandmarker" + err);
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Movie not found!',
                })
            }
    
            // const comment = new Comment(req.body.comments);
            // console.log("comment"+comment);
            // // console.log("landmar"+landmark);
            // const oldComments = landmark.comments;
            // console.log("old"+oldComments)
            // console.log("new"+JSON.stringify(req.body.comments, null, 2))
            // oldComments.push(req.body.comments)
            // console.log("req"+JSON.stringify(req.body, null, 2))
            // console.log("new"+JSON.stringify(req.body, null, 2))
            // console.log()
            // landmark.comments = oldComments.comments.push(body.comments);
            // movie.time = body.time
            // movie.rating = body.rating
            // landmark.comments = body.comments;
    
            landmark
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: landmark._id,
                        message: 'Movie found!',
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Movie not updated!',
                    })
                })
            })
    
            
}

// deleteMovie = async (req, res) => {
//     await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!movie) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Movie not found` })
//         }

//         return res.status(200).json({ success: true, data: movie })
//     }).catch(err => console.log(err))
// }

// getMovieById = async (req, res) => {
//     await Movie.findOne({ _id: req.params.id }, (err, movie) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!movie) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Movie not found` })
//         }
//         return res.status(200).json({ success: true, data: movie })
//     }).catch(err => console.log(err))
// }

const getLandmarks = async (req, res) => {
    await Landmark.find({}, (err, landmark) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!landmark.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: landmark })
    }).clone().catch(err => console.log(err))
}

module.exports = {
    createLandmark,
    updateLandmark,
    getLandmarks
}