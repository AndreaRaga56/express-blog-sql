import blogPosts from "../content.js";

function index(req, res) {
    const filterTag = req.query.tags;
    let postDaMostrare = blogPosts;
    if (filterTag !== undefined) {
        postDaMostrare = blogPosts.filter((curElem, i) => (blogPosts[i].tags.includes(filterTag)));
    }
    const bacheca = {
        blogPosts: postDaMostrare,
        tot: postDaMostrare.length
    };
    res.json(bacheca);
}

function show(req, res) {
    const postId = parseInt(req.params.id);
    let answer = 0;
    for (let i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].id === postId) {
            answer = blogPosts[i];
            break
        }
    }
    res.json(answer);
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
    let indexDaEliminare;
    for (let i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].id === postId) {
            indexDaEliminare = i;
            break
        }
    }
    blogPosts.splice(indexDaEliminare, 1);

    res.json(blogPosts)
};

export default { index, show, store, update, modify, destroy };
