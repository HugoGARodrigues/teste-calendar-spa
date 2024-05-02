import {db} from "../db.js";

export const getTasks = (_, res) => {
    const q = "SELECT * FROM tasks";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}