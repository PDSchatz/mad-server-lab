const Express = require('express')
const cors = require('cors')
const PORT = 4000
const app = Express()
let noun = '',
    verb = '',
    adjective = '';

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
const staticSource = `${__dirname}/public`;
const statOptions = {
  extensions: ['html']
}
app.use(Express.static(staticSource, statOptions))
app.use(cors())

app.get('/first-word', (_, res) => {
  res.status(200).render('first-word')
})

app.all('/second-word', (req, res) => {
  if(req.method === "POST"){
    if(req.body.noun){
      noun = req.body.noun
      res.redirect('second-word')
    } else {
      res.status(406).render('first-word')
    }
  }

  if(req.method === "GET" && noun) {
    res.send(200).render('second-word')
  }
})


app.all('/third-word', (req, res) => {
  if(req.method === "POST"){
      if(req.body.verb){
      verb = req.body.verb
      res.redirect('third-word')
    } else {
      res.status(406).redirect('second-word')
    }
  }

  if(req.method === "GET") {
    res.status(200).render('third-word')
  }
})


app.post('/final', (req, res) => {
  if(req.body.adj){
    adjective = req.body.adj
    res.redirect('/story')
  } else {
    res.status(406).redirect('third-word')
  }
})

app.get('/story', (_, res) => {
  if(!noun || !verb || !adjective){
    res.redirect('/')
  } else {
    res.status(200).send(`here's a story: \n ${noun} ${adjective} ${verb}`)
  }
})


app.listen(PORT, () => {
  console.log(`listening @ ${PORT}`)
})