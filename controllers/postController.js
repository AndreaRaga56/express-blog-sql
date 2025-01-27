import connection from "../data/db.js";

function index(req, res) {
    const filterTag = req.query.tags;
    const sql = "SELECT * FROM `posts`"
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Errore interno del server",
            });
        } else {
            let postDaMostrare = result
            if (filterTag !== undefined) {
                postDaMostrare = result.filter((curElem, i) => (blogPosts[i].tags.includes(filterTag)));
            }
            res.status(200).json({
                status: "success",
                tot: postDaMostrare.length,
                data: postDaMostrare,
            });
        }
    })
}

function show(req, res) {
    const postId = parseInt(req.params.id);
    const sql = "SELECT * FROM `posts` WHERE `id`=?"
    connection.query(sql, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Errore interno del server",
            });
        } else {
            let answer = 0;
            for (let i = 0; i < result.length; i++) {
                if (result[i].id === postId) {
                    answer = result[i];
                    break
                }
            }
            res.json(answer);
        }
    });

};

function store(req, res) {
    let newPost = req.body;
    // console.log(newPost) Senza ID
    newPost = {
        id: blogPosts[blogPosts.length - 1].id + 1,
        ...newPost
    };
    // console.log(newPost) Con ID
    blogPosts.push(newPost);

    console.log(blogPosts)
    ////////////////////////////////////////////// Esempio json di nuovo Post
    // {
    //     "title": "Fotografia per Principianti: Tecniche Base",
    //     "content": "In questo articolo imparerai le tecniche essenziali per migliorare le tue foto e iniziare il tuo viaggio nella fotografia.",
    //     "image": "fotografia-base.jpg",
    //     "tags": ["fotografia", "principianti", "tecniche", "arte"]
    // }

    res.json(newPost)
};

function update(req, res) {
    let postUpdated = req.body;
    const postId = parseInt(req.params.id);
    postUpdated = {
        id: postId,
        ...postUpdated
    };

    for (let i = 0; i < blogPosts.length; i++) {
        // console.log(blogPosts[i].id, postId)
        if (blogPosts[i].id === postId) {
            blogPosts[i] = postUpdated;
            // console.log(blogPosts[i])
            break
        }
    }
    console.log(blogPosts)
    res.json(postUpdated);

};

function modify(req, res) {
    let postUpdated = req.body;
    // console.log(postUpdated)
    const postId = parseInt(req.params.id);
    for (let i = 0; i < blogPosts.length; i++) {
        // console.log(blogPosts[i].id, postId)
        if (blogPosts[i].id === postId) {
            blogPosts[i] = {
                ...blogPosts[i],
                ...postUpdated,
            }
            // console.log(blogPosts[i])
            break
        }
    }
    res.json(postUpdated);
};

function destroy(req, res) {
    const postId = parseInt(req.params.id);
    const sql = "DELETE FROM `posts` WHERE `id`=?";
    connection.query(sql, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Errore interno del server",
            });
        } else {
            res.json(true);
        };
    });
};

export default { index, show, store, update, modify, destroy };
