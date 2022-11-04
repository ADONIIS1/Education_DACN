const Rank = require("../models/Rank");
const Room = require("../models/Room");
const User = require("../models/User");
const path = require("path");
const XLSX = require("xlsx");

class CompetitionController {

    // [GET]/competition/ranks
    async ranks(req, res) {

        const ranks = await Rank.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $sort: { score: -1, victory: -1 } },
        ]);
        res.render("competition/ranks", {
            ranks,
            layout: "admin",
        });
    }

    async detail(req, res) {
        const room = await Room.aggregate([
            {
                $match: {
                    roomName: req.params.id,
                },
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "subjectID",
                    foreignField: "_id",
                    as: "subject",
                },
            },
            {
                $lookup: {
                    from: "units",
                    localField: "unitID",
                    foreignField: "_id",
                    as: "unit",
                },
            },
            {
                $lookup: {
                    from: "lessions",
                    localField: "lessionID",
                    foreignField: "_id",
                    as: "lession",
                },
            },
        ]);

        // const user = await User.findOne({
        //     username: room[0].roomName.split("@").join(""),
        // });
        // const rank = await Rank.findOne({ userID: user._id });

        if (room.length > 0) {
            res.render("competition/detail", {
                room,
            });
        } else {
            res.redirect("/competition");
        }
    }
}

module.exports = new CompetitionController();