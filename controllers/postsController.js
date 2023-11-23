const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

async function index(req, res) {
    res.send('index');
}
//per inserire nel db
async function store(req, res) {
    const insertData = req.body;
    const slug = kebabCase(insertData.title);
    const newPost = await prisma.post.create({
        data: {
            title: insertData.title,
            slug: slug,
            image: insertData.image,
            content: insertData.content,
            published: insertData.published,
        }
    })
    return res.json(newPost);
}

module.exports = {
    index,
    store

}