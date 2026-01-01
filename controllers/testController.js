const testUserController = (req,res) => {
    try {
        res.status(200).send(
            "<h1>Testing User Data</h1>"
        );
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {testUserController};