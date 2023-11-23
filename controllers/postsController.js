const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");
// mostro tutti i post in rotta index 
async function index(req, res) {
    try {
        const { published, content } = req.query;
        const filter = {};
        if (published) {
            filter.published = published.toLowerCase() === 'true';
        }
        if (content) {
            filter.OR = [
                { title: { contains: content.toLowerCase() } },
                { content: { contains: content.toLowerCase() } },
            ];
        }
        const posts = await prisma.post.findMany({
            where: filter,
        });
        res.json(posts);
    } catch (error) {
        console.error("Errore durante il recupero dei post:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
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
//mostro un singolo elemento tramite slug  con show
async function show(req, res) {
    const dbSlug = req.params.slug;
    console.log(dbSlug);
    const data = await prisma.post.findUnique({
        where: {
            slug: dbSlug,
        }
    });
    if (!data) {
        return res.status(404).json({ error: "Elemento non trovato" });
    }
    return res.json(data);
}

//funzione per modifica 
async function update(req, res) {
    const dbSlug = req.params.slug;
    const updateData = req.body;
    console.log(dbSlug);
    const post = await prisma.post.findUnique({
        where: {
            slug: dbSlug,
        },
    });
    if (!post) {
        throw new Error('Not found');
    }

    const updatePost = await prisma.post.update({
        data: updateData,
        where: {
            slug: dbSlug,
        },
    })
    res.json(updatePost);
}

//funzione per eliminare
async function destroy(req, res) {
    const dbSlug = req.params.slug;

    await prisma.post.delete({
        where: {
            slug: dbSlug,
        },
    });
    return res.json({ message: "Pizza eliminata" });

}
module.exports = {
    index,
    store,
    show,
    update,
    destroy

}