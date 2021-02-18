const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const jujuRouter = require('./routes/juju');

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/juju/troll', jujuRouter);

app.use(((req, res, next) => {
    // setInterval(async () => {
    //     try {
    //         console.log('ab');
    //         // res.writeHead()
    //         // setInterval(await () => {})
    //         res.redirect('/juju/troll')
    //         res.statusCode = 404;
    //         res.setHeader('Content-Type', 'text/plain');
    //         res.end('Cannot ' + req.method + ' ' + req.url);
    //
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, 1000)
}))

const request = require('request');

const options = {
    url: 'https://www.leetchi.com/fr/Fundraising/Participations?hashId=lWnqXqWr&lastId=undefined',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
};


function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const data = JSON.parse(response.body)
        let tabTotalAmount = 0
        let tabBiz = []
        data.data.data.forEach(bizmate => {
            const fullname = bizmate.fullName
            let amount = '';
            if (bizmate.showContributionAmount) {
                amount = ' / ' + bizmate.amountFormatted
                tabTotalAmount = tabTotalAmount + parseInt(bizmate.amountFormatted);
            }
            tabBiz.push(fullname + amount)
        })
        console.table(tabBiz);
        console.warn('Somme des dons non cachés : ' + tabTotalAmount + '€')
        console.log('Total participants : ' + data.data.paging.Total + ' ==> https://www.leetchi.com/c/depart-victoria-lwnqxqwr');
    }
}

setInterval(() => {
    request(options, callback);
}, 20000)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use((req,res,next)=> {
//   res.header('X-Requested-With','XMLHttpRequest')
// })


// app.get('/', (req,res) => {;
//   console.log(res);
//   res.send('hello world')
//   console.log(res);
// })

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(80, function () {
    console.log('LAUNCHING DEMON')

})


module.exports = app;
