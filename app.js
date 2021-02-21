const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost:27017/urlsShortner', {
    useNewUrlParser:true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => {
    ShortUrl.find({}).then((shortUrls)=>{
        res.render('index', {
            shortUrls
        })
    }).catch(() => {
        res.redirect('/')
    })
})

app.post('/shortUrls', async (req,res) => {
    await ShortUrl.create({ full: req.body.fullurl })
    res.redirect('/')
});
app.get('/:id', (req, res) => {
    ShortUrl.findOne({ short: req.params.id }, (err, post) => {
        if (!err) {
            res.redirect(post.full)
        } else {
            res.redirect('/')
        }
    })
})
 
app.listen(process.env.PORT || 3000, () => {
    console.log('server started')
});